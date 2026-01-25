"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Quote, Plus, CheckCircle2, Heart, GraduationCap, Users, Loader2 } from "lucide-react";

interface Review {
  reviewId: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function SuccessStories() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Fetch Approved Reviews ---
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.insaanbd.org/api/public/reviews");
        const result = await response.json();
        if (result.success && result.data) {
          // লেআউট ঠিক রাখতে সর্বোচ্চ ৩টি রিভিউ দেখাচ্ছি
          setReviews(result.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getReviewMeta = (idx: number) => {
    const meta = [
      { tag: "IMPACTED CHILD", type: "Orphan", color: "#2A9D8F", icon: GraduationCap },
      { tag: "CHILD SPONSOR", type: "Donor", color: "#E76F51", icon: Heart },
      { tag: "LOCAL GUARDIAN", type: "Community", color: "#264653", icon: Users },
    ];
    return meta[idx % meta.length];
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading Stories...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-24 md:py-40relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[#F8F9FA] -z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="mx-auto flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#2A9D8F]" />
              <span className="text-[#2A9D8F] font-black uppercase tracking-[0.6em] text-[10px]">Unified Voices</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-[#264653] tracking-tighter leading-[0.85]">
              শুভাকাঙ্ক্ষীদের <br /> <span className="text-gray-200">মতামত</span>
            </h2>
          </div>
          
          <div className="max-w-sm text-left lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-[#2A9D8F] pl-6 lg:pl-0 lg:pr-6 py-2">
             <p className="text-gray-400 font-bold text-sm leading-relaxed">
                মানুষের ভালোবাসা এবং দোয়া আমাদের আগামীর পথে এগিয়ে যেতে সাহস যোগায়।
             </p>
          </div>
        </div>

        {/* --- PERSPECTIVE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100 shadow-2xl shadow-gray-200/50">
          {reviews.map((item, idx) => {
            const meta = getReviewMeta(idx);
            const Icon = meta.icon;

            return (
              <motion.div
                key={item.reviewId}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white border-r border-b lg:border-b-0 border-gray-100 p-12 min-h-[550px] flex flex-col justify-between hover:bg-gray-50 transition-all duration-700 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black tracking-[0.3em] uppercase transition-colors" style={{ color: meta.color }}>
                       {meta.tag}
                     </p>
                     <p className="text-[9px] font-mono text-gray-300 group-hover:text-gray-400">
                       {new Date(item.createdAt).getFullYear()} Impact
                     </p>
                  </div>
                  <Icon size={20} className="text-gray-200 group-hover:text-[#264653] transition-colors" />
                </div>

                <div className="relative flex-grow">
                  <Quote size={40} className="text-gray-50 absolute -top-6 -left-4 -z-10 group-hover:text-[#2A9D8F]/10 transition-colors" />
                  <h3 className="text-2xl md:text-3xl font-bold text-[#264653] leading-snug tracking-tight">
                    "{item.message}"
                  </h3>
                </div>

                <div className="mt-12 space-y-8">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 bg-[#F8F9FA] rounded-none border border-gray-100 flex items-center justify-center text-[#264653] font-black text-2xl group-hover:border-[#2A9D8F] transition-all relative">
                       {item.name.charAt(0)}
                       <div className="absolute -top-1 -right-1">
                          <Plus size={14} className="text-[#E76F51]" />
                       </div>
                     </div>
                     
                     <div>
                        <h4 className="text-[#264653] font-black text-sm uppercase tracking-widest leading-none mb-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-[#2A9D8F]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Identity</span>
                        </div>
                     </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-100 overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full w-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>
                </div>

                <span className="absolute -bottom-4 -right-4 text-7xl font-black text-gray-50 group-hover:text-gray-100/50 transition-colors pointer-events-none uppercase">
                  {meta.type}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* --- REVIEW SUBMISSION FORM --- */}
        <div className="mt-20 border border-gray-100  overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-full -z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            <div className="lg:col-span-5 p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#E76F51]" />
                  <span className="text-[#E76F51] font-black uppercase tracking-[0.4em] text-[9px]">Contributor's Desk</span>
                </div>
                <h3 className="text-4xl font-black text-[#264653] tracking-tighter uppercase leading-none">
                  আপনার অভিজ্ঞতা <br /> <span className="text-[#2A9D8F]">শেয়ার করুন</span>
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                  আপনার একটি ছোট বার্তা আমাদের স্বেচ্ছাসেবীদের অনুপ্রাণিত করতে পারে। আমাদের কার্যক্রম সম্পর্কে আপনার মতামত জানান।
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-10 md:p-16">
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  const payload = {
                    name: formData.get('name'),
                    message: formData.get('message')
                  };

                  try {
                    const res = await fetch('https://api.insaanbd.org/api/public/reviews', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    const result = await res.json();
                    if (result.success) {
                      alert('ধন্যবাদ! আপনার রিভিউটি সফলভাবে জমা হয়েছে এবং অনুমোদনের জন্য অপেক্ষমান।');
                      (e.target as HTMLFormElement).reset();
                    }
                  } catch (err) {
                    alert('দুঃখিত, এই মুহূর্তে রিভিউ পাঠানো সম্ভব হচ্ছে না।');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative border-b-2 border-gray-200 focus-within:border-[#2A9D8F] transition-colors py-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-4">Full Name</label>
                    <input 
                      name="name"
                      required
                      disabled={isSubmitting}
                      type="text" 
                      placeholder="আপনার নাম লিখুন..." 
                      className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200 disabled:opacity-50"
                    />
                  </div>
                  <div className="relative border-b-2 border-gray-200 focus-within:border-[#2A9D8F] transition-colors py-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-4">Identity (Optional)</label>
                    <input 
                      disabled={isSubmitting}
                      type="text" 
                      placeholder="যেমন: দাতা / শুভাকাঙ্ক্ষী" 
                      className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="relative border-b-2 border-gray-200 focus-within:border-[#2A9D8F] transition-colors py-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-4">Your Message</label>
                  <textarea 
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={2}
                    placeholder="আপনার মূল্যবান কথাগুলো এখানে লিখুন..." 
                    className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200 resize-none disabled:opacity-50"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-6 bg-[#264653] text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#2A9D8F] transition-all shadow-2xl active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Submit Review <Plus size={16} className="group-hover:rotate-90 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}