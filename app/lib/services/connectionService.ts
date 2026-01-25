import api from '@/app/lib/api/axios';

export const connectionService = {
  // --- ডাটা ফেচিং মেথডসমূহ ---
  getAll: () => api.get('/admin/connections').then(res => res.data),
  
  getPending: () => api.get('/admin/connections/pending').then(res => res.data),
  
  getActive: () => api.get('/admin/connections/active').then(res => res.data),
  
  getDisconnectRequests: () => api.get('/admin/connections/disconnect-requests').then(res => res.data),
  
  getById: (id: number) => api.get(`/admin/connections/${id}`).then(res => res.data),

  // --- নতুন রিকোয়েস্ট হ্যান্ডলিং (Approve/Reject) ---
  approve: (data: { connectionId: number; approvalNotes: string }) => 
    api.post('/admin/connections/approve', data).then(res => res.data),

  reject: (data: { connectionId: number; approvalNotes: string }) => 
    api.post('/admin/connections/reject', data).then(res => res.data),

  // --- ডিসকানেক্ট রিকোয়েস্ট হ্যান্ডলিং ---
  approveDisconnect: (data: { connectionId: number; approvalNotes: string }) => 
    api.post('/admin/connections/approve-disconnect', data).then(res => res.data),

  rejectDisconnect: (data: { connectionId: number; approvalNotes: string }) => 
    api.post('/admin/connections/reject-disconnect', data).then(res => res.data),

  // --- ম্যানুয়াল কানেকশন (Admin initiated) ---
  /**
   * ম্যানুয়ালি কোনো ডোনার এবং এতিম শিশুকে কানেক্ট করতে এটি ব্যবহৃত হবে।
   * সাধারণত এটি 'approve' এন্ডপয়েন্টেই পাঠানো যায় যদি ব্যাকএন্ড সাপোর্ট করে, 
   * অথবা আপনার নির্দিষ্ট 'manual-connect' এন্ডপয়েন্ট থাকলে সেটি এখানে দিন।
   */
  // --- ম্যানুয়াল কানেকশন (Admin initiated) ---
createManualConnection: (data: { donorId: number; orphanId: number; approvalNotes: string }) => 
  api.post('/admin/connections/manual', data).then(res => res.data),

  // --- ভ্যালিডেশন মেথড (ম্যানুয়াল কানেকশনের সময় নাম চেক করার জন্য) ---
  validateDonor: (id: number) => 
    api.get(`/admin/donors/${id}`).then(res => res.data),

  validateOrphan: (id: number) => 
    api.get(`/admin/orphans/${id}`).then(res => res.data),
  // connectionService.ts এ যোগ করুন
terminateConnection: (id: number) => 
  api.delete(`/admin/connections/${id}`).then(res => res.data),
  
  
};