"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Heart, ChevronLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EDF4E8] flex flex-col">
      {/* Top Simple Header */}
      <div className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#264653] hover:text-[#2A9D8F] transition-colors font-bold text-sm group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Auth Content Card */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[450px]">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-[#264653] rounded-3xl items-center justify-center shadow-xl shadow-[#264653]/20 mb-4">
              <Heart className="w-8 h-8 text-[#2A9D8F]" fill="#2A9D8F" />
            </div>
            <h1 className="text-2xl font-black text-[#264653] tracking-tight">
              Welcome to <span className="text-[#2A9D8F]">Insaan BD</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Together for a better humanity
            </p>
          </div>

          {/* Login/Register Form renders here */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            {children}
          </div>

          {/* Footer Info */}
          <p className="text-center mt-8 text-xs text-gray-400 font-medium uppercase tracking-widest">
            © 2024 Insaan BD · Pure Humanity
          </p>
        </div>
      </main>
    </div>
  );
}