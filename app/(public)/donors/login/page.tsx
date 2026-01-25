"use client";
import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import donorServicePublic from "@/app/lib/services/donorServicePublic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ১. সেশন চেক: যদি আগে থেকেই লগইন করা থাকে
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        redirectBasedOnRole(user.role);
      }
    }
  }, [router]);

  // ২. রোল অনুযায়ী রিডাইরেক্ট ফাংশন
  const redirectBasedOnRole = (role: string) => {
    if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/donors/profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await donorServicePublic.login(formData);

      // আপনার API রেসপন্স স্ট্রাকচার অনুযায়ী চেক
      if (res.success && res.data) {
        const { accessToken, refreshToken, name, email, role, userId } = res.data;

        // localStorage এ ডেটা সেভ করা
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken); // ভবিষ্যতের জন্য সেভ রাখা ভালো
        localStorage.setItem(
          "user",
          JSON.stringify({
            name,
            email,
            role,
            userId,
          })
        );

        toast.success(res.message || `স্বাগতম, ${name}!`, {
          icon: '👋',
          duration: 4000
        });

        // রোল অনুযায়ী রিডাইরেক্ট
        setTimeout(() => {
          redirectBasedOnRole(role);
        }, 1500);
      }
    } catch (err: any) {
      // ব্যাকএন্ড থেকে আসা এরর মেসেজ হ্যান্ডলিং
      const errorMsg = err.response?.data?.message || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করুন।";
      
      // যদি ইমেইল ভেরিফাই না থাকে বা অ্যাডমিন পেন্ডিং থাকে, ব্যাকএন্ড মেসেজ দেখাবে
      toast.error(errorMsg);
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ECF4E8] rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#2A9D8F]/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2A9D8F]/10 rounded-full text-[#2A9D8F] font-bold text-[10px] uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> Secure Access
            </div>
            <h2 className="text-4xl font-black text-[#264653] tracking-tight">
              লগইন করুন
            </h2>
            <p className="text-[#4A6651]/60 font-medium mt-2">
              আপনার ড্যাশবোর্ডে ফিরে যান
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#264653]/60 ml-1">
                イমেইল ঠিকানা
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A9D8F]"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none text-[#264653] font-medium transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-[#264653]/60">
                  পাসওয়ার্ড
                </label>
                <Link href="/forgot-password">
                  <span className="text-[10px] font-bold text-[#2A9D8F] cursor-pointer hover:underline">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </span>
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A9D8F]"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none text-[#264653] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A9D8F]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#264653] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#264653]/20 hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-3 group mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  অপেক্ষা করুন...
                </span>
              ) : (
                <>
                  লগইন করুন
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 border-t border-gray-50 pt-6">
            <p className="text-sm text-[#4A6651]/60 font-bold">
              নতুন ইউজার?{" "}
              <Link
                href="/donors/register"
                className="text-[#2A9D8F] hover:underline cursor-pointer"
              >
                রেজিস্ট্রেশন করুন
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-10 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
          © 2026 Insaan BD Foundation. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}