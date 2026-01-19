import api from '@/app/lib/api/axios';

export const donorService = {
  // ১. রেজিস্ট্রেশন
  registerDonor: async (data: any) => {
    // ব্যাকএন্ড স্কিমা অনুযায়ী ম্যাপিং
    const payload = {
      ...data,
      donorMessage: "New Registration",
      typeOfSupport: "GENERAL" 
    };
    const response = await api.post('/auth/donor/register', payload);
    return response.data;
  },

  // ২. ওটিপি ভেরিফাই
  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/auth/donor/verify-otp', { email, otp });
    return response.data;
  },

  // ৩. ওটিপি রিসেন্ড
  resendOtp: async (email: string) => {
    const response = await api.post('/auth/donor/resend-otp', { email });
    return response.data;
  },

  // ৪. লগইন
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // --- Admin Methods ---
  getAllDonors: async () => (await api.get('/admin/donors')).data,
  approveDonor: async (id: number) => (await api.put(`/admin/donors/${id}/approve`)).data,
  deleteDonor: async (id: number) => (await api.delete(`/admin/donors/${id}`)).data,
};