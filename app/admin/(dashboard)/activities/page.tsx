"use client";
import { useEffect, useState } from "react";
import { adminActivityService } from "@/app/lib/services/adminActivityService";
import { AdminActivityItem } from "@/app/lib/types/activity";
import { Trash2, Edit, Plus, MapPin, Calendar, ToggleRight, ToggleLeft, Loader2, Zap } from "lucide-react";
import toast from "react-hot-toast";
import ActivityForm from "./ActivityForm";

export default function AdminActivities() {
  const [items, setItems] = useState<AdminActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminActivityItem | null>(null);

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
      await adminActivityService.toggleStatus(id);
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে");
      fetchActivities();
    } catch (err) { toast.error("ব্যর্থ হয়েছে"); }
  };

  const handleDelete = async (id: number) => {
    if(confirm("আপনি কি নিশ্চিত?")) {
      try {
        await adminActivityService.delete(id);
        toast.success("ডিলিট সফল হয়েছে");
        fetchActivities();
      } catch (err) { toast.error("ডিলিট করা যায়নি"); }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* --- Full-Width Sharp Header --- */}
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
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Foundation Activity Dashboard v2.0</p>
          </div>

          <button 
            onClick={() => {setEditItem(null); setIsFormOpen(true)}} 
            className="group flex items-center gap-3 bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-4 transition-all duration-300 font-black uppercase text-sm tracking-widest"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            নতুন অ্যাক্টিভিটি যোগ করুন
          </button>
        </div>
      </div>

      {/* --- Main Content: Edge to Edge Grid --- */}
      <div className="w-full p-4 md:p-8">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Activities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200">
            {items.map((item) => (
              <div 
                key={item.activityId} 
                className="bg-white border-r border-b border-gray-200 flex flex-col sm:flex-row transition-all hover:bg-gray-50 group"
              >
                {/* Sharp Image Box */}
                <div className="w-full sm:w-48 h-48 bg-gray-200 flex-shrink-0 overflow-hidden relative">
                  <img src={item.activityPhotoUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                  <div className="absolute top-0 left-0 bg-[#264653] text-white px-3 py-1 text-[10px] font-black tracking-widest">
                    #{item.activityId}
                  </div>
                </div>

                {/* Content: High Precision Style */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-black text-lg text-[#264653] uppercase leading-tight line-clamp-2">
                        {item.activityTitle}
                      </h3>
                      <button 
                        onClick={() => handleToggle(item.activityId)}
                        className={`transition-colors ${item.isActive ? 'text-[#2A9D8F]' : 'text-gray-300'}`}
                      >
                        {item.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
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
                    
                    <div className="flex divide-x divide-gray-200 border border-gray-200 bg-white">
                      <button 
                        onClick={() => {setEditItem(item); setIsFormOpen(true)}} 
                        className="p-3 text-[#264653] hover:bg-[#264653] hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit size={16}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.activityId)} 
                        className="p-3 text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="w-full h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">System Archive Empty</p>
          </div>
        )}
      </div>

      <ActivityForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchActivities} 
        editItem={editItem} 
      />
    </div>
  );
}