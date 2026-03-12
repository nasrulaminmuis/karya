import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// Mock prisma before importing auth
const mockFindUnique = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: mockFindUnique },
  },
}));

import { signToken, verifyToken, hashPassword, comparePassword, getAuthUser, unauthorizedResponse } from "@/lib/auth";

const JWT_SECRET = "karya-dev-secret-change-in-production";

describe("auth.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============ signToken ============
  describe("signToken", () => {
    it("should return a valid JWT string", () => {
      const payload = { userId: "user-123", email: "test@example.com" };
      const token = signToken(payload);
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3); // JWT has 3 parts
    });

    it("should encode the payload correctly", () => {
      const payload = { userId: "user-123", email: "test@example.com" };
      const token = signToken(payload);
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      expect(decoded.userId).toBe("user-123");
      expect(decoded.email).toBe("test@example.com");
    });

    it("should set expiration to 7 days", () => {
      const payload = { userId: "user-123", email: "test@example.com" };
      const token = signToken(payload);
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      // exp - iat should be roughly 7 days (604800 seconds)
      expect(decoded.exp - decoded.iat).toBe(604800);
    });
  });

  // ============ verifyToken ============
  describe("verifyToken", () => {
    it("should return the payload for a valid token", () => {
      const token = signToken({ userId: "user-456", email: "a@b.com" });
      const result = verifyToken(token);
      expect(result.userId).toBe("user-456");
      expect(result.email).toBe("a@b.com");
    });

    it("should throw for an invalid token", () => {
      expect(() => verifyToken("invalid-token")).toThrow();
    });

    it("should throw for a token signed with a different secret", () => {
      const fakeToken = jwt.sign({ userId: "x", email: "x@x.com" }, "wrong-secret");
      expect(() => verifyToken(fakeToken)).toThrow();
    });
  });

  // ============ hashPassword ============
  describe("hashPassword", () => {
    it("should return a bcrypt hash different from the plaintext", async () => {
      const hash = await hashPassword("myPassw0rd!");
      expect(hash).not.toBe("myPassw0rd!");
      expect(hash).toMatch(/^\$2[aby]?\$/); // bcrypt prefix
    });
  });

  // ============ comparePassword ============
  describe("comparePassword", () => {
    it("should return true for matching password", async () => {
      const hash = await bcrypt.hash("secret123", 12);
      const result = await comparePassword("secret123", hash);
      expect(result).toBe(true);
    });

    it("should return false for mismatching password", async () => {
      const hash = await bcrypt.hash("secret123", 12);
      const result = await comparePassword("wrong-password", hash);
      expect(result).toBe(false);
    });
  });

  // ============ getAuthUser ============
  describe("getAuthUser", () => {
    function makeRequest(headers: Record<string, string> = {}): NextRequest {
      return new NextRequest("http://localhost:3000/api/test", {
        headers,
      });
    }

    it("should return null when no authorization header", async () => {
      const req = makeRequest();
      const result = await getAuthUser(req);
      expect(result).toBeNull();
    });

    it("should return null when authorization header doesn't start with Bearer", async () => {
      const req = makeRequest({ authorization: "Basic abc123" });
      const result = await getAuthUser(req);
      expect(result).toBeNull();
    });

    it("should return null for an invalid token", async () => {
      const req = makeRequest({ authorization: "Bearer invalid-token" });
      const result = await getAuthUser(req);
      expect(result).toBeNull();
    });

    it("should return the user for a valid token", async () => {
      const mockUser = { id: "user-789", email: "test@test.com", fullName: "Test User" };
      mockFindUnique.mockResolvedValue(mockUser);

      const token = signToken({ userId: "user-789", email: "test@test.com" });
      const req = makeRequest({ authorization: `Bearer ${token}` });

      const result = await getAuthUser(req);
      expect(result).toEqual(mockUser);
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: "user-789" } });
    });

    it("should return null if user not found in database", async () => {
      mockFindUnique.mockResolvedValue(null);

      const token = signToken({ userId: "nonexistent", email: "x@x.com" });
      const req = makeRequest({ authorization: `Bearer ${token}` });

      const result = await getAuthUser(req);
      expect(result).toBeNull();
    });
  });

  // ============ unauthorizedResponse ============
  describe("unauthorizedResponse", () => {
    it("should return a Response with status 401", () => {
      const response = unauthorizedResponse();
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(401);
    });

    it("should return JSON body with error message", async () => {
      const response = unauthorizedResponse();
      const body = await response.json();
      expect(body.error).toBe("Unauthorized");
    });
  });
});
