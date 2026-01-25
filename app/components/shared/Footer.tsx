"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, MapPin, Phone, Mail, Facebook, Instagram, 
  Youtube, Linkedin, ArrowUp, UserPlus, LogIn, Code2  
} from "lucide-react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#1B353E] pt-24 pb-8 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 pb-20 border-b border-white/10">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#2A9D8F] rounded-2xl flex items-center justify-center shadow-xl shadow-[#2A9D8F]/20">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
                ইনসান <span className="text-[#2A9D8F]">বিডি</span>
              </h3>
            </div>
            <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
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

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            
            {/* Explore Section */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">এক্সপ্লোর</h4>
              <ul className="space-y-4">
                {[
                  { name: "হোম", path: "/" },
                  { name: "সম্পর্কে", path: "/about" },
                  { name: "কার্যক্রম", path: "/activities" },
                  { name: "গ্যালারি", path: "/gallery" },
                  { name: "আমাদের নক্ষত্র", path: "/orphans" },
                  { name: "আমাদের দাতা", path: "/donors" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link href={item.path} className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Participation Section */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#E76F51] pb-2 inline-block">অংশগ্রহণ</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/donors/register" className="text-white/40 hover:text-white transition-colors text-sm font-medium">
                    দাতা হিসেবে যুক্ত হোন
                  </Link>
                </li>
                
                <li className="pt-2">
                  <Link href="/volunteer/registration" className="group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-[#2A9D8F] hover:border-[#2A9D8F] transition-all">
                    <span className="text-white/80 group-hover:text-white text-xs font-bold uppercase tracking-tighter">স্বেচ্ছাসেবী রেজিস্ট্রেশন</span>
                    <UserPlus size={16} className="text-[#2A9D8F] group-hover:text-white" />
                  </Link>
                </li>

                <li>
                  <Link href="/volunteer/login" className="group flex items-center justify-between p-3 border border-[#2A9D8F]/30 rounded-xl hover:border-[#2A9D8F] transition-all">
                    <span className="text-[#2A9D8F] text-xs font-bold uppercase tracking-tighter">স্বেচ্ছাসেবী লগইন</span>
                    <LogIn size={16} className="text-[#2A9D8F]" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-2 sm:col-span-1 space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">যোগাযোগ</h4>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-[#2A9D8F] shrink-0" />
                  <p className="text-white/40 text-sm leading-snug">উত্তরা, ঢাকা, বাংলাদেশ</p>
                </div>
                <div className="space-y-3">
                  <a href="tel:+8801700000000" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium group">
                    <Phone size={18} className="text-[#2A9D8F] group-hover:rotate-12 transition-transform" />
                    +৮৮০ ১৭০০-০০০০০০
                  </a>
                  <a href="mailto:info@insaanbd.org" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-medium group">
                    <Mail size={18} className="text-[#2A9D8F]" />
                    info@insaanbd.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Developer Credits Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 pb-4">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5 w-fit">
            
            {/* Developed By Text with Glow */}
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/20 group-hover:bg-[#2A9D8F]/20 transition-all duration-500">
                <Code2 size={16} className="text-[#2A9D8F] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] leading-none mb-1">
                  Developed by
                </span>
                <a 
                  href="https://www.facebook.com/bridgebytetech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-sm font-black tracking-tight hover:text-[#2A9D8F] transition-colors duration-300"
                >
                  Bridge Byte <span className="text-[#2A9D8F]">Tech</span>
                </a>
              </div>
            </div>

            {/* Thin Sleek Divider */}
            <div className="hidden md:block w-[1px] h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Modern Social Stack */}
            <div className="flex items-center gap-2">
              <SocialIcon 
                href="https://www.facebook.com/bridgebytetech" 
                icon={<Facebook size={14} />} 
                brandColor="group-hover:text-[#1877F2]" 
                glowColor="group-hover:shadow-[#1877F2]/20"
              />
              <SocialIcon 
                href="https://www.instagram.com/bridgebytetech/" 
                icon={<Instagram size={14} />} 
                brandColor="group-hover:text-[#E4405F]" 
                glowColor="group-hover:shadow-[#E4405F]/20"
              />
              <SocialIcon 
                href="https://www.linkedin.com/company/108645484" 
                icon={<Linkedin size={14} />} 
                brandColor="group-hover:text-[#0A66C2]" 
                glowColor="group-hover:shadow-[#0A66C2]/20"
              />
              <SocialIcon 
                href="https://www.youtube.com/@bridgebytetech" 
                icon={<Youtube size={14} />} 
                brandColor="group-hover:text-[#FF0000]" 
                glowColor="group-hover:shadow-[#FF0000]/20"
              />
            </div>
          </div>

          {/* Privacy & About Links Added Here */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
  <Link href="/about-us" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest transition-colors">
    আমাদের সম্পর্কে
  </Link>
  <Link href="/privacy-policy" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest transition-colors">
    গোপনীয়তা নীতি
  </Link>
  <Link href="/terms-and-conditions" className="text-white/20 hover:text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest transition-colors">
    ব্যবহারের শর্তাবলী
  </Link>
</div>
        </div>

      </div>

      {/* Floating Scroll Top */}
      {/* {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#2A9D8F] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all shadow-[#2A9D8F]/40"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} strokeWidth={3} className="animate-pulse" />
        </button>
      )} */}
    </footer>
  );
}

function SocialIcon({ href, icon, brandColor, glowColor }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-xl ${glowColor}`} />
      
      {/* Icon Container */}
      <div className={`
        relative w-9 h-9 flex items-center justify-center rounded-xl 
        bg-white/5 border border-white/10 text-white/40 
        transition-all duration-500 
        group-hover:border-white/20 group-hover:-translate-y-1 group-hover:bg-white/10
        ${brandColor}
      `}>
        {icon}
      </div>
    </a>
  );
}