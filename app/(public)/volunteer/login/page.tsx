"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  ShieldCheck, Loader2, Key,
  ArrowLeft
} from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatus({ type: null, msg: '' });

  try {
    const response = await axios.post("https://api.insaanbd.org/api/auth/login", formData);
    
    if (response.data.success) {
      // আপনার API অনুযায়ী এখানaccessToken ই হলো মেইন টোকেন
      const token = response.data.data.accessToken; 
      const role = response.data.data.role;

      // সঠিক নামে সেভ করা হচ্ছে
      localStorage.setItem('volunteerToken', token); 
      localStorage.setItem('userRole', role);

      setStatus({ type: 'success', msg: 'লগইন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...' });

      setTimeout(() => {
        if(role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/volunteer/profile');
        }
      }, 1500);
    }
  } catch (error: any) {
    setStatus({ 
      type: 'error', 
      msg: error.response?.data?.message || 'ইমেইল বা পাসওয়ার্ড ভুল।' 
    });
  } finally {
    setLoading(false);
  }
};

  const inputClass = "w-full bg-gray-50/50 border border-gray-100 py-4 px-12 rounded-2xl focus:bg-white focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none transition-all duration-300 font-medium text-[#264653] placeholder:text-gray-400";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2A9D8F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#264653]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(38,70,83,0.08)] overflow-hidden border border-gray-50 relative z-10 p-8 md:p-12"
      >
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#2A9D8F] transition-colors mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </Link>

        <header className="mb-10">
          <h3 className="text-xl font-black tracking-tighter uppercase mb-2">
            Volunteer <span className="text-[#2A9D8F]">login</span>
          </h3>
          <h2 className="text-3xl font-black text-[#264653] uppercase tracking-tight leading-none">
            insaan <br /> bd
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-3">আপনার একাউন্টে লগইন করুন।</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div className="relative group">
            <Mail size={18} className={iconClass} />
            <input 
              required 
              type="email" 
              placeholder="ইমেইল এড্রেস" 
              className={inputClass}
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock size={18} className={iconClass} />
            <input 
              required 
              type={showPassword ? "text" : "password"} 
              placeholder="পাসওয়ার্ড" 
              className={inputClass}
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A9D8F]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot_password" className="text-[11px] font-bold text-gray-400 hover:text-[#2A9D8F] uppercase tracking-widest">
  Forgot Password?
</Link>
          </div>
   
          {/* Status Alert */}
          <AnimatePresence mode="wait">
            {status.msg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-2xl text-[11px] font-bold uppercase tracking-wider ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}
              >
                {status.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={loading} 
            className="group w-full bg-[#264653] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#2A9D8F] transition-all duration-500 disabled:opacity-50 shadow-[0_20px_40px_-10px_rgba(38,70,83,0.2)]"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Login Securely"} 
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
           <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              একাউন্ট নেই? <Link href="/volunteer/registration" className="text-[#2A9D8F] hover:underline ml-1">রেজিস্ট্রেশন করুন</Link>
           </p>
        </div>

        <div className="mt-6 flex justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
           <ShieldCheck size={20} className="text-[#264653]" />
           <span className="text-[10px] font-bold uppercase self-center tracking-tighter text-[#264653]">Secured by InsaanBD Auth</span>
        </div>
      </motion.div>
    </div>
  );
}