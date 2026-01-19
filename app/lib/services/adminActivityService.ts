import api from "@/app/lib/api/axios";
import { AdminActivityItem, ActivityRequest } from "@/app/lib/types/activity";

const ADMIN_ACTIVITY_URL = "/admin/activities";

export const adminActivityService = {
  getAll: () => api.get<{ data: AdminActivityItem[] }>(ADMIN_ACTIVITY_URL),
  getById: (id: number) => api.get<{ data: AdminActivityItem }>(`${ADMIN_ACTIVITY_URL}/${id}`),
  create: (data: ActivityRequest) => api.post(ADMIN_ACTIVITY_URL, data),
  update: (id: number, data: ActivityRequest) => api.put(`${ADMIN_ACTIVITY_URL}/${id}`, data),
  delete: (id: number) => api.delete(`${ADMIN_ACTIVITY_URL}/${id}`),
  toggleStatus: (id: number) => api.put(`${ADMIN_ACTIVITY_URL}/${id}/toggle-status`),
};