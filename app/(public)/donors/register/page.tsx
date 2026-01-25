"use client";
import React, { useState, useRef } from "react";
import {
  User, Mail, Lock, Phone, MapPin, Building2, ArrowRight, ShieldCheck,
  RefreshCcw, Camera, Loader2, Sparkles
} from "lucide-react";
import donorServicePublic from "@/app/lib/services/donorServicePublic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Footer from "@/app/components/shared/Footer";

export default function DonorRegistration() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [donorType, setDonorType] = useState("INDIVIDUAL");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPassword: "",
    donorContact: "",
    donorAddress: "",
    donorMessage: "Interested in supporting Insaan BD",
    organizationName: "",
    organizationRegistrationNo: "",
    donorDpUrl: "", 
    typeOfSupport: "FINANCIAL",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      return toast.error("ফাইল ১০ এমবি এর বেশি হতে পারবে না!");
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    
    try {
      const res = await axios.post("https://api.insaanbd.org/api/public/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        const uploadedUrl = res.data.data.url;
        setFormData((prev) => ({ ...prev, donorDpUrl: uploadedUrl }));
        toast.success("ছবি আপলোড সম্পন্ন হয়েছে");
      }
    } catch (err) {
      toast.error("ছবি আপলোড ব্যর্থ হয়েছে");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return toast.error("দয়া করে ছবি আপলোড শেষ হওয়া পর্যন্ত অপেক্ষা করুন");
    
    setLoading(true);
    try {
      const payload = {
        ...formData,
        donorType,
        organizationName: donorType === "ORGANIZATION" ? formData.organizationName : "",
        organizationRegistrationNo: donorType === "ORGANIZATION" ? formData.organizationRegistrationNo : "",
      };
      const res = await donorServicePublic.registerDonor(payload);
      if (res) {
        toast.success("রেজিস্ট্রেশন সফল!");
        setStep(2);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ pt-32 md:pt-44 যোগ করা হয়েছে যাতে উপরে পর্যাপ্ত স্পেস থাকে
    <>
    <div className="min-h-screen bg-[#FDFDFD] pt-32 md:pt-44 pb-20 px-6 flex flex-col items-center">
      
      {/* Page Header (Optional but good for UX) */}
      <div className="text-center mb-10">
         <h1 className="text-4xl font-black text-[#264653] tracking-tight mb-2">দাতা নিবন্ধন</h1>
         <p className="text-gray-400 text-sm font-medium italic">মানবতার সেবায় আপনার অংশগ্রহণ আমাদের শক্তি</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // ✅ আপনার সেই প্রিয় বক্স স্টাইল
        className="max-w-md w-full bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-[#264653] tracking-tight">তথ্য দিয়ে যোগ দিন</h2>
                
                {/* প্রোফাইল পিকচার সেকশন */}
                <div className="relative w-24 h-24 mx-auto mt-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full rounded-full bg-gray-50 border-2 border-dashed border-[#2A9D8F]/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#2A9D8F] transition-all group shadow-inner"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-gray-300 group-hover:text-[#2A9D8F] transition-colors" size={32} />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                        <Loader2 className="text-white animate-spin" size={20} />
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  <div className="absolute -bottom-1 -right-1 bg-[#2A9D8F] text-white p-1.5 rounded-full shadow-lg pointer-events-none">
                    <Camera size={12} />
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                  {uploading ? "Uploading..." : "আপনার ছবি যোগ করুন"}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* দাতার ধরন সুইচার */}
                <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
                  {["INDIVIDUAL", "ORGANIZATION"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDonorType(t)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        donorType === t ? "bg-[#264653] text-white shadow-lg" : "text-gray-400"
                      }`}
                    >
                      {t === "INDIVIDUAL" ? "ব্যক্তিগত" : "প্রতিষ্ঠান"}
                    </button>
                  ))}
                </div>

                <Input icon={<User size={18} />} name="donorName" placeholder="পুরো নাম" value={formData.donorName} onChange={handleChange} required />
                <Input icon={<Mail size={18} />} name="donorEmail" type="email" placeholder="ইমেইল অ্যাড্রেস" value={formData.donorEmail} onChange={handleChange} required />
                <Input icon={<Phone size={18} />} name="donorContact" placeholder="ফোন নম্বর" value={formData.donorContact} onChange={handleChange} required />
                <Input icon={<Lock size={18} />} name="donorPassword" type="password" placeholder="পাসওয়ার্ড" value={formData.donorPassword} onChange={handleChange} required />

                {donorType === "ORGANIZATION" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-2">
                    <Input icon={<Building2 size={18} />} name="organizationName" placeholder="প্রতিষ্ঠানের নাম" value={formData.organizationName} onChange={handleChange} required />
                    <Input icon={<ShieldCheck size={18} />} name="organizationRegistrationNo" placeholder="রেজিস্ট্রেশন নম্বর" value={formData.organizationRegistrationNo} onChange={handleChange} required />
                  </motion.div>
                )}

                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400"><MapPin size={18} /></div>
                  <textarea
                    name="donorAddress"
                    placeholder="বর্তমান ঠিকানা"
                    value={formData.donorAddress}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#2A9D8F]/20 text-sm font-medium border-transparent focus:bg-white focus:border-gray-100 transition-all shadow-inner"
                    rows={2}
                    required
                  />
                </div>

                <button
                  disabled={loading || uploading}
                  type="submit"
                  className="w-full py-5 bg-[#264653] text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "প্রসেস হচ্ছে..." : (
                    <>{uploading ? "ছবি আপলোড হচ্ছে..." : "পরবর্তী ধাপ"} <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center space-y-8"
            >
              <div className="w-20 h-20 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#264653]">ভেরিফিকেশন</h2>
                <p className="text-xs text-gray-400 mt-2">
                  কোডটি এখানে দিন: <br />
                  <span className="font-bold text-[#2A9D8F]">{formData.donorEmail}</span>
                </p>
              </div>

              <form onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  try {
                    await donorServicePublic.verifyOtp(formData.donorEmail, otp);
                    toast.success("সফল হয়েছে!");
                    router.push("/donors/login");
                  } catch (err) {
                    toast.error("ভুল কোড");
                  } finally { setLoading(false); }
                }} 
                className="space-y-6"
              >
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-4xl tracking-[0.3em] font-black py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#2A9D8F] outline-none transition-all text-[#264653]"
                  placeholder="000000"
                  required
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-[#2A9D8F] text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-lg"
                >
                  {loading ? "ভেরিফাই হচ্ছে..." : "সম্পন্ন করুন"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}

// ইনপুট কম্পোনেন্ট
function Input({ icon, ...props }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#2A9D8F]/5 focus:bg-white focus:border-gray-100 outline-none text-sm font-medium transition-all shadow-inner"
      />
    </div>
  );
}