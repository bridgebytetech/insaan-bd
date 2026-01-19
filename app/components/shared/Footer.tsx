"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#264653] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 pb-20 border-b border-white/10">
          
          {/* Brand & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center shadow-xl shadow-[#2A9D8F]/20">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">
                Insaan <span className="text-[#2A9D8F]">BD</span>
              </h3>
            </div>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              সুবিধাবঞ্চিত ও এতিম শিশুদের জন্য একটি সুন্দর ও নিরাপদ পৃথিবী গড়ার লক্ষ্যে আমরা কাজ করছি। আপনার দান তাদের ভবিষ্যৎ।
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#2A9D8F] hover:text-white transition-all border border-white/5 group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">Explore</h4>
              <ul className="space-y-4">
                {["হোম", "সম্পর্কে", "কার্যক্রম", "গ্যালারি"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#E76F51] pb-2 inline-block">Involvement</h4>
              <ul className="space-y-4">
                {["Become a Donor", "Volunteer", "Fundraise", "Partnership"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">Contact</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-[#2A9D8F] shrink-0" />
                  <p className="text-white/40 text-sm leading-snug">Uttara, Dhaka, Bangladesh</p>
                </div>
                <a href="tel:+" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium">
                  <Phone size={18} className="text-[#2A9D8F]" />
                  +880 1700-000000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
            © 2026 Insaan BD. Designed with Heart.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Floating Scroll Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#2A9D8F] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all animate-bounce"
        >
          <ArrowUp size={24} strokeWidth={3} />
        </button>
      )}
    </footer>
  );
}