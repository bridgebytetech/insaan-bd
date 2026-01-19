"use client";
import React, { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Building2, ArrowRight, ShieldCheck, RefreshCcw } from "lucide-react";
import { donorService } from "@/app/lib/donorService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DonorRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [donorType, setDonorType] = useState("INDIVIDUAL");
  
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPassword: "",
    donorContact: "",
    donorAddress: "",
    organizationName: "",
    organizationRegistrationNo: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ধাপ ১: রেজিস্ট্রেশন সাবমিট
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, donorType };
      const res = await donorService.registerDonor(payload);
      if (res.success) {
        toast.success("Registration successful! Check your email for OTP.");
        setStep(2); // OTP ভেরিফিকেশন স্টেপে নিয়ে যাবে
      }

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  // ধাপ ২: OTP ভেরিফাই করা
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Enter 6-digit OTP");
    setLoading(true);
    try {
      const res = await donorService.verifyOtp(formData.donorEmail, otp);
      if (res.success) {
        toast.success("Email Verified Successfully! Please wait for Admin Approval.");
        router.push("/donor/login"); // সফল হলে লগইন পেজে পাঠাবে
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  // OTP পুনরায় পাঠানো
  const handleResendOtp = async () => {
    try {
      await donorService.resendOtp(formData.donorEmail);
      toast.success("A new OTP has been sent to your email.");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-20 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
        
        {step === 1 ? (
          /* --- Registration Form --- */
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-[#264653]">Create Account</h2>
              <p className="text-gray-400 font-bold text-sm">Join Insaan BD as a Donor</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Donor Type Switcher */}
              <div className="flex p-1 bg-gray-100 rounded-2xl mb-4">
                {["INDIVIDUAL", "ORGANIZATION"].map((t) => (
                  <button key={t} type="button" onClick={() => setDonorType(t)} 
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${donorType === t ? "bg-white text-[#264653] shadow-sm" : "text-gray-400"}`}>
                    {t}
                  </button>
                ))}
              </div>

              <Input icon={<User size={18}/>} name="donorName" placeholder="Full Name" onChange={handleChange} required />
              <Input icon={<Mail size={18}/>} name="donorEmail" type="email" placeholder="Email Address" onChange={handleChange} required />
              <Input icon={<Phone size={18}/>} name="donorContact" placeholder="Phone Number" onChange={handleChange} required />
              <Input icon={<Lock size={18}/>} name="donorPassword" type="password" placeholder="Create Password" onChange={handleChange} required />

              {donorType === "ORGANIZATION" && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Input icon={<Building2 size={18}/>} name="organizationName" placeholder="Organization Name" onChange={handleChange} />
                  <Input icon={<ShieldCheck size={18}/>} name="organizationRegistrationNo" placeholder="Reg No" onChange={handleChange} />
                </div>
              )}

              <textarea name="donorAddress" placeholder="Full Address" onChange={handleChange} 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#2A9D8F]/20 text-sm" rows={2} required />

              <button disabled={loading} className="w-full py-4 bg-[#264653] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-2">
                {loading ? "Processing..." : <>Next Step <ArrowRight size={18}/></>}
              </button>
            </form>
          </>
        ) : (
          /* --- OTP Verification UI --- */
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={40} />
            </div>
            <h2 className="text-2xl font-black text-[#264653]">Verify Your Email</h2>
            <p className="text-sm text-gray-500 px-4">
              We've sent a 6-digit code to <br/> <span className="font-bold text-[#264653]">{formData.donorEmail}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <input 
                type="text" maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-4xl tracking-[0.4em] font-black py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#2A9D8F] outline-none transition-all"
                placeholder="000000"
              />

              <button disabled={loading} className="w-full py-4 bg-[#2A9D8F] text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-lg transition-all">
                {loading ? "Verifying..." : "Verify & Complete"}
              </button>
            </form>

            <button onClick={handleResendOtp} className="flex items-center justify-center gap-2 text-xs font-black text-gray-400 hover:text-[#264653] mx-auto uppercase tracking-tighter">
              <RefreshCcw size={14} /> Resend OTP Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Input
function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input {...props} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none text-sm font-medium" />
    </div>
  );
}