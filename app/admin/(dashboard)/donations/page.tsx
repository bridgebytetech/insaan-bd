// ==========================================
// app/admin/donations/page.tsx
// ==========================================
'use client';
import { useState, useEffect } from 'react';
import { donationApi } from '@/app/lib/api/donations';
import { donorApi } from '@/app/lib/api/donors';
import { orphanApi } from '@/app/lib/api/orphans';
import { Donation } from '@/app/lib/types';
import { LoadingSpinner } from '@/app/components/shared/LoadingSpinner';

export default function DonationManagementPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [orphans, setOrphans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [donationsData, donorsData, orphansData] = await Promise.all([
      donationApi.getAll(),
      donorApi.getAll(),
      orphanApi.getAll(),
    ]);
    setDonations(donationsData);
    setDonors(donorsData);
    setOrphans(orphansData);
    setLoading(false);
  };

  const getDonorName = (donorId: string) => {
    return donors.find(d => d.id === donorId)?.name || 'Unknown';
  };

  const getOrphanName = (orphanId: string) => {
    return orphans.find(o => o.id === orphanId)?.name || 'Unknown';
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Donation Management</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Orphan</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{donation.transactionId}</td>
                <td className="px-6 py-4">{getDonorName(donation.donorId)}</td>
                <td className="px-6 py-4">{getOrphanName(donation.orphanId)}</td>
                <td className="px-6 py-4 font-semibold">৳{donation.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    donation.type === 'monthly' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {donation.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
