"use client";

import { useState, useEffect } from "react";
import { Calendar, Receipt, CheckCircle2, Clock, ArrowLeft, Hash, Quote, MessageSquare, User, Loader2, History } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import donorProfileService from "@/app/lib/services/donorProfileService";

interface Donation {
  donationId: number;
  orphanName: string;
  donationAmount: number;
  donationDate: string;
  donationStatus: string;
  transactionId: string;
  donationDescription: string;
  verificationNotes: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await donorProfileService.getDonations();
      if (res.success) {
        setDonations(res.data);
      }
    } catch (error) {
      toast.error("দানের তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] pt-32">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link 
            href="/donors/profile" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2A9D8F] hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft size={16} /> ড্যাশবোর্ডে ফিরুন
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#264653] mb-3 tracking-tight">
                আমার দানসমূহ
              </h1>
              <p className="text-gray-500 font-medium">
                আপনার সকল দান ইতিহাস এখানে দেখুন
              </p>
            </div>
            
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">মোট দান</p>
              <p className="text-3xl font-black text-[#2A9D8F]">{donations.length}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {donations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-16 text-center shadow-lg border border-gray-100"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Receipt size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-3">কোনো দান পাওয়া যায়নি</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              আপনি এখনো কোনো দান করেননি। আপনার প্রোফাইলে গিয়ে সংযুক্ত শিশুদের জন্য দান করুন।
            </p>
            <Link 
              href="/donors/profile" 
              className="inline-block bg-[#2A9D8F] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#264653] transition-colors"
            >
              প্রোফাইলে যান
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {donations.map((d, index) => (
              <motion.div
                key={d.donationId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:border-[#2A9D8F] transition-all group relative overflow-hidden"
              >
                {/* Top Row: ID, Amount & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center px-3 py-2 bg-[#264653] text-white rounded-2xl min-w-[60px] shadow-lg shadow-[#264653]/10">
                      <span className="text-sm font-black leading-none">#DON-{d.donationId}</span>
                    </div>
                    
                    <div>
                      <h4 className="text-2xl font-black text-[#264653]">৳{d.donationAmount.toLocaleString('bn-BD')}</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={12} className="text-[#2A9D8F]" /> 
                        {new Date(d.donationDate).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border ${
                    d.donationStatus === 'APPROVED' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {d.donationStatus}
                  </span>
                </div>

                {/* Middle Row: Grid Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-50">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">সংশ্লিষ্ট শিশু</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#264653]/10 flex items-center justify-center">
                        <User size={12} className="text-[#264653]" />
                      </div>
                      <span className="text-sm font-bold text-[#264653]">{d.orphanName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">ট্রানজেকশন আইডি</p>
                    <div className="flex items-center gap-2">
                      <Hash size={12} className="text-[#2A9D8F]" />
                      <span className="text-sm font-mono font-bold text-gray-600">{d.transactionId || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Additional Details */}
                <div className="mt-4 space-y-3">
                  {d.donationDescription && (
                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Quote size={10} className="text-[#264653] opacity-40" />
                        <span className="text-[9px] font-black text-[#264653] uppercase opacity-70">আপনার মন্তব্য:</span>
                      </div>
                      <p className="text-[11px] font-bold text-[#264653]/80 leading-relaxed pl-1">
                        {d.donationDescription}
                      </p>
                    </div>
                  )}

                  {d.verificationNotes && (
                    <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MessageSquare size={10} className="text-amber-600" />
                        <span className="text-[9px] font-black text-amber-700 uppercase">যাচাইকরণ নোট:</span>
                      </div>
                      <p className="text-[10px] font-bold text-amber-800 italic">
                        "{d.verificationNotes}"
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}