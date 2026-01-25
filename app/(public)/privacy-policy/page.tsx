"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Lock, Eye, FileText, 
  UserCheck, Bell, Database, HelpCircle ,Cookie ,Share2 ,HeartHandshake 
} from "lucide-react";
import Footer from "@/app/components/shared/Footer";
export default function PrivacyPolicy() {
  const lastUpdated = "২৫ জানুয়ারি, ২০২৬";

  return (
   <>
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section - Updated to Soft White/Glassy Look */}
      <section className="relative bg-gradient-to-b from-[#f1f5f9] to-[#F8FAFC] pt-36 pb-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#2A9D8F]/5 rounded-full blur-[120px] rotate-12" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#264653]/5 rounded-full blur-[120px] -rotate-12" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white shadow-sm border border-slate-200/60 text-[#2A9D8F] text-[10px] font-black uppercase tracking-[0.4em] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A9D8F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A9D8F]"></span>
            </span>
            Privacy Standards 2026
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#264653] mb-8 tracking-tight"
          >
            গোপনীয়তা <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] to-[#264653]">নীতি</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            ইনসান বিডি-তে আপনার তথ্যের সুরক্ষা আমাদের নৈতিক দায়িত্ব। আমরা প্রতিটি ডেটা পয়েন্টকে সর্বোচ্চ গুরুত্বের সাথে পরিচালনা করি।
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 pb-24 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-8 md:p-16 border border-gray-100"
        >
          {/* Last Updated Badge */}
          <div className="flex justify-between items-center mb-16 pb-8 border-b border-gray-50">
            <div className="flex items-center gap-2 text-[#2A9D8F]">
                <div className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest">Active Policy</span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              সর্বশেষ আপডেট: {lastUpdated}
            </div>
          </div>

          <div className="space-y-20">
            {/* Intro */}
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                ইনসান বিডি (InsaanBD) আমাদের প্ল্যাটফর্ম ব্যবহারকারী, দাতা এবং স্বেচ্ছাসেবীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই নীতিমালার মাধ্যমে আমরা স্পষ্ট করছি আমরা কীভাবে তথ্য সংগ্রহ করি, ব্যবহার করি এবং সুরক্ষিত রাখি।
              </p>
            </div>

            {/* Policy Items */}
            <div className="grid gap-16">
              <PolicySection 
                icon={<Database />}
                title="তথ্য সংগ্রহ"
                description="আমরা যখন আপনি আমাদের প্ল্যাটফর্মে নিবন্ধন করেন বা অনুদান প্রদান করেন, তখন আপনার নাম, ইমেইল, মোবাইল নম্বর এবং ট্রানজেকশন আইডির মতো তথ্য সংগ্রহ করি। এতিম শিশুদের নিবন্ধনের ক্ষেত্রে তাদের ছবি ও আইনি নথিপত্র সংগ্রহ করা হয়।"
              />

              <PolicySection 
                icon={<Eye />}
                title="তথ্যের ব্যবহার"
                description="সংগৃহীত তথ্যগুলো অনুদান যাচাইকরণ, স্বচ্ছতা রিপোর্ট তৈরি এবং আমাদের মানবিক কার্যক্রমের আপডেট প্রদানের জন্য ব্যবহৃত হয়। আপনার অনুমতি ব্যতীত কোনো বাণিজ্যিক উদ্দেশ্যে আমরা তথ্য শেয়ার করি না।"
              />

              <PolicySection 
                icon={<Cookie />}
                title="কুকি ও ট্র্যাকিং"
                description="আমাদের ওয়েবসাইটের অভিজ্ঞতা উন্নত করতে আমরা 'কুকি' ব্যবহার করি। এটি আমাদের বুঝতে সাহায্য করে যে ভিজিটররা কোন পেজগুলো বেশি পছন্দ করছেন, যাতে আমরা আমাদের সেবা আরও উন্নত করতে পারি।"
              />

              <PolicySection 
                icon={<Share2 />}
                title="তৃতীয় পক্ষের সাথে শেয়ার"
                description="আমরা সাধারণত তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি বা বিনিময় করি না। তবে আইনি বাধ্যবাধকতা থাকলে বা ট্রাস্ট অডিট সম্পন্ন করার জন্য প্রয়োজনীয় ক্ষেত্রে আপনার তথ্য অত্যন্ত গোপনীয়তার সাথে যাচাই করা হতে পারে।"
              />

              <PolicySection 
                icon={<HeartHandshake />}
                title="শিশুদের তথ্য সুরক্ষা"
                description="এতিম শিশুদের নিরাপত্তার কথা মাথায় রেখে আমরা তাদের সংবেদনশীল তথ্য ও ছবি অত্যন্ত কঠোরভাবে নিয়ন্ত্রণ করি। শুধুমাত্র ভেরিফাইড দাতা এবং আইনি অভিভাবকরাই নির্দিষ্ট তথ্যে অ্যাক্সেস পান।"
              />

              <PolicySection 
                icon={<Lock />}
                title="তথ্য সুরক্ষা"
                description="আপনার প্রতিটি তথ্য আধুনিক এনক্রিপশন প্রযুক্তির মাধ্যমে সুরক্ষিত রাখা হয়। আমাদের ডাটাবেস কঠোর নিরাপত্তা বলয়ে থাকে যাতে কোনো অননুমোদিত ব্যক্তি অ্যাক্সেস করতে না পারে।"
              />

              <PolicySection 
                icon={<UserCheck />}
                title="স্বচ্ছতা ও অধিকার"
                description="আপনি যেকোনো সময় আপনার প্রদানকৃত তথ্য দেখার, সংশোধনের বা ডিলিট করার অধিকার রাখেন। আমাদের অডিট রিপোর্টে তথ্যের সঠিকতা নিশ্চিত করা হয় কিন্তু ব্যক্তিগত সংবেদনশীল তথ্য গোপন রাখা হয়।"
              />

              <PolicySection 
                icon={<Bell />}
                title=" নীতির পরিবর্তন"
                description="ভবিষ্যতে নিরাপত্তা বা আইনি প্রয়োজনে আমরা গোপনীয়তা নীতি পরিবর্তন করতে পারি। যেকোনো বড় পরিবর্তনে আমরা আমাদের ওয়েবসাইট বা সোশ্যাল মিডিয়ার মাধ্যমে আপনাদের অবহিত করব।"
              />
            </div>

            {/* Support Box */}
            <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1B353E] to-[#264653] text-white relative overflow-hidden group">
              <HelpCircle className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">আপনার কি কোনো প্রশ্ন আছে?</h3>
                <p className="text-white/70 font-medium mb-8 max-w-md">
                  গোপনীয়তা নীতি সংক্রান্ত যেকোনো জিজ্ঞাসা বা তথ্যের জন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="mailto:info@insaanbd.org" className="px-8 py-4 bg-[#2A9D8F] hover:bg-[#21867a] rounded-2xl font-bold transition-all shadow-lg shadow-[#2A9D8F]/20">
                    info@insaanbd.org
                  </a>
                  <a href="tel:+880170000000" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-bold transition-all">
                    যোগাযোগ করুন
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm font-medium">
            © ২০২৬ ইনসান ফাউন্ডেশন | সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </section>
    </div>
    <Footer />
   </>
  );
}

function PolicySection({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex gap-6 md:gap-8 group">
      <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 text-[#2A9D8F] flex items-center justify-center group-hover:bg-[#2A9D8F] group-hover:text-white transition-all duration-500 shadow-sm shadow-emerald-100">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-black text-[#264653] tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium text-base md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}