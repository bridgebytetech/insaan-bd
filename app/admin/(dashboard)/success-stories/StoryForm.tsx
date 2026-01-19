"use client";
import { useState, useEffect } from "react";
import { adminStoryService } from "@/app/lib/services/adminStoryService";
import { X, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function StoryForm({
  isOpen,
  onClose,
  onSuccess,
  editItem,
}: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storyTitle: "",
    storyContent: "",
    storyPhotoUrl: "",
    storyType: "GENERAL_STORY",
    orphanId: 0,
    donorId: 0,
    isFeatured: false,
  });

  useEffect(() => {
    if (editItem) setFormData(editItem);
    else
      setFormData({
        storyTitle: "",
        storyContent: "",
        storyPhotoUrl: "",
        storyType: "GENERAL_STORY",
        orphanId: 0,
        donorId: 0,
        isFeatured: false,
      });
  }, [editItem, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Swagger এবং Backend Requirement অনুযায়ী ডাটা ক্লিনিং
    const payload = {
      storyTitle: formData.storyTitle.trim(),
      storyContent: formData.storyContent.trim(),
      storyPhotoUrl: formData.storyPhotoUrl.trim(),
      storyType: formData.storyType,
      orphanId: Number(formData.orphanId) || 0, // নিশ্চিতভাবে নাম্বার
      donorId: Number(formData.donorId) || 0,   // নিশ্চিতভাবে নাম্বার
      isFeatured: Boolean(formData.isFeatured)
    };

    try {
      if (editItem) {
        // এখানে editItem.storyId ব্যবহার নিশ্চিত করুন
        await adminStoryService.update(editItem.storyId, payload);
        toast.success("সফলভাবে আপডেট করা হয়েছে");
      } else {
        await adminStoryService.create(payload);
        toast.success("সফলভাবে তৈরি করা হয়েছে");
      }

      onSuccess(); 
      onClose(); 
    } catch (err: any) {
      console.error("Backend Error Details:", err.response?.data);
      
      // আসল এরর মেসেজ দেখার জন্য
      const msg = err.response?.data?.message || "সার্ভারে সমস্যা হচ্ছে, এন্ডপয়েন্ট চেক করুন।";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-[#264653] text-white">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles size={20} className="text-[#2A9D8F]" />{" "}
              {editItem ? "গল্প এডিট করুন" : "নতুন গল্পের খসড়া"}
            </h2>
            <p className="text-xs text-teal-100/60 mt-1">
              সবগুলো তথ্য সঠিকভাবে পূরণ করুন
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <X />
          </button>
        </div>

        {/* Form - বাটনটি এখন ফর্মের ভেতরে রাখা হয়েছে */}
        <form
          id="story-form"
          onSubmit={handleSubmit}
          className="p-8 space-y-6 flex-grow flex flex-col"
        >
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              স্টোরি টাইপ
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["ORPHAN_STORY", "GENERAL_STORY"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, storyType: type })}
                  className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.storyType === type ? "border-[#2A9D8F] bg-[#2A9D8F]/5 text-[#2A9D8F]" : "border-gray-100 text-gray-400 hover:border-gray-200"}`}
                >
                  {type.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              টাইটেল
            </label>
            <input
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] outline-none font-medium text-black"
              value={formData.storyTitle}
              onChange={(e) =>
                setFormData({ ...formData, storyTitle: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              ফটো ইউআরএল
            </label>
            <input
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] outline-none text-black"
              value={formData.storyPhotoUrl}
              onChange={(e) =>
                setFormData({ ...formData, storyPhotoUrl: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              গল্পের বিস্তারিত
            </label>
            <textarea
              rows={8}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A9D8F] outline-none leading-relaxed text-black"
              value={formData.storyContent}
              onChange={(e) =>
                setFormData({ ...formData, storyContent: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#E76F51]"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
              id="featured"
            />
            <label
              htmlFor="featured"
              className="text-sm font-bold text-[#E76F51] cursor-pointer"
            >
              এই গল্পটি ফিচারেড (Featured) হিসেবে দেখান
            </label>
          </div>

          {/* Submit Button - ফর্মের একদম ভেতরে এবং নিচে রাখা হয়েছে */}
          <div className="pt-8 mt-auto">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#264653] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#2A9D8F] transition-all flex justify-center items-center gap-3 shadow-xl shadow-teal-900/10"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "গল্পটি পাবলিশ করুন"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
