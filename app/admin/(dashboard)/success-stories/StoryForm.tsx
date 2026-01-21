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
    storyType: "ORPHAN_STORY", // ব্যাকেন্ডে নিশ্চিতভাবে এই এনামটি আছে
    orphanId: "",
    donorId: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        ...editItem,
        orphanId: editItem.orphanId || "",
        donorId: editItem.donorId || "",
      });
    } else {
      setFormData({
        storyTitle: "",
        storyContent: "",
        storyPhotoUrl: "",
        storyType: "ORPHAN_STORY",
        orphanId: "",
        donorId: "",
        isFeatured: false,
      });
    }
  }, [editItem, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- ডাটা ক্লিনিং লজিক (৫০০ এরর বন্ধ করার জন্য) ---
    // যদি আইডি না থাকে তবে ০ পাঠান (সোয়াগার অনুযায়ী) অথবা ডাটা থেকে বাদ দিন
    const payload: any = {
      storyTitle: formData.storyTitle.trim(),
      storyContent: formData.storyContent.trim(),
      storyPhotoUrl: formData.storyPhotoUrl.trim(),
      storyType: formData.storyType,
      isFeatured: Boolean(formData.isFeatured),
    };

    // আইডি যদি থাকে তবেই নাম্বার হিসেবে পাঠান, নয়তো পাঠাবেন না
    if (formData.orphanId && Number(formData.orphanId) > 0) {
      payload.orphanId = Number(formData.orphanId);
    } else {
      payload.orphanId = 0; // অথবা null (আপনার ব্যাকেন্ড অনুযায়ী)
    }

    if (formData.donorId && Number(formData.donorId) > 0) {
      payload.donorId = Number(formData.donorId);
    } else {
      payload.donorId = 0;
    }

    try {
      if (editItem) {
        await adminStoryService.update(editItem.storyId, payload);
        toast.success("সফলভাবে আপডেট করা হয়েছে");
      } else {
        // নতুন তৈরির সময় ডাটা চেক
        console.log("Sending Payload:", payload); // চেক করার জন্য
        await adminStoryService.create(payload);
        toast.success("সফলভাবে তৈরি করা হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("ব্যাগেন্ড এরর ডিটেইলস:", err.response?.data);
      // সার্ভার থেকে আসা সঠিক মেসেজটি দেখাবে
      const errorMsg = err.response?.data?.message || "সার্ভার ডাটা গ্রহণ করছে না (500 Error)";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-[#264653] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles size={20} className="text-[#2A9D8F]" />
            {editItem ? "গল্পটি এডিট করুন" : "নতুন গল্প যোগ করুন"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-grow">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-400">টাইটেল</label>
            <input
              required
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2A9D8F] text-black"
              value={formData.storyTitle}
              onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-400">ফটো ইউআরএল</label>
            <input
              required
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2A9D8F] text-black"
              value={formData.storyPhotoUrl}
              onChange={(e) => setFormData({ ...formData, storyPhotoUrl: e.target.value })}
            />
          </div>

          {/* আইডি ফিল্ডগুলো (ঐচ্ছিক) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-gray-400">এতিম আইডি (ঐচ্ছিক)</label>
              <input
                type="number"
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-black"
                value={formData.orphanId}
                onChange={(e) => setFormData({ ...formData, orphanId: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-gray-400">দাতা আইডি (ঐচ্ছিক)</label>
              <input
                type="number"
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-black"
                value={formData.donorId}
                onChange={(e) => setFormData({ ...formData, donorId: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-400">গল্পের বিষয়বস্তু</label>
            <textarea
              required
              rows={6}
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2A9D8F] text-black"
              value={formData.storyContent}
              onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#264653] text-white py-4 rounded-2xl font-bold hover:bg-[#2A9D8F] transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "পাবলিশ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}