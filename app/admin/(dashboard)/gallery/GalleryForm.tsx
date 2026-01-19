"use client";
import { useState, useEffect } from "react";
import { GalleryRequest, AdminGalleryItem } from "@/app/lib/types/admin-gallery";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem: AdminGalleryItem | null;
}

export default function GalleryForm({ isOpen, onClose, onSuccess, editItem }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GalleryRequest>({
    photoUrl: "", title: "", description: "", time: "", displayOrder: 0
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        photoUrl: editItem.photoUrl,
        title: editItem.photoTitle,
        description: editItem.photoCaption,
        time: "২০২৬", // আপনার প্রোজেক্ট অনুযায়ী বছর দিন
        displayOrder: editItem.displayOrder,
      });
    } else {
      setFormData({ photoUrl: "", title: "", description: "", time: "২০২৬", displayOrder: 0 });
    }
  }, [editItem, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editItem) {
        await adminGalleryService.update(editItem.photoId, formData);
        toast.success("আপডেট সফল হয়েছে");
      } else {
        await adminGalleryService.create(formData);
        toast.success("নতুন ছবি যোগ করা হয়েছে");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{editItem ? 'এডিট ছবি' : 'নতুন ছবি'}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Image URL" value={formData.photoUrl} onChange={e => setFormData({...formData, photoUrl: e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <textarea className="w-full border p-2 rounded" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded" placeholder="Year" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
            <input type="number" className="border p-2 rounded" placeholder="Order" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
          </div>
          <button disabled={loading} className="w-full bg-[#2A9D8F] text-white p-2 rounded flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" /> : 'সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}