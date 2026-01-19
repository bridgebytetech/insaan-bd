// components/public/OrphanCard.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Orphan } from '@/app/lib/types';

export default function OrphanCard({ orphan }: { orphan: Orphan }) {
  const progress = (orphan.currentSponsors / orphan.totalSponsorsNeeded) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <Image
          src={orphan.imageUrl}
          alt={orphan.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{orphan.name}</h3>
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>{orphan.age} years old • {orphan.location}</p>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{orphan.story}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{orphan.currentSponsors}/{orphan.totalSponsorsNeeded} sponsors</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <Link
          href={`/orphans/${orphan.id}`}
          className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}