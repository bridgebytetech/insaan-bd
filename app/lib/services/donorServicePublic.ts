// import api from "@/app/lib/api/axios"; // আপনার axios ফাইলটির সঠিক পাথ

// const donorServicePublic = {
//   // ১. ডোনার রেজিস্ট্রেশন
//   registerDonor: async (data: any) => {
//     const response = await api.post("/auth/donor/register", data);
//     return response.data;
//   },

//   // ২. OTP ভেরিফিকেশন
//   verifyOtp: async (email: string, otp: string) => {
//     const response = await api.post("/auth/donor/verify-otp", { email, otp });
//     return response.data;
//   },

//   // ৩. পুনরায় OTP পাঠানো
//   resendOtp: async (email: string) => {
//     const response = await api.post("/auth/donor/resend-otp", { email });
//     return response.data;
//   },

//   // ৪. লগইন (এটি আপনার ফাইলে মিসিং ছিল)
//   login: async (credentials: any) => {
//     const response = await api.post("/auth/login", credentials);
//     return response.data;
//   }
// };

// export default donorServicePublic;

import api from "@/app/lib/api/donorApi"; // আপনার নতুন ডোনর এক্সিওস ফাইলটি ব্যবহার করুন

const donorServicePublic = {
  // --- ১. পাবলিক মেথডস (আপনার আগের গুলো) ---
  registerDonor: async (data: any) => {
    const response = await api.post("/auth/donor/register", data);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post("/auth/donor/verify-otp", { email, otp });
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await api.post("/auth/donor/resend-otp", { email });
    return response.data;
  },

  login: async (credentials: any) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // --- ২. প্রাইভেট মেথডস (নতুন যা লাগবে) ---
  
  // প্রোফাইল তথ্য আনা
  getProfile: () => api.get('/donor/profile'),

  // এতিমদের তালিকা দেখা (Phase 1)
  getAvailableOrphans: () => api.get('/public/orphans/available'),

  // স্পনসর রিকোয়েস্ট পাঠানো (Phase 2)
  connectOrphan: (orphanId: number) => 
    api.post('/donor/connect', { orphanId, requestMessage: "I want to sponsor this child." }),

  // এক্টিভ কানেকশন দেখা (যাদের টাকা দেওয়া যাবে - Phase 3)
  getActiveConnections: () => api.get('/donor/connections/active'),

  // অনুদান সাবমিট করা (Phase 3)
  submitDonation: (donationData: any) => api.post('/donor/donations', donationData),

  // ভেরিফাইড অনুদান ইতিহাস দেখা (Phase 4)
  getVerifiedDonations: () => api.get('/donor/donations/verified'),
};

export default donorServicePublic;