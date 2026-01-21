"use client";
import { motion } from "framer-motion";
import { Quote, Star, Plus, CheckCircle2, Heart, GraduationCap, Users } from "lucide-react";

const stories = [
  { 
    name: "সিয়াম আহমেদ", 
    type: "Orphan", 
    tag: "IMPACTED CHILD",
    quote: "আমি কোনোদিন ভাবিনি স্কুলে যেতে পারবো। এখন আমি বড় হয়ে ইঞ্জিনিয়ার হওয়ার স্বপ্ন দেখি।", 
    icon: GraduationCap,
    color: "#2A9D8F",
    year: "Batch 2024"
  },
  { 
    name: "রাহাত চৌধুরী", 
    type: "Donor", 
    tag: "CHILD SPONSOR",
    quote: "ইনসান বিডি-এর মাধ্যমে আমি একটি শিশুর শিক্ষার দায়িত্ব নিতে পেরেছি। এটি আমার জীবনের সেরা সিদ্ধান্ত।", 
    icon: Heart,
    color: "#E76F51",
    year: "Donor since '23"
  },
  { 
    name: "ফাতেমা বেগম", 
    type: "Community", 
    tag: "LOCAL GUARDIAN",
    quote: "আমাদের এলাকার এতিম শিশুদের যেভাবে ইনসান ফাউন্ডেশন আগলে রেখেছে, তা সত্যিই ভরসার জায়গা।", 
    icon: Users,
    color: "#264653",
    year: "Community Leader"
  },
];

export default function SuccessStories() {
  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[#F8F9FA] -z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#2A9D8F]" />
              <span className="text-[#2A9D8F] font-black uppercase tracking-[0.6em] text-[10px]">Unified Voices</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-[#264653] tracking-tighter leading-[0.85]">
              আশার <br /> <span className="text-gray-200">প্রতিধ্বনি</span>
            </h2>
          </div>
          
          <div className="max-w-sm text-left lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-[#2A9D8F] pl-6 lg:pl-0 lg:pr-6 py-2">
             <p className="text-gray-400 font-bold text-sm leading-relaxed">
               দাতার ভালোবাসা, শিশুর স্বপ্ন এবং সমাজের আশীর্বাদ—এই তিনের সমন্বয়েই আমাদের পথচলা।
             </p>
          </div>
        </div>

        {/* --- PERSPECTIVE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100 shadow-2xl shadow-gray-200/50">
          {stories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border-r border-b lg:border-b-0 border-gray-100 p-12 min-h-[550px] flex flex-col justify-between hover:bg-gray-50 transition-all duration-700 overflow-hidden"
            >
              {/* Top Meta Info */}
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                   <p className="text-[10px] font-black tracking-[0.3em] uppercase transition-colors" style={{ color: item.color }}>
                     {item.tag}
                   </p>
                   <p className="text-[9px] font-mono text-gray-300 group-hover:text-gray-400">{item.year}</p>
                </div>
                <item.icon size={20} className="text-gray-200 group-hover:text-[#264653] transition-colors" />
              </div>

              {/* The Quote Body */}
              <div className="relative flex-grow">
                <Quote size={40} className="text-gray-50 absolute -top-6 -left-4 -z-10 group-hover:text-[#2A9D8F]/10 transition-colors" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#264653] leading-snug tracking-tight">
                  "{item.quote}"
                </h3>
              </div>

              {/* Bottom Profile Area */}
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 bg-[#F8F9FA] rounded-none border border-gray-100 flex items-center justify-center text-[#264653] font-black text-2xl group-hover:border-[#2A9D8F] transition-all relative">
                     {item.name.charAt(0)}
                     <div className="absolute -top-1 -right-1">
                        <Plus size={14} className="text-[#E76F51]" />
                     </div>
                   </div>
                   
                   <div>
                      <h4 className="text-[#264653] font-black text-sm uppercase tracking-widest leading-none mb-2">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-[#2A9D8F]" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Identity</span>
                      </div>
                   </div>
                </div>

                {/* Progress Bar Accent */}
                <div className="h-[1px] w-full bg-gray-100 overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full w-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>

              {/* Large Background Watermark Tag */}
              <span className="absolute -bottom-4 -right-4 text-7xl font-black text-gray-50 group-hover:text-gray-100/50 transition-colors pointer-events-none uppercase">
                {item.type}
              </span>
            </motion.div>
          ))}
        </div>

        {/* --- GLOBAL IMPACT BAR --- */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-10 border border-gray-100 bg-white">
           <div className="flex items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-3xl font-black text-[#264653] tracking-tighter">১২০০+</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lives Impacted</p>
              </div>
              <div className="w-[1px] h-10 bg-gray-100 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-3xl font-black text-[#264653] tracking-tighter">৫০+</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Communities</p>
              </div>
           </div>
           
           <button className="group flex items-center gap-4 bg-[#264653] text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#2A9D8F] transition-all shadow-xl">
             সবগুলো গল্প দেখুন <Plus size={16} className="group-hover:rotate-90 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
}