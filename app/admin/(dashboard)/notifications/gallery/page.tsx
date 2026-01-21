"use client";

import { useEffect, useState } from "react";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import { AdminGalleryItem } from "@/app/lib/types/admin-gallery";
import { Trash2, Edit, Plus, ToggleLeft, ToggleRight, Loader2, Image as ImageIcon, Sparkles, Hash } from "lucide-react";
import toast from "react-hot-toast";
import GalleryForm from "./GalleryForm";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryManagement() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminGalleryItem | null>(null);

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

  const handleToggle = async (id: number) => {
    try {
      await adminGalleryService.toggleStatus(id);
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      loadGallery();
    } catch (err) {
      toast.error("স্ট্যাটাস পরিবর্তন করা যায়নি");
    }
  };

  const handleEditClick = (item: AdminGalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-6">
      <div className="relative">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
        <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#264653]/40">Organizing Assets...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-[#264653] tracking-tight flex items-center gap-4">
            মিডিয়া <span className="text-[#2A9D8F] italic font-serif">গ্যালারি</span>
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-1 w-10 bg-[#2A9D8F] rounded-full"></span>
            <p className="text-[#2A9D8F] text-[10px] font-black uppercase tracking-[0.2em]">Total Assets: {items.length}</p>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddNewClick}
          className="group flex items-center gap-3 bg-[#264653] text-white px-8 py-4 rounded-[1.5rem] shadow-2xl shadow-[#264653]/20 transition-all font-black text-sm"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> 
          নতুন ছবি যোগ করুন
        </motion.button>
      </div>

      {/* Table Container with Glassmorphism shadow */}
      <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(42,157,143,0.05)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#ECF4E8]/40">
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#264653]/50">প্রিভিউ</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#264653]/50">টাইটেল ও মেটা</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#264653]/50 text-center">সিরিয়াল</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#264653]/50 text-center">অবস্থা</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#264653]/50 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={item.photoId} 
                      className="group hover:bg-[#ECF4E8]/10 transition-colors duration-500"
                    >
                      <td className="px-10 py-6">
                        <div className="relative w-24 h-16 rounded-2xl overflow-hidden shadow-sm ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2">
                          <img src={item.photoUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="font-black text-[#264653] text-lg tracking-tight group-hover:text-[#2A9D8F] transition-colors">{item.photoTitle}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Hash size={12} className="text-[#2A9D8F]" />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">ID: {item.photoId}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-50 text-[#264653] font-black text-sm border border-gray-100 group-hover:bg-[#264653] group-hover:text-white transition-all duration-500">
                          {item.displayOrder}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <button 
                          onClick={() => handleToggle(item.photoId)} 
                          className={`group/toggle relative inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full transition-all duration-500 overflow-hidden ${
                            item.isActive 
                            ? 'bg-[#2A9D8F] text-white' 
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          <motion.div 
                            animate={{ x: item.isActive ? 0 : 0 }}
                            className={`${item.isActive ? 'text-white' : 'text-gray-400'}`}
                          >
                            {item.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                          </motion.div>
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {item.isActive ? "Visible" : "Hidden"}
                          </span>
                        </button>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-end items-center gap-3">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#2A9D8F] hover:bg-white hover:shadow-xl rounded-2xl transition-all duration-300"
                            title="Edit Asset"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.photoId)}
                            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#E76F51] hover:bg-white hover:shadow-xl rounded-2xl transition-all duration-300"
                            title="Delete Asset"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 grayscale opacity-20">
                        <ImageIcon size={80} strokeWidth={1} />
                        <p className="font-black text-[#264653] uppercase tracking-[0.4em] text-xs">No Assets Found</p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <GalleryForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadGallery}
        editItem={selectedItem}
      />
    </div>
  );
}