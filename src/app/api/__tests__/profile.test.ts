import { NextRequest } from "next/server";

// Mock prisma
const mockSocialLinkFindMany = jest.fn();
const mockSocialLinkFindFirst = jest.fn();
const mockSocialLinkCreate = jest.fn();
const mockSocialLinkUpdate = jest.fn();
const mockSocialLinkDelete = jest.fn();
const mockUserUpdate = jest.fn();
const mockUserFindUnique = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    socialLink: {
      findMany: mockSocialLinkFindMany,
      findFirst: mockSocialLinkFindFirst,
      create: mockSocialLinkCreate,
      update: mockSocialLinkUpdate,
      delete: mockSocialLinkDelete,
    },
    user: {
      update: mockUserUpdate,
      findUnique: mockUserFindUnique,
    },
  },
}));

// Mock auth
const mockGetAuthUser = jest.fn();
jest.mock("@/lib/auth", () => ({
  getAuthUser: mockGetAuthUser,
  unauthorizedResponse: () =>
    Response.json({ error: "Unauthorized" }, { status: 401 }),
}));

import { GET, PUT } from "@/app/api/profile/route";

const mockUser = {
  id: "user-1",
  email: "test@test.com",
  username: "testuser",
  fullName: "Test User",
  bio: "Bio",
  profilePictureUrl: null,
  createdAt: new Date("2024-01-01"),
};

function makeRequest(method = "GET", body?: Record<string, unknown>): NextRequest {
  const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  return new NextRequest("http://localhost:3000/api/profile", opts);
}

describe("GET /api/profile", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it("should return user profile with social links", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSocialLinkFindMany.mockResolvedValue([
      { platform: "github", url: "https://github.com/test" },
    ]);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("Test User");
    expect(body.email).toBe("test@test.com");
    expect(body.githubUrl).toBe("https://github.com/test");
  });
});

describe("PUT /api/profile", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await PUT(makeRequest("PUT", { name: "New" }));
    expect(res.status).toBe(401);
  });

  it("should return 409 if username is taken", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockUserFindUnique.mockResolvedValue({ id: "other-user" });

    const res = await PUT(makeRequest("PUT", { username: "taken" }));
    expect(res.status).toBe(409);
  });

  it("should update user profile", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockUserUpdate.mockResolvedValue({
      ...mockUser,
      fullName: "Updated Name",
    });
    // No existing social links to update
    mockSocialLinkFindFirst.mockResolvedValue(null);

    const res = await PUT(makeRequest("PUT", { name: "Updated Name" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("Updated Name");
  });

  it("should create social link if not exists", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockUserUpdate.mockResolvedValue(mockUser);
    mockSocialLinkFindFirst.mockResolvedValue(null);

    await PUT(makeRequest("PUT", { githubUrl: "https://github.com/new" }));
    expect(mockSocialLinkCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          platform: "github",
          url: "https://github.com/new",
        }),
      })
    );
  });

  it("should update existing social link", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockUserUpdate.mockResolvedValue(mockUser);
    mockSocialLinkFindFirst.mockResolvedValue({ id: "link-1", platform: "github" });

    await PUT(makeRequest("PUT", { githubUrl: "https://github.com/updated" }));
    expect(mockSocialLinkUpdate).toHaveBeenCalled();
  });

  it("should delete social link if url is empty", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockUserUpdate.mockResolvedValue(mockUser);
    mockSocialLinkFindFirst.mockResolvedValue({ id: "link-1", platform: "github" });

    await PUT(makeRequest("PUT", { githubUrl: "" }));
    expect(mockSocialLinkDelete).toHaveBeenCalledWith({ where: { id: "link-1" } });
  });
});
