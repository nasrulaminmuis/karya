import { NextRequest } from "next/server";

// Mock prisma
const mockFindUnique = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: mockFindUnique },
  },
}));

// Mock auth
const mockComparePassword = jest.fn();
const mockSignToken = jest.fn();
jest.mock("@/lib/auth", () => ({
  comparePassword: mockComparePassword,
  signToken: mockSignToken,
}));

import { POST } from "@/app/api/auth/login/route";

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const mockUser = {
  id: "user-1",
  email: "test@test.com",
  passwordHash: "hashed",
  fullName: "Test User",
  username: "testuser",
  bio: "A developer",
  profilePictureUrl: null,
  createdAt: new Date("2024-01-01"),
  socialLinks: [
    { platform: "github", url: "https://github.com/test" },
    { platform: "linkedin", url: "https://linkedin.com/in/test" },
    { platform: "website", url: "https://test.com" },
  ],
};

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const res = await POST(makeRequest({ email: "", password: "123" }));
    expect(res.status).toBe(400);
  });

  it("should return 400 if password is missing", async () => {
    const res = await POST(makeRequest({ email: "a@a.com", password: "" }));
    expect(res.status).toBe(400);
  });

  it("should return 401 if user not found", async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await POST(makeRequest({ email: "notfound@test.com", password: "123" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("salah");
  });

  it("should return 401 if password is incorrect", async () => {
    mockFindUnique.mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValue(false);

    const res = await POST(makeRequest({ email: "test@test.com", password: "wrong" }));
    expect(res.status).toBe(401);
  });

  it("should return 200 with token and user data on successful login", async () => {
    mockFindUnique.mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValue(true);
    mockSignToken.mockReturnValue("login-token-123");

    const res = await POST(makeRequest({ email: "test@test.com", password: "correct" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.token).toBe("login-token-123");
    expect(body.user.email).toBe("test@test.com");
    expect(body.user.name).toBe("Test User");
    expect(body.user.githubUrl).toBe("https://github.com/test");
    expect(body.user.linkedinUrl).toBe("https://linkedin.com/in/test");
    expect(body.user.websiteUrl).toBe("https://test.com");
  });

  it("should return 500 on unexpected error", async () => {
    mockFindUnique.mockRejectedValue(new Error("DB error"));

    const res = await POST(makeRequest({ email: "a@a.com", password: "123" }));
    expect(res.status).toBe(500);
  });
});
