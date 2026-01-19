import orphansDataRaw from '@/app/lib/data/orphans.json';
import { Orphan, OrphanStatus } from '@/app/lib/types';

const orphans: Orphan[] = orphansDataRaw.map(o => ({
  ...o,
  gender: o.gender === 'male' ? 'male' : 'female',  // ensures valid literal type
  status: o.status === 'approved' ? 'approved' 
         : o.status === 'rejected' ? 'rejected' 
         : 'pending',  // fallback
}));
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const orphanApi = {
  // Get all orphans (admin view)
  async getAll(): Promise<Orphan[]> {
    await delay(300);
    return [...orphans];
  },

  // Get approved orphans only (public view)
  async getApproved(): Promise<Orphan[]> {
    await delay(300);
    return orphans.filter(o => o.status === 'approved');
  },

  // Get orphan by ID
  async getById(id: string): Promise<Orphan | null> {
    await delay(200);
    return orphans.find(o => o.id === id) || null;
  },

  // Get orphans by status
  async getByStatus(status: OrphanStatus): Promise<Orphan[]> {
    await delay(300);
    return orphans.filter(o => o.status === status);
  },

  // Create new orphan
  async create(orphan: Omit<Orphan, 'id' | 'dateSubmitted'>): Promise<Orphan> {
    await delay(500);
    const newOrphan: Orphan = {
      ...orphan,
      id: `orp-${Date.now()}`,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'pending', // Always start as pending
    };
    orphans.push(newOrphan);
    return newOrphan;
  },

  // Update orphan
  async update(id: string, updates: Partial<Orphan>): Promise<Orphan | null> {
    await delay(400);
    const index = orphans.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    orphans[index] = { ...orphans[index], ...updates };
    return orphans[index];
  },

  // Update orphan status (approve/reject)
  async updateStatus(id: string, status: OrphanStatus): Promise<Orphan | null> {
    await delay(400);
    return this.update(id, { status });
  },

  // Delete orphan
  async delete(id: string): Promise<boolean> {
    await delay(400);
    const index = orphans.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    orphans.splice(index, 1);
    return true;
  },

  // Get statistics
  async getStats() {
    await delay(200);
    return {
      total: orphans.length,
      approved: orphans.filter(o => o.status === 'approved').length,
      pending: orphans.filter(o => o.status === 'pending').length,
      rejected: orphans.filter(o => o.status === 'rejected').length,
    };
  },

  // Search orphans
  async search(query: string): Promise<Orphan[]> {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return orphans.filter(o => 
      o.name.toLowerCase().includes(lowerQuery) ||
      o.location.toLowerCase().includes(lowerQuery) ||
      o.story.toLowerCase().includes(lowerQuery)
    );
  },
};

// Export for easy Spring Boot API integration later
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Future Spring Boot integration:
// Replace the mock functions above with:
/*
export const orphanApi = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/orphans`);
    return res.json();
  },
  async getApproved() {
    const res = await fetch(`${API_BASE_URL}/orphans?status=approved`);
    return res.json();
  },
  // ... etc
};
*/