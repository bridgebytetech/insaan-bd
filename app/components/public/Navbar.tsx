"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  UserCircle,
  Plus,
  LayoutDashboard,
  LogOut
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  const checkUserStatus = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserStatus();
    const handleAuthChange = () => checkUserStatus();
    window.addEventListener("userLogin", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("userLogin", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsOpen(false);
    router.push("/");
  };

  const menuItems = [
    { name_bn: "হোম", href: "/" },
    { name_bn: "আমাদের নক্ষত্র", href: "/orphans" },
    { name_bn: "আমাদের দাতা", href: "/donors" },
    { name_bn: "কার্যক্রম", href: "/activities" },
    { name_bn: "গ্যালারি", href: "/gallery" },
    { name_bn: "সম্পর্কে", href: "/about-us" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          
        <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#264653] rounded-2xl flex items-center justify-center transition-all group-hover:bg-[#2A9D8F] shadow-lg shadow-[#264653]/10">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black text-[#264653] tracking-tighter leading-none">INSAAN<span className="text-[#2A9D8F]">BD</span></span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pure Humanity</span>
            </div>
          </Link> 
          
            <nav className="hidden xl:flex items-center gap-1 bg-gray-50/40 p-1.5 rounded-full border border-gray-100/50">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={`px-5 py-2 text-[13px] font-bold rounded-full transition-all ${pathname === item.href ? "bg-white text-[#2A9D8F] shadow-sm" : "text-[#264653]/70 hover:text-[#264653]"}`}>
                {item.name_bn}
              </Link>
            ))}
            <Link href="/orphan-registration" className="ml-2 px-5 py-2 text-[13px] font-black rounded-full bg-[#E76F51] text-white hover:bg-[#264653] transition-all flex items-center gap-2 shadow-lg shadow-[#E76F51]/20">
              <Plus size={14} strokeWidth={3} /> এতিম নিবন্ধন
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/donors/profile"} className="flex items-center gap-2 bg-[#2A9D8F] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#264653] transition-all shadow-lg shadow-[#2A9D8F]/10">
                  <LayoutDashboard size={16} /> {user.name?.split(' ')[0] || "ড্যাশবোর্ড"}
                </Link>
                <button onClick={handleLogout} className="p-2.5 bg-gray-100 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm" title="Log Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/donors/login" className="text-sm font-bold text-[#264653] hover:text-[#2A9D8F] transition-colors">Login</Link>
                <Link href="/donors/register" className="flex items-center gap-2 bg-[#264653] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2A9D8F] transition-all shadow-lg shadow-[#264653]/10">
                  Join as Donor <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(true)} className="xl:hidden p-2 text-[#264653] hover:bg-gray-100 rounded-full">
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-0 z-[110] bg-white flex flex-col h-full overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50 shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="text-[#2A9D8F]" size={20} fill="#2A9D8F" />
                <span className="font-black text-[#264653] uppercase tracking-tighter">Menu</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 text-[#264653] rounded-full active:scale-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-1">
                {menuItems.map((item, idx) => (
                  <Link key={idx} href={item.href} onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${pathname === item.href ? "bg-[#2A9D8F]/5 border-l-4 border-[#2A9D8F]" : "hover:bg-gray-50"}`}>
                    <span className={`text-lg font-bold ${pathname === item.href ? "text-[#2A9D8F]" : "text-[#264653]"}`}>{item.name_bn}</span>
                    <ChevronRight size={18} className={pathname === item.href ? "text-[#2A9D8F]" : "text-gray-300"} />
                  </Link>
                ))}
                
                {/* এতিম নিবন্ধন বাটন সরাসরি মেনুর ভেতরে নিয়ে আসা হয়েছে যাতে স্ক্রল না করতে হয় */}
                <Link href="/orphan-registration" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-2xl bg-[#E76F51]/10 border border-[#E76F51]/20 mt-3 group">
                  <div className="flex items-center gap-3">
                    <Plus className="text-[#E76F51]" size={20} />
                    <span className="text-lg font-black text-[#E76F51]">এতিম নিবন্ধন</span>
                  </div>
                  <ArrowRight size={18} className="text-[#E76F51]" />
                </Link>
              </div>
            </div>

            <div className="p-5 pb-8 border-t border-gray-50 bg-gray-50/50 space-y-3 shrink-0">
              {user ? (
                <div className="grid grid-cols-5 gap-2">
                  <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/donors/profile"} onClick={() => setIsOpen(false)} className="col-span-4 flex items-center justify-center gap-2 bg-[#2A9D8F] text-white py-3.5 rounded-xl font-bold text-sm shadow-md active:scale-[0.98] transition-transform">
                    <LayoutDashboard size={18} /> প্রোফাইল ড্যাশবোর্ড
                  </Link>
                  <button onClick={handleLogout} className="col-span-1 flex items-center justify-center bg-red-50 text-red-500 rounded-xl border border-red-100 active:bg-red-100">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/donors/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-[#264653] py-3.5 rounded-xl font-bold text-sm">
                    <UserCircle size={18} /> Login
                  </Link>
                  <Link href="/donors/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-[#264653] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#264653]/10">
                    Join as Donor <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;