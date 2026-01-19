"use client";

import { useEffect, useState } from "react";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import { AdminGalleryItem } from "@/app/lib/types/admin-gallery";
import { Trash2, Edit, Plus, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import GalleryForm from "./GalleryForm"; // একই ফোল্ডারে এই ফাইলটি তৈরি করতে হবে

export default function GalleryManagement() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal এর জন্য স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminGalleryItem | null>(null);

  // ডাটা লোড করা
  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await adminGalleryService.getAll();
      setItems(res.data.data);
    } catch (err) {
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadGallery(); }, []);

  // ডিলিট ফাংশন
  const handleDelete = async (id: number) => {
    if (!confirm("আপনি কি নিশ্চিত এটি ডিলিট করতে চান?")) return;
    try {
      await adminGalleryService.delete(id);
      toast.success("সফলভাবে ডিলিট হয়েছে");
      loadGallery();
    } catch (err) {
      toast.error("ডিলিট করা সম্ভব হয়নি");
    }
  };

  // স্ট্যাটাস টগল
  const handleToggle = async (id: number) => {
    try {
      await adminGalleryService.toggleStatus(id);
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      loadGallery();
    } catch (err) {
      toast.error("স্ট্যাটাস পরিবর্তন করা যায়নি");
    }
  };

  // এডিট বাটনে ক্লিক করলে
  const handleEditClick = (item: AdminGalleryItem) => {
    setSelectedItem(item); // আইটেমটি সিলেক্ট করলাম
    setIsModalOpen(true);  // মডাল ওপেন করলাম
  };

  // নতুন যোগ করার বাটনে ক্লিক করলে
  const handleAddNewClick = () => {
    setSelectedItem(null); // আগের সিলেক্ট করা ডাটা ক্লিয়ার করলাম
    setIsModalOpen(true);
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#2A9D8F]" /></div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">গ্যালারি লিস্ট</h2>
        <button 
          onClick={handleAddNewClick}
          className="flex items-center gap-2 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#264653] transition-colors"
        >
          <Plus size={18} /> নতুন ছবি যোগ করুন
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">ছবি</th>
              <th className="p-4 font-semibold text-gray-600">টাইটেল</th>
              <th className="p-4 font-semibold text-gray-600">অর্ডার</th>
              <th className="p-4 font-semibold text-gray-600">স্ট্যাটাস</th>
              <th className="p-4 font-semibold text-gray-600 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.photoId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={item.photoUrl} alt="" className="w-16 h-12 object-cover rounded-md border shadow-sm" />
                  </td>
                  <td className="p-4 font-medium text-gray-700">{item.photoTitle}</td>
                  <td className="p-4 text-gray-500">{item.displayOrder}</td>
                  <td className="p-4">
                    <button onClick={() => handleToggle(item.photoId)} className="transition-all active:scale-90">
                      {item.isActive ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <ToggleRight size={28} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 font-medium">
                          <ToggleLeft size={28} /> Inactive
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.photoId)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400">
                  কোন ছবি পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* গ্যালারি ফর্ম মডাল */}
      <GalleryForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadGallery}
        editItem={selectedItem}
      />
    </div>
  );
}