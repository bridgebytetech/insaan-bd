import api from "@/app/lib/api/donorApi"; // আপনার ডোনর এক্সিওস ইনস্ট্যান্স
import axios from "axios";

const donorProfileService = {
  /**
   * ১. ডোনার প্রোফাইল ডাটা গেট করা
   * Endpoint: GET /api/donor/profile
   */
  getProfile: async () => {
    try {
      const response = await api.get("/donor/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  /**
   * ২. প্রোফাইল তথ্য আপডেট
   */
 // আপনার দেওয়া এন্ডপয়েন্ট অনুযায়ী আপডেট
  updateProfile: async (updateData: { 
    donorName: string; 
    donorContact: string; 
    donorAddress: string; 
    donorMessage?: string;
    preferredSupportType?: string;
    donorDpUrl?: string;
    organizationName?: string;
    organizationRegistrationNo?: string;
  }) => {
    try {
      const response = await api.put("/donor/profile", updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // পাসওয়ার্ড পরিবর্তনের এন্ডপয়েন্ট (যদি থাকে)// --- Forgot Password Flow ---
  forgotPassword: async (email: string) => {
    const response = await axios.post("https://api.insaanbd.org/api/auth/forgot-password", {
      email,
      role: "DONOR" // আপনার এন্ডপয়েন্ট অনুযায়ী
    });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await axios.post("https://api.insaanbd.org/api/auth/forgot-password/verify-otp", {
      email,
      otp
    });
    return response.data;
  },
  /**
   * ৩. ফাইল আপলোড (পাবলিক এন্ডপয়েন্ট)
   */
  uploadDp: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("https://api.insaanbd.org/api/public/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  /**
   * ৪. শিশুদের সার্চ এবং ফিল্টার (পাবলিক এন্ডপয়েন্ট)
   */
  searchOrphans: async (params: {
    keyword?: string;
    gender?: string | null;
    minAge?: number;
    maxAge?: number;
    isConnected?: boolean;
    page?: number;
    size?: number;
  }) => {
    try {
      const response = await axios.post("https://api.insaanbd.org/api/public/orphans/search", params);
      return response.data;
    } catch (error) {
      console.error("Error searching orphans:", error);
      throw error;
    }
  },

  /**
   * ৫. স্পন্সরশিপের জন্য কানেকশন রিকোয়েস্ট পাঠানো
   * Endpoint: POST /api/donor/connect
   */
  connectOrphan: async (data: { orphanId: number; requestMessage: string }) => {
    try {
      const response = await api.post("/donor/connect", data);
      return response.data;
    } catch (error) {
      console.error("Error connecting orphan:", error);
      throw error;
    }
  },

  /**
   * ৬. বর্তমানে কানেক্টেড শিশুদের তালিকা দেখা
   * Endpoint: GET /api/donor/connections/active
   */
  getActiveConnections: async () => {
    try {
      const response = await api.get("/donor/connections/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching connections:", error);
      throw error;
    }
  },

  /**
   * ৭. নির্দিষ্ট একটি শিশুর বিস্তারিত তথ্য দেখা (নতুন যোগ করা হয়েছে)
   * Endpoint: GET /api/donor/orphans/{orphanId}
   */
  getOrphanDetails: async (orphanId: number) => {
    try {
      const response = await api.get(`/donor/orphans/${orphanId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orphan details:", error);
      throw error;
    }
  },

  /**
   * ৮. ডোনেশন হিস্ট্রি দেখা
   * Endpoint: GET /api/donor/donations
   */
  getDonations: async () => {
    try {
      const response = await api.get("/donor/donations");
      return response.data;
    } catch (error) {
      console.error("Error fetching donations:", error);
      throw error;
    }
  },

  /**
   * ৯. কানেকশন ডিসকানেক্ট করা
   */
  disconnectOrphan: async (data: { connectionId: number; disconnectReason: string }) => {
    try {
      const response = await api.post("/donor/disconnect", data);
      return response.data;
    } catch (error) {
      console.error("Error disconnecting:", error);
      throw error;
    }
  },

  /**
   * ১০. পাসওয়ার্ড পরিবর্তন
   */
  changePassword: async (passwordData: any) => {
    try {
      const response = await api.post("/donor/change-password", passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * ১১. সকল এতিম শিশুদের তালিকা আনা (পাবলিক)
   * Endpoint: GET /api/public/orphans
   */
  getAvailableOrphans: async () => {
    try {
      const response = await axios.get("https://api.insaanbd.org/api/public/orphans");
      return response.data;
    } catch (error) {
      console.error("Error fetching all orphans:", error);
      throw error;
    }
  },

  // donorProfileService.ts এ যোগ করুন
makeDonation: async (donationData: any) => {
  try {
    const response = await api.post("/donor/donations", donationData);
    return response.data;
  } catch (error) {
    console.error("Error making donation:", error);
    throw error;
  }
},
  
};

export default donorProfileService;