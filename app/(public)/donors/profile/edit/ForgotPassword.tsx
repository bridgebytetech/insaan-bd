"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ShieldCheck, KeyRound, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import donorProfileService from "@/app/lib/services/donorProfileService";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donorProfileService.forgotPassword(email);
      toast.success("আপনার ইমেইলে OTP পাঠানো হয়েছে");
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "ইমেইলটি সঠিক নয়");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donorProfileService.verifyOtp(email, otp);
      toast.success("ভেরিফিকেশন সফল! এখন পাসওয়ার্ড সেট করুন।");
      // এর পরের ধাপে নতুন পাসওয়ার্ড সেটের পেজে নিয়ে যেতে পারেন 
      // অথবা এখানেই ইনপুট ফিল্ড দেখাতে পারেন।
    } catch (err: any) {
      toast.error("ভুল OTP দিয়েছেন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl shadow-gray-100 border border-gray-50 text-center"
      >
        <div className="w-20 h-20 bg-[#2A9D8F]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#2A9D8F]">
          {step === 1 ? <Mail size={32} /> : <ShieldCheck size={32} />}
        </div>

        <h2 className="text-3xl font-black text-[#264653] tracking-tighter mb-2">
          {step === 1 ? "পাসওয়ার্ড ভুলে গেছেন?" : "ভেরিফিকেশন কোড"}
        </h2>
        <p className="text-gray-400 text-sm font-medium mb-10 leading-relaxed">
          {step === 1 
            ? "আপনার একাউন্টের ইমেইল দিন, আমরা একটি OTP কোড পাঠাবো।" 
            : `আপনার ${email} ইমেইলে পাঠানো ৬ সংখ্যার কোডটি দিন।`}
        </p>

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-6">
          {step === 1 ? (
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-all" size={20}/>
              <input 
                type="email" required
                placeholder="আপনার ইমেইল ঠিকানা"
                className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-bold outline-none focus:ring-2 focus:ring-[#2A9D8F]/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="relative group">
              <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-all" size={20}/>
              <input 
                type="text" required maxLength={6}
                placeholder="৬ সংখ্যার OTP দিন"
                className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-bold tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#2A9D8F]/20 transition-all"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-5 bg-[#264653] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#264653]/20 flex items-center justify-center gap-3 hover:bg-[#2A9D8F] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {step === 1 ? "OTP পাঠান" : "ভেরিফাই করুন"} 
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <button 
          onClick={() => step === 2 ? setStep(1) : window.history.back()}
          className="mt-8 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-[#E76F51] transition-all"
        >
          {step === 2 ? "ইমেইল ভুল? পুনরায় চেষ্টা করুন" : "ফিরে যান"}
        </button>
      </motion.div>
    </div>
  );
}