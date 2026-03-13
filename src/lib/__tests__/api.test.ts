// Mock window for Node.js environment (getToken checks typeof window)
// @ts-expect-error - assigning window in Node.js test environment
global.window = global;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

import {
  authAPI,
  profileAPI,
  projectsAPI,
  skillsAPI,
  certificatesAPI,
  analyticsAPI,
  publicAPI,
} from "@/lib/api";

function mockOkResponse(data: any) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
    status: 200,
  });
}

function mockErrorResponse(status: number, data: any = {}) {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve(data),
  });
}

describe("api.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  // ============ handleResponse (tested through API calls) ============
  describe("handleResponse (error handling)", () => {
    it("should throw error with server error message", async () => {
      mockFetch.mockReturnValue(mockErrorResponse(400, { error: "Bad request" }));
      await expect(authAPI.login({ email: "a", password: "b" })).rejects.toThrow("Bad request");
    });

    it("should throw fallback error when response has no error message", async () => {
      mockFetch.mockReturnValue(
        Promise.resolve({ ok: false, status: 500, json: () => Promise.reject() })
      );
      await expect(authAPI.login({ email: "a", password: "b" })).rejects.toThrow(
        "Request failed with status 500"
      );
    });
  });

  // ============ authAPI ============
  describe("authAPI", () => {
    it("register should POST to /api/auth/register", async () => {
      const mockData = { token: "t1", user: { id: "1", name: "Test" } };
      mockFetch.mockReturnValue(mockOkResponse(mockData));

      const result = await authAPI.register({
        name: "Test",
        email: "test@test.com",
        password: "pass123",
      });

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test", email: "test@test.com", password: "pass123" }),
      });
      expect(result).toEqual(mockData);
    });

    it("login should POST to /api/auth/login", async () => {
      const mockData = { token: "t2", user: { id: "2" } };
      mockFetch.mockReturnValue(mockOkResponse(mockData));

      const result = await authAPI.login({ email: "test@test.com", password: "pass" });

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com", password: "pass" }),
      });
      expect(result).toEqual(mockData);
    });
  });

  // ============ profileAPI ============
  describe("profileAPI", () => {
    it("get should fetch /api/profile with auth headers", async () => {
      localStorageMock.setItem("karya_token", "my-token");
      mockFetch.mockReturnValue(mockOkResponse({ id: "1" }));

      await profileAPI.get();

      expect(mockFetch).toHaveBeenCalledWith("/api/profile", {
        headers: expect.objectContaining({
          Authorization: "Bearer my-token",
          "Content-Type": "application/json",
        }),
      });
    });

    it("update should PUT /api/profile with auth headers and body", async () => {
      localStorageMock.setItem("karya_token", "my-token");
      mockFetch.mockReturnValue(mockOkResponse({ id: "1" }));

      await profileAPI.update({ name: "New Name", bio: "Bio" });

      expect(mockFetch).toHaveBeenCalledWith("/api/profile", {
        method: "PUT",
        headers: expect.objectContaining({ Authorization: "Bearer my-token" }),
        body: JSON.stringify({ name: "New Name", bio: "Bio" }),
      });
    });
  });

  // ============ projectsAPI ============
  describe("projectsAPI", () => {
    beforeEach(() => localStorageMock.setItem("karya_token", "tok"));

    it("list should GET /api/projects", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await projectsAPI.list();
      expect(mockFetch).toHaveBeenCalledWith("/api/projects", expect.objectContaining({ headers: expect.any(Object) }));
    });

    it("create should POST /api/projects", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "p1" }));
      await projectsAPI.create({ title: "My Project", description: "Desc" });
      expect(mockFetch).toHaveBeenCalledWith("/api/projects", expect.objectContaining({ method: "POST" }));
    });

    it("get should GET /api/projects/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "p1" }));
      await projectsAPI.get("p1");
      expect(mockFetch).toHaveBeenCalledWith("/api/projects/p1", expect.any(Object));
    });

    it("update should PUT /api/projects/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "p1" }));
      await projectsAPI.update("p1", { title: "Updated" });
      expect(mockFetch).toHaveBeenCalledWith("/api/projects/p1", expect.objectContaining({ method: "PUT" }));
    });

    it("delete should DELETE /api/projects/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ success: true }));
      await projectsAPI.delete("p1");
      expect(mockFetch).toHaveBeenCalledWith("/api/projects/p1", expect.objectContaining({ method: "DELETE" }));
    });
  });

  // ============ skillsAPI ============
  describe("skillsAPI", () => {
    beforeEach(() => localStorageMock.setItem("karya_token", "tok"));

    it("list should GET /api/skills", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await skillsAPI.list();
      expect(mockFetch).toHaveBeenCalledWith("/api/skills", expect.any(Object));
    });

    it("create should POST /api/skills", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "s1" }));
      await skillsAPI.create({ name: "React", level: "Expert", category: "Frontend" });
      expect(mockFetch).toHaveBeenCalledWith("/api/skills", expect.objectContaining({ method: "POST" }));
    });

    it("update should PUT /api/skills/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "s1" }));
      await skillsAPI.update("s1", { name: "React.js" });
      expect(mockFetch).toHaveBeenCalledWith("/api/skills/s1", expect.objectContaining({ method: "PUT" }));
    });

    it("delete should DELETE /api/skills/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ success: true }));
      await skillsAPI.delete("s1");
      expect(mockFetch).toHaveBeenCalledWith("/api/skills/s1", expect.objectContaining({ method: "DELETE" }));
    });
  });

  // ============ certificatesAPI ============
  describe("certificatesAPI", () => {
    beforeEach(() => localStorageMock.setItem("karya_token", "tok"));

    it("list should GET /api/certificates", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await certificatesAPI.list();
      expect(mockFetch).toHaveBeenCalledWith("/api/certificates", expect.any(Object));
    });

    it("create should POST /api/certificates", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ id: "c1" }));
      await certificatesAPI.create({
        name: "AWS Cert",
        issuer: "AWS",
        date: "2024-01-01",
      });
      expect(mockFetch).toHaveBeenCalledWith("/api/certificates", expect.objectContaining({ method: "POST" }));
    });

    it("delete should DELETE /api/certificates/:id", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ success: true }));
      await certificatesAPI.delete("c1");
      expect(mockFetch).toHaveBeenCalledWith("/api/certificates/c1", expect.objectContaining({ method: "DELETE" }));
    });
  });

  // ============ analyticsAPI ============
  describe("analyticsAPI", () => {
    it("get should GET /api/analytics with auth headers", async () => {
      localStorageMock.setItem("karya_token", "tok");
      const mockData = { monthly: [], projects: [], totals: { views: 0, impressions: 0, interactions: 0 } };
      mockFetch.mockReturnValue(mockOkResponse(mockData));

      const result = await analyticsAPI.get();
      expect(mockFetch).toHaveBeenCalledWith("/api/analytics", expect.any(Object));
      expect(result).toEqual(mockData);
    });
  });

  // ============ publicAPI ============
  describe("publicAPI", () => {
    it("getProfile should GET /api/public/users/:username without auth", async () => {
      mockFetch.mockReturnValue(mockOkResponse({ user: {}, skills: [], certificates: [] }));
      await publicAPI.getProfile("andipratama");
      expect(mockFetch).toHaveBeenCalledWith("/api/public/users/andipratama");
    });

    it("getProjects should GET /api/public/users/:username/projects", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await publicAPI.getProjects("andipratama");
      expect(mockFetch).toHaveBeenCalledWith("/api/public/users/andipratama/projects");
    });

    it("searchDevelopers should GET /api/public/search/developers", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await publicAPI.searchDevelopers();
      expect(mockFetch).toHaveBeenCalledWith("/api/public/search/developers");
    });

    it("searchDevelopers should include query param when provided", async () => {
      mockFetch.mockReturnValue(mockOkResponse([]));
      await publicAPI.searchDevelopers("react");
      expect(mockFetch).toHaveBeenCalledWith("/api/public/search/developers?q=react");
    });
  });
});
