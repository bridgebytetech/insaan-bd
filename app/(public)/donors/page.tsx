"use client"; // For interactive hover icons

import React from "react";
import { Heart, Users, Building2, User, Award, MapPin, Briefcase, Quote } from "lucide-react";

export default function DonorList() {
  const donors = [
    {
      id: 1,
      name: "আহমেদ জুবায়ের",
      type: "INDIVIDUAL",
      profession: "সফটওয়্যার ইঞ্জিনিয়ার",
      address: "উত্তরা, ঢাকা",
      dpUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      totalConnected: 4,
      contribution: "গত দুই বছর ধরে ৪ জন এতিম শিশুর পড়াশোনা ও চিকিৎসার সম্পূর্ণ দায়িত্ব পালন করছেন।",
      message: "ইনসান বিডি-র স্বচ্ছতা আমাকে মুগ্ধ করেছে। শিশুদের মুখে হাসি দেখতে পাওয়াটাই আমার জীবনের সবচেয়ে বড় সার্থকতা।"
    },
    {
      id: 2,
      name: "টেক সল্যুশন লিমিটেড",
      type: "ORGANIZATION",
      profession: "আইটি প্রতিষ্ঠান",
      address: "জিন্দাবাজার, সিলেট",
      dpUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200",
      totalConnected: 12,
      contribution: "তাদের কর্পোরেট সোশ্যাল রেসপন্সিবিলিটি (CSR) ফান্ড থেকে ১২ জন শিশুর ডিজিটাল শিক্ষার জন্য ল্যাপটপ ও ইন্টারনেট সুবিধা প্রদান করেছে।",
      message: "সামাজিক দায়বদ্ধতা থেকে আমরা ইনসান বিডি-র পাশে আছি। আগামী প্রজন্মের ভিত্তি গড়তে শিক্ষা অপরিহার্য।"
    },
    {
      id: 3,
      name: "ফাতেমা বেগম",
      type: "INDIVIDUAL",
      profession: "স্কুল শিক্ষিকা",
      address: "পাঁচলাইশ, চট্টগ্রাম",
      dpUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      totalConnected: 2,
      contribution: "নিজের সামান্য বেতনের একটি অংশ দিয়ে প্রতি মাসে ২ জন কন্যা শিশুর খাদ্য ও পোশাকের খরচ বহন করছেন।",
      message: "একটি শিশুর জীবন বদলে দেওয়ার আনন্দ ভাষায় প্রকাশ করা অসম্ভব। ইনসান বিডি-র এই মহৎ উদ্যোগ সফল হোক।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#ECF5E8] pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2A9D8F]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#E76F51]/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mt-10 mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-[#E76F51]"></div>
            <span className="text-[#E76F51] font-bold text-xs uppercase tracking-[0.4em]">Recognition Wall</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#264653] leading-tight tracking-tight mb-6">
            আমাদের মানবিক <br />
            <span className="text-[#2A9D8F]">যোদ্ধাদের গল্প</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            যাঁদের নিঃস্বার্থ দানে আমাদের নক্ষত্ররা আজ ডানা মেলার স্বপ্ন দেখছে। ইনসান বিডি-র প্রতিটি পদক্ষেপে এই মানুষগুলো আমাদের শক্তি ও অনুপ্রেরণা।
          </p>
        </div>

        {/* Donor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500 group relative">
              
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side */}
                <div className="flex flex-col items-center lg:items-start shrink-0">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-[#F0F7F0] rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
                      <img src={donor.dpUrl} alt={donor.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#264653] text-white p-2.5 rounded-2xl shadow-xl">
                      <Award size={20} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                      donor.type === "ORGANIZATION" ? "bg-orange-50 text-orange-600" : "bg-teal-50 text-teal-600"
                    }`}>
                      {donor.type === "ORGANIZATION" ? <Building2 size={12} /> : <User size={12} />}
                      {donor.type}
                    </div>
                    <div className="bg-[#264653]/5 px-3 py-2 rounded-xl text-center lg:text-left">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none">সহায়তা প্রাপ্ত</p>
                      <p className="text-[#264653] font-black text-lg">{donor.totalConnected} নক্ষত্র</p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-[#264653] mb-2 group-hover:text-[#2A9D8F] transition-colors">
                      {donor.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-400">
                      <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-[#2A9D8F]" /> {donor.profession}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#E76F51]" /> {donor.address}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-50 relative">
                      <h4 className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em] mb-2">অবদান ও কার্যক্রম</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {donor.contribution}
                      </p>
                    </div>

                    <div className="relative pt-4">
                      <Quote className="absolute -top-1 -left-2 text-gray-100 w-10 h-10 -z-10" />
                      <p className="text-[#264653]/80 text-sm italic font-medium leading-relaxed pl-4 border-l-2 border-[#2A9D8F]/20">
                        "{donor.message}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Heart Icon */}
              <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all cursor-pointer">
                <Heart size={18} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 bg-[#264653] rounded-[3.5rem] text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              আপনিও হতে পারেন <br />
              <span className="text-[#2A9D8F] italic font-serif">কোনো শিশুর নতুন পৃথিবী</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm md:text-base">
              আপনার সামান্য দান আমাদের শিশুদের জন্য বড় স্বপ্ন দেখার সাহস যোগায়। আজই আমাদের সাথে যুক্ত হোন।
            </p>
            <button className="px-10 py-4 bg-[#2A9D8F] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-white hover:text-[#264653] transition-all duration-500 transform hover:scale-105">
              দাতা হিসেবে যোগ দিন
            </button>
          </div>
          {/* Subtle Background Icon */}
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] w-[400px] h-[400px] -z-0" />
        </div>
      </div>
    </div>
  );
}
