"use client";

import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";

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
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24">
          <p className="text-[#2A9D8F] font-bold text-xs uppercase tracking-[0.5em] mb-4">
            Archives
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-[#264653] tracking-tighter max-w-2xl leading-[0.9]">
            আমাদের কাজের{" "}
            <span className="text-[#2A9D8F] font-serif text-4xl md:text-6xl">
              প্রতিচ্ছবি
            </span>
          </h1>
          <div className="w-20 h-1 bg-[#E76F51] mt-8" />
        </div>

        {/* Gallery */}
        <div className="space-y-32">
          {items.map((item, index) => (
            <div
              key={item.photoId}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div
                className="w-full md:w-3/5 group cursor-zoom-in relative"
                onClick={() => setSelectedImg(item.photoUrl)}
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 ring-1 ring-black/5 shadow-xl">
                  <img
                    src={item.photoUrl}
                    alt={item.photoTitle}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#264653] text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                    {new Date(item.createdAt).getFullYear()}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-2/5 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-[#E76F51] font-black text-xs uppercase tracking-widest">
                      Project #{item.photoId}
                    </span>
                    <div className="h-[1px] flex-1 bg-gray-100" />
                  </div>
                  <h2 className="text-4xl font-black text-[#264653] tracking-tight">
                    {item.photoTitle}
                  </h2>
                </div>

                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  {item.photoCaption}
                </p>

                <div className="pt-4">
                  <button className="flex items-center gap-3 text-[#264653] font-bold text-xs uppercase tracking-[0.3em] group hover:text-[#2A9D8F] transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] bg-[#264653]/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>

            <img
              src={selectedImg}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}