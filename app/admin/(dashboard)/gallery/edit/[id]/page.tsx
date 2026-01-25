"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  CloudUpload,
  Loader2,
  Sparkles,
  Type,
  AlignLeft,
  Calendar,
  Save,
  Hash,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import { GalleryRequest } from "@/app/lib/types/admin-gallery";

export default function GalleryEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<GalleryRequest>({
    photoUrl: "",
    title: "",
    description: "",
    time: "",
    displayOrder: 0,
  });

  // --- ডাটা লোড করা ---
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await adminGalleryService.getAll();
        const item = res.data.data.find((p: any) => p.photoId === Number(id));
        if (item) {
          setFormData({
            photoUrl: item.photoUrl,
            title: item.photoTitle,
            description: item.photoCaption,
            time: item.createdAt,
            displayOrder: item.displayOrder,
          });
        }
      } catch (err) {
        toast.error("ডাটা লোড করতে ব্যর্থ");
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchItem();
  }, [id]);

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://api.insaanbd.org/api/public/files/${url}`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading("ইমেজ আপলোড হচ্ছে...");
    try {
      const res = await adminGalleryService.uploadFile(file);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, photoUrl: res.data.data.url }));
        toast.success("আপলোড সফল", { id: toastId });
      }
    } catch (err) {
      toast.error("আপলোড ব্যর্থ", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminGalleryService.update(Number(id), formData);
      toast.success("সফলভাবে আপডেট করা হয়েছে");
      router.push("/admin/gallery");
    } catch (err) {
      toast.error("আপডেট ব্যর্থ হয়েছে");
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

  if (fetching)
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:pt-16 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-red-500"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em]">
              Asset Editor
            </span>
            <h2 className="text-xl font-black text-[#264653]">
              ইমেজ এডিট করুন
            </h2>
          </div>
          <div className="w-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            <div className="p-6 bg-slate-50/50 border-b border-slate-50">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer border-2 border-dashed rounded-[2rem] h-52 flex flex-col items-center justify-center transition-all bg-white hover:border-[#2A9D8F]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
                {uploading ? (
                  <Loader2 size={32} className="animate-spin text-[#2A9D8F]" />
                ) : (
                  <div className="relative w-full h-full p-3">
                    <img
                      src={getImageUrl(formData.photoUrl)}
                      className="w-full h-full object-cover rounded-[1.5rem]"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-[1.5rem]">
                      <span className="text-white text-xs font-bold px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
                        ছবি পরিবর্তন করুন
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-6">
              <CompactInput label="Photo Title" icon={Type}>
                <input
                  className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </CompactInput>

              <CompactInput label="Description" icon={AlignLeft}>
                <textarea
                  rows={2}
                  className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </CompactInput>

              <div className="grid grid-cols-2 gap-4">
                <CompactInput label="Year" icon={Calendar}>
                  <input
                    className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </CompactInput>

                <CompactInput label="Sort Order" icon={Hash}>
                  <input
                    type="number"
                    className="w-full px-5 py-4 outline-none text-sm font-bold text-slate-700"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </CompactInput>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading || uploading}
                  className="w-full flex items-center justify-center gap-3 bg-[#264653] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2A9D8F] transition-all active:scale-[0.97] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Save size={18} />
                      <span>পরিবর্তন সংরক্ষণ করুন</span>
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
