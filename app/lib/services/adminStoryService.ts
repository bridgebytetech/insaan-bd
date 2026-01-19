import api from "@/app/lib/api/axios";

const ADMIN_STORY_URL = "/admin/stories"; // অ্যাক্টিভিটির মতো একই প্যাটার্ন

export const adminStoryService = {
  getAll: () => api.get(ADMIN_STORY_URL),
  getById: (id: number) => api.get(`${ADMIN_STORY_URL}/${id}`),
  create: (data: any) => api.post(ADMIN_STORY_URL, data),
  update: (id: number, data: any) => api.put(`${ADMIN_STORY_URL}/${id}`, data),
  delete: (id: number) => api.delete(`${ADMIN_STORY_URL}/${id}`),
  toggleStatus: (id: number) => api.put(`${ADMIN_STORY_URL}/${id}/toggle-status`),
  toggleFeatured: (id: number) => api.put(`${ADMIN_STORY_URL}/${id}/toggle-featured`),
};