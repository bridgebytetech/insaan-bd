"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ChevronRight,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function OrphanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Scroll Logic for Footer ---
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const orphans = [
    {
      id: 1,
      name: "রাফসান আহমেদ",
      age: 8,
      location: "সিলেট",
      gender: "MALE",
      donorName: "আহমেদ জুবায়ের",
      status: "Sponsored",
    },
    {
      id: 2,
      name: "মারিয়া আক্তার",
      age: 6,
      location: "ঢাকা",
      gender: "FEMALE",
      donorName: null,
      status: "Needs Support",
    },
    {
      id: 3,
      name: "তানভীর হাসান",
      age: 10,
      location: "চট্টগ্রাম",
      gender: "MALE",
      donorName: null,
      status: "Needs Support",
    },
    {
      id: 4,
      name: "সুমাইয়া জান্নাত",
      age: 7,
      location: "বরিশাল",
      gender: "FEMALE",
      donorName: "ফাতেমা বেগম",
      status: "Sponsored",
    },
  ];

  const filteredOrphans = orphans.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* --- CONTENT SECTION --- */}
      <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles size={16} className="text-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2A9D8F]">
                Our Shining Stars
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-[#264653] tracking-tighter leading-none mb-4">
              আমাদের <span className="text-[#2A9D8F]">নক্ষত্ররা</span>
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              সহায়তা প্রত্যাশী শিশুদের তালিকা এবং তাদের উজ্জ্বল ভবিষ্যতের স্বপ্ন।
            </p>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="নাম দিয়ে খুঁজুন..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-[#2A9D8F]/5 focus:border-[#2A9D8F]/20 transition-all text-sm font-bold text-[#264653]"
            />
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredOrphans.map((child, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                key={child.id}
                className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
              >
                <div
                  className={`aspect-square rounded-[2rem] mb-6 flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] ${
                    child.gender === "MALE" ? "bg-[#F4F9F9]" : "bg-[#FFF5F7]"
                  }`}
                >
                  <User
                    size={80}
                    className={`opacity-10 ${child.gender === "MALE" ? "text-[#2A9D8F]" : "text-[#E76F51]"}`}
                    fill="currentColor"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border ${
                        child.donorName
                          ? "bg-[#F0FDF4] text-[#2A9D8F] border-[#2A9D8F]/10"
                          : "bg-[#FFF1F2] text-[#E76F51] border-[#E76F51]/10"
                      }`}
                    >
                      {child.donorName ? "Sponsored" : "Needs Support"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-[#264653] mb-2 group-hover:text-[#2A9D8F] transition-colors">
                      {child.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <Calendar size={12} /> {child.age} বছর
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <MapPin size={12} /> {child.location}
                      </div>
                    </div>
                  </div>

                  <div className="h-8 flex items-center">
                    {child.donorName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#264653] rounded-full">
                        <Heart size={10} className="text-[#E76F51]" fill="#E76F51" />
                        <span className="text-[9px] font-black text-white uppercase tracking-tighter">
                          Patron: {child.donorName}
                        </span>
                      </div>
                    ) : (
                      <div className="h-[2px] w-8 bg-gray-50" />
                    )}
                  </div>

                  <button className="w-full py-4 bg-gray-50 group-hover:bg-[#264653] group-hover:text-white text-[#264653] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#264653]/20">
                    See Journey{" "}
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredOrphans.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
              <Search size={40} className="text-gray-200" />
            </div>
            <h3 className="text-[#264653] font-black text-xl uppercase tracking-tighter">No Stars Found</h3>
            <p className="text-gray-400 text-sm mt-2">Try searching for a different name.</p>
          </motion.div>
        )}
      </div>

      {/* --- FOOTER INTEGRATION --- */}
      <footer className="relative bg-[#264653] pt-24 pb-12 overflow-hidden">
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