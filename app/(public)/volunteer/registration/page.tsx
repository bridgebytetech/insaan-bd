"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Lock, 
  Camera, Eye, EyeOff, ArrowRight, CheckCircle2, Loader2, Sparkles
} from "lucide-react";
import Link from 'next/link';
import axios from 'axios';

import Footer from "@/app/components/shared/Footer";

export default function VolunteerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    volunteerName: '',
    volunteerEmail: '',
    volunteerContact: '',
    volunteerAddress: '',
    volunteerPassword: '',
    volunteerDpUrl: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await axios.post("https://api.insaanbd.org/api/public/upload", uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        setFormData(prev => ({ ...prev, volunteerDpUrl: res.data.data.url }));
        setStatus({ type: 'success', msg: 'ছবি আপলোড সফল হয়েছে!' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'ছবি আপলোড ব্যর্থ হয়েছে।' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      await axios.post("https://api.insaanbd.org/api/auth/volunteer/register", formData);
      setStatus({ type: 'success', msg: 'রেজিস্ট্রেশন সফল হয়েছে! আমরা আপনার সাথে যোগাযোগ করব।' });
    } catch (error: any) {
      setStatus({ type: 'error', msg: error.response?.data?.message || 'রেজিস্ট্রেশন সফল হয়নি।' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-100 py-4 px-12 rounded-2xl focus:bg-white focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none transition-all duration-300 font-medium text-[#264653] placeholder:text-gray-400 placeholder:font-normal";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] group-focus-within:scale-110 transition-all duration-300";

  return (
    <>
    
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2A9D8F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E76F51]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(38,70,83,0.08)] overflow-hidden border border-gray-50 relative z-10"
      >
        
        {/* --- Left Side: Branding (4 cols) --- */}
        <div className="lg:col-span-5 bg-[#264653] p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
             <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-[#2A9D8F] rotate-45" />
          </div>

          <div className="relative z-10">
            <Link href="/" className="inline-block group">
               <h3 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                Insaan <span className="text-[#2A9D8F] group-hover:text-white transition-colors">BD</span>
               </h3>
            </Link>
            
            <div className="mt-16 md:mt-24">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <span className="inline-block px-4 py-1 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Join the mission</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-6 uppercase leading-tight">
                  আপনার <span className="text-[#2A9D8F]">দক্ষতা</span> <br /> শিশুদের হাসির <br /> কারণ হোক
                </h1>
                <p className="text-gray-400 font-medium leading-relaxed max-w-sm mt-4">
                  স্বেচ্ছাসেবী হিসেবে আমাদের সাথে যুক্ত হয়ে আপনি একটি সুন্দর সমাজ বিনির্মাণে সরাসরি ভূমিকা রাখতে পারেন।
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mt-12 space-y-5 relative z-10 border-t border-white/10 pt-8">
            {["৬৪ জেলায় কার্যক্রম", "সরাসরি ইমপ্যাক্ট", "অভিজ্ঞতা ও সার্টিফিকেট"].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2A9D8F]/20 flex items-center justify-center">
                  <CheckCircle2 className="text-[#2A9D8F]" size={14}/>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Side: Form (7 cols) --- */}
        <div className="lg:col-span-7 p-8 md:p-16 bg-white">
          <div className="max-w-xl mx-auto">
            
            <header className="mb-10 text-center md:text-left">
               <h2 className="text-2xl font-black text-[#264653] uppercase tracking-tight">Volunteer Registration</h2>
               <p className="text-gray-400 text-sm font-medium mt-1">অনুগ্রহ করে নিচের তথ্যগুলো সঠিকভাবে প্রদান করুন।</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center md:items-start mb-10">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-28 h-28 rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#2A9D8F] hover:bg-white transition-all overflow-hidden group shadow-inner"
                >
                  {formData.volunteerDpUrl ? (
                    <img src={`https://api.insaanbd.org/uploads/${formData.volunteerDpUrl}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {uploading ? <Loader2 className="animate-spin text-[#2A9D8F]" /> : <Camera className="text-gray-300 group-hover:text-[#2A9D8F] w-8 h-8" />}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#264653]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Sparkles size={18} className="text-[#2A9D8F] animate-pulse" />
                  </div>
                </motion.div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <p className="mt-3 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Upload Photo</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* Name */}
                <div className="relative group">
                  <User size={18} className={iconClass} />
                  <input required type="text" placeholder="আপনার পূর্ণ নাম" className={inputClass}
                    value={formData.volunteerName} onChange={(e) => setFormData({...formData, volunteerName: e.target.value})} />
                </div>

                {/* Email - Full Width */}
                <div className="relative group">
                  <Mail size={18} className={iconClass} />
                  <input required type="email" placeholder="ইমেইল এড্রেস" className={inputClass}
                    value={formData.volunteerEmail} onChange={(e) => setFormData({...formData, volunteerEmail: e.target.value})} />
                </div>

                {/* Contact & Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative group">
                    <Phone size={18} className={iconClass} />
                    <input required type="text" placeholder="ফোন নম্বর" className={inputClass}
                      value={formData.volunteerContact} onChange={(e) => setFormData({...formData, volunteerContact: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <MapPin size={18} className={iconClass} />
                    <input required type="text" placeholder="ঠিকানা" className={inputClass}
                      value={formData.volunteerAddress} onChange={(e) => setFormData({...formData, volunteerAddress: e.target.value})} />
                  </div>
                </div>

                {/* Password */}
                <div className="relative group">
                  <Lock size={18} className={iconClass} />
                  <input required type={showPassword ? "text" : "password"} placeholder="পাসওয়ার্ড" className={inputClass}
                    value={formData.volunteerPassword} onChange={(e) => setFormData({...formData, volunteerPassword: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A9D8F] transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Status Alert */}
              <AnimatePresence mode="wait">
                {status.msg && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-2xl text-[11px] font-bold uppercase tracking-wider ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}
                  >
                    {status.msg}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                disabled={loading || uploading} 
                className="group w-full bg-[#264653] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#2A9D8F] transition-all duration-500 disabled:opacity-50 shadow-[0_20px_40px_-10px_rgba(38,70,83,0.2)]"
              >
                {loading ? "Processing..." : "Confirm Registration"} 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 text-center">
               <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
                  ইতিমধ্যে একাউন্ট আছে? <Link href="/volunteer/login" className="text-[#2A9D8F] hover:underline ml-1">লগইন করুন</Link>
               </p>
            </div>
          </div>
        </div>
      </motion.div>
     
    </div>
    <Footer />
    </>
  );
}