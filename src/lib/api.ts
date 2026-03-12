const API_BASE = "";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("karya_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// ============ Auth API ============

export const authAPI = {
  async register(data: { name: string; email: string; password: string; username?: string }) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<{ token: string; user: any }>(res);
  },

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<{ token: string; user: any }>(res);
  },
};

// ============ Profile API ============

export const profileAPI = {
  async get() {
    const res = await fetch(`${API_BASE}/api/profile`, {
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  },

  async update(data: {
    name?: string;
    bio?: string;
    username?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
  }) {
    const res = await fetch(`${API_BASE}/api/profile`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },
};

// ============ Projects API ============

export const projectsAPI = {
  async list() {
    const res = await fetch(`${API_BASE}/api/projects`, {
      headers: authHeaders(),
    });
    return handleResponse<any[]>(res);
  },

  async create(data: {
    title: string;
    description: string;
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    tags?: string[];
  }) {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async get(id: string) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  },

  async update(id: string, data: any) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  },
};

// ============ Skills API ============

export const skillsAPI = {
  async list() {
    const res = await fetch(`${API_BASE}/api/skills`, {
      headers: authHeaders(),
    });
    return handleResponse<any[]>(res);
  },

  async create(data: { name: string; level: string; category: string }) {
    const res = await fetch(`${API_BASE}/api/skills`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async update(id: string, data: { name?: string; level?: string; category?: string }) {
    const res = await fetch(`${API_BASE}/api/skills/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE}/api/skills/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  },
};

// ============ Certificates API ============

export const certificatesAPI = {
  async list() {
    const res = await fetch(`${API_BASE}/api/certificates`, {
      headers: authHeaders(),
    });
    return handleResponse<any[]>(res);
  },

  async create(data: {
    name: string;
    issuer: string;
    date: string;
    description?: string;
    url?: string;
  }) {
    const res = await fetch(`${API_BASE}/api/certificates`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE}/api/certificates/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  },
};

// ============ Analytics API ============

export const analyticsAPI = {
  async get() {
    const res = await fetch(`${API_BASE}/api/analytics`, {
      headers: authHeaders(),
    });
    return handleResponse<{
      monthly: { date: string; views: number; impressions: number; interactions: number }[];
      projects: { id: string; title: string; views: number; impressions: number }[];
      totals: { views: number; impressions: number; interactions: number };
    }>(res);
  },
};

// ============ Public API ============

export const publicAPI = {
  async getProfile(username: string) {
    const res = await fetch(`${API_BASE}/api/public/users/${username}`);
    return handleResponse<{
      user: any;
      skills: any[];
      certificates: any[];
    }>(res);
  },

  async getProjects(username: string) {
    const res = await fetch(`${API_BASE}/api/public/users/${username}/projects`);
    return handleResponse<any[]>(res);
  },

  async searchDevelopers(q?: string) {
    const url = q
      ? `${API_BASE}/api/public/search/developers?q=${encodeURIComponent(q)}`
      : `${API_BASE}/api/public/search/developers`;
    const res = await fetch(url);
    return handleResponse<any[]>(res);
  },
};
