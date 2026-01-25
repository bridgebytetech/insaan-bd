"use client";
import { useEffect, useState } from "react";
import { adminActivityService } from "@/app/lib/services/adminActivityService";
import { AdminActivityItem } from "@/app/lib/types/activity";
import { Trash2, Edit, Plus, MapPin, Calendar, ToggleRight, ToggleLeft, Loader2, Zap, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import ActivityForm from "./ActivityForm";

export default function AdminActivities() {
  const [items, setItems] = useState<AdminActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminActivityItem | null>(null);
  
  // UX Improvements States
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getImageUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://api.insaanbd.org/api/public/files/${url}`;
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await adminActivityService.getAll();
      setItems(res.data.data);
    } catch (err) { toast.error("ডাটা পাওয়া যায়নি"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchActivities(); }, []);

  const handleToggle = async (id: number) => {
    try {
      setTogglingId(id);
      await adminActivityService.toggleStatus(id);
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে");
      await fetchActivities();
    } catch (err) { toast.error("ব্যর্থ হয়েছে"); }
    finally { setTogglingId(null); }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      await adminActivityService.delete(deleteId);
      toast.success("ডিলিট সফল হয়েছে");
      setDeleteId(null);
      fetchActivities();
    } catch (err) { toast.error("ডিলিট করা যায়নি"); }
    finally { setIsDeleting(false); }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Admin Control</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              অ্যাক্টিভিটি <span className="text-[#2A9D8F]">ম্যানেজমেন্ট</span>
            </h1>
          </div>

          <button 
            onClick={() => {setEditItem(null); setIsFormOpen(true)}} 
            className="group flex items-center gap-3 bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-4 transition-all duration-300 font-black uppercase text-sm tracking-widest"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            নতুন অ্যাক্টিভিটি
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="w-full p-4 md:p-8">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Activities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200">
            {items.map((item) => (
              <div key={item.activityId} className="bg-white border-r border-b border-gray-200 flex flex-col sm:flex-row transition-all hover:bg-gray-50 group">
                <div className="w-full sm:w-48 h-48 bg-gray-200 flex-shrink-0 overflow-hidden relative">
                  <img src={getImageUrl(item.activityPhotoUrl)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                  <div className="absolute top-0 left-0 bg-[#264653] text-white px-3 py-1 text-[10px] font-black tracking-widest">#{item.activityId}</div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-black text-lg text-[#264653] uppercase leading-tight line-clamp-2">{item.activityTitle}</h3>
                      <button 
                        disabled={togglingId === item.activityId}
                        onClick={() => handleToggle(item.activityId)}
                        className={`transition-colors disabled:opacity-50 ${item.isActive ? 'text-[#2A9D8F]' : 'text-gray-300'}`}
                      >
                        {togglingId === item.activityId ? <Loader2 size={32} className="animate-spin" /> : (item.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />)}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[#264653]/60 text-[10px] font-bold uppercase tracking-wider">
                        <Calendar size={12} className="text-[#2A9D8F]" /> {item.activityDate}
                      </div>
                      <div className="flex items-center gap-2 text-[#264653]/60 text-[10px] font-bold uppercase tracking-wider">
                        <MapPin size={12} className="text-[#2A9D8F]" /> {item.activityLocation}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border ${item.isActive ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-gray-200 text-gray-400'}`}>
                      {item.isActive ? "Live Status" : "Offline"}
                    </div>
                    
                    <div className="flex divide-x divide-gray-200 border border-gray-200 bg-white shadow-sm">
                      <button onClick={() => {setEditItem(item); setIsFormOpen(true)}} className="p-3 text-[#264653] hover:bg-[#264653] hover:text-white transition-colors"><Edit size={16}/></button>
                      <button onClick={() => setDeleteId(item.activityId)} className="p-3 text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#264653]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md p-8 border-t-8 border-[#E76F51] shadow-2xl scale-in-center">
            <div className="flex items-center gap-4 text-[#E76F51] mb-6">
              <div className="bg-[#E76F51]/10 p-3 rounded-full"><AlertTriangle size={32} /></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">আপনি কি নিশ্চিত?</h2>
            </div>
            <p className="text-[#264653] font-medium mb-8">এই অ্যাক্টিভিটিটি একবার ডিলিট করলে আর ফিরে পাওয়া যাবে না। আপনি কি এটি মুছে ফেলতে চান?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteId(null)}
                className="flex-1 p-4 border border-gray-200 font-black uppercase text-[10px] tracking-widest text-gray-400 hover:bg-gray-50"
              >
                না, ফিরে যান
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 p-4 bg-[#E76F51] text-white font-black uppercase text-[10px] tracking-widest hover:bg-red-600 disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={14} /> : "হ্যাঁ, ডিলিট করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ActivityForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSuccess={fetchActivities} editItem={editItem} />
    </div>
  );
}