// components/public/GalleryGrid.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage } from '@/app/lib/types';

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image)}
            className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md"
          >
            <Image src={image.imageUrl} alt={image.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-end p-4">
              <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                <p className="font-semibold">{image.title}</p>
                <p className="text-sm">{image.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full h-[80vh]">
            <Image src={selectedImage.imageUrl} alt={selectedImage.title} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
