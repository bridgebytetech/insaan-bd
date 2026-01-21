"use client";
import { useState, useEffect } from "react";
import { ActivityRequest, AdminActivityItem } from "@/app/lib/types/activity";
import { adminActivityService } from "@/app/lib/services/adminActivityService";
import toast from "react-hot-toast";
import { X, Loader2, Image as ImageIcon, Layout, Globe, AlignLeft, Calendar, MapPin, Save } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem: AdminActivityItem | null;
}

export default function ActivityForm({ isOpen, onClose, onSuccess, editItem }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ActivityRequest>({
    activityTitle: "",
    activityDescription: "",
    activityPhotoUrl: "",
    activityDate: new Date().toISOString().split("T")[0],
    activityLocation: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        activityTitle: editItem.activityTitle,
        activityDescription: editItem.activityDescription,
        activityPhotoUrl: editItem.activityPhotoUrl,
        activityDate: editItem.activityDate,
        activityLocation: editItem.activityLocation,
      });
    } else {
      setFormData({
        activityTitle: "",
        activityDescription: "",
        activityPhotoUrl: "",
        activityDate: new Date().toISOString().split("T")[0],
        activityLocation: "",
      });
    }
  }, [editItem, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editItem) {
        await adminActivityService.update(editItem.activityId, formData);
        toast.success("অ্যাক্টিভিটি আপডেট হয়েছে");
      } else {
        await adminActivityService.create(formData);
        toast.success("নতুন অ্যাক্টিভিটি যোগ হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("সেভ করতে ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const InputHeader = ({ icon: Icon, label }: any) => (
    <div className="flex items-center gap-2 mb-2">
      <Icon size={14} className="text-[#2A9D8F]" />
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60">
        {label}
      </label>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-[#264653]/40 backdrop-blur-sm">
      {/* Backdrop Close Zone */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white h-full shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l-4 border-[#2A9D8F] flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Sharp Header */}
        <div className="bg-[#264653] p-8 flex justify-between items-center text-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layout size={14} className="text-[#2A9D8F]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#2A9D8F]">Activity Editor</span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {editItem ? "অ্যাক্টিভিটি আপডেট" : "নতুন অ্যাক্টিভিটি"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 border border-white/10 hover:bg-white hover:text-[#264653] transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Edge-to-Edge Sharp Preview */}
          <div className="relative aspect-video bg-gray-100 border border-gray-200 overflow-hidden group">
            {formData.activityPhotoUrl ? (
              <img
                src={formData.activityPhotoUrl}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="Preview"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#264653]/20">
                <ImageIcon size={48} strokeWidth={1} />
                <p className="text-[10px] font-black uppercase tracking-widest mt-2">No Preview Available</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 bg-[#2A9D8F] text-white px-4 py-1 text-[9px] font-black tracking-widest uppercase">
              Image Aspect Ratio 16:9
            </div>
          </div>

          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <InputHeader icon={Globe} label="অ্যাক্টিভিটি টাইটেল" />
              <input
                className="w-full p-4 border-b-2 border-gray-100 focus:border-[#2A9D8F] outline-none text-lg font-black text-[#264653] placeholder:text-gray-200 transition-all"
                placeholder="Enter title here..."
                value={formData.activityTitle}
                onChange={(e) => setFormData({ ...formData, activityTitle: e.target.value })}
                required
              />
            </div>

            {/* Photo URL Field */}
            <div>
              <InputHeader icon={ImageIcon} label="ফটো ইউআরএল" />
              <input
                className="w-full p-4 bg-gray-50 border-l-4 border-gray-200 focus:border-[#2A9D8F] outline-none font-bold text-xs text-[#264653] transition-all"
                placeholder="https://image-link.com/photo.jpg"
                value={formData.activityPhotoUrl}
                onChange={(e) => setFormData({ ...formData, activityPhotoUrl: e.target.value })}
                required
              />
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-0 border border-gray-100">
              <div className="p-4 border-r border-gray-100">
                <InputHeader icon={Calendar} label="তারিখ" />
                <input
                  type="date"
                  className="w-full p-2 outline-none font-black text-[#264653] uppercase tracking-tighter"
                  value={formData.activityDate}
                  onChange={(e) => setFormData({ ...formData, activityDate: e.target.value })}
                  required
                />
              </div>
              <div className="p-4">
                <InputHeader icon={MapPin} label="লোকেশন" />
                <input
                  className="w-full p-2 outline-none font-black text-[#264653] placeholder:text-gray-300"
                  placeholder="Sylhet, BD"
                  value={formData.activityLocation}
                  onChange={(e) => setFormData({ ...formData, activityLocation: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <InputHeader icon={AlignLeft} label="বিস্তারিত বিবরণ" />
              <textarea
                rows={6}
                className="w-full p-4 bg-gray-50 border-l-4 border-gray-200 focus:border-[#2A9D8F] outline-none font-medium text-[#264653] leading-relaxed transition-all"
                placeholder="Write activity details here..."
                value={formData.activityDescription}
                onChange={(e) => setFormData({ ...formData, activityDescription: e.target.value })}
                required
              />
            </div>
          </div>
        </form>

        {/* Action Toolbar */}
        <div className="p-8 border-t border-gray-100 flex gap-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-5 border border-gray-200 font-black uppercase text-[10px] tracking-[0.3em] text-gray-400 hover:bg-gray-50 transition-all"
          >
            বাতিল করুন
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] p-5 bg-[#264653] text-white font-black uppercase text-[10px] tracking-[0.3em] flex justify-center items-center gap-3 hover:bg-[#2A9D8F] transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                {editItem ? "আপডেট সংরক্ষণ করুন" : "সিস্টেমে সেভ করুন"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}