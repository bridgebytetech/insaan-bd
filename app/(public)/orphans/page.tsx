"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, User, ChevronRight, Heart, Sparkles,
  MapPin, Calendar, ArrowUp, Phone, Facebook, 
  Instagram, Youtube, GraduationCap, Activity
} from "lucide-react";
import publicOrphanService from "@/app/lib/services/publicOrphanService";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/shared/Footer";

export default function PublicOrphanPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [orphans, setOrphans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isAuthenticated = () => {
    // সাধারণত টোকেন 'token' বা 'access_token' নামে সেভ থাকে, আপনার প্রজেক্ট অনুযায়ী নাম বদলে নিন
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("accessToken"); 
    }
    return false;
  };
  const handleSupportClick = (child: any) => {
    if (child.isConnected) return; // অলরেডি কানেক্টেড হলে কিছুই হবে না

    if (isAuthenticated()) {
      // যদি লগইন থাকে -> প্রোফাইল বা পেমেন্ট পেজ
      router.push('/donors/profile'); 
    } else {
      // লগইন না থাকলে -> লগইন পেজ
      router.push('/donors/login');
    }
  };

  const loadOrphans = async () => {
    try {
      setLoading(true);
      const res = await publicOrphanService.search({
        keyword: searchTerm,
        page: 0,
        size: 50
      });
      
      if (res.data.success) {
        setOrphans(res.data.data.content || res.data.data);
      }
    } catch (error) {
      console.error("Error loading orphans:", error);
      toast.error("শিশুদের তথ্য লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadOrphans();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getImageUrl = (url: string) => {
    if (!url || url === "string" || url === "") return null;
    if (url.startsWith("http")) return url;
    return `https://api.insaanbd.org/api/public/files/${url}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2A9D8F]">Change a Life Today</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-[#264653] tracking-tighter leading-none mb-4">
              আমাদের <span className="text-[#2A9D8F]">নক্ষত্ররা</span>
            </h1>
            <p className="text-gray-400 font-medium text-sm md:text-base">
              আপনার সামান্য সহযোগিতা একটি শিশুর জীবনকে সুন্দর ও আলোকময় করে তুলতে পারে।
            </p>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors" size={20} />
            <input
              type="text"
              placeholder="নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-[#2A9D8F]/5 focus:border-[#2A9D8F]/20 transition-all text-sm font-bold text-[#264653]"
            />
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[500px] bg-white border border-gray-50 rounded-[2.5rem] p-6 space-y-4 animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-[2rem]" />
                <div className="h-6 bg-gray-100 w-3/4 rounded-md" />
                <div className="h-4 bg-gray-50 w-1/2 rounded-md" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {orphans.map((child, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={child.orphanId}
                  className="group relative bg-white rounded-[2.5rem] p-5 border border-gray-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]"
                >
                  {/* Image Container */}
                  <div className={`aspect-square rounded-[2rem] mb-6 flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] ${child.orphanGender === "MALE" ? "bg-[#F4F9F9]" : "bg-[#FFF5F7]"}`}>
                    {getImageUrl(child.orphanDpUrl) ? (
                      <img 
                        src={getImageUrl(child.orphanDpUrl)!} 
                        alt={child.orphanName} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = ""; 
                          (e.target as HTMLImageElement).className = "hidden";
                        }}
                      />
                    ) : (
                      <User size={80} className={`opacity-10 ${child.orphanGender === "MALE" ? "text-[#2A9D8F]" : "text-[#E76F51]"}`} fill="currentColor" />
                    )}
                    
                    <div className="absolute top-4 left-4">
                      <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm border ${
                        child.orphanGender === "MALE" 
                          ? "bg-blue-50 text-blue-500 border-blue-100" 
                          : "bg-pink-50 text-pink-500 border-pink-100"
                      }`}>
                        {child.orphanGender}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border ${
                        child.isConnected 
                          ? "bg-[#F0FDF4] text-[#2A9D8F] border-[#2A9D8F]/10" 
                          : "bg-[#FFF1F2] text-[#E76F51] border-[#E76F51]/10"
                      }`}>
                        {child.isConnected ? "Sponsored" : "Needs Support"}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4 px-2">
                    <div>
                      <h3 className="text-xl font-black text-[#264653] mb-2 group-hover:text-[#2A9D8F] transition-colors line-clamp-1">
                        {child.orphanName}
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          <Calendar size={12} className="text-[#2A9D8F]" /> {child.orphanAge} বছর
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          <MapPin size={12} className="text-[#2A9D8F]" /> {child.orphanAddress || "বাংলাদেশ"}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-gray-50">
                        {child.orphanEducationLevel && (
                          <div className="flex items-start gap-2 text-[11px] font-medium text-gray-500">
                            <GraduationCap size={14} className="text-[#2A9D8F] shrink-0" />
                            <span className="line-clamp-1">
                                {child.orphanEducationLevel} - {child.orphanEducationInstitute || "শিক্ষা প্রতিষ্ঠান"}
                            </span>
                          </div>
                        )}
                        {child.orphanHealthCondition && (
                          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                            <Activity size={14} className="text-[#E76F51] shrink-0" />
                            <span className="line-clamp-1">স্বাস্থ্য: {child.orphanHealthCondition}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="h-6 flex items-center">
                      {child.isConnected ? (
                        <div className="flex items-center gap-2">
                          <Heart size={12} className="text-[#E76F51]" fill="#E76F51" />
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Already Supported</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#E76F51] font-black text-[9px] uppercase tracking-widest animate-pulse">
                            <Sparkles size={12} /> সাহায্য প্রয়োজন
                        </div>
                      )}
                    </div>

                    {/* Updated Action Button Logic */}
                    <button 
                      disabled={child.isConnected}
                      onClick={() => handleSupportClick(child)}
                      className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                        child.isConnected 
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed" 
                          : "bg-[#2A9D8F] text-white hover:bg-[#264653] shadow-lg shadow-[#2A9D8F]/20 cursor-pointer active:scale-95"
                      }`}
                    >
                      Support Now
                      {!child.isConnected && <ChevronRight size={14} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* --- EMPTY STATE --- */}
        {!loading && orphans.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <Search size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-[#264653] font-black text-xl uppercase tracking-tighter">কোনো শিশু পাওয়া যায়নি</h3>
            <p className="text-gray-400 mt-2">অনুগ্রহ করে অন্য নামে চেষ্টা করুন</p>
          </motion.div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}