"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  User, MapPin, Phone, IdCard, Heart, FileText, Camera,
  CheckCircle2, ShieldCheck, ArrowRight, Sparkles, BookOpen,
  Package, Stethoscope, HomeIcon, GraduationCap, School,
  History, Loader2, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowUp
} from "lucide-react";

const needOptions = [
  { id: "EDUCATION", label: "শিক্ষা", icon: BookOpen },
  { id: "FOOD", label: "খাদ্য", icon: Package },
  { id: "MEDICAL", label: "চিকিৎসা", icon: Stethoscope },
  { id: "SHELTER", label: "আবাসন", icon: HomeIcon },
];

export default function OrphanRegistration() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
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
    orphanViaName: "Direct",
    orphanViaContact: "N/A",
    orphanViaAddress: "N/A",
    orphanViaRelation: "N/A"
  });

  useEffect(() => { 
    setMounted(true);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://api.insaanbd.org/api/public/orphans/register", formData);
      toast.success("নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!");
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all duration-300 placeholder:text-gray-400 font-medium";
  const labelStyle = "block text-sm font-bold text-[#264653] mb-2 ml-1 uppercase tracking-wider";

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#EDF4E8] relative overflow-x-hidden">
      <Toaster />
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ECF4E8] rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-[#2A9D8F]/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 pt-32 pb-24 px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> New Application
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-[#264653] mb-6">
            এতিম শিশুর <span className="text-[#2A9D8F] italic font-serif">নিবন্ধন</span>
          </h1>
          <p className="text-gray-500 font-medium">নির্ভুল তথ্য দিয়ে ফর্মটি পূরণ করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Child Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#264653] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#264653]/20">
                <User size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">শিশুর তথ্য</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>শিশুর নাম</label>
                <input required type="text" placeholder="পুরো নাম" className={inputStyle} 
                  onChange={(e) => setFormData({...formData, orphanName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div>
                <label className={labelStyle}>পিতার নাম</label>
                <input required type="text" className={inputStyle} onChange={(e) => setFormData({...formData, orphanFatherName: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>মাতার নাম</label>
                <input required type="text" className={inputStyle} onChange={(e) => setFormData({...formData, orphanMotherName: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>বর্তমান ঠিকানা</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A9D8F]" size={20} />
                  <input required type="text" className={`${inputStyle} pl-12`} onChange={(e) => setFormData({...formData, orphanAddress: e.target.value})} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Guardian Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2A9D8F]/20">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">অভিভাবকের তথ্য</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <input placeholder="অভিভাবকের নাম" className={inputStyle} onChange={(e) => setFormData({...formData, guardianName: e.target.value})} />
              <input placeholder="সম্পর্ক (উদাঃ মা)" className={inputStyle} onChange={(e) => setFormData({...formData, guardianRelationship: e.target.value})} />
              <input placeholder="মোবাইল নাম্বার" className={inputStyle} onChange={(e) => setFormData({...formData, guardianMobile: e.target.value})} />
              <input placeholder="NID নম্বর" className={inputStyle} onChange={(e) => setFormData({...formData, guardianNid: e.target.value})} />
            </div>
          </motion.div>

          {/* Section 3: Educational Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#E76F51] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#E76F51]/20">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#264653]">শিক্ষাগত তথ্য</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <input placeholder="বর্তমান স্কুলের নাম" className={inputStyle} onChange={(e) => setFormData({...formData, currentSchoolName: e.target.value})} />
              <input placeholder="শ্রেণি" className={inputStyle} onChange={(e) => setFormData({...formData, orphanClassGrade: e.target.value})} />
              <input className="md:col-span-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 outline-none" placeholder="পূর্বের স্কুলের নাম" onChange={(e) => setFormData({...formData, previousSchoolName: e.target.value})} />
            </div>
          </motion.div>

          {/* Section 4: Needs */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-[#264653]">সহায়তার ধরণ</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {needOptions.map((opt) => (
                <label key={opt.id} className="cursor-pointer group">
                  <input type="radio" name="support" className="hidden peer" onChange={() => setFormData({...formData, typeOfSupport: opt.id})} />
                  <div className="py-4 px-2 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center gap-2 transition-all peer-checked:bg-[#2A9D8F] peer-checked:text-white">
                    <opt.icon size={20} />
                    <span className="font-bold text-[11px]">{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
            <textarea rows={4} className={inputStyle} placeholder="শিশুর বর্তমান পরিস্থিতি লিখুন..." 
              onChange={(e) => setFormData({...formData, currentSituation: e.target.value})} />
          </motion.div>

          <div className="flex flex-col items-center gap-8 pt-8 pb-12">
            <motion.button
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-6 bg-[#264653] text-white rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-[#2A9D8F] transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "নিবন্ধন জমা দিন"}
              <ArrowRight />
            </motion.button>
          </div>
        </form>
      </div>

      {/* --- FOOTER INTEGRATION --- */}
      <footer className="relative bg-[#264653] pt-24 pb-12 overflow-hidden border-t-4 border-[#2A9D8F]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 pb-20 border-b border-white/10">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center shadow-xl shadow-[#2A9D8F]/20">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  ইনসান <span className="text-[#2A9D8F]">বিডি</span>
                </h3>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
                অনাথ শিশুদের অধিকার রক্ষায় আমরা প্রতিজ্ঞাবদ্ধ। নিবন্ধিত প্রতিটি শিশুর তথ্য অত্যন্ত গোপনীয়তার সাথে সংরক্ষণ করা হয়।
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
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">সহায়তা</h4>
                <ul className="space-y-4">
                  {["কিভাবে কাজ করে", "নিবন্ধন পদ্ধতি", "সচরাচর প্রশ্ন", "গোপনীয়তা"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#E76F51] pb-2 inline-block">ফাউন্ডেশন</h4>
                <ul className="space-y-4">
                  {["আমাদের লক্ষ্য", "প্রকল্পসমূহ", "যোগাযোগ", "অফিস"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-bold">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-6">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">সাপোর্ট</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 text-white/40">
                    <Phone size={18} className="text-[#2A9D8F] shrink-0" />
                    <p className="text-sm font-bold leading-snug">+৮৮০ ১৭০০-০০০০০০</p>
                  </div>
                  <a href="mailto:support@insaanbd.org" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-bold">
                    <Mail size={18} className="text-[#2A9D8F]" /> support@insaanbd.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
              © ২০২৬ ইনসান বিডি। তথ্য সুরক্ষা নীতি মেনে পরিচালিত।
            </p>
          </div>
        </div>

        {/* Back To Top */}
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