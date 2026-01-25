import axios from "axios";
import api from "@/app/lib/api/axios";

const BASE_URL = "https://api.insaanbd.org/api";

export const storyService = {
  // 🔹 Get all stories
  getAllStories: async () => {
    const res = await api.get("/admin/stories");
    return res.data;
  },

  // 🔹 Create story (using fetch instead of axios)
  createStory: async (payload: any) => {
    const token = localStorage.getItem("access_token");
    
    const response = await fetch(`${BASE_URL}/admin/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 🔹 Update story (using fetch)
  updateStory: async (id: number, payload: any) => {
    const token = localStorage.getItem("access_token");
    
    const response = await fetch(`${BASE_URL}/admin/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 🔹 Delete story
  deleteStory: async (id: number) => {
    const res = await api.delete(`/admin/stories/${id}`);
    return res.data;
  },

  // 🔹 Toggle publish
  toggleStatus: async (id: number) => {
    const res = await api.put(`/admin/stories/${id}/toggle-status`);
    return res.data;
  },

  // 🔹 Toggle featured
  toggleFeatured: async (id: number) => {
    const res = await api.put(`/admin/stories/${id}/toggle-featured`);
    return res.data;
  },

  // 🔹 Upload image
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("access_token");

    const res = await axios.post(
      `${BASE_URL}/public/upload`,
      formData,
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return res.data;
  }
};