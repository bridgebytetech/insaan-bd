import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.insaanbd.org/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// রিকোয়েস্ট ইন্টারসেপ্টর
api.interceptors.request.use((config) => {
  // নিশ্চিত করা হচ্ছে যে কোডটি ব্রাউজারে রান করছে (Server-side rendering safe)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token'); // নাম খেয়াল করুন: access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// রেসপন্স ইন্টারসেপ্টর
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // ইউজারকে সরাসরি লগইন পেজে পাঠিয়ে দেওয়া
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;