import { NextRequest } from "next/server";

// Mock prisma
const mockUserFindMany = jest.fn();
const mockUserFindUnique = jest.fn();
const mockProjectFindMany = jest.fn();
const mockPortfolioVisitCreate = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findMany: mockUserFindMany, findUnique: mockUserFindUnique },
    project: { findMany: mockProjectFindMany },
    portfolioVisit: { create: mockPortfolioVisitCreate },
  },
}));

import { GET as searchDevelopers } from "@/app/api/public/search/developers/route";
import { GET as getPublicProfile } from "@/app/api/public/users/[username]/route";
import { GET as getPublicProjects } from "@/app/api/public/users/[username]/projects/route";

const mockFullUser = {
  id: "user-1",
  email: "test@test.com",
  fullName: "Test User",
  username: "testuser",
  bio: "A developer",
  profilePictureUrl: null,
  createdAt: new Date("2024-01-01"),
  socialLinks: [
    { platform: "github", url: "https://github.com/test" },
  ],
  skills: [
    { id: "s1", name: "React", proficiencyLevel: "Expert", category: "Frontend" },
  ],
  certificates: [
    {
      id: "c1",
      title: "AWS Cert",
      issuer: "AWS",
      issueDate: new Date("2024-02-15"),
      description: "Cloud",
      credentialUrl: null,
    },
  ],
};

describe("GET /api/public/search/developers", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return list of developers", async () => {
    mockUserFindMany.mockResolvedValue([
      {
        id: "1",
        fullName: "Dev One",
        email: "dev@test.com",
        username: "devone",
        bio: "Bio",
        profilePictureUrl: null,
        createdAt: new Date(),
        socialLinks: [{ platform: "github", url: "https://github.com/dev" }],
        _count: { projects: 3 },
      },
    ]);

    const req = new NextRequest("http://localhost:3000/api/public/search/developers");
    const res = await searchDevelopers(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].name).toBe("Dev One");
    expect(body[0].projectCount).toBe(3);
    expect(body[0].githubUrl).toBe("https://github.com/dev");
  });

  it("should pass query parameter for search", async () => {
    mockUserFindMany.mockResolvedValue([]);

    const req = new NextRequest("http://localhost:3000/api/public/search/developers?q=react");
    await searchDevelopers(req);

    expect(mockUserFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            expect.objectContaining({ fullName: { contains: "react", mode: "insensitive" } }),
          ]),
        }),
      })
    );
  });
});

describe("GET /api/public/users/[username]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 404 if user not found", async () => {
    mockUserFindUnique.mockResolvedValue(null);

    const req = new NextRequest("http://localhost:3000/api/public/users/unknown");
    const res = await getPublicProfile(req, {
      params: Promise.resolve({ username: "unknown" }),
    });
    expect(res.status).toBe(404);
  });

  it("should return public profile with skills and certificates", async () => {
    mockUserFindUnique.mockResolvedValue(mockFullUser);
    mockPortfolioVisitCreate.mockResolvedValue({});

    const req = new NextRequest("http://localhost:3000/api/public/users/testuser");
    const res = await getPublicProfile(req, {
      params: Promise.resolve({ username: "testuser" }),
    });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.user.name).toBe("Test User");
    expect(body.user.githubUrl).toBe("https://github.com/test");
    expect(body.skills).toHaveLength(1);
    expect(body.skills[0].level).toBe("Expert");
    expect(body.certificates).toHaveLength(1);
    expect(body.certificates[0].name).toBe("AWS Cert");
  });

  it("should record portfolio visit", async () => {
    mockUserFindUnique.mockResolvedValue(mockFullUser);
    mockPortfolioVisitCreate.mockResolvedValue({});

    const req = new NextRequest("http://localhost:3000/api/public/users/testuser", {
      headers: { "x-forwarded-for": "127.0.0.1", "user-agent": "TestBot" },
    });
    await getPublicProfile(req, {
      params: Promise.resolve({ username: "testuser" }),
    });

    expect(mockPortfolioVisitCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "user-1",
          visitorIp: "127.0.0.1",
          userAgent: "TestBot",
        }),
      })
    );
  });
});

describe("GET /api/public/users/[username]/projects", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 404 if user not found", async () => {
    mockUserFindUnique.mockResolvedValue(null);

    const req = new NextRequest("http://localhost:3000/api/public/users/unknown/projects");
    const res = await getPublicProjects(req, {
      params: Promise.resolve({ username: "unknown" }),
    });
    expect(res.status).toBe(404);
  });

  it("should return published projects", async () => {
    mockUserFindUnique.mockResolvedValue({ id: "user-1" });
    mockProjectFindMany.mockResolvedValue([
      {
        id: "p1",
        title: "Public Proj",
        description: "Desc",
        imageUrl: null,
        repositoryUrl: "https://github.com/test",
        projectUrl: null,
        tags: ["React"],
        userId: "user-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { impressions: 5, interactions: 2 },
      },
    ]);

    const req = new NextRequest("http://localhost:3000/api/public/users/testuser/projects");
    const res = await getPublicProjects(req, {
      params: Promise.resolve({ username: "testuser" }),
    });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].title).toBe("Public Proj");
    expect(body[0].views).toBe(5);
  });
});
