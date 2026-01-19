// components/public/StoryCard.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SuccessStory } from '@/app/lib/types';

export default function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <Image src={story.imageUrl} alt={story.title} fill className="object-cover" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{story.title}</h3>
        <p className="text-sm text-blue-600 font-semibold mb-3">{story.orphanName}</p>
        <p className="text-gray-700 mb-4 line-clamp-4">{story.story}</p>
        
        <div className="bg-green-50 px-4 py-2 rounded-lg">
          <p className="text-sm text-green-800 font-semibold">✓ {story.outcome}</p>
        </div>
      </div>
    </motion.div>
  );
}

