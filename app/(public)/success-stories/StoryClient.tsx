"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, Quote, User, ArrowRight, MapPin, 
  Phone, Facebook, Instagram, Youtube, Linkedin, ArrowUp, Sparkles, Calendar, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SuccessStory } from "@/app/lib/types/story";

interface Props {
  stories: SuccessStory[];
  featuredStories: SuccessStory[];
}

export default function StoryClient({ stories, featuredStories }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-[#F8FAFB] min-h-screen selection:bg-[#2A9D8F]/20 overflow-x-hidden">
      
      {/* 🚀 Hero Section - Professional & Spacious */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#2A9D8F]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-gray-100 text-[#2A9D8F] rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl shadow-gray-200/40"
          >
            <Layers size={14} /> The Impact We Make
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black text-[#264653] mb-10 tracking-tighter leading-[0.9]"
          >
            বদলে যাওয়া <br />
            <span className="text-[#2A9D8F] italic font-serif relative">
                জীবনের গল্প
                <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 300 20" fill="none"><path d="M5 15C50 5 150 5 295 15" stroke="#E76F51" strokeWidth="6" strokeLinecap="round"/></svg>
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed"
          >
            প্রতিটি দান একটি নতুন গল্পের জন্ম দেয়। আপনাদের সহযোগিতায় আমরা যে মাইলফলক স্পর্শ করেছি, তারই কিছু বাস্তব চিত্র।
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-40 space-y-40">
        
        {/* 🔥 Featured Story - Ultra Modern Layout */}
        {featuredStories.length > 0 && (
          <section className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group relative h-[600px] md:h-[700px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
            >
              <img 
                src={featuredStories[0].storyPhotoUrl} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                alt="Featured Impact"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 flex flex-col md:flex-row items-end justify-between gap-10">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-1 bg-[#E76F51] rounded-full" />
                        <span className="text-white font-black uppercase tracking-[0.4em] text-xs">Featured Impact Story</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                        {featuredStories[0].storyTitle}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-medium italic line-clamp-3 mb-4">
                        "{featuredStories[0].storyContent}"
                    </p>
                </div>
                <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/20 min-w-[280px]">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-[#2A9D8F] rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-white font-black text-xl">{featuredStories[0].orphanName || "Safeer"}</p>
                            <p className="text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest">Beneficiary</p>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white text-[#264653] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2A9D8F] hover:text-white transition-all shadow-xl">
                        সম্পূর্ণ পড়ুন
                    </button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* 📸 Success Stories Gallery - Masonry Style Feel */}
        <section>
          <div className="flex items-center justify-between mb-20">
            <div>
               <h2 className="text-4xl font-black text-[#264653]">সফলতার গ্যালারি</h2>
               <p className="text-gray-400 font-bold mt-2">আমাদের প্রতিটি পদক্ষেপের প্রতিফলন</p>
            </div>
            <div className="hidden md:flex gap-2">
                <div className="w-12 h-1.5 bg-[#2A9D8F] rounded-full" />
                <div className="w-4 h-1.5 bg-gray-200 rounded-full" />
                <div className="w-4 h-1.5 bg-gray-200 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {stories.map((story, index) => (
              <motion.div 
                key={story.storyId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200 group-hover:shadow-[#2A9D8F]/20 transition-all duration-500">
                  <img 
                    src={story.storyPhotoUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={story.storyTitle}
                  />
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                      {story.storyType}
                    </span>
                  </div>

                  {/* Content on Image */}
                  <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar size={14} className="text-[#2A9D8F]" />
                        <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">
                            {new Date(story.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-6 group-hover:text-[#2A9D8F] transition-colors">
                      {story.storyTitle}
                    </h3>
                    <button className="flex items-center gap-3 text-white font-black text-[11px] uppercase tracking-[0.2em] group/btn">
                        গল্পটি পড়ুন 
                        <div className="w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center group-hover/btn:w-24 transition-all duration-500 overflow-hidden">
                            <ArrowRight size={16} />
                        </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* 🏛️ Massive Footer Section */}
      <footer className="relative bg-[#264653] pt-32 pb-12 overflow-hidden rounded-t-[5rem]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2A9D8F]/10 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 pb-24 border-b border-white/5">
            
            <div className="lg:col-span-5 space-y-12">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-[#2A9D8F] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#2A9D8F]/40 transform -rotate-6">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <div>
                    <h3 className="text-5xl font-black text-white tracking-tighter">ইনসান <span className="text-[#2A9D8F]">বিডি</span></h3>
                    <p className="text-[#2A9D8F] text-[10px] font-black uppercase tracking-[0.5em]">Insaan BD Foundation</p>
                </div>
              </div>
              <p className="text-white/40 text-xl leading-relaxed font-medium max-w-md">
                আমরা বিশ্বাস করি প্রতিটি মানুষের একটি সুন্দর জীবন পাওয়ার অধিকার আছে। আপনাদের ছোট ছোট অবদানই আমাদের বড় বড় সাফল্যের কারিগর।
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/30 hover:bg-[#2A9D8F] hover:text-white transition-all border border-white/5 hover:-translate-y-2 group">
                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-8">
                <h4 className="text-[#2A9D8F] font-black text-xs uppercase tracking-[0.3em]">এক্সপ্লোর</h4>
                <ul className="space-y-5">
                  {["সাফল্য গাঁথা", "আমাদের লক্ষ্য", "ইভেন্টসমূহ", "গ্যালারি"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-all text-base font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-[#E76F51] font-black text-xs uppercase tracking-[0.3em]">সহযোগিতা</h4>
                <ul className="space-y-5">
                  {["সরাসরি দান", "স্পন্সরশিপ", "ভলান্টিয়ার", "পার্টনারশিপ"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-all text-base font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-8">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-30">যোগাযোগ</h4>
                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#2A9D8F] group-hover:bg-[#2A9D8F] group-hover:text-white transition-all shrink-0">
                        <MapPin size={20} />
                    </div>
                    <p className="text-white/60 text-sm font-bold leading-snug">উত্তরা মডেল টাউন, ঢাকা-১২৩০, বাংলাদেশ</p>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#2A9D8F] group-hover:bg-[#2A9D8F] group-hover:text-white transition-all shrink-0">
                        <Phone size={20} />
                    </div>
                    <p className="text-white/60 text-sm font-bold">+৮৮০ ১৭০০-০০০০০</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.4em]">
              © ২০২৬ ইনসান বিডি | All Rights Reserved
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-white/10 hover:text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest transition-colors">Privacy</a>
              <a href="#" className="text-white/10 hover:text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest transition-colors">Terms</a>
            </div>
          </div>
        </div>

        {/* Floating Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-12 right-12 w-20 h-20 bg-[#2A9D8F] text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(42,157,143,0.5)] flex items-center justify-center z-50 hover:bg-[#264653] hover:-translate-y-3 transition-all duration-500 group"
            >
              <ArrowUp size={32} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}