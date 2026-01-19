"use client";

import { galleryImages } from "@/app/lib/utils/constants";
import { Camera, Maximize2, Heart, ChevronRight } from "lucide-react";

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-[#ECF4E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="md:w-3/5">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Camera size={14} className="animate-pulse" />
              <span>Insaan BD Moments</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-[#264653] leading-none">
              স্মরণীয়{" "}
              <span className="text-[#2A9D8F] italic font-serif">মুহূর্ত</span>
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-[#4A6651] text-lg leading-relaxed relative pl-6 border-l-4 border-[#E76F51]">
              আমাদের কার্যক্রম এবং শিশুদের আনন্দের প্রতিটি মুহূর্তকে আমরা ফ্রেমে
              বন্দি করি।
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`relative group cursor-pointer overflow-hidden ${img.size} rounded-[2.5rem] bg-[#264653]/5 border-4 border-transparent hover:border-white transition-all duration-500 shadow-xl`}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-125 brightness-[0.85] group-hover:brightness-100"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex justify-end">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 size={20} />
                  </div>
                </div>

                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="bg-[#E76F51] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter mb-2 inline-block">
                    {img.tag}
                  </span>
                  <h3 className="text-white text-2xl font-black leading-tight">
                    {img.title}
                  </h3>
                </div>
              </div>

              {/* Floating Heart */}
              <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <Heart size={20} className="text-white/50 fill-white/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
          <button className="group relative px-12 py-6 bg-white rounded-3xl overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(42,157,143,0.3)] border border-[#2A9D8F]/20">
            <div className="absolute inset-0 bg-[#2A9D8F] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center space-x-4 text-[#264653] font-black group-hover:text-white transition-colors text-lg uppercase tracking-widest">
              <span>View Full Story</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          <p className="mt-8 text-[#4A6651]/50 font-bold text-sm uppercase tracking-[0.4em]">
            Documenting Hope Since 2020
          </p>
        </div>
      </div>
    </section>
  );
}