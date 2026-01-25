import api from "@/app/lib/api/donorApi";
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
   * ২. প্রোফাইল তথ্য আপডেট (Partial - যেকোনো field update করা যাবে)
   */
  updateProfile: async (updateData: Partial<{
    donorName: string;
    donorContact: string;
    donorAddress: string;
    donorMessage: string;
    preferredSupportType: string;
    donorDpUrl: string;
    organizationName: string;
    organizationRegistrationNo: string;
  }>) => {
    try {
      const response = await api.put("/donor/profile", updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * ৩. Forgot Password
   */
  forgotPassword: async (email: string) => {
    const response = await axios.post("https://api.insaanbd.org/api/auth/forgot-password", {
      email,
      role: "DONOR"
    });
    return response.data;
  },

  /**
   * ৪. Verify OTP
   */
  verifyOtp: async (email: string, otp: string) => {
    const response = await axios.post("https://api.insaanbd.org/api/auth/forgot-password/verify-otp", {
      email,
      otp
    });
    return response.data;
  },

  /**
   * ৫. ফাইল আপলোড (পাবলিক এন্ডপয়েন্ট)
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
   * ৬. শিশুদের সার্চ এবং ফিল্টার (পাবলিক এন্ডপয়েন্ট)
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
   * ৭. স্পন্সরশিপের জন্য কানেকশন রিকোয়েস্ট পাঠানো
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
   * ৮. বর্তমানে কানেক্টেড শিশুদের তালিকা দেখা
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
   * ৯. নির্দিষ্ট একটি শিশুর বিস্তারিত তথ্য দেখা
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
   * ১০. ডোনেশন হিস্ট্রি দেখা
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
   * ১১. কানেকশন ডিসকানেক্ট করা
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
   * ১২. পাসওয়ার্ড পরিবর্তন
   */
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.post("/donor/change-password", passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * ১৩. সকল এতিম শিশুদের তালিকা আনা (পাবলিক)
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

  /**
   * ১৪. ডোনেশন করা
   */
  makeDonation: async (donationData: {
    amount: number;
    orphanId?: number;
    donationType?: string;
    message?: string;
  }) => {
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