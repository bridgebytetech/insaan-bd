import axios from "axios";

const BASE_URL = "https://api.insaanbd.org/api/public/orphans";

const publicOrphanService = {
  // সব শিশুদের তালিকা (অথবা সার্চ এপিআই ব্যবহার করা যেতে পারে)
  getAll: () => axios.get(`${BASE_URL}`),
  
  // শুধুমাত্র যাদের সাপোর্ট প্রয়োজন (isConnected: false)
  getAvailable: () => axios.get(`${BASE_URL}/available`),
  
  // নির্দিষ্ট শিশুর ডিটেইলস
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  
  // ফিল্টার এবং সার্চ করার জন্য
  search: (params: {
    keyword?: string;
    gender?: string;
    minAge?: number;
    maxAge?: number;
    isConnected?: boolean;
    page?: number;
    size?: number;
  }) => axios.post(`${BASE_URL}/search`, params)
};

export default publicOrphanService;