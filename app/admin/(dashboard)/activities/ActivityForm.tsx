"use client";
import { useState, useEffect } from "react";
import { ActivityRequest, AdminActivityItem } from "@/app/lib/types/activity";
import { adminActivityService } from "@/app/lib/services/adminActivityService";
import toast from "react-hot-toast";
import { X, Loader2, Image as ImageIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem: AdminActivityItem | null;
}

export default function ActivityForm({
  isOpen,
  onClose,
  onSuccess,
  editItem,
}: Props) {
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
        toast.success("অ্যাক্টিভিটি আপডেট হয়েছে");
      } else {
        await adminActivityService.create(formData);
        toast.success("নতুন অ্যাক্টিভিটি যোগ হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("সেভ করতে ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-[#264653]">
            {editItem ? "অ্যাক্টিভিটি এডিট" : "নতুন অ্যাক্টিভিটি"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 pb-24">
          {/* Photo Preview */}
          <div className="relative h-48 bg-gray-50 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden">
            {formData.activityPhotoUrl ? (
              <img
                src={formData.activityPhotoUrl}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <ImageIcon size={40} />
                <p className="text-xs mt-2">ফটো প্রিভিউ</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              ফটো ইউআরএল (Photo URL)
            </label>
            <input
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              value={formData.activityPhotoUrl}
              onChange={(e) =>
                setFormData({ ...formData, activityPhotoUrl: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              টাইটেল
            </label>
            <input
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              value={formData.activityTitle}
              onChange={(e) =>
                setFormData({ ...formData, activityTitle: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                তারিখ
              </label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                value={formData.activityDate}
                onChange={(e) =>
                  setFormData({ ...formData, activityDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                লোকেশন
              </label>
              <input
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                value={formData.activityLocation}
                onChange={(e) =>
                  setFormData({ ...formData, activityLocation: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={5}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              value={formData.activityDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  activityDescription: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="fixed bottom-0 left-auto right-0 w-full max-w-lg p-6 bg-white border-t flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 border rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] p-3 bg-[#264653] text-white rounded-xl font-bold flex justify-center items-center hover:bg-[#2A9D8F] transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : editItem ? (
                "আপডেট করুন"
              ) : (
                "সেভ করুন"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
