import { NextRequest } from "next/server";

// Mock prisma
const mockCreate = jest.fn();
const mockFindFirst = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { create: mockCreate, findFirst: mockFindFirst },
  },
}));

// Mock auth
const mockHashPassword = jest.fn();
const mockSignToken = jest.fn();
jest.mock("@/lib/auth", () => ({
  hashPassword: mockHashPassword,
  signToken: mockSignToken,
}));

import { POST } from "@/app/api/auth/register/route";

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if name, email, or password is missing", async () => {
    const res = await POST(makeRequest({ name: "", email: "a@a.com", password: "123" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("should return 400 if email is missing", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "", password: "123" }));
    expect(res.status).toBe(400);
  });

  it("should return 409 if email or username already exists", async () => {
    mockFindFirst.mockResolvedValue({ id: "existing-user" });

    const res = await POST(
      makeRequest({ name: "Test", email: "taken@test.com", password: "pass123" })
    );
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.error).toContain("sudah terdaftar");
  });

  it("should create user and return 201 with token", async () => {
    mockFindFirst.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue("hashed-password");
    mockSignToken.mockReturnValue("jwt-token-123");
    mockCreate.mockResolvedValue({
      id: "new-user-id",
      email: "new@test.com",
      username: "new",
      fullName: "New User",
      bio: null,
      profilePictureUrl: null,
      createdAt: new Date("2024-01-01"),
    });

    const res = await POST(
      makeRequest({ name: "New User", email: "new@test.com", password: "pass123" })
    );
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.token).toBe("jwt-token-123");
    expect(body.user.email).toBe("new@test.com");
    expect(body.user.name).toBe("New User");
  });

  it("should use email prefix as username when no username provided", async () => {
    mockFindFirst.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue("hash");
    mockSignToken.mockReturnValue("token");
    mockCreate.mockResolvedValue({
      id: "id",
      email: "john@gmail.com",
      username: "john",
      fullName: "John",
      bio: null,
      profilePictureUrl: null,
      createdAt: new Date(),
    });

    await POST(makeRequest({ name: "John", email: "john@gmail.com", password: "123" }));

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ username: "john" }),
      })
    );
  });

  it("should return 500 on unexpected error", async () => {
    mockFindFirst.mockRejectedValue(new Error("DB error"));

    const res = await POST(
      makeRequest({ name: "Test", email: "a@a.com", password: "123" })
    );
    expect(res.status).toBe(500);
  });
});
