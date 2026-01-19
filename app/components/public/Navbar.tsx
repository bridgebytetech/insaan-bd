"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  User,
  Sparkles,
  ChevronRight,
  Users,
  LayoutDashboard,
  ArrowRight,
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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const menuItems = [
    { name: "Home", name_bn: "হোম", href: "/" },
    { name: "Our Stars", name_bn: "আমাদের নক্ষত্র", href: "/orphans" },
    { name: "Our Patrons", name_bn: "আমাদের দাতা", href: "/donors" },
    { name: "Activities", name_bn: "কার্যক্রম", href: "/activities" },
    { name: "Gallery", name_bn: "গ্যালারি", href: "/gallery" },
    { name: "Success Stories", name_bn: "সাফল্যের গল্প", href: "/success-stories" },
  ];

  return (
    <nav className="">
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group outline-none">
            <div className="relative">
              <div className="w-10 h-10 bg-[#264653] rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#2A9D8F] group-hover:rotate-[-5deg] shadow-md">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#264653] leading-none tracking-tight">
                INSAAN<span className="text-[#2A9D8F]">BD</span>
              </span>
              <span className="text-[9px] font-bold text-[#2A9D8F] uppercase tracking-[0.2em] mt-1">
                Pure Humanity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-gray-50/50 rounded-full px-2 py-1 border border-gray-100">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-[13px] font-bold transition-all duration-200 rounded-full ${
                    isActive 
                    ? "bg-white text-[#2A9D8F] shadow-sm" 
                    : "text-[#264653]/70 hover:text-[#264653] hover:bg-white/50"
                  }`}
                >
                  {item.name_bn}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/donors/login"
              className="text-sm font-bold text-[#264653] hover:text-[#2A9D8F] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/donors/register"
              className="bg-[#264653] hover:bg-[#1d353f] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-[#264653]/10"
            >
              <span>Join as a Donor</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-[#264653]"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Modern Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[110] transition-visibility duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#264653]/40 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex justify-between items-center border-b border-gray-50">
            <span className="font-black text-[#264653]">মেনু</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-6">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 text-[#264653] transition-colors group"
                >
                  <span className="text-lg font-bold">{item.name_bn}</span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2A9D8F] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                {/* <Link href="/donors" className="flex items-center gap-4 p-4 rounded-2xl bg-[#EDF4E8] text-[#2A9D8F] font-bold">
                    <Users size={20} />
                    আমাদের দাতা তালিকা
                </Link> */}
                <Link href="/orphan-registration" className="flex items-center gap-4 p-4 rounded-2xl border border-[#264653]/10 text-[#264653] font-bold">
                    <Sparkles size={20} className="text-[#E76F51]" />
                    এতিম নিবন্ধন
                </Link>
            </div>
          </div>

          <div className="p-6 bg-gray-50/50 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="flex items-center justify-center py-3 font-bold text-[#264653] border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                    Login
                </Link>
                <Link href="/donors/register" className="flex items-center justify-center py-3 font-bold text-white bg-[#2A9D8F] rounded-xl shadow-md">
                    Join as a Donor
                </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;