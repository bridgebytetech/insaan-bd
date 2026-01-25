"use client";

import { useState, useEffect } from "react";
import {
  HeartHandshake,
  BookOpen,
  Star,
  ShieldCheck,
  Users,
  Handshake,
  TrendingUp,
  Sparkles,
  Quote
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVars: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "সক্রিয় সদস্য", value: "১২০+", icon: Star, color: "#2A9D8F" },
    { label: "স্বচ্ছতা", value: "১০০%", icon: ShieldCheck, color: "#E76F51" },
    { label: "দাতা সদস্য", value: "৫০+", icon: Users, color: "#264653" },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-[#FDFDFD] overflow-hidden pt-28 pb-12">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[grid-linear-gradient(to_right,#000_1px,transparent_1px),grid-linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              variants={itemVars}
              className="inline-flex items-center group cursor-default"
            >
              {/* Left Part: The Year/Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#264653] rounded-l-full border border-[#264653]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9C46A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9C46A]"></span>
                </span>
                <span className="text-[8px] md:text-[9px] font-black text-[#E9C46A] uppercase tracking-wider">
                  Live • ২০২৬
                </span>
              </div>

              {/* Right Part: The Main Text */}
              <div className="px-4 py-1.5 bg-white/40 backdrop-blur-md border border-l-0 border-gray-100 rounded-r-full shadow-sm group-hover:bg-white/60 transition-colors duration-500">
                <span className="text-[9px] md:text-[10px] font-bold text-[#264653] uppercase tracking-[0.25em]">
                  এক নজরে ইনসান বিডি
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVars} className="relative">
              {/* Decorative Background Element */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#2A9D8F]/5 rounded-full blur-3xl -z-10" />

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#264653] tracking-tighter leading-[1.2] md:leading-[1.1]">
                {/* First Line */}
                <span className="relative inline-block">সহমর্মিতার হাত</span>

                <br />

                {/* Second Line with Curvy Underline */}
                <span className="relative inline-block mt-1 md:mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-[#2A9D8F] via-[#2A9D8F] to-[#264653] ">
                    একটি শিশুর জন্য
                  </span>

                  {/* Curvy Underline SVG */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-0 w-full h-6 md:h-8 -z-0 text-[#E9C46A]/60"
                  >
                    <svg
                      viewBox="0 0 300 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M5 15Q75 5 150 15T295 15"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                      />
                    </svg>
                  </motion.div>

                  <div className="absolute -right-10 md:-right-14 top-0 hidden sm:block">
                    <Sparkles size={35} className="text-[#E9C46A] animate-pulse" />
                  </div>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVars}
              className="text-base md:text-xl text-gray-500/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
            >
              আপনার সামান্য দান একটি এতিম শিশুর উজ্জ্বল ভবিষ্যতের চাবিকাঠি। আমরা
              স্বচ্ছতার সাথে কাজ করি।
            </motion.p>

            <motion.div
              variants={itemVars}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 mt-8"
            >
              {/* --- Primary Action Button (The "Special" One) --- */}
              <Link
                href={isLoggedIn ? "/donors/profile" : "/donors/register"}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative inline-flex items-center justify-center px-10 py-4 md:py-5 overflow-hidden font-black uppercase text-[10px] tracking-[0.3em] text-white transition-all duration-300 rounded-full bg-[#264653] shadow-[0_10px_30px_-10px_rgba(38,70,83,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(42,157,143,0.4)] active:scale-95"
              >
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#264653] to-[#2A9D8F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative">
                    <HeartHandshake
                      size={20}
                      className="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[10deg]"
                    />
                    {/* Small dot notification vibe */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E9C46A] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <span className="drop-shadow-md">
                    {isLoggedIn ? "আমার প্রোফাইল" : "দাতা হিসেবে যুক্ত হোন"}
                  </span>
                </div>

                {/* Subtle Border Glow */}
                <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/20 transition-colors" />
              </Link>

              {/* --- Secondary Action Button (Clean & Balanced) --- */}
              <Link href="/about-us" className="w-full md:w-auto">
                <button className="group relative flex items-center justify-center gap-4 px-10 py-4 md:py-5 border-2 border-[#264653]/10 text-[#264653] font-black uppercase text-[10px] tracking-[0.3em] hover:text-[#2A9D8F] hover:border-[#2A9D8F]/20 transition-all duration-300 rounded-full w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#2A9D8F]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  <div className="relative z-10 flex items-center gap-3">
                    <BookOpen
                      size={18}
                      className="text-[#2A9D8F] transition-all duration-300 group-hover:scale-110"
                    />
                    <span>আমাদের গল্প</span>
                  </div>
                </button>
              </Link>

              {/* Add this to your Tailwind Config or Global CSS for the shimmer effect */}
              <style jsx>{`
                @keyframes shimmer {
                  100% {
                    transform: translateX(100%);
                  }
                }
              `}</style>
            </motion.div>

            <motion.div
              variants={itemVars}
              className="hidden lg:flex items-center gap-12 pt-8 border-t border-gray-100 w-fit"
            >
              {stats.map((stat, i) => (
                <div key={i} className="group flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white shadow-sm border border-gray-50 group-hover:border-[#2A9D8F]/30 transition-colors duration-500">
                    <stat.icon
                      size={20}
                      style={{ color: stat.color }}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#264653] tracking-tight group-hover:text-[#2A9D8F] transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block lg:col-span-5 relative order-1 lg:order-2 h-[450px] sm:h-[600px] lg:h-auto">
            <div className="relative w-full h-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
              {/* Animated Geometric Orbit - Using professional teal/slate tones */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-[1px] border-[#2A9D8F]/15 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border-[1px] border-[#264653]/10 rounded-full"
              />

              {/* Central Core: Impact Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-tr from-[#2A9D8F]/10 to-transparent rounded-full blur-[100px]" />
                <div className="relative">
                  <div className="p-8 bg-white/40 backdrop-blur-3xl rounded-full border border-white/50 shadow-2xl">
                    <Users
                      size={50}
                      className="text-[#2A9D8F] opacity-40"
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Orbiting particles for life/energy */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-1/2 left-1/2 w-full h-full"
                      style={{
                        width: 120 + i * 40,
                        height: 120 + i * 40,
                        marginLeft: -(60 + i * 20),
                        marginTop: -(60 + i * 20),
                      }}
                    >
                      <div className="w-2 h-2 bg-[#E9C46A] rounded-full blur-[1px]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top Right: The Trust Card (Clean & Editorial) */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-0 w-[220px] md:w-80 bg-white/80 backdrop-blur-xl p-6 shadow-[0_30px_60px_-15px_rgba(38,70,83,0.15)] border-l-[6px] border-[#2A9D8F] z-20 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#2A9D8F]/10 flex items-center justify-center">
                    <Handshake size={20} className="text-[#2A9D8F]" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-100" />
                </div>
                <p className="text-[13px] md:text-base font-bold text-[#264653] leading-relaxed mb-4">
                  &quot;এতিমের মাথায় হাত বুলিয়ে দাও, হৃদয় নরম হবে।&quot;
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-[#2A9D8F] tracking-tighter">
                    — মুসনাদে আহমাদ
                  </span>
                  <Quote size={14} className="text-gray-200" />
                </div>
              </motion.div>

              {/* Bottom Left: Live Impact Stat */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 -left-4 md:left-0 w-[190px] md:w-64 bg-[#264653] p-6 shadow-3xl z-30 rounded-[2.5rem] overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={60} className="text-white" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-[#E9C46A] animate-ping" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      Live Transparency
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                      ১০০%
                    </p>
                    <p className="text-xs font-bold text-[#2A9D8F]">
                      সরাসরি সহযোগিতা
                    </p>
                  </div>
                  <p className="text-[10px] mt-4 text-white/50 leading-tight">
                    মাঝখানে কোনো মাধ্যম নেই, আপনার দান সরাসরি পৌঁছায় এতিমদের কাছে।
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge: Verification */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 -right-6 w-16 h-16 md:w-20 md:h-20 bg-[#E9C46A] rounded-2xl flex flex-col items-center justify-center text-[#264653] shadow-2xl z-40 transform -rotate-12 border-4 border-white"
              >
                <ShieldCheck size={28} />
                <span className="text-[8px] font-black uppercase mt-1">
                  Verified
                </span>
              </motion.div>

              {/* Decorative Elements for Depth */}
              <div className="absolute bottom-1/4 right-10 w-4 h-4 rounded-full bg-[#2A9D8F] opacity-20 animate-bounce" />
              <div className="absolute top-1/3 left-0 w-3 h-3 rounded-full bg-[#E9C46A] opacity-30 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* --- Improved Mobile Stats (App-style UI) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:hidden mt-16 relative"
        >
          {/* Background Decorative Blur for Mobile */}
          <div className="absolute -inset-4 bg-[#2A9D8F]/5 blur-3xl rounded-full -z-10" />

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] p-4 pt-6 rounded-[2rem] text-center"
              >
                {/* Small Floating Icon for each stat */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#264653] p-2 rounded-xl shadow-lg shadow-[#264653]/20">
                  <stat.icon size={12} className="text-white" />
                </div>

                <div className="space-y-1">
                  <p
                    className="text-xl font-black tracking-tighter"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[7px] font-black text-[#264653]/50 uppercase tracking-[0.2em] leading-tight">
                    {stat.label.split(" ").map((word, index) => (
                      <span key={index} className="block">
                        {word}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Bottom indicator line */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full opacity-30"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
