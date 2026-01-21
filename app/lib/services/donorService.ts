import api from '@/app/lib/api/axios';

export const donorService = {
  // ১. সব ডোনার গেট করা
  getAllDonors: async () => {
    const res = await api.get('/admin/donors');
    return res.data;
  },

  // ২. পেন্ডিং ডোনার গেট করা
  getPendingDonors: async () => {
    const res = await api.get('/admin/donors/pending');
    return res.data;
  },

  // ৩. অ্যাপ্রুভড ডোনার গেট করা
  getApprovedDonors: async () => {
    const res = await api.get('/admin/donors/approved');
    return res.data;
  },

  // ৪. ম্যানুয়ালি নতুন ডোনার তৈরি করা (অ্যাডমিন প্যানেল থেকে)
  createDonor: async (data: any) => {
    const res = await api.post('/admin/donors', data);
    return res.data;
  },

  // ৫. আইডি দিয়ে ডোনার ডিটেইলস
  getDonorById: async (id: number) => {
    const res = await api.get(`/admin/donors/${id}`);
    return res.data;
  },

  // ৬. অ্যাপ্রুভ করা
  approveDonor: async (id: number) => {
    const res = await api.put(`/admin/donors/${id}/approve`);
    return res.data;
  },

  // ৭. রিজেক্ট করা
  rejectDonor: async (id: number) => {
    const res = await api.put(`/admin/donors/${id}/reject`);
    return res.data;
  },

  // ৮. স্ট্যাটাস টগল (অ্যাক্টিভ/ইনঅ্যাক্টিভ)
  toggleStatus: async (id: number) => {
    const res = await api.put(`/admin/donors/${id}/toggle-status`);
    return res.data;
  },

  // ৯. ডিলিট করা
  deleteDonor: async (id: number) => {
    const res = await api.delete(`/admin/donors/${id}`);
    return res.data;
  },

  // ১০. সার্চ করা
  searchDonors: async (keyword: string) => {
    const res = await api.get(`/admin/donors/search?keyword=${keyword}`);
    return res.data;
  },

  // লগইন ফাংশন (যদি আগে না থাকে)
  login: async (data: any) => {
    const res = await api.post('/donors/login', data);
    return res.data;
  }
};