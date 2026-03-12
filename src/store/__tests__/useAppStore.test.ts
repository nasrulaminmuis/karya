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

// Mock API modules — use jest.fn() inline since jest.mock is hoisted
jest.mock("@/lib/api", () => ({
  authAPI: {
    register: jest.fn(),
    login: jest.fn(),
  },
  profileAPI: { get: jest.fn() },
  projectsAPI: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  skillsAPI: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  certificatesAPI: {
    list: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}));

// Import AFTER mocks are set up
import { useAppStore } from "@/store/useAppStore";
import {
  authAPI,
  profileAPI,
  projectsAPI,
  skillsAPI,
  certificatesAPI,
} from "@/lib/api";

// Cast to jest.Mock for type safety
const mockAuthLogin = authAPI.login as jest.Mock;
const mockAuthRegister = authAPI.register as jest.Mock;
const mockProfileGet = profileAPI.get as jest.Mock;
const mockProjectsList = projectsAPI.list as jest.Mock;
const mockProjectsCreate = projectsAPI.create as jest.Mock;
const mockProjectsUpdate = projectsAPI.update as jest.Mock;
const mockProjectsDelete = (projectsAPI as any).delete as jest.Mock;
const mockSkillsList = skillsAPI.list as jest.Mock;
const mockSkillsCreate = skillsAPI.create as jest.Mock;
const mockSkillsUpdate = skillsAPI.update as jest.Mock;
const mockSkillsDelete = (skillsAPI as any).delete as jest.Mock;
const mockCertsList = certificatesAPI.list as jest.Mock;
const mockCertsCreate = certificatesAPI.create as jest.Mock;
const mockCertsDelete = (certificatesAPI as any).delete as jest.Mock;

describe("useAppStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Reset store state
    useAppStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      theme: "light",
      sidebarOpen: true,
      projects: [],
      skills: [],
      certificates: [],
    });
  });

  // ============ Initial State ============
  describe("initial state", () => {
    it("should have correct default values", () => {
      const state = useAppStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.theme).toBe("light");
      expect(state.sidebarOpen).toBe(true);
      expect(state.projects).toEqual([]);
      expect(state.skills).toEqual([]);
      expect(state.certificates).toEqual([]);
    });
  });

  // ============ Auth ============
  describe("login", () => {
    it("should set user and token on successful login", async () => {
      const mockUser = { id: "1", name: "Test", email: "t@t.com" };
      mockAuthLogin.mockResolvedValue({ token: "jwt-token", user: mockUser });

      await useAppStore.getState().login("t@t.com", "pass");

      const state = useAppStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("karya_token", "jwt-token");
    });

    it("should set error and throw on failed login", async () => {
      mockAuthLogin.mockRejectedValue(new Error("Invalid credentials"));

      await expect(
        useAppStore.getState().login("bad@t.com", "wrong")
      ).rejects.toThrow("Invalid credentials");

      const state = useAppStore.getState();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe("Invalid credentials");
    });

    it("should set isLoading to true during login", async () => {
      let resolveLogin!: (value: unknown) => void;
      mockAuthLogin.mockReturnValue(
        new Promise((resolve) => { resolveLogin = resolve; })
      );

      const loginPromise = useAppStore.getState().login("t@t.com", "pass");
      expect(useAppStore.getState().isLoading).toBe(true);

      resolveLogin({ token: "t", user: { id: "1" } });
      await loginPromise;
      expect(useAppStore.getState().isLoading).toBe(false);
    });
  });

  describe("register", () => {
    it("should set user and token on successful registration", async () => {
      const mockUser = { id: "2", name: "New", email: "new@t.com" };
      mockAuthRegister.mockResolvedValue({ token: "reg-token", user: mockUser });

      await useAppStore.getState().register("New", "new@t.com", "pass123");

      const state = useAppStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("karya_token", "reg-token");
    });

    it("should set error and throw on failed registration", async () => {
      mockAuthRegister.mockRejectedValue(new Error("Email taken"));

      await expect(
        useAppStore.getState().register("X", "x@x.com", "pass")
      ).rejects.toThrow("Email taken");

      expect(useAppStore.getState().error).toBe("Email taken");
    });
  });

  describe("logout", () => {
    it("should clear user state and token", () => {
      useAppStore.setState({
        user: { id: "1" } as any,
        isAuthenticated: true,
        projects: [{ id: "p1" }] as any,
        skills: [{ id: "s1" }] as any,
        certificates: [{ id: "c1" }] as any,
      });

      useAppStore.getState().logout();

      const state = useAppStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.projects).toEqual([]);
      expect(state.skills).toEqual([]);
      expect(state.certificates).toEqual([]);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("karya_token");
    });
  });

  describe("loadUser", () => {
    it("should do nothing if no token", async () => {
      await useAppStore.getState().loadUser();
      expect(mockProfileGet).not.toHaveBeenCalled();
    });

    it("should load user when token exists", async () => {
      localStorageMock.setItem("karya_token", "existing-token");
      const mockUser = { id: "1", name: "Loaded" };
      mockProfileGet.mockResolvedValue(mockUser);

      await useAppStore.getState().loadUser();

      expect(useAppStore.getState().user).toEqual(mockUser);
      expect(useAppStore.getState().isAuthenticated).toBe(true);
    });

    it("should clear auth when token is invalid", async () => {
      localStorageMock.setItem("karya_token", "bad-token");
      mockProfileGet.mockRejectedValue(new Error("Unauthorized"));

      await useAppStore.getState().loadUser();

      expect(useAppStore.getState().user).toBeNull();
      expect(useAppStore.getState().isAuthenticated).toBe(false);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("karya_token");
    });
  });

  // ============ Theme ============
  describe("toggleTheme", () => {
    it("should toggle from light to dark", () => {
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe("dark");
    });

    it("should toggle from dark to light", () => {
      useAppStore.setState({ theme: "dark" });
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe("light");
    });
  });

  // ============ Sidebar ============
  describe("toggleSidebar", () => {
    it("should toggle sidebar state", () => {
      expect(useAppStore.getState().sidebarOpen).toBe(true);
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(false);
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(true);
    });
  });

  // ============ Projects ============
  describe("projects", () => {
    it("loadProjects should fetch and set projects", async () => {
      const projects = [{ id: "p1", title: "P1" }];
      mockProjectsList.mockResolvedValue(projects);

      await useAppStore.getState().loadProjects();
      expect(useAppStore.getState().projects).toEqual(projects);
    });

    it("addProject should create and append project", async () => {
      const newProject = { id: "p2", title: "P2" };
      mockProjectsCreate.mockResolvedValue(newProject);

      await useAppStore.getState().addProject({
        title: "P2",
        description: "Desc",
        imageUrl: "",
        githubUrl: "",
        liveUrl: "",
        tags: [],
      });

      expect(useAppStore.getState().projects).toContainEqual(newProject);
    });

    it("updateProject should update project in list", async () => {
      useAppStore.setState({ projects: [{ id: "p1", title: "Old" }] as any });
      mockProjectsUpdate.mockResolvedValue({ id: "p1", title: "New" });

      await useAppStore.getState().updateProject("p1", { title: "New" } as any);
      expect(useAppStore.getState().projects[0].title).toBe("New");
    });

    it("deleteProject should remove project from list", async () => {
      useAppStore.setState({
        projects: [{ id: "p1" }, { id: "p2" }] as any,
      });
      mockProjectsDelete.mockResolvedValue({});

      await useAppStore.getState().deleteProject("p1");
      expect(useAppStore.getState().projects).toHaveLength(1);
      expect(useAppStore.getState().projects[0].id).toBe("p2");
    });

    it("addProject should set error and throw on failure", async () => {
      mockProjectsCreate.mockRejectedValue(new Error("Create failed"));

      await expect(
        useAppStore.getState().addProject({ title: "X", description: "Y", imageUrl: "", githubUrl: "", liveUrl: "", tags: [] })
      ).rejects.toThrow("Create failed");

      expect(useAppStore.getState().error).toBe("Create failed");
    });
  });

  // ============ Skills ============
  describe("skills", () => {
    it("loadSkills should fetch and set skills", async () => {
      const skills = [{ id: "s1", name: "React" }];
      mockSkillsList.mockResolvedValue(skills);

      await useAppStore.getState().loadSkills();
      expect(useAppStore.getState().skills).toEqual(skills);
    });

    it("addSkill should create and append skill", async () => {
      const newSkill = { id: "s2", name: "TypeScript" };
      mockSkillsCreate.mockResolvedValue(newSkill);

      await useAppStore.getState().addSkill({
        name: "TypeScript",
        level: "Expert",
        category: "Language",
      });
      expect(useAppStore.getState().skills).toContainEqual(newSkill);
    });

    it("updateSkill should update skill in list", async () => {
      useAppStore.setState({ skills: [{ id: "s1", name: "React" }] as any });
      mockSkillsUpdate.mockResolvedValue({ id: "s1", name: "React.js" });

      await useAppStore.getState().updateSkill("s1", { name: "React.js" });
      expect(useAppStore.getState().skills[0].name).toBe("React.js");
    });

    it("deleteSkill should remove skill from list", async () => {
      useAppStore.setState({ skills: [{ id: "s1" }, { id: "s2" }] as any });
      mockSkillsDelete.mockResolvedValue({});

      await useAppStore.getState().deleteSkill("s1");
      expect(useAppStore.getState().skills).toHaveLength(1);
    });
  });

  // ============ Certificates ============
  describe("certificates", () => {
    it("loadCertificates should fetch and set certificates", async () => {
      const certs = [{ id: "c1", name: "AWS" }];
      mockCertsList.mockResolvedValue(certs);

      await useAppStore.getState().loadCertificates();
      expect(useAppStore.getState().certificates).toEqual(certs);
    });

    it("addCertificate should create and append certificate", async () => {
      const newCert = { id: "c2", name: "GCP" };
      mockCertsCreate.mockResolvedValue(newCert);

      await useAppStore.getState().addCertificate({
        name: "GCP",
        issuer: "Google",
        date: "2024-01-01",
        description: "Cloud",
      });
      expect(useAppStore.getState().certificates).toContainEqual(newCert);
    });

    it("deleteCertificate should remove certificate from list", async () => {
      useAppStore.setState({ certificates: [{ id: "c1" }, { id: "c2" }] as any });
      mockCertsDelete.mockResolvedValue({});

      await useAppStore.getState().deleteCertificate("c1");
      expect(useAppStore.getState().certificates).toHaveLength(1);
    });
  });
});
