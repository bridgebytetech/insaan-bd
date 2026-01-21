import axios from 'axios';

const api = axios.create({
  // baseURL সবসময় পরিবেশ ভেরিয়েবল (env) থেকে আসা ভালো, তবে হার্ডকোড করলে পূর্ণাঙ্গ URL দিন
  baseURL: 'https://api.insaanbd.org/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // modern node compatibility এর জন্য এটি যোগ করা ভালো
});

// রিকোয়েস্ট ইন্টারসেপ্টর
api.interceptors.request.use(
  (config) => {
    // ব্রাউজার এনভায়রনমেন্ট চেক
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// রেসপন্স ইন্টারসেপ্টর
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি আন-অথরাইজড (401) হয়
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // ক্লিনআপ
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // লগইন পেজে পাঠানোর আগে চেক করুন আপনি অলরেডি লগইন পেজে আছেন কিনা
        // না হলে ইনফিনিট লুপ হতে পারে
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;