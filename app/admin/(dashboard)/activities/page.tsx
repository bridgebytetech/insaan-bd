"use client";
import { useEffect, useState } from "react";
import { adminActivityService } from "@/app/lib/services/adminActivityService";
import { AdminActivityItem } from "@/app/lib/types/activity";
import { Trash2, Edit, Plus, MapPin, Calendar, ToggleRight, ToggleLeft, Loader2 } from "lucide-react";
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
    } catch (err) { toast.error("ডাটা পাওয়া যায়নি"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchActivities(); }, []);

  const handleToggle = async (id: number) => {
    await adminActivityService.toggleStatus(id);
    toast.success("স্ট্যাটাস পরিবর্তন হয়েছে");
    fetchActivities();
  };

  const handleDelete = async (id: number) => {
    if(confirm("আপনি কি নিশ্চিত?")) {
      await adminActivityService.delete(id);
      toast.success("ডিলিট সফল হয়েছে");
      fetchActivities();
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#264653]">অ্যাক্টিভিটি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">ইনসান ফাউন্ডেশনের সব কার্যক্রম এখান থেকে নিয়ন্ত্রণ করুন।</p>
        </div>
        <button onClick={() => {setEditItem(null); setIsFormOpen(true)}} 
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-100 active:scale-95 transition-all">
          <Plus size={20} /> নতুন অ্যাক্টিভিটি
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-teal-500" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.activityId} className="bg-white p-4 rounded-2xl border flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow">
              <img src={item.activityPhotoUrl} className="w-full md:w-32 h-32 object-cover rounded-xl" alt="" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#264653] line-clamp-1">{item.activityTitle}</h3>
                  <button onClick={() => handleToggle(item.activityId)}>
                    {item.isActive ? <ToggleRight className="text-teal-500" size={30} /> : <ToggleLeft className="text-gray-300" size={30} />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.activityDate}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {item.activityLocation}</span>
                </div>
                <div className="pt-2 flex justify-end gap-2 border-t mt-2">
                  <button onClick={() => {setEditItem(item); setIsFormOpen(true)}} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(item.activityId)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ActivityForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchActivities} 
        editItem={editItem} 
      />
    </div>
  );
}