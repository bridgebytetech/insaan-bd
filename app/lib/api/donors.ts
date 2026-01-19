import donorsDataRaw from '@/app/lib/data/donors.json';
import { Donor, DonorStatus } from '@/app/lib/types';

const donors: Donor[] = donorsDataRaw.map(d => ({
  ...d,
  status: (d.status === 'active' ? 'active' : 'inactive') as DonorStatus,
}));

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const donorApi = {
  async getAll(): Promise<Donor[]> {
    await delay(300);
    return [...donors];
  },

  async getById(id: string): Promise<Donor | null> {
    await delay(200);
    return donors.find(d => d.id === id) || null;
  },

  async getActive(): Promise<Donor[]> {
    await delay(300);
    return donors.filter(d => d.status === 'active');
  },

  async create(donor: Omit<Donor, 'id' | 'dateJoined' | 'totalDonations'>): Promise<Donor> {
    await delay(400);
    const newDonor: Donor = {
      ...donor,
      id: `don-${Date.now()}`,
      dateJoined: new Date().toISOString().split('T')[0],
      totalDonations: 0,
    };
    donors.push(newDonor);
    return newDonor;
  },

  async updateStatus(id: string, status: DonorStatus): Promise<Donor | null> {
    await delay(400);
    const index = donors.findIndex(d => d.id === id);
    if (index === -1) return null;
    donors[index].status = status;
    return donors[index];
  },

  async getStats() {
    await delay(200);
    return {
      total: donors.length,
      active: donors.filter(d => d.status === 'active').length,
      inactive: donors.filter(d => d.status === 'inactive').length,
    };
  },
};