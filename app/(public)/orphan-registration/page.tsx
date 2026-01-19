"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Phone,
  IdCard,
  Heart,
  FileText,
  Camera,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  Package,
  Stethoscope,
  HomeIcon,
  GraduationCap,
  School,
  History,
} from "lucide-react";

const needOptions = [
  { id: "edu", label: "শিক্ষা", icon: BookOpen },
  { id: "food", label: "খাদ্য", icon: Package },
  { id: "med", label: "চিকিৎসা", icon: Stethoscope },
  { id: "home", label: "আবাসন", icon: HomeIcon },
];

export default function OrphanRegistration() {
  const [formData, setFormData] = useState({
    needs: [],
    consent: false,
  });

  const inputStyle =
    "w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all duration-300 placeholder:text-gray-400 font-medium";
  const labelStyle =
    "block text-sm font-bold text-[#264653] mb-2 ml-1 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#EDF4E8] relative overflow-hidden pt-32 pb-24 px-6">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ECF4E8] rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2A9D8F]/10 rounded-full blur-[100px] opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} /> New Application
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-[#264653] mb-6">
            এতিম শিশুর{" "}
            <span className="text-[#2A9D8F] italic font-serif">নিবন্ধন</span>
          </h1>
          <p className="text-lg text-[#4A6651]/80 max-w-2xl mx-auto leading-relaxed">
            আপনি যদি কোনো এতিম শিশুর অভিভাবক হন অথবা এমন কাউকে চেনেন যার সহায়তা
            প্রয়োজন, তাহলে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* Form */}
        <form className="space-y-12">
          
          {/* --- 1. Child Info --- */}
          {/* (আগের মতোই থাকবে) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#264653] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#264653]/20">
                <User size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">
                শিশুর তথ্য (Child Information)
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>শিশুর নাম</label>
                <input type="text" placeholder="পুরো নাম লিখুন" className={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>বয়স</label>
                  <input type="number" placeholder="উদাঃ ৮" className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>লিঙ্গ</label>
                  <select className={inputStyle}>
                    <option>ছেলে</option>
                    <option>মেয়ে</option>
                    <option>অন্যান্য</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelStyle}>পিতার নাম (মৃত হলে উল্লেখ)</label>
                <input type="text" className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>মাতার নাম</label>
                <input type="text" className={inputStyle} />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>বর্তমান ঠিকানা</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A9D8F]" size={20} />
                  <input type="text" placeholder="গ্রাম, ডাকঘর, উপজেলা" className={`${inputStyle} pl-12`} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- 2. Guardian Info --- */}
          {/* (আগের মতোই থাকবে) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2A9D8F]/20">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">
                অভিভাবকের তথ্য
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>অভিভাবকের নাম</label>
                <input type="text" className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>সম্পর্ক</label>
                <input type="text" placeholder="উদাঃ মামা / মা" className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>মোবাইল নাম্বার</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="tel" className={`${inputStyle} pl-12`} />
                </div>
              </div>
              <div>
                <label className={labelStyle}>জাতীয় পরিচয়পত্র নম্বর (NID)</label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" className={`${inputStyle} pl-12`} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- 3. Educational Information (NEW SECTION) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#E76F51] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#E76F51]/20">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">
                শিক্ষাগত তথ্য (Educational Info)
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className={labelStyle}>বর্তমান স্কুলের নাম</label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E76F51]" size={20} />
                  <input type="text" placeholder="স্কুলের নাম লিখুন (যদি থাকে)" className={`${inputStyle} pl-12`} />
                </div>
              </div>
              
              <div>
                <label className={labelStyle}>বর্তমান শ্রেণী / গ্রেড</label>
                <input type="text" placeholder="উদাঃ ৫ম শ্রেণী" className={inputStyle} />
              </div>

              <div>
                <label className={labelStyle}>আগের স্কুলের নাম (যদি থাকে)</label>
                <div className="relative">
                  <History className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="পূর্ববর্তী স্কুল" className={`${inputStyle} pl-12`} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- 4. Assistance Needs --- */}
          {/* (বাকি অংশ আগের মতোই থাকবে...) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-[#264653]">
                <div className="w-8 h-8 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center">
                  <Heart size={16} className="text-[#2A9D8F]" fill="currentColor" />
                </div>
                সহায়তার ধরণ
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {needOptions.map((opt) => (
                  <label key={opt.id} className="cursor-pointer group">
                    <input type="checkbox" className="hidden peer" />
                    <div className="py-4 px-2 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center gap-2 transition-all duration-200 peer-checked:bg-[#2A9D8F] peer-checked:border-transparent group-hover:bg-gray-100">
                      <opt.icon size={20} strokeWidth={2} className="text-gray-400 peer-checked:text-white group-hover:text-[#2A9D8F] transition-colors duration-200" />
                      <span className="font-bold text-[11px] uppercase tracking-wider text-gray-500 peer-checked:text-white">
                        {opt.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em] ml-1">
                  শিশুর বর্তমান অবস্থা
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none focus:ring-1 focus:ring-[#2A9D8F] focus:bg-white transition-all duration-300 placeholder:text-gray-300 text-[#264653] text-sm resize-none"
                  placeholder="সংক্ষেপে শিশুর বর্তমান পরিস্থিতি লিখুন..."
                />
              </div>
            </div>
          </motion.div>

          {/* --- Document Upload & Submit --- */}
          {/* (আগের মতোই থাকবে...) */}
          <div className="grid md:grid-cols-3 gap-6">
             {[
               { label: "শিশুর জন্ম সনদ", desc: "Birth Certificate (Child)", icon: FileText },
               { label: "পিতার মৃত্যু সনদ", desc: "Death Certificate (Father)", icon: ShieldCheck },
               { label: "শিশুর সাম্প্রতিক ছবি", desc: "Recent Photo", icon: Camera },
             ].map((doc, i) => (
               <div key={i} className="group relative">
                 <div className="h-40 rounded-[2rem] border-2 border-dashed border-gray-100 bg-white flex flex-col items-center justify-center p-6 transition-all hover:border-[#2A9D8F] hover:bg-[#F9FFFF]">
                   <doc.icon size={24} className="text-gray-300 group-hover:text-[#2A9D8F] mb-3" />
                   <span className="text-xs font-bold text-[#264653] uppercase">{doc.label}</span>
                   <span className="text-[10px] text-gray-400 mt-1">{doc.desc}</span>
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                 </div>
               </div>
             ))}
           </div>

           <div className="flex flex-col items-center gap-8 pt-8">
             <label className="flex items-center gap-4 cursor-pointer group">
               <input type="checkbox" className="peer hidden" />
               <div className="w-6 h-6 border-2 border-[#2A9D8F] rounded-lg flex items-center justify-center peer-checked:bg-[#2A9D8F] transition-all">
                 <CheckCircle2 size={16} className="text-white" />
               </div>
               <span className="text-[#4A6651] font-medium select-none">
                 আমি নিশ্চিত করছি প্রদত্ত তথ্য সঠিক
               </span>
             </label>

             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="w-full md:w-auto px-12 py-6 bg-[#264653] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-[#264653]/30 flex items-center justify-center gap-4 group hover:bg-[#2A9D8F] transition-all duration-300"
             >
               নিবন্ধন জমা দিন
               <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </motion.button>
           </div>
        </form>
      </div>
    </div>
  );
}