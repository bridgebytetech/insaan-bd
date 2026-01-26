"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Quote, Plus, CheckCircle2, Loader2 ,Calendar} from "lucide-react";

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.insaanbd.org/api/public/reviews");
        const result = await response.json();
        if (result.success && result.data) {
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

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading Stories...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-24 md:py-40 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mx-auto flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#2A9D8F]" />
              <span className="text-[#2A9D8F] font-black uppercase tracking-[0.6em] text-[10px]">Testimonials</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#264653] tracking-tighter leading-[0.9]">
              শুভাকাঙ্ক্ষীদের <br /> <span className="text-gray-300">মতামত</span>
            </h2>
          </div>
          <div className="max-w-sm text-left lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-[#2A9D8F] pl-6 lg:pl-0 lg:pr-6 py-2">
             <p className="text-gray-400 font-bold text-sm leading-relaxed">
               মানুষের ভালোবাসা এবং দোয়া আমাদের আগামীর পথে এগিয়ে যেতে সাহস যোগায়।
             </p>
          </div>
        </div>

        {/* --- REVIEW GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={item.reviewId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Decorative Quote Icon */}
              <Quote size={80} className="text-gray-50 absolute -top-4 -right-4 opacity-50 group-hover:text-[#2A9D8F]/10 transition-colors pointer-events-none" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <Quote size={32} className="text-[#2A9D8F] opacity-20" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#264653] leading-relaxed tracking-tight mb-10 italic">
                  {item.message}
                </h3>
              </div>

              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-gray-50">
                <div className="w-14 h-14 bg-gradient-to-br from-[#264653] to-[#2A9D8F] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#264653]/20 transition-transform group-hover:rotate-3">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#264653] font-black text-sm uppercase tracking-wider mb-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#2A9D8F]" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
  {new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}
</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- FORM SECTION --- */}
        <div className="mt-24 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-12 md:p-20 bg-[#264653] text-white">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#E76F51]" />
                  <span className="text-[#E76F51] font-black uppercase tracking-[0.4em] text-[9px]">Connect With Us</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                  আপনার অভিজ্ঞতা <br /> <span className="text-[#2A9D8F]">শেয়ার করুন</span>
                </h3>
                <p className="text-gray-300 text-sm font-medium leading-relaxed max-w-xs">
                  আপনার একটি ছোট বার্তা আমাদের স্বেচ্ছাসেবীদের অনুপ্রাণিত করতে পারে। আমাদের কার্যক্রম সম্পর্কে আপনার মতামত জানান।
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-12 md:p-20">
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
                      alert('ধন্যবাদ! আপনার রিভিউটি অনুমোদনের জন্য অপেক্ষমান।');
                      (e.target as HTMLFormElement).reset();
                    }
                  } catch (err) {
                    alert('দুঃখিত, রিভিউ পাঠানো সম্ভব হচ্ছে না।');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group border-b-2 border-gray-100 focus-within:border-[#2A9D8F] transition-all py-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-6">Full Name</label>
                    <input 
                      name="name" required disabled={isSubmitting} type="text" 
                      placeholder="আপনার নাম..." 
                      className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200"
                    />
                  </div>
                  <div className="relative group border-b-2 border-gray-100 focus-within:border-[#2A9D8F] transition-all py-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-6">Identity</label>
                    <input 
                      disabled={isSubmitting} type="text" 
                      placeholder="উদা: শুভাকাঙ্ক্ষী" 
                      className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200"
                    />
                  </div>
                </div>

                <div className="relative group border-b-2 border-gray-100 focus-within:border-[#2A9D8F] transition-all py-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute -top-6">Your Message</label>
                  <textarea 
                    name="message" required disabled={isSubmitting} rows={2}
                    placeholder="আপনার মূল্যবান কথাগুলো..." 
                    className="w-full bg-transparent outline-none text-[#264653] font-bold placeholder:text-gray-200 resize-none"
                  />
                </div>

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center justify-center gap-4 bg-[#264653] text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#2A9D8F] transition-all rounded-xl shadow-xl shadow-[#264653]/20 active:scale-95 disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Submit Review <Plus size={18} /></>
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