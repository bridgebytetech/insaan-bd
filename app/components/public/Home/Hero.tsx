"use client";

import { useState, useEffect } from "react";
import { ChevronRight, PlayCircle, Heart, Quote } from "lucide-react";
import {motion } from "framer-motion"
import Image from "next/image";

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

  return (
    <section className="relative  min-h-screen flex items-center  bg-[#FDFDFD] overflow-hidden pt-24 pb-16 lg:cursor-none  inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]">
      {/* CUSTOM MAGNETIC CURSOR */}
      <div
        className={`fixed w-8 h-8 rounded-full border-2 border-[#2A9D8F] pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden lg:block ${
          isHovering ? "scale-[2.5] bg-[#2A9D8F]/10" : "scale-100"
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%)`,
        }}
      />
      <div
        className="fixed w-1.5 h-1.5 bg-[#2A9D8F] rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%)`,
        }}
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ECF4E8] rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2A9D8F]/10 rounded-full blur-[100px] opacity-40" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center gap-12">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#264653]/5 to-[#2A9D8F]/10 border border-[#2A9D8F]/20 rounded-full backdrop-blur-md shadow-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A9D8F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A9D8F]"></span>
              </div>
              <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.25em]">
                Beginning a New Journey • 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#264653] leading-[1.05] tracking-tight">
              সহমর্মিতার হাত <br />
              <span className="text-[#2A9D8F]  font-serif inline-block mt-2">
                একটি শিশুর জন্য
              </span>
            </h1>

            <p className="text-lg text-[#4A6651]/80 leading-relaxed max-w-lg font-medium">
              আপনার সামান্য অবদান হতে পারে একটি এতিম শিশুর উজ্জ্বল ভবিষ্যতের
              চাবিকাঠি। আমরা স্বচ্ছতার সাথে আপনার দান পৌঁছে দেই সঠিক শিশুর কাছে।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 w-full max-w-md md:max-w-none md:w-fit">
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#264653] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#264653]/20 transition-all duration-300 hover:bg-[#2A9D8F] active:scale-95"
              >
                <span>Join as a Donor</span>
                <ChevronRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-bold text-[#264653] transition-all hover:bg-gray-50 hover:border-[#2A9D8F]/30 active:scale-95 shadow-sm"
              >
                <PlayCircle size={20} className="text-[#2A9D8F]" />
                <span>Our Mission</span>
              </button>
            </div>
            {/* HADITH QUOTE SECTION */}
            <div className="pt-8 border-t border-gray-100 relative max-w-lg">
              <Quote className="absolute -top-1 -left-2 w-8 h-8 text-[#2A9D8F]/10 -scale-x-100" />
              <div className="pl-6">
                <p className="text-[#264653] font-medium leading-relaxed italic text-sm md:text-base">
                  "যদি তুমি তোমার হৃদয় নরম করতে চাও তাহলে দরিদ্রকে খানা খাওয়াও
                  এবং এতিমের মাথায় হাত বুলিয়ে দাও।"
                </p>
                <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-[#2A9D8F]"></span>
                  মুসনাদে আহমাদ: ২/৩৮৭
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
           {/* <div className="w-full lg:w-1/2 relative h-[450px] md:h-[600px]">
            <div className="absolute top-0 right-0 w-[80%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10 group">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                alt="Impact"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-3xl overflow-hidden shadow-2xl z-20 border-[8px] border-white group">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop"
                alt="Education"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute top-[15%] left-[5%] w-16 bg-[#264A5D] h-16 rounded-2xl flex items-center justify-center shadow-xl z-30 -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
              <Heart size={28} className="text-white" fill="white" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-[#2A9D8F]/5 rounded-[4rem] -rotate-3 -z-10" />
          </div>  */}
        </div>
      </div>
    </section>
  );
}
