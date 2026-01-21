
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ChevronRight,
  UserCircle,
  Plus
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", name_bn: "হোম", href: "/" },
    { name: "Our Stars", name_bn: "আমাদের নক্ষত্র", href: "/orphans" },
    { name: "Our Patrons", name_bn: "আমাদের দাতা", href: "/donors" },
    { name: "Activities", name_bn: "কার্যক্রম", href: "/activities" },
    { name: "Gallery", name_bn: "গ্যালারি", href: "/gallery" },
    { name: "Success Stories", name_bn: "সাফল্যের গল্প", href: "/success-stories" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#264653] rounded-2xl flex items-center justify-center transition-all group-hover:bg-[#2A9D8F] shadow-lg shadow-[#264653]/10">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#264653] tracking-tighter leading-none">
                INSAAN<span className="text-[#2A9D8F]">BD</span>
              </span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pure Humanity</span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION (With Registration Included) --- */}
          <nav className="hidden xl:flex items-center gap-1 bg-gray-50/40 p-1.5 rounded-full border border-gray-100/50">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2 text-[13px] font-bold rounded-full transition-all whitespace-nowrap ${
                    isActive 
                    ? "bg-white text-[#2A9D8F] shadow-sm" 
                    : "text-[#264653]/70 hover:text-[#264653]"
                  }`}
                >
                  {item.name_bn}
                </Link>
              );
            })}

            {/* --- বিশেষ স্টাইলে এতিম নিবন্ধন বাটন --- */}
            <Link
              href="/orphan-registration"
              className="ml-2 px-5 py-2 text-[13px] font-black rounded-full bg-[#E76F51] text-white hover:bg-[#264653] transition-all flex items-center gap-2 shadow-lg shadow-[#E76F51]/20 animate-pulse-subtle"
            >
              <Plus size={14} strokeWidth={3} />
              এতিম নিবন্ধন
            </Link>
          </nav>

          {/* --- DESKTOP ACTIONS --- */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/donors/login" className="text-sm font-bold text-[#264653] hover:text-[#2A9D8F] transition-colors">
              Login
            </Link>
            <Link href="/donors/register" className="flex items-center gap-2 bg-[#264653] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2A9D8F] transition-all shadow-lg shadow-[#264653]/10">
              Join as Donor <ArrowRight size={16} />
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-[#264653] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Heart className="text-[#2A9D8F]" size={20} fill="#2A9D8F" />
                <span className="font-black text-[#264653] uppercase tracking-tighter">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-100 text-[#264653] rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-2">
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xl font-bold text-[#264653]">{item.name_bn}</span>
                    <ChevronRight size={20} className="text-gray-300" />
                  </Link>
                ))}
                
                {/* Mobile Specific Reg Button */}
                <Link
                  href="/orphan-registration"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-[#E76F51]/10 border border-[#E76F51]/20 mt-4 group"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="text-[#E76F51]" size={20} />
                    <span className="text-xl font-black text-[#E76F51]">এতিম নিবন্ধন করুন</span>
                  </div>
                  <ArrowRight size={20} className="text-[#E76F51] group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-8 border-t border-gray-50 bg-gray-50/50 space-y-3">
              <Link href="/donors/login" className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 text-[#264653] py-4 rounded-2xl font-bold">
                <UserCircle size={20} /> Login
              </Link>
              <Link href="/donors/register" className="flex items-center justify-center gap-3 w-full bg-[#2A9D8F] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2A9D8F]/20">
                Join as Donor <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;