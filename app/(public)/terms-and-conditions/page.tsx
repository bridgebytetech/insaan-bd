"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileCheck, Scale, AlertCircle, Ban, 
  HandHeart, CreditCard, UserCheck, RefreshCcw,
  CheckCircle2, ChevronRight, HelpCircle,Fingerprint,Globe,Gavel ,ShieldAlert
} from "lucide-react";
import Footer from "@/app/components/shared/Footer";

export default function TermsAndConditions() {
  const lastUpdated = "২৫ জানুয়ারি, ২০২৬";

const terms = [
  {
    id: "acceptance",
    icon: <Fingerprint size={24} />,
    color: "bg-[#2A9D8F]",
    title: "শর্তাবলীর স্বীকৃতি",
    text: "ইনসান বিডি প্ল্যাটফর্ম ব্যবহারের মাধ্যমে আপনি আমাদের সকল আইনি শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে। আমাদের লক্ষ্য স্বচ্ছতা বজায় রাখা, তাই ব্যবহারের আগে এই নিয়মগুলো গুরুত্বসহকারে পড়ুন।"
  },
  {
    id: "donations",
    icon: <CreditCard size={24} />,
    color: "bg-[#E76F51]",
    title: "অনুদান সংক্রান্ত নীতি",
    text: "প্রদানকৃত সকল অনুদান সরাসরি এতিম শিশুদের কল্যাণে ব্যয় করা হয়। অনুদান দেওয়ার সময় সঠিক তথ্য প্রদান করা দাতার দায়িত্ব। প্রযুক্তিগত ত্রুটির বাইরে সাধারণ অবস্থায় অনুদান ফেরতযোগ্য নয়।"
  },
  {
    id: "registration",
    icon: <UserCheck size={24} />,
    color: "bg-[#2A9D8F]",
    title: "ব্যবহারকারীর দায়বদ্ধতা",
    text: "স্বেচ্ছাসেবী বা দাতা হিসেবে নিবন্ধনের সময় আপনার সঠিক তথ্য প্রদান বাধ্যতামূলক। আপনার অ্যাকাউন্টের মাধ্যমে সংঘটিত সকল কার্যক্রমের দায়ভার আপনার। কোনো অনৈতিক কাজে প্ল্যাটফর্ম ব্যবহার করা যাবে না।"
  },
  {
    id: "intellectual",
    icon: <Globe size={24} />,
    color: "bg-[#264653]",
    title: "মেধা সম্পদ ও কন্টেন্ট",
    text: "এই ওয়েবসাইটের সকল কন্টেন্ট, লোগো এবং শিশুদের ছবি ইনসান বিডি-র সম্পদ। অনুমতি ব্যতীত কোনো ছবি বা তথ্য বাণিজ্যিক বা ব্যক্তিগত প্রয়োজনে কপি বা প্রচার করা আইনত দণ্ডনীয়।"
  },
  {
    id: "conduct",
    icon: <Ban size={24} />,
    color: "bg-[#E76F51]",
    title: "নিষিদ্ধ ব্যবহার",
    text: "সিস্টেম হ্যাকিং, অটোমেটেড বট ব্যবহার, বা অন্য কোনো ব্যবহারকারীর গোপনীয়তা নষ্ট করার চেষ্টা করলে তাৎক্ষণিক আইনি ব্যবস্থা গ্রহণ করা হবে এবং অ্যাকাউন্ট স্থায়ীভাবে নিষিদ্ধ করা হবে।"
  }
];

  return (
   <>
    <div className="min-h-screen bg-[#F4F7F8]">
      {/* Dynamic Brand Header Section */}
      <section className="relative bg-[#1B353E] pt-44 pb-36 overflow-hidden">
        <div className="absolute inset-0">
          {/* Brand Color Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2A9D8F]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E76F51]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#2A9D8F] mb-8">
              <Gavel size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Legal Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-none">
              ব্যবহারের <span className="text-[#2A9D8F]">শর্তাবলী</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              ইনসান বিডি একটি মানবিক পরিবার। আমাদের সেবাসমূহ ব্যবহারের ক্ষেত্রে স্বচ্ছতা এবং নিরাপত্তা নিশ্চিত করতে নিচের নীতিমালাগুলো অনুসরণ করা হয়।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar: Sticky Navigation */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h4 className="text-[#1B353E] font-black uppercase text-[10px] tracking-widest mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E76F51] rounded-full" />
                Quick Navigation
              </h4>
              <nav className="space-y-1">
                {terms.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center justify-between group p-4 rounded-2xl hover:bg-[#2A9D8F]/5 transition-all duration-300 border border-transparent hover:border-[#2A9D8F]/10"
                  >
                    <span className="text-gray-500 group-hover:text-[#2A9D8F] font-bold text-sm transition-colors">{item.title}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2A9D8F] group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </nav>

              <div className="mt-10 p-8 rounded-[2rem] bg-[#1B353E] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#2A9D8F]/20 rounded-full blur-2xl" />
                <HelpCircle className="mb-4 text-[#2A9D8F]" size={28} />
                <h5 className="font-bold text-lg mb-2">সাহায্য লাগবে?</h5>
                <p className="text-white/50 text-xs leading-relaxed mb-6 font-medium">আইনি বিষয়ে কোনো প্রশ্ন থাকলে সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
                <a href="mailto:info@insaanbd.org" className="block w-full py-4 bg-[#2A9D8F] text-white text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#21867a] transition-all">
                  ইমেইল করুন
                </a>
              </div>
            </div>
          </div>

          {/* Right Content: Detailed Articles */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 p-8 md:p-16 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-gray-50 mb-16">
                  <div className="flex items-center gap-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                      <RefreshCcw size={14} className="text-[#2A9D8F]" />
                      সর্বশেষ আপডেট: {lastUpdated}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#E76F51]/10 text-[#E76F51] font-black text-[9px] uppercase tracking-widest">
                      Security Protocol v2.0
                  </div>
              </div>

              <div className="space-y-24">
                {terms.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    id={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center gap-5 mb-8">
                      <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-gray-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
  {item.icon}
</div>
                      <div className="h-[1px] flex-1 bg-gray-100" />
                      <span className="text-[11px] font-black text-gray-200 tracking-[0.4em] uppercase">Art. 0{index + 1}</span>
                    </div>
                    <h3 className="text-3xl font-black text-[#1B353E] mb-6 tracking-tight group-hover:text-[#2A9D8F] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-[1.8] font-medium text-justify">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Legal Footer Note */}
              <div className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-[#F8FAFC] border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-full blur-3xl" />
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                      <ShieldAlert size={32} className="text-[#E76F51]" />
                  </div>
                  <div>
                      <h4 className="text-lg font-black text-[#1B353E] mb-1 uppercase tracking-tight">আইনি সতর্কতা</h4>
                      <p className="text-gray-400 text-sm font-medium">ইনসান বিডি যেকোনো সময় কোনো পূর্ব ঘোষণা ছাড়াই এই শর্তাবলী পরিবর্তন করার অধিকার রাখে। নিয়মিত এই পেজটি চেক করার অনুরোধ রইল।</p>
                  </div>
              </div>
            </div>

            <div className="mt-12 text-center">
               <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 INSAN BD • Pure Humanity Policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
   </>
  );
}