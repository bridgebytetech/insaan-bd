"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";
import { donorService } from "@/app/lib/services/donorService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DonorRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [donorType, setDonorType] = useState("INDIVIDUAL");

  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPassword: "",
    donorContact: "",
    donorAddress: "",
    donorMessage: "Interested in supporting Insaan BD", // Default message
    organizationName: "",
    organizationRegistrationNo: "",
    donorDpUrl: "", // Optional for now
    typeOfSupport: "FINANCIAL", // Default type
  });

  const [otp, setOtp] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ধাপ ১: ব্যাকএন্ড কানেকশন (Register)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API Schema অনুযায়ী পে-লোড তৈরি
      const payload = {
        ...formData,
        donorType,
        // অর্গানাইজেশন না হলে এগুলো খালি স্ট্রিং পাঠানো নিরাপদ
        organizationName:
          donorType === "ORGANIZATION" ? formData.organizationName : "",
        organizationRegistrationNo:
          donorType === "ORGANIZATION"
            ? formData.organizationRegistrationNo
            : "",
      };

      const res = await donorService.registerDonor(payload);

      if (res.success) {
        toast.success("রেজিস্ট্রেশন সফল! আপনার ইমেইল চেক করুন।");
        setStep(2);
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  // ধাপ ২: OTP ভেরিফাই
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("৬ ডিজিটের OTP দিন");
    setLoading(true);
    try {
      const res = await donorService.verifyOtp(formData.donorEmail, otp);
      if (res.success) {
        toast.success(
          "ইমেইল সফলভাবে ভেরিফাই হয়েছে! অ্যাডমিন অ্যাপ্রুভালের জন্য অপেক্ষা করুন।",
        );
        router.push("/donors/login"); // আপনার রাউট অনুযায়ী চেঞ্জ করে নিন
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "ভুল OTP দিয়েছেন");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await donorService.resendOtp(formData.donorEmail);
      toast.success("আপনার ইমেইলে নতুন কোড পাঠানো হয়েছে।");
    } catch (err) {
      toast.error("কোড পাঠাতে ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#264653] tracking-tight">
                  দাতা হিসেবে যোগ দিন
                </h2>
                <p className="text-gray-400 font-bold text-sm mt-2">
                  Become a partner in change
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Type Switcher */}
                <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-6 border border-gray-100">
                  {["INDIVIDUAL", "ORGANIZATION"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDonorType(t)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${donorType === t ? "bg-[#264653] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <Input
                  icon={<User size={18} />}
                  name="donorName"
                  placeholder="আপনার পুরো নাম"
                  onChange={handleChange}
                  required
                />
                <Input
                  icon={<Mail size={18} />}
                  name="donorEmail"
                  type="email"
                  placeholder="ইমেইল অ্যাড্রেস"
                  onChange={handleChange}
                  required
                />
                <Input
                  icon={<Phone size={18} />}
                  name="donorContact"
                  placeholder="ফোন নম্বর"
                  onChange={handleChange}
                  required
                />
                <Input
                  icon={<Lock size={18} />}
                  name="donorPassword"
                  type="password"
                  placeholder="পাসওয়ার্ড তৈরি করুন"
                  onChange={handleChange}
                  required
                />

                {donorType === "ORGANIZATION" && (
                  <div className="space-y-4 pt-2">
                    <Input
                      icon={<Building2 size={18} />}
                      name="organizationName"
                      placeholder="প্রতিষ্ঠানের নাম"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      icon={<ShieldCheck size={18} />}
                      name="organizationRegistrationNo"
                      placeholder="রেজিস্ট্রেশন নম্বর"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <textarea
                    name="donorAddress"
                    placeholder="বর্তমান ঠিকানা"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#2A9D8F]/20 text-sm font-medium border-transparent focus:bg-white focus:border-gray-100 transition-all"
                    rows={2}
                    required
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-5 bg-[#264653] text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#264653]/10 active:scale-[0.98]"
                >
                  {loading ? (
                    "প্রসেস হচ্ছে..."
                  ) : (
                    <>
                      পরবর্তী ধাপ <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#264653]">
                  ইমেইল ভেরিফিকেশন
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  আমরা একটি কোড পাঠিয়েছি: <br />{" "}
                  <span className="font-bold text-[#2A9D8F]">
                    {formData.donorEmail}
                  </span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-5xl tracking-[0.3em] font-black py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-[#2A9D8F] focus:bg-white outline-none transition-all text-[#264653]"
                  placeholder="000000"
                />

                <button
                  disabled={loading}
                  className="w-full py-5 bg-[#2A9D8F] text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] hover:shadow-2xl hover:shadow-[#2A9D8F]/30 transition-all active:scale-[0.98]"
                >
                  {loading ? "ভেরিফাই হচ্ছে..." : "ভেরিফাই ও সম্পন্ন করুন"}
                </button>
              </form>

              <button
                onClick={handleResendOtp}
                className="group flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#264653] mx-auto uppercase tracking-widest transition-colors"
              >
                <RefreshCcw
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />{" "}
                পুনরায় কোড পাঠান
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#2A9D8F]/5 focus:bg-white focus:border-gray-100 outline-none text-sm font-medium transition-all"
      />
    </div>
  );
}
