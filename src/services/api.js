// src/services/api.js
// Client API layer communicating strictly via HTTP REST API

const API_BASE = ""; // Relative path allows Vite dev proxy or same-origin deployment

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === "object") {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (err) {
    console.warn(`[API] Error on ${options.method || "GET"} ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // --- AUTH ---
  async login(email, password) {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    if (data.token) {
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));
    }
    return data;
  },

  async verifyAuth() {
    const token = localStorage.getItem("admin_token");
    if (!token) return null;
    try {
      const res = await request("/api/auth/verify");
      return res.user;
    } catch {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      return null;
    }
  },

  logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  },

  // --- BLOG POSTS ---
  async getPosts(includeAll = false) {
    return request(`/api/posts${includeAll ? "?all=true" : ""}`);
  },

  async getPostById(id) {
    return request(`/api/posts/${id}`);
  },

  async createPost(postData) {
    return request("/api/posts", {
      method: "POST",
      body: postData,
    });
  },

  async updatePost(id, postData) {
    return request(`/api/posts/${id}`, {
      method: "PUT",
      body: postData,
    });
  },

  async deletePost(id) {
    return request(`/api/posts/${id}`, {
      method: "DELETE",
    });
  },

  // --- PROJECTS ---
  async getProjects() {
    return request("/api/projects");
  },

  async getProjectById(id) {
    return request(`/api/projects/${id}`);
  },

  async createProject(projectData) {
    return request("/api/projects", {
      method: "POST",
      body: projectData,
    });
  },

  async updateProject(id, projectData) {
    return request(`/api/projects/${id}`, {
      method: "PUT",
      body: projectData,
    });
  },

  async deleteProject(id) {
    return request(`/api/projects/${id}`, {
      method: "DELETE",
    });
  },

  // --- ACTIVITIES ---
  async getActivities() {
    return request("/api/activities");
  },

  async createActivity(activityData) {
    return request("/api/activities", {
      method: "POST",
      body: activityData,
    });
  },

  async updateActivity(id, activityData) {
    return request(`/api/activities/${id}`, {
      method: "PUT",
      body: activityData,
    });
  },

  async deleteActivity(id) {
    return request(`/api/activities/${id}`, {
      method: "DELETE",
    });
  },

  // --- CONTACT ---
  async sendContact(formData) {
    return request("/api/contact", {
      method: "POST",
      body: formData,
    });
  },
};

export default api;
