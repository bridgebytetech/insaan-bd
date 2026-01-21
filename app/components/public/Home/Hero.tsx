"use client";

import { useState, useEffect } from "react";
// Updated imports for more relevant icons
import { HeartHandshake, BookOpen, Heart, Quote, Star, ShieldCheck, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVars = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stats = [
    { label: "সক্রিয় সদস্য", value: "১২০+", icon: Star, color: "#2A9D8F" },
    { label: "স্বচ্ছতা", value: "১০০%", icon: ShieldCheck, color: "#E76F51" },
    { label: "দাতা সদস্য", value: "৫০+", icon: Users, color: "#264653" },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-[#FDFDFD] overflow-hidden pt-28 pb-12 lg:cursor-none">
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[grid-linear-gradient(to_right,#000_1px,transparent_1px),grid-linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
      </div>

      {/* --- CUSTOM MAGNETIC CURSOR --- */}
      <div
        className={`fixed w-12 h-12 rounded-full border border-[#2A9D8F] pointer-events-none z-[9999] transition-transform duration-200 ease-out hidden lg:flex items-center justify-center ${
          isHovering ? "scale-[1.8] bg-[#2A9D8F]/5 border-[#2A9D8F]/40" : "scale-100"
        }`}
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%)` }}
      >
        <div className="w-1 h-1 bg-[#2A9D8F] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* --- LEFT SIDE: THE PITCH --- */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={itemVars} className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#E76F51] animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black text-[#264653] uppercase tracking-[0.3em]">
                ইমপ্যাক্ট রিপোর্ট • ২০২৬
              </span>
            </motion.div>

            <motion.div variants={itemVars}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#264653] leading-[1.1] lg:leading-[0.95] tracking-tighter">
                সহমর্মিতার হাত <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] to-[#264653] font-serif py-1 inline-block">
                  একটি শিশুর জন্য
                </span>
              </h1>
            </motion.div>

            <motion.p variants={itemVars} className="text-base md:text-xl text-gray-500/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              আপনার সামান্য দান একটি এতিম শিশুর উজ্জ্বল ভবিষ্যতের চাবিকাঠি। আমরা স্বচ্ছতার সাথে কাজ করি।
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              {/* Primary Button with HeartHandshake */}
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative overflow-hidden bg-[#264653] px-10 py-4 md:py-5 text-white font-black uppercase text-[10px] tracking-[0.3em] transition-all hover:bg-[#2A9D8F] active:scale-95 rounded-full shadow-lg shadow-[#264653]/10"
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <HeartHandshake size={18} className="transition-transform group-hover:scale-110" />
                  <span>দাতা হিসেবে যুক্ত হোন</span>
                </div>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Secondary Button with BookOpen */}
              <button className="group flex items-center justify-center gap-4 px-10 py-4 md:py-5 border-2 border-gray-100 text-[#264653] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-gray-50 transition-all rounded-full">
                <BookOpen size={18} className="text-[#2A9D8F] transition-transform group-hover:-rotate-12" />
                <span>আমাদের গল্প</span>
              </button>
            </motion.div>

            {/* Desktop Stats */}
            <motion.div variants={itemVars} className="hidden lg:flex items-center gap-8 pt-6">
               {stats.map((stat, i) => (
                 <div key={i}>
                   <p className="text-2xl font-black text-[#264653] tracking-tighter">{stat.value}</p>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 </div>
               ))}
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: KINETIC CARDS --- */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 h-[300px] sm:h-[450px] lg:h-auto">
            <div className="relative w-full h-full aspect-square max-w-[400px] mx-auto">
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-dashed border-[#2A9D8F]/30 rounded-full"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#2A9D8F]/5 rounded-full blur-3xl" />
                <Heart size={60} className="text-[#2A9D8F] opacity-10" fill="currentColor" />
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-4 -right-2 md:right-0 w-[180px] md:w-64 bg-white p-4 md:p-6 shadow-xl border-l-4 border-[#2A9D8F] z-20 rounded-2xl rounded-tl-none"
              >
                <Quote size={20} className="text-[#2A9D8F]/20 mb-2" />
                <p className="text-[11px] md:text-sm font-bold text-[#264653] italic leading-tight">"এতিমের মাথায় হাত বুলিয়ে দাও, হৃদয় নরম হবে।"</p>
                <p className="text-[8px] font-black text-gray-300 uppercase mt-2 tracking-widest">— মুসনাদে আহমাদ</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 -left-2 md:left-0 w-[160px] md:w-56 bg-[#264653] p-4 md:p-6 shadow-2xl z-30 rounded-3xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={14} className="text-[#2A9D8F]" />
                  <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest">বৈশ্বিক</span>
                </div>
                <p className="text-sm md:text-lg font-black text-white tracking-tighter">সারা বাংলাদেশ</p>
                <p className="text-[8px] md:text-[10px] font-medium text-white/60">৮টি বিভাগে কার্যক্রম বিস্তৃত।</p>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 -right-4 w-10 h-10 md:w-12 md:h-12 bg-[#E76F51] rounded-full flex items-center justify-center text-white shadow-xl z-40"
              >
                <Heart size={18} fill="currentColor" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- MOBILE STATS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-12 grid grid-cols-3 gap-3"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 p-3 py-5 rounded-2xl text-center shadow-sm">
              <p className="text-lg font-black text-[#264653] tracking-tighter">{stat.value}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}