import api from "@/app/lib/api/axios";
import { AdminActivityItem, ActivityRequest } from "@/app/lib/types/activity";

const ADMIN_ACTIVITY_URL = "/admin/activities";
const PUBLIC_UPLOAD_URL = "/public/upload"; // আপলোড এন্ডপয়েন্ট

export const adminActivityService = {
  getAll: () => api.get<{ data: AdminActivityItem[] }>(ADMIN_ACTIVITY_URL),
  
  getById: (id: number) => api.get<{ data: AdminActivityItem }>(`${ADMIN_ACTIVITY_URL}/${id}`),
  
  create: (data: ActivityRequest) => api.post(ADMIN_ACTIVITY_URL, data),
  
  update: (id: number, data: ActivityRequest) => api.put(`${ADMIN_ACTIVITY_URL}/${id}`, data),
  
  delete: (id: number) => api.delete(`${ADMIN_ACTIVITY_URL}/${id}`),
  
  toggleStatus: (id: number) => api.put(`${ADMIN_ACTIVITY_URL}/${id}/toggle-status`),

  // --- নতুন ফাইল আপলোড ফাংশন ---
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(PUBLIC_UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};