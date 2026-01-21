"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, Users, Building2, User, Award, MapPin, 
  Briefcase, Quote, ArrowUpRight, Phone, Mail, 
  Facebook, Instagram, Youtube, Linkedin, ArrowUp 
} from "lucide-react";

export default function DonorList() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Scroll Logic for Footer ---
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const donors = [
    {
      id: 1,
      name: "আহমেদ জুবায়ের",
      type: "INDIVIDUAL",
      profession: "সফটওয়্যার ইঞ্জিনিয়ার",
      address: "উত্তরা, ঢাকা",
      dpUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      totalConnected: 4,
      contribution: "গত দুই বছর ধরে ৪ জন এতিম শিশুর পড়াশোনা ও চিকিৎসার সম্পূর্ণ দায়িত্ব পালন করছেন।",
      message: "ইনসান বিডি-র স্বচ্ছতা আমাকে মুগ্ধ করেছে। শিশুদের মুখে হাসি দেখতে পাওয়াটাই আমার জীবনের সবচেয়ে বড় সার্থকতা।"
    },
    {
      id: 2,
      name: "টেক সল্যুশন লিমিটেড",
      type: "ORGANIZATION",
      profession: "আইটি প্রতিষ্ঠান",
      address: "জিন্দাবাজার, সিলেট",
      dpUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400",
      totalConnected: 12,
      contribution: "তাদের কর্পোরেট সোশ্যাল রেসপন্সিবিবিলিটি (CSR) ফান্ড থেকে ১২ জন শিশুর ডিজিটাল শিক্ষার জন্য ল্যাপটপ ও ইন্টারনেট সুবিধা প্রদান করেছে।",
      message: "সামাজিক দায়বদ্ধতা থেকে আমরা ইনসান বিডি-র পাশে আছি। আগামী প্রজন্মের ভিত্তি গড়তে শিক্ষা অপরিহার্য।"
    },
    {
      id: 3,
      name: "ফাতেমা বেগম",
      type: "INDIVIDUAL",
      profession: "স্কুল শিক্ষিকা",
      address: "পাঁচলাইশ, চট্টগ্রাম",
      dpUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
      totalConnected: 2,
      contribution: "নিজের সামান্য বেতনের একটি অংশ দিয়ে প্রতি মাসে ২ জন কন্যা শিশুর খাদ্য ও পোশাকের খরচ বহন করছেন।",
      message: "একটি শিশুর জীবন বদলে দেওয়ার আনন্দ ভাষায় প্রকাশ করা অসম্ভব। ইনসান বিডি-র এই মহৎ উদ্যোগ সফল হোক।"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION: HERO HEADER */}
      <div className="w-full border-b border-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#2A9D8F]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2A9D8F]">Honorable Donors</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#264653] tracking-tighter leading-[0.9]">
              সম্মানিত <br /> 
              <span className="text-gray-300">দাতাবৃন্দ</span>
            </h1>
            <p className="mt-8 text-gray-500 font-medium text-lg border-l-4 border-gray-100 pl-6">
              ইনসান ফাউন্ডেশনের অগ্রযাত্রায় যে মানুষগুলো নিরন্তর সহায়তার হাত বাড়িয়ে দিয়েছেন। 
            </p>
          </div>
          
          <div className="hidden lg:block pb-2">
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-black text-[#264653]">৫০+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">সক্রিয় দাতা</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#2A9D8F]">৫০০+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">সহায়তা প্রাপ্ত নক্ষত্র</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: GRID LIST */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-px bg-gray-100 border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white group">
              <div className="flex flex-col md:flex-row min-h-[350px]">
                
                {/* Photo Section */}
                <div className="w-full md:w-80 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between items-center text-center md:text-left md:items-start">
                  <div className="relative w-40 h-40 md:w-full md:h-64 mb-6">
                    <img 
                      src={donor.dpUrl} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt={donor.name} 
                    />
                    <div className="absolute top-0 right-0 p-3 bg-white border-l border-b border-gray-100">
                      {donor.type === "ORGANIZATION" ? <Building2 size={16} className="text-[#2A9D8F]" /> : <User size={16} className="text-[#2A9D8F]" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#264653] tracking-tight leading-tight">{donor.name}</h3>
                    <p className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest mt-1">
                      {donor.profession}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Contribution Summary</label>
                        <p className="text-[#264653] font-bold text-lg leading-snug">{donor.contribution}</p>
                      </div>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Impact</p>
                          <span className="text-xs font-black uppercase tracking-widest text-[#264653]">{donor.totalConnected} Stars Supported</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative pt-8 lg:pt-0">
                      <Quote className="absolute -top-4 -left-4 text-gray-50 w-16 h-16 -z-10" />
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-4 italic">Donor's Message</label>
                      <p className="text-gray-500 font-medium italic leading-relaxed">"{donor.message}"</p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#E76F51]">
                        <MapPin size={12} /> {donor.address}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black uppercase tracking-widest mr-4 text-[#264653]">View Full Profile</span>
                    <div className="p-3 bg-[#264653] text-white">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: ACTION */}
      <div className="w-full bg-[#fcfcfc] border-t border-gray-100 py-24 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-[#264653] tracking-tighter mb-8">
          পরিবর্তনের অংশীদার <span className="text-[#2A9D8F]">হতে চান?</span>
        </h2>
        <button className="bg-[#264653] text-white px-12 py-5 font-black uppercase text-xs tracking-[0.5em] hover:bg-[#2A9D8F] transition-all duration-500 shadow-2xl">
          Apply to be a Donor
        </button>
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
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#2A9D8F] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-all"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </button>
        )}
      </footer>
    </div>
  );
}