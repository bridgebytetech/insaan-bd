"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  UserCircle,
  Plus
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if current page is Home
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          // If not home page, or if scrolled on home page: show solid white navbar
          (!isHomePage || scrolled)
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          {/* --- LOGO --- */}
<Link href="/" className="flex items-center gap-3 group shrink-0">
  {/* Changed bg to Teal and icon transition to Coral */}
  <div className="w-10 h-10 bg-[#2A9D8F] rounded-2xl flex items-center justify-center transition-all group-hover:bg-[#264653] shadow-lg shadow-[#2A9D8F]/20">
    <Heart className="w-5 h-5 text-white" fill="white" />
  </div>
  
  <div className="flex flex-col">
    {/* Swapped BD color to the Coral accent for better pop */}
    <span className="text-xl font-black text-[#264653] tracking-tighter leading-none transition-colors group-hover:text-[#2A9D8F]">
      INSAAN<span className="text-[#E76F51]">BD</span>
    </span>
    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pure Humanity</span>
  </div>
</Link>
          {/* --- DESKTOP NAVIGATION --- */}
          <nav className={`hidden xl:flex items-center gap-1 p-1.5 rounded-full border transition-colors ${
            (!isHomePage || scrolled) 
              ? "bg-gray-100/50 border-gray-200/50" 
              : "bg-gray-50/40 border-gray-100/50"
          }`}>
            {[
              { name_bn: "হোম", href: "/" },
              { name_bn: "আমাদের নক্ষত্র", href: "/orphans" },
              { name_bn: "আমাদের দাতা", href: "/donors" },
              { name_bn: "কার্যক্রম", href: "/activities" },
              { name_bn: "গ্যালারি", href: "/gallery" },
              { name_bn: "সাফল্যের গল্প", href: "/success-stories" },
            ].map((item) => {
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

            <Link
              href="/orphan-registration"
              className="ml-2 px-5 py-2 text-[13px] font-black rounded-full bg-[#E76F51] text-white hover:bg-[#264653] transition-all flex items-center gap-2 shadow-lg shadow-[#E76F51]/20"
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

      {/* Adding a spacer for pages that are NOT the home page */}
      {!isHomePage && <div className="h-[72px] md:h-[80px]" />}

      {/* ... Mobile Menu Content Remains the same ... */}
    </>
  );
};

export default Navbar;