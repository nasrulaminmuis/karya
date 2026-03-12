import { NextRequest } from "next/server";

// Mock prisma
const mockProjectFindMany = jest.fn();
const mockProjectCreate = jest.fn();
const mockProjectFindUnique = jest.fn();
const mockProjectUpdate = jest.fn();
const mockProjectDelete = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: mockProjectFindMany,
      create: mockProjectCreate,
      findUnique: mockProjectFindUnique,
      update: mockProjectUpdate,
      delete: mockProjectDelete,
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

import { GET, POST } from "@/app/api/projects/route";
import { GET as GET_BY_ID, PUT, DELETE } from "@/app/api/projects/[id]/route";

const mockUser = { id: "user-1", email: "test@test.com" };
const mockProject = {
  id: "proj-1",
  title: "Test Project",
  description: "A test project",
  imageUrl: null,
  repositoryUrl: "https://github.com/test",
  projectUrl: "https://test.com",
  tags: ["React", "TypeScript"],
  userId: "user-1",
  isPublished: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-02"),
  _count: { impressions: 10, interactions: 5 },
};

function makeRequest(method = "GET", body?: Record<string, unknown>): NextRequest {
  const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  return new NextRequest("http://localhost:3000/api/projects", opts);
}

describe("GET /api/projects", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it("should return list of user projects", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectFindMany.mockResolvedValue([mockProject]);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].title).toBe("Test Project");
    expect(body[0].views).toBe(10);
    expect(body[0].impressions).toBe(5);
  });
});

describe("POST /api/projects", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await POST(makeRequest("POST", { title: "A", description: "B" }));
    expect(res.status).toBe(401);
  });

  it("should return 400 if title or description is missing", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    const res = await POST(makeRequest("POST", { title: "", description: "B" }));
    expect(res.status).toBe(400);
  });

  it("should create and return project with 201", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectCreate.mockResolvedValue({
      id: "new-proj",
      title: "New Proj",
      description: "Desc",
      imageUrl: null,
      repositoryUrl: null,
      projectUrl: null,
      tags: ["React"],
      userId: "user-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const res = await POST(
      makeRequest("POST", { title: "New Proj", description: "Desc", tags: ["React"] })
    );
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.title).toBe("New Proj");
    expect(body.views).toBe(0);
  });
});

describe("GET /api/projects/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 404 if project not found", async () => {
    mockProjectFindUnique.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/projects/non-exist");
    const res = await GET_BY_ID(req, { params: Promise.resolve({ id: "non-exist" }) });
    expect(res.status).toBe(404);
  });

  it("should return project details", async () => {
    mockProjectFindUnique.mockResolvedValue(mockProject);
    const req = new NextRequest("http://localhost:3000/api/projects/proj-1");
    const res = await GET_BY_ID(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe("Test Project");
  });
});

describe("PUT /api/projects/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(401);
  });

  it("should return 404 if project not found or not owned", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectFindUnique.mockResolvedValue({ ...mockProject, userId: "other-user" });

    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(404);
  });

  it("should update and return project", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectFindUnique.mockResolvedValue(mockProject);
    mockProjectUpdate.mockResolvedValue({ ...mockProject, title: "Updated Title" });

    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated Title" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe("Updated Title");
  });
});

describe("DELETE /api/projects/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(401);
  });

  it("should return 404 if project not owned", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectFindUnique.mockResolvedValue({ ...mockProject, userId: "other-user" });

    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(404);
  });

  it("should delete project and return success", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockProjectFindUnique.mockResolvedValue(mockProject);
    mockProjectDelete.mockResolvedValue(mockProject);

    const req = new NextRequest("http://localhost:3000/api/projects/proj-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params: Promise.resolve({ id: "proj-1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
