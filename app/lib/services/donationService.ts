import api from '@/app/lib/api/axios';

export const donationService = {
  getAll: () => api.get('/admin/donations').then(res => res.data),
  getPending: () => api.get('/admin/donations/pending').then(res => res.data),
  getVerified: () => api.get('/admin/donations/verified').then(res => res.data),
  getTotalAmount: () => api.get('/admin/donations/total').then(res => res.data),
  getById: (id: number) => api.get(`/admin/donations/${id}`).then(res => res.data),
  
  create: (donorId: number, data: any) => 
    api.post(`/admin/donations?donorId=${donorId}`, data).then(res => res.data),
  
  verify: (data: { donationId: number, verificationNotes: string }) => 
    api.post('/admin/donations/verify', data).then(res => res.data),
    
  reject: (data: { donationId: number, verificationNotes: string }) => 
    api.post('/admin/donations/reject', data).then(res => res.data),
    
  delete: (id: number) => api.delete(`/admin/donations/${id}`).then(res => res.data),

  getByDonor: (donorId: number) => api.get(`/admin/donations/donor/${donorId}`).then(res => res.data),
  getByOrphan: (orphanId: number) => api.get(`/admin/donations/orphan/${orphanId}`).then(res => res.data),
};