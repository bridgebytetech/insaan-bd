"use client";

import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Newspaper,
  Timer,
  Hash,
  Sparkles,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- API থেকে ডেটা ফেচ করার লজিক ---
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("https://api.insaanbd.org/api/public/activities");
        const result = await response.json();
        
        if (result.success && result.data) {
          // আপনার রিকোয়েস্ট অনুযায়ী সর্বোচ্চ ৪টি ডেটা রাখা হচ্ছে
          setActivities(result.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // --- স্ট্যাটিক ক্যাটাগরি জেনারেটর ---
  const categories = ["OPERATIONS", "ACADEMIC", "MEDICAL", "SOCIETY"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
      </div>
    );
  }

  // যদি কোনো ডেটা না থাকে
  if (activities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] font-black text-[#264653] uppercase tracking-widest">
        No Activities Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Newspaper Header */}
        <div className="border-y-2 border-[#264653] py-8 mb-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="hidden md:block text-xs font-black uppercase tracking-widest text-gray-400">
              ইনসান বিডি <br /> টাইমলাইন
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-[#264653] tracking-tighter uppercase text-center">
            আমাদের পদচিহ্ন <span className="text-[#E76F51] italic">&</span>  ও কার্যক্রম
          </h1>
          <div className="text-right text-xs font-black uppercase tracking-widest text-gray-400">
            {activities[0]?.activityLocation || "Sylhet, Bangladesh"} <br /> 
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
          </div>
        </div>

        {/* Newspaper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-gray-200">
          
          {/* Main Headline Story (Left Side) - Index 0 */}
          <div className="md:col-span-8 md:border-r border-gray-200 md:pr-12 pb-12">
            <Link href={`/activities/${activities[0].activityId}`} className="group cursor-pointer block">
              <div className="flex items-center gap-2 text-[#2A9D8F] font-black text-xs mb-4 uppercase tracking-[0.2em]">
                <Newspaper size={14} /> Top Headline
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#264653] mb-6 leading-tight hover:text-[#2A9D8F] transition-colors uppercase">
                {activities[0].activityTitle}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-serif">
                {activities[0].activityDescription}
              </p>
              <div className="flex items-center justify-between py-6 border-t border-dashed border-gray-200">
                <div className="flex gap-4">
                   <span className="text-xs font-black bg-[#264653] text-white px-3 py-1 uppercase">
                     {categories[0] || "UPDATE"}
                   </span>
                   <span className="text-xs font-black text-gray-400 uppercase flex items-center gap-1">
                     <Timer size={12}/> {activities[0].activityDate}
                   </span>
                </div>
                <div className="flex items-center gap-2 font-black text-xs uppercase text-[#E76F51]">
                  Full Article <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          </div>

          {/* Side Column Stories - Index 1 to 3 */}
          <div className="md:col-span-4 md:pl-12 space-y-12 pb-12">
            {activities.slice(1).map((act, i) => (
              <Link 
                key={act.activityId} 
                href={`/activities/${act.activityId}`} 
                className="group cursor-pointer border-b border-gray-100 last:border-0 pb-8 last:pb-0 block"
              >
                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                  <Hash size={12} className="text-[#E76F51]" /> 0{i + 2} 
                 <h1>updates</h1>
                </div>
                <h3 className="text-xl font-black text-[#264653] mb-3 leading-snug group-hover:text-[#2A9D8F] transition-all uppercase">
                  {act.activityTitle}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-serif">
                  {act.activityDescription}
                </p>
                <div className="text-[10px] font-black text-gray-300 uppercase italic">
                  Posted on {act.activityDate}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Ticker/Info */}
      <div className="mt-16 bg-[#264653] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
  <div className="flex items-center gap-6">
    <div className="h-12 w-12 border border-white/20 flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform">
      <Sparkles size={20} className="text-[#2A9D8F] -rotate-45 group-hover:-rotate-90 transition-transform" />
    </div>
    <div>
      <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.4em] mb-1">Humanity Bulletin</p>
      <p className="text-white/80 text-xs font-medium italic">"প্রতিটি রিপোর্ট আমাদের স্বচ্ছতা ও দায়বদ্ধতার প্রতিফলন।"</p>
    </div>
  </div>

  <Link href="/activities" className="bg-white text-[#264653] px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2A9D8F] hover:text-white transition-colors">
    Explore Full Archive
  </Link>
</div>

      </div>
    </div>
  );
}