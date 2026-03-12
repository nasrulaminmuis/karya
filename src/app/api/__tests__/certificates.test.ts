import { NextRequest } from "next/server";

// Mock prisma
const mockCertFindMany = jest.fn();
const mockCertCreate = jest.fn();
const mockCertFindUnique = jest.fn();
const mockCertDelete = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    certificationAward: {
      findMany: mockCertFindMany,
      create: mockCertCreate,
      findUnique: mockCertFindUnique,
      delete: mockCertDelete,
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

import { GET, POST } from "@/app/api/certificates/route";
import { DELETE } from "@/app/api/certificates/[id]/route";

const mockUser = { id: "user-1", email: "test@test.com" };

function makeRequest(method = "GET", body?: Record<string, unknown>): NextRequest {
  const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  return new NextRequest("http://localhost:3000/api/certificates", opts);
}

describe("GET /api/certificates", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it("should return list of certificates mapped correctly", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockCertFindMany.mockResolvedValue([
      {
        id: "c1",
        title: "AWS Cert",
        issuer: "AWS",
        issueDate: new Date("2024-02-15"),
        description: "Cloud cert",
        credentialUrl: "https://aws.com/cert",
      },
    ]);

    const res = await GET(makeRequest());
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].name).toBe("AWS Cert");
    expect(body[0].date).toBe("2024-02-15");
    expect(body[0].url).toBe("https://aws.com/cert");
  });
});

describe("POST /api/certificates", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await POST(makeRequest("POST", { name: "A", issuer: "B" }));
    expect(res.status).toBe(401);
  });

  it("should return 400 if name or issuer is missing", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    const res = await POST(makeRequest("POST", { name: "", issuer: "AWS" }));
    expect(res.status).toBe(400);
  });

  it("should create certificate and return 201", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockCertCreate.mockResolvedValue({
      id: "c1",
      title: "New Cert",
      issuer: "Google",
      issueDate: new Date("2024-03-01"),
      description: "Desc",
      credentialUrl: null,
    });

    const res = await POST(
      makeRequest("POST", { name: "New Cert", issuer: "Google", date: "2024-03-01" })
    );
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe("New Cert");
    expect(body.issuer).toBe("Google");
    expect(body.date).toBe("2024-03-01");
  });
});

describe("DELETE /api/certificates/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/certificates/c1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(401);
  });

  it("should return 404 if certificate not found or not owned", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockCertFindUnique.mockResolvedValue({ id: "c1", userId: "other-user" });

    const req = new NextRequest("http://localhost:3000/api/certificates/c1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(404);
  });

  it("should delete certificate and return success", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockCertFindUnique.mockResolvedValue({ id: "c1", userId: "user-1" });
    mockCertDelete.mockResolvedValue({});

    const req = new NextRequest("http://localhost:3000/api/certificates/c1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
