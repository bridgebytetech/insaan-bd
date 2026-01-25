"use client";

import React, { useState } from "react";
import { 
  Heart, User, Phone, Banknote, FileText, 
  Calendar, Upload, CheckCircle2, Loader2, ArrowRight,
  ShieldCheck, Wallet, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "@/app/lib/api/axios";
import Footer from "@/app/components/shared/Footer";

export default function DonationPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    transactionId: "",
    name: "",
    phone: "",
    amount: "",
    receiptUrl: "",
    description: "",
    donationDate: new Date().toISOString().split('T')[0]
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      setUploading(true);
      const res = await api.post("/public/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (res.data.success) {
        setFormData(prev => ({ ...prev, receiptUrl: res.data.data.url }));
        toast.success("রসিদ আপলোড সফল হয়েছে");
      }
    } catch (error) {
      toast.error("ফাইল আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receiptUrl) {
      return toast.error("অনুগ্রহ করে পেমেন্ট রসিদ আপলোড করুন");
    }

    try {
      setLoading(true);
      const payload = { ...formData, amount: Number(formData.amount) };
      const res = await api.post("/public/donations", payload);
      
      if (res.status === 200 || res.status === 201) {
        toast.success("আপনার অনুদান সফলভাবে নথিভুক্ত হয়েছে। ধন্যবাদ!");
        setFormData({
          transactionId: "", name: "", phone: "", 
          amount: "", receiptUrl: "", description: "",
          donationDate: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      toast.error("সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
   
    <div className="min-h-screen bg-[#F4F7F8] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] mb-6 border border-[#2A9D8F]/20"
          >
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Philanthropy</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-[#1B353E] mb-6 tracking-tighter leading-[1.1]">
            আপনার হাত বাড়িয়ে <br /> 
            <span className="text-[#2A9D8F]">হাসি ফোটান</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            আপনার প্রতিটি টাকা সরাসরি এতিম শিশুদের শিক্ষা ও খাদ্যের জন্য ব্যবহৃত হয়। আমাদের স্বচ্ছ প্রক্রিয়ার মাধ্যমে আপনি আপনার অনুদানের প্রভাব সরাসরি দেখতে পাবেন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl shadow-gray-200/40 p-10 md:p-14 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup icon={<User />} label="আপনার পুরো নাম" placeholder="উদাঃ আব্দুল্লাহ আল মামুন">
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="form-input" />
                </InputGroup>

                <InputGroup icon={<Phone />} label="মোবাইল নম্বর" placeholder="০১৭xxxxxxxx">
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="form-input" />
                </InputGroup>

                <InputGroup icon={<Banknote />} label="টাকার পরিমাণ (BDT)" placeholder="৫০০">
                  <input required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} type="number" className="form-input" />
                </InputGroup>

                <InputGroup icon={<Calendar />} label="অনুদানের তারিখ" placeholder="">
                  <input required value={formData.donationDate} onChange={e => setFormData({...formData, donationDate: e.target.value})} type="date" className="form-input" />
                </InputGroup>
              </div>

              <InputGroup icon={<FileText />} label="ট্রানজেকশন আইডি (TxnID)" placeholder="BKX928SLA">
                <input required value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})} type="text" className="form-input" />
              </InputGroup>

              {/* Enhanced File Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-5">পেমেন্ট রসিদ / স্ক্রিনশট</label>
                <label className={`
                  relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[2.5rem] transition-all duration-300 cursor-pointer group
                  ${formData.receiptUrl ? 'bg-[#2A9D8F]/5 border-[#2A9D8F]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-[#2A9D8F]'}
                `}>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-[#2A9D8F]" size={32} />
                      <span className="text-sm font-bold text-gray-500 tracking-wide">ফাইল আপলোড হচ্ছে...</span>
                    </div>
                  ) : formData.receiptUrl ? (
                    <div className="flex flex-col items-center gap-3 text-[#2A9D8F]">
                      <div className="w-16 h-16 rounded-full bg-[#2A9D8F] flex items-center justify-center text-white shadow-lg">
                         <CheckCircle2 size={32} />
                      </div>
                      <span className="font-black uppercase text-xs tracking-widest mt-2">রসিদ যুক্ত করা হয়েছে</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-400 mb-4 shadow-sm group-hover:scale-110 group-hover:text-[#2A9D8F] transition-all">
                        <Upload size={24} />
                      </div>
                      <p className="text-sm font-black text-[#1B353E] mb-1">ফাইল সিলেক্ট করুন</p>
                      <p className="text-xs font-medium text-gray-400 italic">PNG, JPG অথবা PDF (Max 5MB)</p>
                    </div>
                  )}
                </label>
              </div>

              <InputGroup icon={<FileText />} label="মন্তব্য (ঐচ্ছিক)" placeholder="আপনার কোনো বার্তা থাকলে লিখুন">
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input py-5 resize-none" />
              </InputGroup>

              <button 
                disabled={loading || uploading}
                className="w-full bg-[#1B353E] text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-[#1B353E]/20 hover:bg-[#2A9D8F] transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>সাবমিট করুন <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Side: Instructions & Info */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
               className="bg-[#1B353E] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#2A9D8F] flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">পেমেন্ট পদ্ধতি</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-[10px] font-black text-[#2A9D8F] uppercase mb-1">bKash (Merchant)</p>
                      <p className="text-lg font-bold tracking-wider">০১৭৯৬-৪১৫২০৩</p>
                    </div>
                    <div className="w-10 h-10 bg-[#D12053] rounded-lg" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-[10px] font-black text-orange-400 uppercase mb-1">Nagad (Personal)</p>
                      <p className="text-lg font-bold tracking-wider">০১৮৭৫-৯৬৩২১০</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-600 rounded-lg" />
                  </div>

                  <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex gap-4">
                    <Info size={24} className="text-emerald-400 shrink-0" />
                    <p className="text-xs leading-relaxed font-medium text-emerald-100/80">
                      প্রথমে আপনার পেমেন্ট সম্পন্ন করুন। এরপর সেই লেনদেনের ট্রানজেকশন আইডি এবং রসিদের ছবি দিয়ে ফর্মটি সাবমিট করুন।
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
               className="bg-[#E76F51]/10 p-10 rounded-[3rem] border border-[#E76F51]/20 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E76F51] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#E76F51]/30">
                <Heart size={24} fill="currentColor" />
              </div>
              <p className="text-[#1B353E] text-lg font-bold leading-snug italic">
                "দান কখনো সম্পদ কমায় না, বরং বরকত বৃদ্ধি করে।"
              </p>
              <p className="mt-4 text-[10px] font-black text-[#E76F51] uppercase tracking-widest">— ইনসান বিডি ফাউন্ডেশন</p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 1.5rem;
          padding: 1.25rem 1.5rem;
          font-weight: 700;
          color: #1B353E;
          transition: all 0.3s ease;
          outline: none;
        }
        .form-input:focus {
          background-color: white;
          border-color: #2A9D8F;
          box-shadow: 0 10px 25px -5px rgba(42, 157, 143, 0.1);
        }
        .form-input::placeholder {
          color: #CBD5E1;
          font-weight: 500;
        }
      `}</style>
    </div>
    <Footer /> 
   </>
  );
}

function InputGroup({ icon, label, children, placeholder }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 ml-5">
        <span className="text-[#2A9D8F]">{React.cloneElement(icon, { size: 14 })}</span>
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      </div>
      {React.cloneElement(children, { placeholder })}
    </div>
  );
}