"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/axios";
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

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
          setError("Access Denied: Admin privileges required.");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        
        // ড্যাশবোর্ডে পাঠানোর আগে ছোট সাকসেস মেসেজ দিতে পারেন
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || 
        "লগইন করতে সমস্যা হচ্ছে। আপনার ইমেইল ও পাসওয়ার্ড চেক করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#264653]">Admin Panel</h2>
        <p className="text-gray-500 text-sm mt-2 font-medium">অ্যাডমিন প্যানেলে প্রবেশ করতে লগইন করুন</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold"
        >
          <AlertCircle size={20} />
          {error}
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[13px] font-black text-[#264653] uppercase tracking-wider ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
              <Mail size={20} />
            </div>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none transition-all font-medium text-[#264653]"
              placeholder="admin@insaanbd.org"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-[13px] font-black text-[#264653] uppercase tracking-wider ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
              <Lock size={20} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none transition-all font-medium text-[#264653]"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#264653] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#264653] hover:bg-[#1d353f] active:scale-[0.98] text-white rounded-2xl font-black shadow-xl shadow-[#264653]/20 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Verifying Account...</span>
            </>
          ) : (
            "Sign In to Dashboard"
          )}
        </button>
      </form>
    </motion.div>
  );
}


