"use client";

import React from "react";
import { Camera, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
  // --- হেল্পার ফাংশন: সঠিক ইমেজ ইউআরএল পাওয়ার জন্য ---
  const getImageUrl = (url: string) => {
    if (!url) return "";
    // যদি আগে থেকেই সম্পূর্ণ লিঙ্ক থাকে তবে সেটিই দেখাবে, নাহলে এপিআই পাথ বসাবে
    if (url.startsWith('http')) return url;
    return `https://api.insaanbd.org/api/public/files/${url}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- Sharp Editorial Header --- */}
      <div className="w-full pt-44 pb-20 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={18} className="text-[#2A9D8F]" fill="#2A9D8F" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#264653]/40">Archive Vol. 01</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-[#264653] uppercase tracking-tighter leading-[0.8]">
            স্মৃতির <br /> 
            <span className="text-[#2A9D8F]">অ্যালবাম</span>
          </h1>
        </div>
      </div>

      {/* --- Sequential Row Gallery (Contained) --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-px bg-gray-100 border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          {items.map((item, idx) => (
            <div 
              key={item.photoId} 
              className={`flex flex-col md:flex-row bg-white ${
                idx % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="flex-1 aspect-square md:aspect-auto md:h-[500px] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  // এখানে getImageUrl ফাংশনটি ব্যবহার করা হয়েছে
                  src={getImageUrl(item.photoUrl)}
                  alt={item.photoTitle}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-between group cursor-default">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-3xl font-black text-gray-100 group-hover:text-[#2A9D8F] transition-colors duration-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="p-3 border border-gray-100 group-hover:bg-[#264653] group-hover:text-white transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2A9D8F]">
                      {new Date(item.createdAt).getFullYear()} Archive
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-[#264653] uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                      {item.photoTitle}
                    </h2>
                    <div className="w-10 h-1 bg-[#E76F51]" />
                    <p className="text-gray-500 text-base font-medium leading-relaxed max-w-sm">
                      {item.photoCaption}
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                       {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                     </span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">
                    Visual Record
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {items.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-300 font-black uppercase tracking-[0.5em] text-xs">No media available in this section</p>
          </div>
        )}
      </div>

      {/* --- Footer Branding --- */}
      <div className="w-full py-20 text-center border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">Insaan BD Visual Archive</p>
      </div>
    </div>
  );
}