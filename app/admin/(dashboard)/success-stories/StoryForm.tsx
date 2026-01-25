"use client";
import { useState, useEffect, useRef } from "react";
import { storyService } from "@/app/lib/services/storyService";
import { X, Loader2, Sparkles, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function StoryForm({ isOpen, onClose, onSuccess, editItem }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    storyTitle: "",
    storyContent: "",
    storyPhotoUrl: "",
    storyType: "ORPHAN_STORY",
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
      setImagePreview(
        editItem.storyPhotoUrl
          ? `https://api.insaanbd.org/api/public/files/${editItem.storyPhotoUrl}`
          : null
      );
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
      setImagePreview(null);
    }
  }, [editItem, isOpen]);

  // 🔥 Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      return toast.error("ফাইল ১০ এমবি এর বেশি হতে পারবে না!");
    }

    setUploading(true);

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("https://api.insaanbd.org/api/public/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, storyPhotoUrl: data.data.url }));
        toast.success("ছবি আপলোড সফল হয়েছে");
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("ছবি আপলোড ব্যর্থ হয়েছে");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  // 🔥 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return toast.error("ছবি আপলোড শেষ হওয়া পর্যন্ত অপেক্ষা করুন");

    setLoading(true);

    const payload: any = {
      storyTitle: formData.storyTitle.trim(),
      storyContent: formData.storyContent.trim(),
      storyPhotoUrl: formData.storyPhotoUrl.trim(),
      storyType: formData.storyType,
      isFeatured: Boolean(formData.isFeatured),
      orphanId: formData.orphanId ? Number(formData.orphanId) : 0,
      donorId: formData.donorId ? Number(formData.donorId) : 0,
    };

    try {
      if (editItem) {
        await storyService.updateStory(editItem.storyId, payload);
        toast.success("সফলভাবে আপডেট হয়েছে");
      } else {
        await storyService.createStory(payload);
        toast.success("সফলভাবে তৈরি হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message || "সার্ভার এরর (500)";
      toast.error(msg);
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

          {/* Image Upload */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400">ছবি</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 h-48 bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed"
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Upload />
                  <span className="text-xs mt-2">Upload Image</span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          <input required className="input" placeholder="Title"
            value={formData.storyTitle}
            onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
          />

          <textarea required rows={5} className="input"
            placeholder="Story Content"
            value={formData.storyContent}
            onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
          />

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-[#264653] text-white py-4 rounded-2xl font-bold hover:bg-[#2A9D8F]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "পাবলিশ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
