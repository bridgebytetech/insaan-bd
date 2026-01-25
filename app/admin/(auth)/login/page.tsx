"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/axios";
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const result = response.data;

      if (result.success) {
        const { accessToken, refreshToken, role } = result.data;

        if (role !== "ADMIN") {
          setError("এক্সেস ডিনাইড: আপনার অ্যাডমিন পারমিশন নেই।");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড প্রদান করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.div 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="inline-block p-3 rounded-2xl bg-[#264653]/5 mb-4"
        >
          <Lock className="text-[#264653]" size={32} />
        </motion.div>
        <h2 className="text-4xl font-black text-[#264653] tracking-tighter">অ্যাডমিন প্যানেল</h2>
        <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">Insaan BD Management</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-xl flex items-center gap-3 text-sm font-bold shadow-sm"
        >
          <AlertCircle size={18} className="shrink-0" />
          {error}
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#264653]/60 uppercase tracking-[0.15em] ml-1">
            Official Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-100 bg-white focus:border-[#2A9D8F] outline-none transition-all font-bold text-[#264653] shadow-sm"
              placeholder="" 
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] font-black text-[#264653]/60 uppercase tracking-[0.15em]">
              Security Password
            </label>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-100 bg-white focus:border-[#2A9D8F] outline-none transition-all font-bold text-[#264653] shadow-sm"
              placeholder=""
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#264653] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-2">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#264653] hover:bg-[#2A9D8F] active:scale-[0.98] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#264653]/10 transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>প্রসেসিং হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
                <ChevronRight size={18} />
              </>
            )}
          </button>

          {/* <div className="text-center">
            <Link 
              href="/forgot-password" 
              className="text-[11px] font-black text-gray-400 hover:text-[#E76F51] uppercase tracking-widest transition-colors inline-flex items-center gap-1"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div> */}
        </div>
      </form>

      {/* Footer Branding */}
      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">
          Secure Infrastructure &copy; 2026
        </p>
      </div>
    </motion.div>
  );
}