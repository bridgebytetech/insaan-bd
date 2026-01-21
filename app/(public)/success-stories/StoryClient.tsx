"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, Quote, User, ArrowRight, MapPin, 
  Phone, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowUp 
} from 'lucide-react';
import type { SuccessStory } from "@/app/lib/types/story";

interface Props {
  stories: SuccessStory[];
  featuredStories: SuccessStory[];
}

export default function StoryClient({ stories, featuredStories }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      {/* Hero Section */}
      <div className="pt-40 pb-16 px-6 bg-gradient-to-b from-[#264653]/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#E76F51]/10 text-[#E76F51] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            Success Stories
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#264653] mt-6 mb-4">
            বদলে যাওয়ার <span className="text-[#2A9D8F]">গল্পসমূহ</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            আপনার দান এবং আমাদের প্রচেষ্টায় যাদের জীবনে পরিবর্তন এসেছে, তাদের বাস্তব জীবনের গল্প।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-20 pb-32">
        
        {/* Featured Story - Big Hero Card */}
        {featuredStories.length > 0 && (
          <section>
            <div className="relative rounded-[2rem] overflow-hidden bg-[#264653] text-white flex flex-col lg:flex-row shadow-2xl shadow-teal-900/20">
              <div className="lg:w-1/2 h-[350px] lg:h-auto relative">
                <img 
                  src={featuredStories[0].storyPhotoUrl} 
                  className="w-full h-full object-cover opacity-80" 
                  alt="Featured"
                />
                <div className="absolute top-6 left-6 bg-[#E76F51] p-3 rounded-2xl">
                  <Quote className="text-white fill-white" size={24} />
                </div>
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[#2A9D8F] font-bold text-sm mb-4 uppercase tracking-[0.3em]">Featured Story</p>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                  {featuredStories[0].storyTitle}
                </h2>
                <p className="text-gray-300 line-clamp-4 mb-8 text-lg italic leading-relaxed font-medium">
                  "{featuredStories[0].storyContent}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{featuredStories[0].orphanName || "Anonymous"}</p>
                    <p className="text-xs text-gray-400">Beneficiary</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Stories Grid */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-[#264653]">সকল গল্প</h2>
            <div className="h-[2px] flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((story) => (
              <div key={story.storyId} className="group cursor-pointer">
                <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200">
                  <img 
                    src={story.storyPhotoUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={story.storyTitle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                     <button className="w-full py-3 bg-white text-[#264653] font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl">
                        সম্পূর্ণ পড়ুন <ArrowRight size={16} />
                     </button>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2A9D8F] bg-[#2A9D8F]/5 px-2 py-1 rounded">
                      {story.storyType.replace('_', ' ')}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                       {new Date(story.createdAt).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#264653] group-hover:text-[#E76F51] transition-colors line-clamp-2 mb-3 leading-tight">
                    {story.storyTitle}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-medium">
                    {story.storyContent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- FOOTER INTEGRATION --- */}
      <footer className="relative bg-[#264653] pt-24 pb-12 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A9D8F]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 pb-20 border-b border-white/10">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2A9D8F]/20">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  ইনসান <span className="text-[#2A9D8F]">বিডি</span>
                </h3>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
                প্রতিটি সাফল্যের গল্পের পেছনে রয়েছে আপনাদের মতো সহৃদয় মানুষের অবদান। আমাদের এই যাত্রায় অংশীদার হওয়ার জন্য ধন্যবাদ।
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#2A9D8F] hover:text-white transition-all border border-white/5 group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">গল্পগুলো</h4>
                <ul className="space-y-4">
                  {["সাফল্য", "শিক্ষা", "চিকিৎসা", "আশ্রয়"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#E76F51] pb-2 inline-block">সহযোগিতা</h4>
                <ul className="space-y-4">
                  {["দান করুন", "স্পন্সর", "স্বেচ্ছাসেবী", "পার্টনারশিপ"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">যোগাযোগ</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 text-white/40">
                    <MapPin size={18} className="text-[#2A9D8F] shrink-0" />
                    <p className="text-sm font-bold leading-snug">উত্তরা, ঢাকা, বাংলাদেশ</p>
                  </div>
                  <a href="tel:+" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-bold">
                    <Phone size={18} className="text-[#2A9D8F]" /> +৮৮০ ১৭০০-০০০০০০
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
              © ২০২৬ ইনসান বিডি। প্রতিটি জীবন মূল্যবান।
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest transition-colors">প্রাইভেসি</a>
              <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest transition-colors">কুকি পলিসি</a>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#2A9D8F] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all duration-300 group"
          >
            <ArrowUp size={24} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}
      </footer>
    </div>
  );
}