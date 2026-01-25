import api from "@/app/lib/api/donorApi";
import axios from "axios";

const donorProfileService = {
  /**
   * ১. ডোনার প্রোফাইল ডাটা গেট করা
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
   * ৫. ফাইল আপলোড
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
   * ৬. শিশুদের সার্চ
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
   * ৭. কানেকশন রিকোয়েস্ট
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
   * ৮. একটিভ কানেকশন
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
   * ৯. শিশুর বিস্তারিত
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
   * ১০. ডোনেশন হিস্ট্রি
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
   * ১১. ডিসকানেক্ট
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
   * ১৩. সকল এতিম শিশু
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
   * ১৪. ডোনেশন করা - Fixed Type
   */
  makeDonation: async (donationData: {
    orphanId?: number;
    donationDate: string;
    donationAmount: number;
    donationDescription?: string;
    receiptUrl?: string;
    transactionId?: string;
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