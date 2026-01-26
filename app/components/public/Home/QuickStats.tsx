"use client";

import { useEffect, useState } from "react";
import { Users, Heart, Gift, TrendingUp, Sparkle,HandHelping ,MapPin,Verified } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const iconMap = {
  Users,
  Heart,
  Gift,
  TrendingUp,
  HandHelping, // এটি যোগ করুন
  MapPin,
  Verified ,
        // এটি যোগ করুন
};

export default function QuickStats() {
  // স্টেট ম্যানেজমেন্ট
  const [counts, setCounts] = useState({
    orphans: 0,
    donors: 0,
    projects: 45, // এগুলো আপাতত লোকাল থাকছে
    growth: 85,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // দুটি এন্ডপয়েন্ট থেকে ডাটা কল করা হচ্ছে
        const [orphanRes, donorRes] = await Promise.all([
          axios.get("https://api.insaanbd.org/api/public/orphans"),
          axios.get("https://api.insaanbd.org/api/public/donors")
        ]);

        setCounts({
          ...counts,
          orphans: orphanRes.data.data?.length || 0,
          donors: donorRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // ডাটা ম্যাপ করা
  const dynamicStats = [
    {
      label: "সহায়তা প্রাপ্ত শিশু",
      value: counts.orphans.toString(),
      desc: "আমরা সফলভাবে এতজন শিশুর মৌলিক চাহিদা নিশ্চিত করেছি।",
      icon: "Users",
      color: "#2A9D8F"
    },
    {
      label: "সন্তুষ্ট দাতা",
      value: counts.donors.toString(),
      desc: "আমাদের স্বচ্ছতা ও কাজে বিশ্বাস রেখে দাতা সংখ্যা দিন দিন বাড়ছে।",
      icon: "Heart",
      color: "#E76F51"
    },
    // {
    //   label: "সক্রিয় সেচ্ছাসেবক",
    //   value: "১০",
    //   desc: "দেশজুড়ে আমাদের নিবেদিতপ্রাণ কর্মীরা শিশুদের উজ্জ্বল ভবিষ্যৎ গড়তে নিরলস কাজ করছে।",
    //   icon: "HandHelping", 
    //   color: "#264653"
    // },
    { 
  label: "ভেরিফাইড ডোনেশন", 
  value: "১০০%", 
  desc: "আমাদের সকল অনুদান সম্পূর্ণভাবে যাচাই ও স্বচ্ছভাবে ব্যবস্থাপনা করা হয়।", 
  icon: "Verified", 
  color: "#1D3557" 
},
    {
      label: "কার্যরত জেলা",
      value: "৬৪" ,
      desc: "দেশের বিভিন্ন প্রান্তে আমাদের নেটওয়ার্ক ছড়িয়ে আছে, যাতে কোনো শিশু সহায়তাহীন না থাকে।",
      icon: "MapPin",
      color: "#F4A261"
    }
  ];

  // ইংরেজি সংখ্যাকে বাংলায় কনভার্ট করার ফাংশন (অপশনাল কিন্তু সুন্দর দেখাবে)
  const toBengaliNumber = (n: string) => {
    return n.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
  };

  return (
    <section className="py-32 bg-[#F8FAF8] relative overflow-hidden">
      {/* Background Accents - same as before */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2A9D8F]/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E76F51]/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header - same as before */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4">
              <div className="h-[1px] w-12 bg-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2A9D8F]">প্রভাব</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#264653] text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              সম্মিলিত দানের <br />
              <span className="text-[#2A9D8F]">অসাধারণ</span> শক্তি
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gray-500 font-medium max-w-xs text-sm leading-relaxed">
            আমরা আমাদের সাফল্য প্রাপ্ত অনুদান দিয়ে নয়, বরং শিশুদের মুখে হাসি এবং তাদের সুরক্ষিত ভবিষ্যৎ দিয়ে পরিমাপ করি।
          </motion.p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicStats.map((stat, idx) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative bg-white border border-gray-100 p-10 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(38,70,83,0.15)] hover:-translate-y-2 overflow-hidden"
              >
                <Sparkle className="absolute -right-4 -top-4 w-24 h-24 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" />

                <div className="mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-black text-[#264653] tracking-tighter group-hover:text-[#2A9D8F] transition-colors duration-300">
                      {toBengaliNumber(stat.value)}
                    </span>
                    {/* <span className="text-2xl font-black text-[#2A9D8F]">+</span> */}
                  </div>
                  <h3 className="text-[11px] font-black text-[#264653] uppercase tracking-[0.2em] mb-4">{stat.label}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{stat.desc}</p>
                </div>
                <div className="absolute bottom-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-[#2A9D8F] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}