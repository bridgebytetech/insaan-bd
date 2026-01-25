import api from '@/app/lib/api/axios'; // আপনার তৈরি করা মেইন এপিআই ফাইলটি ইমপোর্ট করুন

const publicDonationService = {
  /**
   * সব পাবলিক অনুদান সংগ্রহ করা (ফিল্টার সহ)
   * GET /api/admin/public-donations?status=PENDING
   */
  getAll: async (status = "PENDING") => {
    try {
      const response = await api.get(`/admin/public-donations`, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * অনুদানের স্ট্যাটাস আপডেট করা (VERIFIED/REJECTED)
   * PUT /api/admin/public-donations/{id}/status?status=VERIFIED
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/admin/public-donations/${id}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * অনুদান ডিলিট করা
   * DELETE /api/admin/public-donations/{id}
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/admin/public-donations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default publicDonationService;