"use client";

import React from 'react';
import Link from 'next/link';
import Footer from "@/app/components/shared/Footer";
export default function SimpleAboutPage() {
  return (
    // mt-16 বা pt-32 যোগ করা হয়েছে যাতে নেভিবার কন্টেন্টকে ঢেকে না ফেলে
    <>
    
    <div className="min-h-screen bg-white text-[#264653] pt-32 pb-20 px-6 md:pt-40">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-gray-400 font-medium italic">ইনসান বিডি • ২০২৬</p>
        </header>

        {/* Main Content */}
        <article className="space-y-12 text-lg leading-relaxed text-gray-600">
          
          <section>
            <p className="font-medium text-xl md:text-2xl text-[#264653] leading-tight">
              ইনসান বিডি (Insaan BD) একটি অলাভজনক সংস্থা যা প্রতিটি এতিম শিশুর মৌলিক অধিকার নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। 
              আমাদের লক্ষ্য কেবল সাহায্য করা নয়, বরং একটি শিশুকে স্বাবলম্বী হিসেবে গড়ে তোলা।
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
              লক্ষ্য ও উদ্দেশ্য
            </h2>
            <p>
              আমরা শিক্ষা, স্বাস্থ্য এবং মানসিক বিকাশের মাধ্যমে একটি স্থায়ী ইতিবাচক পরিবর্তন আনতে কাজ করি। 
              আমাদের মিশন হলো পূর্ণ স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে শিশুদের জন্য একটি নিরাপদ ভবিষ্যৎ নিশ্চিত করা।
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
              কিভাবে আমরা কাজ করি
            </h2>
            <ul className="space-y-4">
              {[
                { title: "অন্বেষণ", desc: "মাঠ পর্যায়ে প্রকৃত অভাবী শিশুদের প্রয়োজন বিশ্লেষণ।" },
                { title: "নির্বাচন", desc: "নির্দিষ্ট শিশুর লক্ষ্য অনুযায়ী সহায়তার সংকল্প।" },
                { title: "প্রদান", desc: "স্বচ্ছ ও ডিজিটাল পদ্ধতিতে অনুদান সরাসরি ফান্ডে পৌঁছানো।" },
                { title: "পরিবর্তন", desc: "বাস্তব পরিবর্তনের নিয়মিত রিপোর্ট ও আপডেট প্রদান।" },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-[#2A9D8F] font-black">0{idx + 1}.</span>
                  <p><strong>{item.title}:</strong> {item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">
              স্বচ্ছতা ও সুরক্ষা
            </h2>
            <p>
              স্বচ্ছতা আমাদের ফাউন্ডেশনের ডিএনএ। প্রতিটি টাকার হিসাব সংরক্ষিত এবং অডিট সম্পন্ন করা হয়। 
              আমরা আধুনিক এনক্রিপশন ও সিকিউরিটি প্রোটোকল ব্যবহার করে প্রতিটি অনুদান সুরক্ষিত রাখি।
            </p>
          </section>

          <section className="space-y-4 border-l-2 border-gray-100 pl-6 italic">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F] not-italic">
              নীতিমালা
            </h2>
            <p className="text-sm text-gray-400">
              প্রাপ্ত প্রতিটি টাকার ১০০% সরাসরি শিশুদের কল্যাণে ব্যয় করা হয়। দাতা এবং সহায়তা প্রাপ্ত শিশু—উভয় পক্ষের 
              ব্যক্তিগত তথ্যের নিরাপত্তা ও শিশুদের সুরক্ষায় আমরা কঠোর নীতিমালা অনুসরণ করি।
            </p>
          </section>

        </article>

        {/* Footer Link */}


      </div>

    </div>
    <Footer />
    </>
  );
}