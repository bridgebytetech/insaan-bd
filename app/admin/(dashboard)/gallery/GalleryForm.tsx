"use client";

import { useState, useEffect, useRef } from "react";
import { GalleryRequest, AdminGalleryItem } from "@/app/lib/types/admin-gallery";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import toast from "react-hot-toast";
import { X, Loader2, Image as ImageIcon, Sparkles, Type, AlignLeft, Calendar, Hash, Save, Upload, CloudUpload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem: AdminGalleryItem | null;
}

export default function GalleryForm({ isOpen, onClose, onSuccess, editItem }: Props) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [formData, setFormData] = useState<GalleryRequest>({
    photoUrl: "", title: "", description: "", time: "", displayOrder: 0
  });

  // --- 🛠️ Helper to get correct Image URL for preview ---
  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    // আপনার পাবলিক ফাইল এন্ডপয়েন্ট অনুযায়ী প্রিভিউ পাথ
    return `https://api.insaanbd.org/api/public/files/${url}`;
  };

  useEffect(() => {
    if (editItem) {
      setFormData({
        photoUrl: editItem.photoUrl,
        title: editItem.photoTitle,
        description: editItem.photoCaption,
        time: "২০২৬",
        displayOrder: editItem.displayOrder,
      });
    } else {
      setFormData({ photoUrl: "", title: "", description: "", time: "২০২৬", displayOrder: 0 });
    }
  }, [editItem, isOpen]);

  // ফাইল হ্যান্ডলার
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ফাইল সাইজ চেক (৫এমবি)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ফাইল ৫ মেগাবাইটের কম হতে হবে");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("ইমেজ আপলোড হচ্ছে...");

    try {
      const res = await adminGalleryService.uploadFile(file);
      if (res.data.success) {
        // API response থেকে প্রাপ্ত ইমেজ নাম সেট করা (যেমন: photo_123.jpg)
        setFormData(prev => ({ ...prev, photoUrl: res.data.data.url }));
        toast.success("ইমেজ আপলোড সফল", { id: toastId });
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
      toast.error("দয়া করে একটি ইমেজ আপলোড করুন");
      return;
    }
    setLoading(true);
    try {
      if (editItem) {
        await adminGalleryService.update(editItem.photoId, formData);
        toast.success("আপডেট সফল হয়েছে");
      } else {
        await adminGalleryService.create(formData);
        toast.success("নতুন ছবি যোগ করা হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const InputWrapper = ({ label, icon: Icon, children }: any) => (
    <div className="space-y-1.5 group">
      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 ml-2">
        <Icon size={12} className="text-[#2A9D8F]" /> {label}
      </label>
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 focus-within:border-[#2A9D8F] focus-within:bg-white transition-all duration-300">
        {children}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#264653]/60 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#264653] via-[#2A9D8F] to-[#264653]" />
            
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.3em]">Asset Editor</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#264653]">
                    {editItem ? 'ছবি এডিট করুন' : 'নতুন ছবি যোগ করুন'}
                  </h2>
                </div>
                <button onClick={onClose} className="p-3 bg-gray-50 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Image Upload Area */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 ml-2">
                    <CloudUpload size={12} className="text-[#2A9D8F]" /> Upload Media Asset
                  </div>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center p-8 overflow-hidden
                      ${formData.photoUrl ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-200 bg-gray-50/50 hover:border-[#2A9D8F] hover:bg-white'}`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept="image/*"
                    />

                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 size={32} className="animate-spin text-[#2A9D8F]" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Uploading...</span>
                      </div>
                    ) : formData.photoUrl ? (
                      <div className="relative w-full h-48">
                        <img 
                          src={getImageUrl(formData.photoUrl)} 
                          className="w-full h-full object-cover rounded-2xl shadow-lg" 
                          alt="Uploaded asset" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <p className="text-white text-[10px] font-black uppercase tracking-widest">ফাইল পরিবর্তন করুন</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform duration-500">
                          <ImageIcon size={32} className="text-[#2A9D8F]" />
                        </div>
                        <p className="text-sm font-bold text-[#264653]">এখানে ক্লিক করে ইমেজ আপলোড করুন</p>
                        <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-tighter">JPG, PNG OR WebP (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="md:col-span-2">
                  <InputWrapper label="Asset Title" icon={Type}>
                    <input 
                      className="w-full bg-transparent p-4 outline-none font-bold text-[#264653]" 
                      placeholder="Enter a captivating title" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      required 
                    />
                  </InputWrapper>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <InputWrapper label="Caption / Description" icon={AlignLeft}>
                    <textarea 
                      rows={3}
                      className="w-full bg-transparent p-4 outline-none font-bold text-[#264653] resize-none" 
                      placeholder="Tell the story of this photo..." 
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                      required 
                    />
                  </InputWrapper>
                </div>

                <InputWrapper label="Year" icon={Calendar}>
                  <input 
                    className="w-full bg-transparent p-4 outline-none font-bold text-[#264653]" 
                    placeholder="২০২৬" 
                    value={formData.time} 
                    onChange={e => setFormData({...formData, time: e.target.value})} 
                  />
                </InputWrapper>

                <InputWrapper label="Display Order" icon={Hash}>
                  <input 
                    type="number" 
                    className="w-full bg-transparent p-4 outline-none font-bold text-[#264653]" 
                    placeholder="0" 
                    value={formData.displayOrder} 
                    onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} 
                  />
                </InputWrapper>

                <div className="md:col-span-2 pt-4">
                  <button 
                    disabled={loading || uploading} 
                    className="w-full group relative overflow-hidden bg-[#264653] text-white p-6 rounded-[2rem] font-black text-lg transition-all active:scale-95 disabled:opacity-70 shadow-2xl shadow-[#264653]/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F] to-[#264653] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex justify-center items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          <span>সংরক্ষণ হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Save size={24} />
                          <span>গ্যালারিতে সেভ করুন</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}