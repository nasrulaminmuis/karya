import { NextRequest } from "next/server";

// Mock prisma
const mockSkillFindMany = jest.fn();
const mockSkillCreate = jest.fn();
const mockSkillFindUnique = jest.fn();
const mockSkillUpdate = jest.fn();
const mockSkillDelete = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    userSkill: {
      findMany: mockSkillFindMany,
      create: mockSkillCreate,
      findUnique: mockSkillFindUnique,
      update: mockSkillUpdate,
      delete: mockSkillDelete,
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

import { GET, POST } from "@/app/api/skills/route";
import { PUT, DELETE } from "@/app/api/skills/[id]/route";

const mockUser = { id: "user-1", email: "test@test.com" };

function makeRequest(method = "GET", body?: Record<string, unknown>): NextRequest {
  const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  return new NextRequest("http://localhost:3000/api/skills", opts);
}

describe("GET /api/skills", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it("should return list of skills mapped correctly", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillFindMany.mockResolvedValue([
      { id: "s1", name: "React", proficiencyLevel: "Expert", category: "Frontend" },
    ]);

    const res = await GET(makeRequest());
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].level).toBe("Expert");
    expect(body[0].name).toBe("React");
  });
});

describe("POST /api/skills", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const res = await POST(makeRequest("POST", { name: "A", level: "B" }));
    expect(res.status).toBe(401);
  });

  it("should return 400 if name or level is missing", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    const res = await POST(makeRequest("POST", { name: "", level: "Expert" }));
    expect(res.status).toBe(400);
  });

  it("should create skill and return 201", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillCreate.mockResolvedValue({
      id: "s1",
      name: "TypeScript",
      proficiencyLevel: "Advanced",
      category: "Language",
    });

    const res = await POST(
      makeRequest("POST", { name: "TypeScript", level: "Advanced", category: "Language" })
    );
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe("TypeScript");
    expect(body.level).toBe("Advanced");
  });

  it("should default category to Other", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillCreate.mockResolvedValue({
      id: "s2",
      name: "Skill",
      proficiencyLevel: "Beginner",
      category: "Other",
    });

    await POST(makeRequest("POST", { name: "Skill", level: "Beginner" }));
    expect(mockSkillCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ category: "Other" }),
      })
    );
  });
});

describe("PUT /api/skills/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/skills/s1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "s1" }) });
    expect(res.status).toBe(401);
  });

  it("should return 404 if skill not found or not owned", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillFindUnique.mockResolvedValue({ id: "s1", userId: "other-user" });

    const req = new NextRequest("http://localhost:3000/api/skills/s1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "s1" }) });
    expect(res.status).toBe(404);
  });

  it("should update and return skill", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillFindUnique.mockResolvedValue({
      id: "s1",
      userId: "user-1",
      name: "React",
      proficiencyLevel: "Advanced",
      category: "Frontend",
    });
    mockSkillUpdate.mockResolvedValue({
      id: "s1",
      name: "React.js",
      proficiencyLevel: "Expert",
      category: "Frontend",
    });

    const req = new NextRequest("http://localhost:3000/api/skills/s1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "React.js", level: "Expert" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "s1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("React.js");
    expect(body.level).toBe("Expert");
  });
});

describe("DELETE /api/skills/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 404 if skill not found", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillFindUnique.mockResolvedValue(null);

    const req = new NextRequest("http://localhost:3000/api/skills/s1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "s1" }) });
    expect(res.status).toBe(404);
  });

  it("should delete skill and return success", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);
    mockSkillFindUnique.mockResolvedValue({ id: "s1", userId: "user-1" });
    mockSkillDelete.mockResolvedValue({});

    const req = new NextRequest("http://localhost:3000/api/skills/s1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "s1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
