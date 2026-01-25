"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/lib/api/donorApi";
import { 
  Heart, Building2, User, MapPin, 
  ArrowUpRight, Phone, Facebook, Instagram, 
  Youtube, Linkedin, ArrowUp, Baby, 
  ShieldCheck, Loader2, X, Zap
} from "lucide-react";
import Footer from "@/app/components/shared/Footer";

// API Interface matching your schema
interface Donor {
  donorId: number;
  donorType: "INDIVIDUAL" | "ORGANIZATION";
  donorName: string;
  donorDpUrl: string;
  organizationName: string | null;
  totalConnectedOrphans: number;
}

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  useEffect(() => {
    const fetchPublicDonors = async () => {
      try {
        setLoading(true);
        const res = await api.get('/public/donors');
        if (res.data.success) {
          setDonors(res.data.data);
        }
      } catch (error) {
        console.error("Donor list load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDonors();
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* মেইন কন্টেইনার - সবকিছু ৭এক্সএল এর ভেতর */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION: HERO HEADER */}
        <div className="w-full border-b border-gray-100 pt-40 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#2A9D8F]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2A9D8F]">Honorable Donors</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-[#264653] tracking-tighter leading-[0.85] uppercase">
                সম্মানিত <br /> 
                <span className="text-gray-200">দাতাবৃন্দ</span>
              </h1>
              <p className="mt-8 text-gray-500 font-medium text-lg border-l-4 border-gray-100 pl-6 max-w-lg">
                ইনসান ফাউন্ডেশনের অগ্রযাত্রায় যে মানুষগুলো এতিম শিশুদের উজ্জ্বল ভবিষ্যতের সঙ্গী হয়েছেন।
              </p>
            </div>
            
            <div className="hidden lg:block pb-2">
              <div className="flex gap-10">
                <div className="text-right">
                  <p className="text-4xl font-black text-[#264653]">{donors.length}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">সক্রিয় দাতা</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-[#2A9D8F]">
                    {donors.reduce((acc, curr) => acc + (curr.totalConnectedOrphans || 0), 0)}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">সহায়তা প্রাপ্ত শিশু</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: DONOR GRID - Sharp Borders */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
            {donors.map((donor) => (
              <div key={donor.donorId} className="group bg-white p-8 hover:bg-gray-50 transition-all duration-500">
                <div className="relative aspect-square overflow-hidden mb-8 bg-gray-50">
                  <img 
                    src={donor.donorDpUrl || `https://ui-avatars.com/api/?name=${donor.donorName}&background=2A9D8F&color=fff`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt={donor.donorName} 
                  />
                  <div className="absolute top-0 right-0 p-3 bg-white border-b border-l border-gray-100">
                    {donor.donorType === "ORGANIZATION" ? <Building2 size={18} className="text-[#2A9D8F]" /> : <User size={18} className="text-[#2A9D8F]" />}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#264653] truncate uppercase tracking-tighter">{donor.donorName}</h3>
                    <p className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest mt-2">
                      {donor.donorType === "ORGANIZATION" ? (donor.organizationName || "Corporate Donor") : "Personal Hero"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-4 border-y border-gray-50">
                    <div className="flex items-center gap-3">
                      <Baby size={18} className="text-[#2A9D8F]" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Sponsored<br/>Orphans</span>
                    </div>
                    <span className="text-3xl font-black text-[#264653] leading-none">{donor.totalConnectedOrphans}</span>
                  </div>

                  <button 
                    onClick={() => setSelectedDonor(donor)}
                    className="w-full py-5 bg-[#264653] text-white flex items-center justify-center gap-3 hover:bg-[#2A9D8F] transition-all duration-300"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Impact Profile</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: CTA */}
        <div className="w-full bg-[#fcfcfc] border border-gray-100 py-32 text-center mb-20">
          <Heart className="mx-auto mb-8 text-[#E76F51]" size={40} fill="#E76F51" />
          <h2 className="text-4xl md:text-6xl font-black text-[#264653] tracking-tighter mb-8 uppercase">
            আপনিও হতে পারেন <br/><span className="text-[#2A9D8F]">পরিবর্তনের কারিগর</span>
          </h2>
          <button className="bg-[#264653] text-white px-12 py-6 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#2A9D8F] transition-all duration-500">
            Apply to be a Donor
          </button>
        </div>
      </div>

      {/* MODAL FOR DETAILS */}
      {selectedDonor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-[#264653]/95 backdrop-blur-md" onClick={() => setSelectedDonor(null)}></div>
          <div className="relative bg-white w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300 border-t-8 border-[#2A9D8F]">
            <button onClick={() => setSelectedDonor(null)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <div className="p-12 text-center">
               <div className="w-24 h-24 mx-auto mb-8 overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={selectedDonor.donorDpUrl || `https://ui-avatars.com/api/?name=${selectedDonor.donorName}`} alt="" className="w-full h-full object-cover" />
               </div>
              <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.4em] mb-4 text-center w-full">Impact Profile</p>
              <h2 className="text-3xl font-black text-[#264653] tracking-tighter mb-8 uppercase">{selectedDonor.donorName}</h2>
              
              <div className="space-y-6">
                <div className="p-10 bg-gray-50 border border-gray-100">
                  <h4 className="text-[10px] font-black text-[#264653] uppercase tracking-widest mb-4">সহায়তা প্রাপ্ত শিশুর সংখ্যা</h4>
                  <p className="text-7xl font-black text-[#2A9D8F] tracking-tighter leading-none">{selectedDonor.totalConnectedOrphans}</p>
                </div>
                
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                  "{selectedDonor.donorName} বর্তমানে ইনসান বিডি-র সাথে যুক্ত থেকে {selectedDonor.totalConnectedOrphans} জন শিশুর মৌলিক অধিকার নিশ্চিত করছেন।"
                </p>

                <div className="flex justify-center">
                   <div className="px-6 py-2 border border-[#2A9D8F] text-[#2A9D8F] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14}/> Verified Hero
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER (অরিজিনাল স্টাইল, কিন্তু কন্টেইনড) */}
      <Footer/>
    </div>
  );
}

function FooterSection({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-[#2A9D8F] pb-2 inline-block">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-white/40 hover:text-[#2A9D8F] transition-colors text-sm font-medium">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}