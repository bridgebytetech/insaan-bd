import api from "@/app/lib/api/axios"; // আপনার দেওয়া axios কনফিগ ফাইলের পাথ দিন

const BASE_URL = "/admin/orphans";
const adminOrphanAdminService = {
  // সব শিশুদের লিস্ট আনা
  getAll: async () => {
    const response = await api.get(`${BASE_URL}`);
    return response.data;
  },

  // নির্দিষ্ট আইডির শিশুর তথ্য আনা
  getById: async (id: number) => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // পেন্ডিং শিশুদের লিস্ট
  getPending: async () => {
    const response = await api.get(`${BASE_URL}/pending`);
    return response.data;
  },

  // অ্যাপ্রুভড শিশুদের লিস্ট
  getApproved: async () => {
    const response = await api.get(`${BASE_URL}/approved`);
    return response.data;
  },

  // সার্চ ফাংশনালিটি
  search: async (keyword: string) => {
    const response = await api.get(`${BASE_URL}/search?keyword=${keyword}`);
    return response.data;
  },

  // নতুন শিশু যোগ করা
  create: async (data: any) => {
    const response = await api.post(`${BASE_URL}`, data);
    return response.data;
  },

  // তথ্য আপডেট করা
  update: async (id: number, data: any) => {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // ডিলিট করা
  delete: async (id: number) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  },

  // অ্যাপ্রুভ করা
  approve: async (id: number) => {
    const response = await api.put(`${BASE_URL}/${id}/approve`);
    return response.data;
  },

  // রিজেক্ট করা
  reject: async (id: number) => {
    const response = await api.put(`${BASE_URL}/${id}/reject`);
    return response.data;
  },

  // ফাইল আপলোড (DP/Documents)
  uploadFile: async (formData: FormData) => {
    const response = await api.post("/public/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
};


export default adminOrphanAdminService;