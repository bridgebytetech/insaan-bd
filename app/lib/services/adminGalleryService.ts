import api from "@/app/lib/api/axios";
import { AdminGalleryItem, GalleryRequest } from "@/app/lib/types/admin-gallery";

const ADMIN_GALLERY_URL = "/admin/gallery";

export const adminGalleryService = {
  getAll: () => api.get<{ data: AdminGalleryItem[] }>(ADMIN_GALLERY_URL),
  getById: (id: number) => api.get<{ data: AdminGalleryItem }>(`${ADMIN_GALLERY_URL}/${id}`),
  create: (data: GalleryRequest) => api.post(ADMIN_GALLERY_URL, data),
  update: (id: number, data: GalleryRequest) => api.put(`${ADMIN_GALLERY_URL}/${id}`, data),
  delete: (id: number) => api.delete(`${ADMIN_GALLERY_URL}/${id}`),
  toggleStatus: (id: number) => api.put(`${ADMIN_GALLERY_URL}/${id}/toggle-status`),

  // ফাইলের পূর্ণাঙ্গ URL পাওয়ার জন্য এই মেথডটি ব্যবহার করবেন
  getFileUrl: (filename: string) => {
    if (!filename) return "";
    if (filename.startsWith('http')) return filename; // যদি অলরেডি ফুল লিঙ্ক থাকে
    return `${ADMIN_GALLERY_URL}/api/public/files/${filename}`;
  },
  // নতুন ফাইল আপলোড মেথড
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    // নোট: আপনার এন্ডপয়েন্ট অনুযায়ী বেস URL এবং পাথ সেট করা হয়েছে
    return api.post("/public/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};