"use client";

import React from 'react';
import Image from 'next/image';
import Footer from "@/app/components/shared/Footer";

export default function SimpleAboutPage() {
  return (
    <>
      <div className="min-h-screen bg-white text-[#264653] pt-32 pb-20 px-6 md:pt-40">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 border-b border-gray-100 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-gray-400 font-medium italic tracking-widest">ইনসান বিডি • ২০২৬</p>
          </header>

      {/* Founder Section - Unique & Premium UI (Without Photo) */}
<section className="relative mb-24 overflow-hidden rounded-[2rem] bg-[#264653] p-1 text-white shadow-2xl">
  {/* Background Decorative Elements */}
  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2a9d8f] opacity-20 blur-3xl"></div>
  <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#e9c46a] opacity-10 blur-2xl"></div>

  <div className="relative z-10 rounded-[1.9rem] border border-white/10 bg-gradient-to-br from-[#264653] to-[#213a45] p-8 md:p-12">
    <div className="max-w-3xl">
      
      {/* Aesthetic Quote Icon */}
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9c46a]/10">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-[#e9c46a]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21M14.017 21H21.017M14.017 21C12.9124 21 12.017 20.1046 12.017 19V15C12.017 12.7909 13.8079 11 16.017 11H21.017V6C21.017 4.89543 20.1216 4 19.017 4H16.017C13.8079 4 12.017 5.79086 12.017 8M3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21M3 21H10M3 21C1.89543 21 1 20.1046 1 19V15C1 12.7909 2.79086 11 5 11H10V6C10 4.89543 9.10457 4 8 4H5C2.79086 4 1 5.79086 1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#e9c46a] mb-6">
        ফাউন্ডারের বার্তা
      </h2>

      <blockquote className="relative">
        <p className="text-2xl md:text-3xl font-medium leading-[1.6] text-white/95 mb-10 tracking-tight">
          "আমাদের মূল লক্ষ্য হলো প্রতিটি অসহায় শিশুর জন্য একটি সুন্দর ও নিরাপদ পৃথিবী গড়ে তোলা। ইনসান বিডি শুধুমাত্র একটি প্লাটফর্ম নয়, এটি একটি <span className="text-[#2a9d8f] font-bold">মানবিক আন্দোলন</span> যা প্রতিটি শিশুর হাসি নিশ্চিত করতে কাজ করে।"
        </p>
        
        <footer className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-[#e9c46a]"></div>
          <div>
            <p className="text-xl font-bold tracking-wide text-white">মোঃ রেজোয়ান হোসাইন</p>
            <p className="text-sm font-medium uppercase tracking-widest text-[#2a9d8f]">
              প্রতিষ্ঠাতা ও পরিচালক, ইনসান বিডি
            </p>
          </div>
        </footer>
      </blockquote>
    </div>
  </div>
</section>

          {/* Main Content */}
          <article className="space-y-16 text-lg leading-relaxed text-gray-600">
            
            <section className="relative">
              <span className="absolute -left-4 top-0 h-full w-1 bg-[#e76f51] rounded-full"></span>
              <p className="font-medium text-xl md:text-2xl text-[#264653] leading-snug pl-4">
                ইনসান বিডি (Insaan BD) একটি অলাভজনক সংস্থা যা প্রতিটি এতিম শিশুর মৌলিক অধিকার নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। 
                আমাদের লক্ষ্য কেবল সাহায্য করা নয়, বরং একটি শিশুকে স্বাবলম্বী হিসেবে গড়ে তোলা।
              </p>
            </section>

            {/* লক্ষ্য ও উদ্দেশ্য */}
            <section className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
                  লক্ষ্য ও উদ্দেশ্য
                </h2>
                <p>
                  আমরা শিক্ষা, স্বাস্থ্য এবং মানসিক বিকাশের মাধ্যমে একটি স্থায়ী ইতিবাচক পরিবর্তন আনতে কাজ করি। 
                  আমাদের মিশন হলো পূর্ণ স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে শিশুদের জন্য একটি নিরাপদ ভবিষ্যৎ নিশ্চিত করা।
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
                  স্বচ্ছতা ও সুরক্ষা
                </h2>
                <p>
                  স্বচ্ছতা আমাদের ফাউন্ডেশনের ডিএনএ। প্রতিটি টাকার হিসাব সংরক্ষিত এবং অডিট সম্পন্ন করা হয়। 
                  আমরা আধুনিক সিকিউরিটি প্রোটোকল ব্যবহার করে প্রতিটি অনুদান সুরক্ষিত রাখি।
                </p>
              </div>
            </section>

            {/* কিভাবে কাজ করি */}
            <section className="space-y-8 bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F] text-center">
                কিভাবে আমরা কাজ করি
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "অন্বেষণ", desc: "মাঠ পর্যায়ে প্রকৃত অভাবী শিশুদের প্রয়োজন বিশ্লেষণ।" },
                  { title: "নির্বাচন", desc: "নির্দিষ্ট শিশুর লক্ষ্য অনুযায়ী সহায়তার সংকল্প।" },
                  { title: "প্রদান", desc: "স্বচ্ছ ও ডিজিটাল পদ্ধতিতে সরাসরি ফান্ডে পৌঁছানো।" },
                  { title: "পরিবর্তন", desc: "বাস্তব পরিবর্তনের নিয়মিত রিপোর্ট প্রদান করা।" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="bg-white shadow-sm px-3 py-1 rounded-lg text-[#2A9D8F] font-black border border-gray-100">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-[#264653]">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* নীতিমালা */}
            <section className="space-y-4 border-l-4 border-[#e9c46a] pl-6 py-2">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
                আমাদের নীতিমালা
              </h2>
              <p className="text-md italic text-gray-500 leading-relaxed">
                প্রাপ্ত প্রতিটি টাকার ১০০% সরাসরি শিশুদের কল্যাণে ব্যয় করা হয়। দাতা এবং সহায়তা প্রাপ্ত শিশু—উভয় পক্ষের 
                ব্যক্তিগত তথ্যের নিরাপত্তা ও শিশুদের সুরক্ষায় আমরা কঠোর আন্তর্জাতিক মানদণ্ড অনুসরণ করি।
              </p>
            </section>

          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}