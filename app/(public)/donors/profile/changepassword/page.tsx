"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import donorApi from '@/app/lib/api/donorApi'; // আপনার দেওয়া ইন্টারসেপ্টর ফাইলটি এখানে ইমপোর্ট করুন

export default function ChangePassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // পাসওয়ার্ড ভ্যালিডেশন: লেটার এবং নাম্বার থাকতে হবে
  const hasLetter = /[A-Za-z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const isLengthValid = formData.newPassword.length >= 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ক্লায়েন্ট সাইড ভ্যালিডেশন
    if (!hasLetter || !hasNumber) {
      return toast.error("Password must contain both letters and numbers");
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    setLoading(true);
    try {
      const res = await donorApi.post('/donor/change-password', formData);
      
      if (res.data.success) {
        toast.success(res.data.message || "Password changed successfully!");
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        // ২ সেকেন্ড পর প্রোফাইল বা ড্যাশবোর্ডে রিডাইরেক্ট
        setTimeout(() => router.push('/donors/profile'), 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password. Please check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-[#264653]/5 border border-gray-100 relative overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-bl-full -z-0" />

        <div className="relative z-10">
          <div className="w-14 h-14 bg-[#264653] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#264653]/20">
            <ShieldCheck className="text-[#2A9D8F]" size={28} />
          </div>

          <h1 className="text-3xl font-black text-[#264653] uppercase tracking-tight leading-none mb-2">
            Change <br />
            <span className="text-[#2A9D8F]">Password</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Secure your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-300" size={18} />
                <input 
                  required
                  type={showCurrentPass ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-12 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653] transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#2A9D8F]"
                >
                  {showCurrentPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-300" size={18} />
                <input 
                  required
                  type={showNewPass ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-12 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653] transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#2A9D8F]"
                >
                  {showNewPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-300" size={18} />
                <input 
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-6 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653] transition-all"
                />
              </div>
            </div>

            {/* Password Requirement Indicators */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter ${hasLetter && hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                {hasLetter && hasNumber ? <CheckCircle2 size={12}/> : <XCircle size={12}/>} Letter & Number
              </div>
              <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter ${formData.newPassword === formData.confirmPassword && formData.confirmPassword !== '' ? 'text-green-500' : 'text-gray-400'}`}>
                {formData.newPassword === formData.confirmPassword && formData.confirmPassword !== '' ? <CheckCircle2 size={12}/> : <XCircle size={12}/>} Passwords Match
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#264653] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#2A9D8F] transition-all flex justify-center items-center gap-2 shadow-xl shadow-[#264653]/10 mt-6"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
            </button>
          </form>

          <button 
            onClick={() => router.back()}
            className="w-full mt-4 text-[10px] font-black text-gray-400 hover:text-[#2A9D8F] uppercase tracking-[0.2em] transition-all"
          >
            Cancel and Return
          </button>
        </div>
      </motion.div>
    </div>
  );
}