"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, ArrowRight, Zap, Globe, Heart, 
  Phone, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowUp 
} from 'lucide-react';
import { motion } from "framer-motion";

interface ActivityClientProps {
  items: any[];
}

export default function ActivityClient({ items }: ActivityClientProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Scroll Logic for Footer ---
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="w-full bg-[#FDFDFD]">
      {/* --- High Impact Sharp Header --- */}
      <div className="w-full bg-[#264653] pt-40 pb-20 px-6 border-b-8 border-[#2A9D8F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Impact Report</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            আমাদের <span className="text-[#2A9D8F]">কার্যক্রম</span>
          </h1>
          <p className="mt-8 text-white/60 max-w-xl text-lg font-medium border-l-4 border-[#2A9D8F] pl-6 leading-relaxed">
            আর্তমানবতার সেবায় ইনসান ফাউন্ডেশনের প্রতিটি পদক্ষেপের গল্প। আমরা কেবল সেবা দিই না, আমরা ভবিষ্যতের ভিত্তি গড়ি।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        {/* --- Sharp Stats Bar --- */}
        <div className="bg-white border border-gray-200 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-2xl">
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
                  src={activity.activityPhotoUrl} 
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
                  <button className="w-full flex items-center justify-between p-4 border border-[#264653] text-[#264653] font-black text-[10px] uppercase tracking-[0.3em] group/btn hover:bg-[#264653] hover:text-white transition-all">
                    বিস্তারিত বিবরণ
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
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

      {/* --- FOOTER INTEGRATION --- */}
      <footer className="relative bg-[#264653] pt-24 pb-12 overflow-hidden border-t-4 border-[#2A9D8F]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 pb-20 border-b border-white/10">
            {/* Brand & Socials */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center shadow-xl shadow-[#2A9D8F]/20">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  ইনসান <span className="text-[#2A9D8F]">বিডি</span>
                </h3>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                সুবিধাবঞ্চিত ও এতিম শিশুদের জন্য একটি সুন্দর ও নিরাপদ পৃথিবী গড়ার লক্ষ্যে আমরা কাজ করছি। আপনার দান তাদের ভবিষ্যৎ।
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#2A9D8F] hover:text-white transition-all border border-white/5 group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">এক্সপ্লোর</h4>
                <ul className="space-y-4">
                  {["হোম", "সম্পর্কে", "কার্যক্রম", "গ্যালারি"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-medium">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#E76F51] pb-2 inline-block">অংশগ্রহণ</h4>
                <ul className="space-y-4">
                  {[
                    { en: "Become a Donor", bn: "দাতা হিসেবে যুক্ত হোন" },
                    { en: "Volunteer", bn: "স্বেচ্ছাসেবী" },
                    { en: "Fundraise", bn: "তহবিল সংগ্রহ" },
                    { en: "Partnership", bn: "অংশীদারিত্ব" }
                  ].map((link) => (
                    <li key={link.en}>
                      <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">{link.bn}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">যোগাযোগ</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-[#2A9D8F] shrink-0" />
                    <p className="text-white/40 text-sm leading-snug">উত্তরা, ঢাকা, বাংলাদেশ</p>
                  </div>
                  <a href="tel:+" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium">
                    <Phone size={18} className="text-[#2A9D8F]" />
                    +৮৮০ ১৭০০-০০০০০০
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
              © ২০২৬ ইনসান বিডি। ভালোবাসার সাথে নির্মিত।
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest">গোপনীয়তা নীতি</a>
              <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest">পরিষেবার শর্তাবলী</a>
            </div>
          </div>
        </div>

        {/* Floating Scroll Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#2A9D8F] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </button>
        )}
      </footer>
    </div>
  );
}