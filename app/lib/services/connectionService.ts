import api from '@/app/lib/api/axios';

export const connectionService = {
  getAll: () => api.get('/admin/connections').then(res => res.data),
  getPending: () => api.get('/admin/connections/pending').then(res => res.data),
  getActive: () => api.get('/admin/connections/active').then(res => res.data),
  getDisconnectRequests: () => api.get('/admin/connections/disconnect-requests').then(res => res.data),
  getById: (id: number) => api.get(`/admin/connections/${id}`).then(res => res.data),
  
  // Actions for New Requests
  approve: (data: { connectionId: number, approvalNotes: string }) => 
    api.post('/admin/connections/approve', data).then(res => res.data),
  reject: (data: { connectionId: number, approvalNotes: string }) => 
    api.post('/admin/connections/reject', data).then(res => res.data),

  // Actions for Disconnect Requests
  approveDisconnect: (data: { connectionId: number, approvalNotes: string }) => 
    api.post('/admin/connections/approve-disconnect', data).then(res => res.data),
  rejectDisconnect: (data: { connectionId: number, approvalNotes: string }) => 
    api.post('/admin/connections/reject-disconnect', data).then(res => res.data),
};