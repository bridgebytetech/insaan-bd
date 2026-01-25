"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminGalleryService } from "@/app/lib/services/adminGalleryService";
import { AdminGalleryItem } from "@/app/lib/types/admin-gallery";
import { 
  Trash2, Edit, Plus, ToggleLeft, ToggleRight, Loader2, 
  Zap, Layers, AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryManagement() {
  const router = useRouter();
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- 🛠️ Helper to get correct Image URL ---
  const getImageUrl = (photoUrl: string) => {
    if (!photoUrl) return "";
    if (photoUrl.startsWith('http')) return photoUrl;
    return `https://api.insaanbd.org/api/public/files/${photoUrl}`;
  };

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

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setIsDeleting(true);
      await adminGalleryService.delete(itemToDelete);
      toast.success("সফলভাবে ডিলিট হয়েছে");
      setDeleteModalOpen(false);
      loadGallery();
    } catch (err) {
      toast.error("ডিলিট করা সম্ভব হয়নি");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
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

  return (
    <div className="w-full min-h-screen bg-[#F8FAFB] overflow-x-hidden">
      
      {/* --- 🚀 Sharp Industrial Header --- */}
      <div className="w-full bg-[#264653] text-white p-8 md:p-12 border-b-[6px] border-[#2A9D8F] relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Layers size={300} strokeWidth={1} />
        </div>
        
        <div className="max-w-full flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 bg-[#2A9D8F] rounded-lg">
                <Zap size={18} className="text-white fill-white animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2A9D8F]">System Asset Control</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              Media <span className="text-[#2A9D8F]  font-serif uppercase">Gallery</span>
            </h1>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">Insaan BD Foundation • Media Engine v3.0</p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/admin/gallery/add")}
            className="group flex items-center gap-4 bg-[#2A9D8F] text-white px-10 py-5 transition-all duration-300 font-black uppercase text-xs tracking-[0.2em] shadow-[0_20px_40px_rgba(42,157,143,0.3)]"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> 
            নতুন ইমেজ যোগ করুন
          </motion.button>
        </div>
      </div>

      {/* --- 📦 Main Grid Content --- */}
      <div className="w-full p-4 md:p-10">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-6">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={48} strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#264653]/40">Indexing Media Library...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-0 border-t border-l border-gray-200 shadow-2xl">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.photoId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white border-r border-b border-gray-200 flex flex-col group transition-all duration-500 hover:z-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={getImageUrl(item.photoUrl)} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" 
                      alt={item.photoTitle} 
                    />
                    <div className="absolute top-4 left-4 bg-[#264653] text-white px-3 py-1 text-[9px] font-black tracking-widest">
                        ORDER: {item.displayOrder.toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-black text-xl text-[#264653] uppercase leading-[1.1] tracking-tighter group-hover:text-[#2A9D8F] transition-colors line-clamp-2">
                        {item.photoTitle}
                      </h3>
                      <button onClick={() => handleToggle(item.photoId)} className={`shrink-0 transition-transform duration-500 hover:scale-110 ${item.isActive ? 'text-[#2A9D8F]' : 'text-gray-200'}`}>
                        {item.isActive ? <ToggleRight size={36} strokeWidth={1.5} /> : <ToggleLeft size={36} strokeWidth={1.5} />}
                      </button>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className={`flex items-center gap-2 px-3 py-1.5 border ${item.isActive ? 'border-[#2A9D8F]/20 bg-[#2A9D8F]/5 text-[#2A9D8F]' : 'border-gray-200 bg-gray-50 text-gray-400'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-[#2A9D8F] animate-pulse' : 'bg-gray-300'}`} />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em]">{item.isActive ? "Visible" : "Hidden"}</span>
                      </div>

                      <div className="flex bg-[#264653]">
                        <button 
                          onClick={() => router.push(`/admin/gallery/edit/${item.photoId}`)} // এডিট পেজে রাউট করা হলো
                          className="p-3 text-white/50 hover:text-[#2A9D8F] hover:bg-white/5 transition-all border-r border-white/5"
                        >
                          <Edit size={16}/>
                        </button>
                        <button 
                          onClick={() => { setItemToDelete(item.photoId); setDeleteModalOpen(true); }}
                          className="p-3 text-white/50 hover:text-red-400 hover:bg-white/5 transition-all"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#264653]/90 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl"
            >
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto ring-8 ring-red-50/50">
                  <AlertCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#264653] uppercase tracking-tighter">Are you sure?</h3>
                  <p className="text-gray-500 text-sm font-medium">এই মিডিয়া ফাইলটি ডিলিট করলে এটি আর পুনরুদ্ধার করা সম্ভব হবে না।</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    disabled={isDeleting}
                    onClick={confirmDelete}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                    হ্যাঁ, ডিলিট করুন
                  </button>
                  <button 
                    onClick={() => setDeleteModalOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-[#264653] py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                  >
                    না, ফিরে যাই
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}