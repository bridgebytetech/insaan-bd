import donationsDataRaw from '@/app/lib/data/donations.json';
import { Donation, DonationType } from '@/app/lib/types';

const donations: Donation[] = donationsDataRaw.map(d => ({
  ...d,
  type: (d.type === 'monthly' ? 'monthly' : 'one-time') as DonationType,
}));

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const donationApi = {
  async getAll(): Promise<Donation[]> {
    await delay(300);
    return [...donations];
  },

  async getByDonor(donorId: string): Promise<Donation[]> {
    await delay(300);
    return donations.filter(d => d.donorId === donorId);
  },

  async getByOrphan(orphanId: string): Promise<Donation[]> {
    await delay(300);
    return donations.filter(d => d.orphanId === orphanId);
  },

  async create(donation: Omit<Donation, 'id' | 'date'>): Promise<Donation> {
    await delay(400);
    const newDonation: Donation = {
      ...donation,
      id: `txn-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    donations.push(newDonation);
    return newDonation;
  },

  async getTotalAmount(): Promise<number> {
    await delay(200);
    return donations.reduce((sum, d) => sum + d.amount, 0);
  },

  async getMonthlyRevenue(): Promise<number> {
    await delay(200);
    const thisMonth = new Date().toISOString().substring(0, 7);
    return donations
      .filter(d => d.date.startsWith(thisMonth))
      .reduce((sum, d) => sum + d.amount, 0);
  },
}
