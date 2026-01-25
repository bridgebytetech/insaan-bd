"use client";
import React, { useState, useRef } from "react";
import {
  User, Mail, Lock, Phone, MapPin, Building2, 
  ShieldCheck, Camera, Loader2, Save, ArrowLeft,
  Briefcase
} from "lucide-react";
import { donorService } from "@/app/lib/services/donorService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

export default function AdminAddDonor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    organizationName: "",
    organizationRegistrationNo: "",
    donorDpUrl: "", 
    isActive: true // Admin add korle default active thakbe
  });

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

  const handleAddDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return toast.error("দয়া করে ছবি আপলোড শেষ হওয়া পর্যন্ত অপেক্ষা করুন");
    
    setLoading(true);
    try {
      const payload = {
        ...formData,
        donorType,
        // Reset org fields if it's an individual
        organizationName: donorType === "ORGANIZATION" ? formData.organizationName : "",
        organizationRegistrationNo: donorType === "ORGANIZATION" ? formData.organizationRegistrationNo : "",
      };

      const res = await donorService.createDonor(payload);
      if (res) {
        toast.success("নতুন দাতা সফলভাবে যুক্ত হয়েছে");
        router.push("/admin/donors"); // Back to list
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "দাতা যুক্ত করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 pt-10 px-6 flex flex-col items-center">
      
      {/* Back Button & Header */}
      <div className="max-w-2xl w-full mb-8 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-[#264653] font-black uppercase text-[10px] tracking-widest transition-all"
        >
          <ArrowLeft size={16} /> Back to List
        </button>
        <div className="text-right">
            <h1 className="text-2xl font-black text-[#264653] tracking-tight">Add New Donor</h1>
            <p className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest">Administrative Entry</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100"
      >
        <form onSubmit={handleAddDonor} className="space-y-8">
          
          {/* প্রোফাইল পিকচার সেকশন */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-[#2A9D8F]/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#2A9D8F] transition-all group shadow-inner"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="text-gray-300 group-hover:text-[#2A9D8F] mx-auto mb-1" size={28} />
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Upload Photo</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="text-white animate-spin" size={24} />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* দাতার ধরন সুইচার */}
          <div className="grid grid-cols-2 gap-4 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
            {["INDIVIDUAL", "ORGANIZATION"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDonorType(t)}
                className={`py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                  donorType === t ? "bg-[#264653] text-white shadow-md" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput icon={<User size={18} />} name="donorName" placeholder="Full Name" value={formData.donorName} onChange={handleChange} required />
            <AdminInput icon={<Mail size={18} />} name="donorEmail" type="email" placeholder="Email Address" value={formData.donorEmail} onChange={handleChange} required />
            <AdminInput icon={<Phone size={18} />} name="donorContact" placeholder="Contact Number" value={formData.donorContact} onChange={handleChange} required />
            <AdminInput icon={<Lock size={18} />} name="donorPassword" type="password" placeholder="Set Password" value={formData.donorPassword} onChange={handleChange} required />
          </div>

          {donorType === "ORGANIZATION" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <AdminInput icon={<Building2 size={18} />} name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} required />
              <AdminInput icon={<ShieldCheck size={18} />} name="organizationRegistrationNo" placeholder="Reg. Number" value={formData.organizationRegistrationNo} onChange={handleChange} required />
            </motion.div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-4 text-gray-400"><MapPin size={18} /></div>
            <textarea
              name="donorAddress"
              placeholder="Full Address"
              value={formData.donorAddress}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#2A9D8F]/20 text-sm font-medium border-transparent focus:bg-white transition-all shadow-inner border border-gray-100"
              rows={3}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading || uploading}
            type="submit"
            className="w-full py-5 bg-[#2A9D8F] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#264653] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={18} />}
            {loading ? "SAVING..." : "CREATE DONOR ACCOUNT"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// Reusable Admin Input
function AdminInput({ icon, ...props }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#2A9D8F]/5 focus:bg-white focus:border-[#2A9D8F]/30 outline-none text-sm font-medium transition-all shadow-inner"
      />
    </div>
  );
}