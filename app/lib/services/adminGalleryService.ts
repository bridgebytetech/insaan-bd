import api from "@/app/lib/api/axios";
import { AdminGalleryItem, GalleryRequest } from "@/app/lib/types/admin-gallery";

const ADMIN_GALLERY_URL = "/admin/gallery";

export const adminGalleryService = {
  // ১. সব ছবি দেখা
  getAll: () => api.get<{ data: AdminGalleryItem[] }>(ADMIN_GALLERY_URL),
  
  // ২. নির্দিষ্ট একটি ছবি দেখা
  getById: (id: number) => api.get<{ data: AdminGalleryItem }>(`${ADMIN_GALLERY_URL}/${id}`),
  
  // ৩. নতুন ছবি যোগ করা
  create: (data: GalleryRequest) => api.post(ADMIN_GALLERY_URL, data),
  
  // ৪. ছবি আপডেট করা
  update: (id: number, data: GalleryRequest) => api.put(`${ADMIN_GALLERY_URL}/${id}`, data),
  
  // ৫. ডিলিট করা
  delete: (id: number) => api.delete(`${ADMIN_GALLERY_URL}/${id}`),
  
  // ৬. একটিভ/ইনএকটিভ টগল করা
  toggleStatus: (id: number) => api.put(`${ADMIN_GALLERY_URL}/${id}/toggle-status`),
};