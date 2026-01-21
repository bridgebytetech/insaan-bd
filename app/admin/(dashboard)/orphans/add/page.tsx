"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import api from "@/app/lib/api/axios";
import {
  User, MapPin, ShieldCheck, Sparkles, BookOpen,
  Package, Stethoscope, HomeIcon, GraduationCap,
  ArrowRight, Loader2, ArrowLeft, Heart, Save
} from "lucide-react";
import Link from "next/link";

const needOptions = [
  { id: "EDUCATION", label: "শিক্ষা", icon: BookOpen },
  { id: "FOOD", label: "খাদ্য", icon: Package },
  { id: "MEDICAL", label: "চিকিৎসা", icon: Stethoscope },
  { id: "SHELTER", label: "আবাসন", icon: HomeIcon },
];

export default function AddOrphanAdmin() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    orphanName: "",
    orphanAge: 0,
    orphanGender: "MALE",
    orphanFatherName: "",
    orphanMotherName: "",
    orphanAddress: "",
    guardianName: "",
    guardianRelationship: "",
    guardianMobile: "",
    guardianNid: "",
    currentSchoolName: "",
    orphanClassGrade: "",
    previousSchoolName: "",
    typeOfSupport: "",
    currentSituation: "",
    orphanDpUrl: "https://dummy-url.com/photo.jpg",
    birthCertificateUrl: "https://dummy-url.com/birth.jpg",
    fatherDeathCertificateUrl: "https://dummy-url.com/death.jpg",
    orphanViaName: "Admin Panel",
    orphanViaContact: "Internal",
  });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Using your admin axios instance
      await api.post("/admin/orphans", formData);
      toast.success("সফলভাবে নতুন এতিম প্রোফাইল তৈরি করা হয়েছে!");
      setTimeout(() => router.push("/admin/orphans"), 1500);
    } catch (error) {
      toast.error("তথ্য সংরক্ষণে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all duration-300 placeholder:text-gray-400 font-medium text-[#264653]";
  const labelStyle = "block text-sm font-bold text-[#264653] mb-2 ml-1 uppercase tracking-wider";

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen animate-in fade-in duration-700">
      <Toaster position="top-right" />
      
      {/* Organic Background Decor */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-[#2A9D8F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-[#ECF4E8] rounded-full blur-[100px] pointer-events-none" />

      {/* Admin Header with Back Button */}
      <div className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <Link href="/admin/orphans" className="inline-flex items-center gap-2 text-[#2A9D8F] font-bold hover:gap-3 transition-all">
            <ArrowLeft size={20} /> ফিরে যান
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-[#264653]">
            নতুন <span className="text-[#2A9D8F]">প্রোফাইল</span> যোগ করুন
          </h1>
        </div>
        
        <div className="hidden md:block px-6 py-4 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Current Status</p>
          <p className="text-[#2A9D8F] font-black flex items-center gap-2">
            <Sparkles size={16} /> INTERNAL REGISTRATION
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto relative z-10 space-y-10 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Section 1: Child Identity */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-xl shadow-[#264653]/5 border border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#264653] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-black text-[#264653]">শিশুর তথ্য</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelStyle}>শিশুর নাম</label>
                  <input required type="text" placeholder="পুরো নাম লিখুন" className={inputStyle} 
                    onChange={(e) => setFormData({...formData, orphanName: e.target.value})} />
                </div>
                <div>
                  <label className={labelStyle}>বয়স</label>
                  <input required type="number" className={inputStyle} 
                    onChange={(e) => setFormData({...formData, orphanAge: Number(e.target.value)})} />
                </div>
                <div>
                  <label className={labelStyle}>লিঙ্গ</label>
                  <select className={inputStyle} onChange={(e) => setFormData({...formData, orphanGender: e.target.value})}>
                    <option value="MALE">ছেলে</option>
                    <option value="FEMALE">মেয়ে</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>বর্তমান ঠিকানা</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A9D8F]" size={20} />
                    <input required type="text" className={`${inputStyle} pl-12`} placeholder="ঠিকানা লিখুন"
                      onChange={(e) => setFormData({...formData, orphanAddress: e.target.value})} />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Education */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#264653] p-8 md:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                <GraduationCap size={150} />
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#2A9D8F] backdrop-blur-md">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-black">শিক্ষাগত তথ্য</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase ml-2">বর্তমান স্কুল</label>
                  <input placeholder="স্কুলের নাম" className="w-full p-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:bg-white focus:text-[#264653] transition-all" 
                    onChange={(e) => setFormData({...formData, currentSchoolName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase ml-2">শ্রেণি</label>
                  <input placeholder="শ্রেণি" className="w-full p-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:bg-white focus:text-[#264653] transition-all" 
                    onChange={(e) => setFormData({...formData, orphanClassGrade: e.target.value})} />
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Guardian Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-[#264653]/5 border border-white"
            >
              <h3 className="text-lg font-black text-[#264653] mb-6 flex items-center gap-2">
                <ShieldCheck className="text-[#2A9D8F]" size={20} /> অভিভাবক
              </h3>
              <div className="space-y-4">
                <input placeholder="নাম" className={inputStyle} onChange={(e) => setFormData({...formData, guardianName: e.target.value})} />
                <input placeholder="সম্পর্ক" className={inputStyle} onChange={(e) => setFormData({...formData, guardianRelationship: e.target.value})} />
                <input placeholder="মোবাইল" className={inputStyle} onChange={(e) => setFormData({...formData, guardianMobile: e.target.value})} />
              </div>
            </motion.div>

            {/* Support Type Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-[#264653]/5 border border-white"
            >
              <h3 className="text-lg font-black text-[#264653] mb-6">সহায়তার ধরণ</h3>
              <div className="grid grid-cols-2 gap-3">
                {needOptions.map((opt) => (
                  <label key={opt.id} className="cursor-pointer">
                    <input type="radio" name="support" className="hidden peer" onChange={() => setFormData({...formData, typeOfSupport: opt.id})} />
                    <div className="py-4 bg-[#ECF4E8]/50 border border-transparent rounded-2xl flex flex-col items-center gap-2 transition-all peer-checked:bg-[#2A9D8F] peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-[#2A9D8F]/30">
                      <opt.icon size={20} />
                      <span className="font-bold text-[10px] uppercase tracking-tighter">{opt.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Sticky Submit Button */}
            <div className="sticky top-24">
              <motion.button
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-[#2A9D8F] text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-[#2A9D8F]/30 flex items-center justify-center gap-3 group transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Save /> সংরক্ষণ করুন</>}
              </motion.button>
              <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-[0.2em]">Verify all info before saving</p>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}