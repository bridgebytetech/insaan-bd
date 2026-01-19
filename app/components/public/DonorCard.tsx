// components/public/DonorCard.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Donor } from '@/app/lib/types';

export default function DonorCard({ donor }: { donor: Donor }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md p-6 text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
        <Image src={donor.imageUrl || '/images/donors/default.jpg'} alt={donor.name} fill className="object-cover" />
      </div>
      <h3 className="font-bold text-lg mb-1">{donor.name}</h3>
      <p className="text-sm text-gray-600 mb-3">Donor since {new Date(donor.dateJoined).getFullYear()}</p>
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-sm text-gray-600">Total Donations</p>
        <p className="text-xl font-bold text-blue-600">৳{donor.totalDonations.toLocaleString()}</p>
      </div>
      <p className="text-sm text-gray-600 mt-3">Sponsoring {donor.sponsoredOrphans.length} {donor.sponsoredOrphans.length === 1 ? 'child' : 'children'}</p>
    </motion.div>
  );
}
