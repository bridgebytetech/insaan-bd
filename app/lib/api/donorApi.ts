import axios from 'axios';

const donorApi = axios.create({
  baseURL: 'https://api.insaanbd.org/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// রিকোয়েস্ট ইন্টারসেপ্টর
donorApi.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // ডোনরদের জন্য আমরা আলাদা কি 'accessToken' ব্যবহার করছি
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// রেসপন্স ইন্টারসেপ্টর
donorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        // ডোনরদের লগইন পেজে পাঠাবে
        if (!window.location.pathname.includes('/donors/login')) {
          window.location.href = '/donors/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default donorApi;