  "use client";

  import React, { useState, useEffect } from 'react';
  import { 
    Calendar, MapPin, ArrowRight, Zap, Globe, Heart, 
    Phone, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowUp 
  } from 'lucide-react';
  import Link from 'next/link';
  import { motion } from "framer-motion";

  interface ActivityClientProps {
    items: any[];
  }

  export default function ActivityClient({ items }: ActivityClientProps) {
    const [showBackToTop, setShowBackToTop] = useState(false);

    // --- Helper to handle image URL ---
    const getImageUrl = (url: string) => {
      if (!url) return "";
      // যদি ইউআরএলটি আগে থেকেই http দিয়ে শুরু হয় তবে সেটিই থাকবে
      // অন্যথায় আমাদের পাবলিক ফাইল এপিআই পাথ যোগ হবে
      return url.startsWith("http") 
        ? url 
        : `https://api.insaanbd.org/api/public/files/${url}`;
    };

    // --- Scroll Logic for Footer ---
    useEffect(() => {
      const handleScroll = () => setShowBackToTop(window.scrollY > 400);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
      <div className="w-full bg-[#FDFDFD]">
        {/* --- High Impact Clean Header --- */}
        <div className="w-full bg-[#F8FAFB] pt-48 pb-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#264653]/40">Impact Report</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#264653] uppercase tracking-tighter leading-none">
              আমাদের <span className="text-[#2A9D8F]">কার্যক্রম</span>
            </h1>
            <p className="mt-8 text-gray-500 max-w-xl text-lg font-medium border-l-4 border-[#2A9D8F] pl-6 leading-relaxed">
              আর্তমানবতার সেবায় ইনসান ফাউন্ডেশনের প্রতিটি পদক্ষেপের গল্প। আমরা কেবল সেবা দিই না, আমরা ভবিষ্যতের ভিত্তি গড়ি।
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
          <div className="bg-white border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Activities</p>
              <p className="text-3xl font-black text-[#264653] tracking-tighter">{items.length}+</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Locations</p>
              <p className="text-3xl font-black text-[#264653] tracking-tighter">সারা বাংলাদেশ</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Last Update</p>
              <p className="text-3xl font-black text-[#2A9D8F] tracking-tighter">২০২৬</p>
            </div>
            <div className="flex items-end">
              <div className="px-4 py-2 bg-[#2A9D8F] text-white text-[10px] font-black uppercase tracking-widest">Live Feed</div>
            </div>
          </div>
        </div>

        {/* --- Activities Grid --- */}
        <div className="max-w-7xl mx-auto px-6 mt-20 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
            {items.map((activity, idx) => (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                key={activity.activityId}
                className="group bg-white border-r border-b border-gray-100 flex flex-col hover:bg-gray-50 transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <img 
                    src={getImageUrl(activity.activityPhotoUrl)} 
                    alt={activity.activityTitle}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-[#264653] text-white px-4 py-1 text-[10px] font-black tracking-widest">
                    EVENT {idx + 1}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Calendar size={14} className="text-[#2A9D8F]" />
                      {activity.activityDate}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <MapPin size={14} className="text-[#E76F51]" />
                      {activity.activityLocation}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#264653] uppercase leading-tight mb-4 group-hover:text-[#2A9D8F] transition-colors line-clamp-2 tracking-tighter">
                    {activity.activityTitle}
                  </h3>
                  
                  <p className="text-gray-500 font-medium leading-relaxed text-sm line-clamp-3 mb-8">
                    {activity.activityDescription}
                  </p>

                  <div className="mt-auto">
                    <Link 
    href={`/activities/${activity.activityId}`}
    className="w-full flex items-center justify-between p-4 border border-[#264653] text-[#264653] font-black text-[10px] uppercase tracking-[0.3em] group/btn hover:bg-[#264653] hover:text-white transition-all"
  >
    বিস্তারিত বিবরণ
    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
  </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-40 border-2 border-dashed border-gray-100">
              <Globe className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">সিস্টেমে কোনো তথ্য পাওয়া যায়নি</p>
            </div>
          )}
        </div>

      
      </div>
    );
  }