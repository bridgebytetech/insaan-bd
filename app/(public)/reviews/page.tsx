"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Quote, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import Link from 'next/link';
import Footer from "@/app/components/shared/Footer";

interface Review {
  reviewId: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function AllReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.insaanbd.org/api/public/reviews");
        const result = await response.json();
        if (result.success && result.data) {
          setReviews(result.data); // এখানে সব ডেটা সেট করা হচ্ছে
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
      </div>
    );
  }

  return (
   <>
   
    <div className="bg-[#F8F9FA] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2A9D8F] mb-12 font-bold text-sm transition-colors">
          <ArrowLeft size={18} /> ফিরে যান
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#264653] tracking-tighter">
            সকল <span className="text-gray-300">মতামত</span>
          </h1>
          <p className="text-[#2A9D8F] font-bold mt-4">সর্বমোট {reviews.length} জন শুভাকাঙ্ক্ষী আমাদের সাথে আছেন</p>
        </div>

        {/* Grid showing all reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={item.reviewId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <Quote size={24} className="text-[#2A9D8F] opacity-30 mb-6" />
                <p className="text-gray-600 font-medium italic mb-8 leading-relaxed">
                  "{item.message}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t pt-6">
                <div className="w-12 h-12 bg-[#264653] rounded-xl flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#264653] font-bold text-sm uppercase">{item.name}</h4>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Calendar size={12} />
                    <span className="text-[10px]">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
   </>
  );
}