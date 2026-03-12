import { create } from "zustand";
import {
  authAPI,
  profileAPI,
  projectsAPI,
  skillsAPI,
  certificatesAPI,
} from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  role: "DEVELOPER" | "ADMIN" | "VIEWER";
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  impressions: number;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Projects
  projects: Project[];
  loadProjects: () => Promise<void>;
  addProject: (
    project: Omit<Project, "id" | "userId" | "createdAt" | "updatedAt" | "views" | "impressions">
  ) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Skills
  skills: Skill[];
  loadSkills: () => Promise<void>;
  addSkill: (skill: Omit<Skill, "id">) => Promise<void>;
  updateSkill: (id: string, data: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  // Certificates
  certificates: Certificate[];
  loadCertificates: () => Promise<void>;
  addCertificate: (cert: Omit<Certificate, "id">) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // User
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authAPI.login({ email, password });
      localStorage.setItem("karya_token", token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authAPI.register({ name, email, password });
      localStorage.setItem("karya_token", token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("karya_token");
    set({
      user: null,
      isAuthenticated: false,
      projects: [],
      skills: [],
      certificates: [],
    });
  },

  loadUser: async () => {
    const token = localStorage.getItem("karya_token");
    if (!token) return;

    try {
      const user = await profileAPI.get();
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem("karya_token");
      set({ user: null, isAuthenticated: false });
    }
  },

  // Theme
  theme: "light",
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
      return { theme: newTheme };
    });
  },

  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Projects
  projects: [],
  loadProjects: async () => {
    try {
      const projects = await projectsAPI.list();
      set({ projects });
    } catch (err) {
      console.error("Load projects error:", err);
    }
  },

  addProject: async (project) => {
    try {
      const created = await projectsAPI.create(project);
      set((state) => ({ projects: [...state.projects, created] }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  updateProject: async (id, data) => {
    try {
      const updated = await projectsAPI.update(id, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...updated } : p
        ),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteProject: async (id) => {
    try {
      await projectsAPI.delete(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  // Skills
  skills: [],
  loadSkills: async () => {
    try {
      const skills = await skillsAPI.list();
      set({ skills });
    } catch (err) {
      console.error("Load skills error:", err);
    }
  },

  addSkill: async (skill) => {
    try {
      const created = await skillsAPI.create(skill);
      set((state) => ({ skills: [...state.skills, created] }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  updateSkill: async (id, data) => {
    try {
      const updated = await skillsAPI.update(id, data);
      set((state) => ({
        skills: state.skills.map((s) => (s.id === id ? { ...s, ...updated } : s)),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteSkill: async (id) => {
    try {
      await skillsAPI.delete(id);
      set((state) => ({
        skills: state.skills.filter((s) => s.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  // Certificates
  certificates: [],
  loadCertificates: async () => {
    try {
      const certificates = await certificatesAPI.list();
      set({ certificates });
    } catch (err) {
      console.error("Load certificates error:", err);
    }
  },

  addCertificate: async (cert) => {
    try {
      const created = await certificatesAPI.create(cert);
      set((state) => ({ certificates: [...state.certificates, created] }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteCertificate: async (id) => {
    try {
      await certificatesAPI.delete(id);
      set((state) => ({
        certificates: state.certificates.filter((c) => c.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },
}));
