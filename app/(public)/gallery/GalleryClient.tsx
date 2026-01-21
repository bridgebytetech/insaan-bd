"use client";

import React, { useState } from "react";
import { X, Maximize2, Zap, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  photoId: number;
  photoUrl: string;
  photoTitle: string;
  photoCaption: string;
  createdAt: string;
}

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full pb-20">
      {/* --- Sharp Editorial Header --- */}
      <div className="w-full bg-[#264653] pt-40 pb-20 px-6 border-b-8 border-[#2A9D8F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Camera size={18} className="text-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Visual Archive</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            আমাদের <span className="text-[#2A9D8F]">প্রতিচ্ছবি</span>
          </h1>
          <p className="mt-8 text-white/60 max-w-xl text-lg font-medium border-l-4 border-[#2A9D8F] pl-6 leading-relaxed">
            ইনসান ফাউন্ডেশনের কাজের কিছু স্থিরচিত্র। প্রতিটি ছবি একটি স্বপ্ন পূরণের এবং একটি জীবন পরিবর্তনের সাক্ষী।
          </p>
        </div>
      </div>

      {/* --- Gallery Grid: Zero Gap / Sharp Edge --- */}
      <div className="w-full px-0"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-b border-gray-100">
          {items.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              key={item.photoId}
              className="relative aspect-square overflow-hidden group border-r border-t border-gray-100 cursor-none"
              onClick={() => setSelectedImg(item)}
            >
              {/* Image Layer */}
              <img
                src={item.photoUrl}
                alt={item.photoTitle}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
              />

              {/* Technical Overlay */}
              <div className="absolute inset-0 bg-[#264653]/0 group-hover:bg-[#264653]/80 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[#2A9D8F] text-[10px] font-black tracking-[0.3em] uppercase mb-2">
                    Project {item.photoId} / {new Date(item.createdAt).getFullYear()}
                  </p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                    {item.photoTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                    <Maximize2 size={14} className="text-[#2A9D8F]" /> Click to Inspect
                  </div>
                </div>
              </div>

              {/* Permanent Year Tag */}
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm text-[#264653] px-4 py-1 text-[9px] font-black tracking-widest group-hover:hidden">
                #{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Fullscreen Cinematic Modal --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#264653] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 z-[110] text-white hover:rotate-90 transition-transform duration-300"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>

            {/* Modal Image Section */}
            <div className="flex-[2] h-full flex items-center justify-center p-4 md:p-20 bg-black/20">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImg.photoUrl}
                alt="Preview"
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            </div>

            {/* Modal Sidebar Section */}
            <div className="flex-1 bg-white p-12 flex flex-col justify-center border-l-8 border-[#2A9D8F]">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={14} className="text-[#2A9D8F]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Archive Details</span>
                  </div>
                  <h2 className="text-4xl font-black text-[#264653] uppercase tracking-tighter leading-[0.9]">
                    {selectedImg.photoTitle}
                  </h2>
                </div>

                <div className="w-12 h-1 bg-[#E76F51]" />

                <p className="text-gray-500 text-lg font-medium leading-relaxed">
                  {selectedImg.photoCaption}
                </p>

                <div className="pt-8 border-t border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2 font-mono">Timestamp</p>
                  <p className="text-[#264653] font-bold tracking-widest uppercase">
                    {new Date(selectedImg.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Empty State --- */}
      {items.length === 0 && (
        <div className="text-center py-40">
          <p className="text-gray-300 font-black uppercase tracking-[0.5em] text-xs">No media found in archives</p>
        </div>
      )}
    </div>
  );
}