"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, ArrowLeft, Loader2, Timer, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/app/lib/api/axios';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
    role: 'DONOR' // Defaulted to DONOR, ADMIN removed
  });

  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const isValidPassword = (pass: string) => {
    return /[A-Za-z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { 
        email: formData.email.trim().toLowerCase(), 
        role: formData.role 
      });
      if (res.data.success) {
        toast.success(res.data.message || "OTP sent successfully!");
        setStep(2);
        setTimer(120);
        setCanResend(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length < 4) return toast.error("Please enter a valid OTP");
    
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password/verify-otp', {
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp
      });
      if (res.data.success) {
        toast.success(res.data.message || "OTP Verified!");
        setStep(3);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!isValidPassword(formData.newPassword)) {
      return toast.error("Password must contain both letters and numbers");
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', {
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      
      if (res.data.success) {
        toast.success(res.data.message || "Password reset successful!");
        // Redirecting to donor login since role is DONOR
        setTimeout(() => router.push('/donors/login'), 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : router.back()}
          className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#2A9D8F] mb-8 uppercase tracking-[0.2em] transition-all"
        >
          <ArrowLeft size={14} /> {step === 1 ? "Back" : "Previous Step"}
        </button>

        <motion.div layout className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-[#264653]/5 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-bl-full -z-0" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#264653] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#264653]/20">
              {step === 1 && <Mail className="text-[#2A9D8F]" size={28} />}
              {step === 2 && <ShieldCheck className="text-[#2A9D8F]" size={28} />}
              {step === 3 && <Lock className="text-[#2A9D8F]" size={28} />}
            </div>

            <h1 className="text-3xl font-black text-[#264653] uppercase tracking-tight leading-none mb-2">
              {step === 1 ? "Forgot" : step === 2 ? "Verify" : "New"} <br />
              <span className="text-[#2A9D8F]">{step === 1 ? "Account?" : step === 2 ? "OTP" : "Secure Pass"}</span>
            </h1>

            <AnimatePresence mode="wait">
              {/* STEP 1: Email */}
              {step === 1 && (
                <motion.form key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleRequestOTP} className="space-y-5 mt-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
                       <input 
                        required type="email" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@mail.com"
                        className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-6 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653] transition-all"
                      />
                    </div>
                  </div>
                  <button disabled={loading} className="w-full bg-[#264653] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#2A9D8F] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#264653]/10">
                    {loading ? <Loader2 className="animate-spin" /> : "Get Recovery Code"}
                  </button>
                </motion.form>
              )}

              {/* STEP 2: OTP */}
              {step === 2 && (
                <motion.form key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleVerifyOTP} className="space-y-6 mt-8">
                  <div className="space-y-2 text-center">
                    <p className="text-xs font-medium text-gray-500">We've sent a code to <span className="text-[#264653] font-bold">{formData.email}</span></p>
                    <input 
                      required maxLength={6} value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      placeholder="000000"
                      className="w-full bg-gray-50 border-2 border-gray-100 py-5 text-center text-3xl font-black tracking-[0.5em] rounded-2xl focus:border-[#2A9D8F] outline-none text-[#264653]"
                    />
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Timer size={14}/> {formatTime(timer)}</span>
                    <button type="button" disabled={!canResend} onClick={handleRequestOTP} className={`text-[10px] font-black uppercase tracking-widest ${canResend ? 'text-[#2A9D8F]' : 'text-gray-300'}`}>Resend Code</button>
                  </div>
                  <button disabled={loading} className="w-full bg-[#2A9D8F] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#2A9D8F]/20 flex justify-center items-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
                  </button>
                </motion.form>
              )}

              {/* STEP 3: Reset Password */}
              {step === 3 && (
                <motion.form key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleResetPassword} className="space-y-4 mt-8">
                  <div className="space-y-4">
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-gray-300" size={18} />
                      <input 
                        required type={showPass ? "text" : "password"} value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        placeholder="New Password (e.g. Pass123)"
                        className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-12 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653]"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-4 text-gray-400">{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                    </div>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-4 text-gray-300" size={18} />
                      <input 
                        required type="password" value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        placeholder="Confirm Password"
                        className="w-full bg-gray-50 border-2 border-transparent py-4 pl-12 pr-6 rounded-2xl focus:border-[#2A9D8F]/20 focus:bg-white outline-none font-bold text-[#264653]"
                      />
                    </div>
                  </div>
                  <ul className="text-[9px] font-bold text-gray-400 space-y-1 ml-1 uppercase tracking-tighter">
                    <li className={isValidPassword(formData.newPassword) ? "text-green-500" : ""}>✓ Must contain letters and numbers</li>
                    <li className={formData.newPassword === formData.confirmPassword && formData.newPassword !== "" ? "text-green-500" : ""}>✓ Passwords must match</li>
                  </ul>
                  <button disabled={loading} className="w-full bg-[#264653] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#2A9D8F] transition-all shadow-lg">
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Update Password"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;