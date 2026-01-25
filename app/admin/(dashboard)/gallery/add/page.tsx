"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CloudUpload,
  Loader2,
  Sparkles,
  Type,
  AlignLeft,
  Calendar,
  Save,
  Hash
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import { GalleryRequest } from "@/app/lib/types/admin-gallery";

export default function GalleryAddPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<GalleryRequest>({
    photoUrl: "",
    title: "",
    description: "",
    time: "২০২৬",
    displayOrder: 1, // Default value
  });

  // --- 💡 অটোমেটিক অর্ডার ক্যালকুলেশন ---
  useEffect(() => {
    const fetchAndSetOrder = async () => {
      try {
        const res = await adminGalleryService.getAll();
        const items = res.data.data;
        if (items && items.length > 0) {
          // বর্তমান লিস্টের সর্বোচ্চ অর্ডার বের করে তার সাথে ১ যোগ করা হচ্ছে
          const maxOrder = Math.max(...items.map((item: any) => item.displayOrder || 0));
          setFormData(prev => ({ ...prev, displayOrder: maxOrder + 1 }));
        }
      } catch (err) {
        console.error("Failed to sync order:", err);
      }
    };
    fetchAndSetOrder();
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://api.insaanbd.org/api/public/files/${url}`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ফাইল ৫ মেগাবাইটের কম হতে হবে");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("ইমেজ আপলোড হচ্ছে...");

    try {
      const res = await adminGalleryService.uploadFile(file);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, photoUrl: res.data.data.url }));
        toast.success("আপলোড সফল", { id: toastId });
      }
    } catch (err) {
      toast.error("আপলোড ব্যর্থ হয়েছে", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photoUrl) {
      toast.error("দয়া করে একটি ইমেজ আপলোড করুন");
      return;
    }

    setLoading(true);
    try {
      await adminGalleryService.create(formData);
      toast.success("গ্যালারিতে সফলভাবে যোগ হয়েছে");
      router.push("/admin/gallery");
    } catch (err) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const CompactInput = ({ label, icon: Icon, children }: any) => (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
        <Icon size={13} className="text-[#2A9D8F]" /> {label}
      </label>
      <div className="relative rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-[#2A9D8F]/20 focus-within:border-[#2A9D8F] transition-all overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:pt-16 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-red-500"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em]">New Media</span>
            <h2 className="text-xl font-black text-[#264653]">অ্যাসেট আপলোড</h2>
          </div>
          <div className="w-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Minimalist Upload Zone */}
            <div className="p-6 bg-slate-50/50 border-b border-slate-50">
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-[2rem] h-52 flex flex-col items-center justify-center transition-all duration-300
                  ${formData.photoUrl ? "border-[#2A9D8F] bg-white" : "border-slate-200 bg-white hover:border-[#2A9D8F]"}`}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />

                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={32} className="animate-spin text-[#2A9D8F]" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processing...</p>
                  </div>
                ) : formData.photoUrl ? (
                  <div className="relative w-full h-full p-3">
                    <img
                      src={getImageUrl(formData.photoUrl)}
                      className="w-full h-full object-cover rounded-[1.5rem]"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#264653]/40 opacity-0 hover:opacity-100 transition-opacity rounded-[1.5rem]">
                      <span className="text-white text-xs font-bold px-4 py-2 border border-white/30 backdrop-blur-md rounded-full">ইমেজ পরিবর্তন করুন</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center group">
                    <div className="mx-auto w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl text-[#2A9D8F] mb-3 group-hover:scale-110 transition-transform">
                      <CloudUpload size={24} />
                    </div>
                    <p className="text-sm font-bold text-[#264653]">ছবি নির্বাচন করুন</p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG (MAX 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Fields */}
            <div className="p-6 md:p-10 space-y-6">
              <CompactInput label="Photo Title" icon={Type}>
                <input
                  className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300"
                  placeholder="ছবির শিরোনাম লিখুন"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </CompactInput>

              <CompactInput label="Description" icon={AlignLeft}>
                <textarea
                  rows={2}
                  className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 resize-none"
                  placeholder="সংক্ষিপ্ত বর্ণনা..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </CompactInput>

              <div className="grid grid-cols-2 gap-4">
                <CompactInput label="Year" icon={Calendar}>
                  <input
                    className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </CompactInput>

                <CompactInput label="Order (Auto)" icon={Hash}>
                  <div className="w-full px-5 py-4 text-sm font-black text-[#2A9D8F] bg-slate-50/50">
                    #{formData.displayOrder}
                  </div>
                </CompactInput>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading || uploading}
                  className="w-full flex items-center justify-center gap-3 bg-[#264653] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2A9D8F] transition-all active:scale-[0.97] disabled:opacity-50 shadow-xl shadow-[#264653]/20"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Save size={18} />
                      <span>গ্যালারিতে পাবলিশ করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}