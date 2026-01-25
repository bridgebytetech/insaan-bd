"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, Trash2, Eye, UserPlus, MapPin, Loader2, 
  Zap, Hash, GraduationCap, User, AlertTriangle, X,Calendar ,FileText,ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import orphanAdminService from "@/app/lib/services/orphanAdminService";

export default function AdminOrphanManagement() {
  const [orphans, setOrphans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number | null}>({
    isOpen: false, id: null
  });
  const router = useRouter();

  const fetchOrphans = useCallback(async () => {
    try {
      setLoading(true);
      let res;
      if (searchKey) res = await orphanAdminService.search(searchKey);
      else if (filter === "PENDING") res = await orphanAdminService.getPending();
      else if (filter === "APPROVED") res = await orphanAdminService.getApproved();
      else res = await orphanAdminService.getAll();
      
      setOrphans(res.data || []);
    } catch (error) {
      toast.error("ডাটা লোড করতে ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  }, [filter, searchKey]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOrphans();
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchOrphans]);

  const handleDelete = async (id: number) => {
    try {
      await orphanAdminService.delete(id);
      toast.success("সফলভাবে মুছে ফেলা হয়েছে");
      setDeleteConfirm({ isOpen: false, id: null });
      fetchOrphans();
    } catch (error) { 
      toast.error("ডিলিট ব্যর্থ হয়েছে"); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      
      {/* --- Header Section --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Admin</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Orphan <span className="text-[#2A9D8F]">Management System</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="নাম, ঠিকানা বা অভিভাবক দিয়ে খুঁজুন..."
                className="w-full bg-[#2d515f] border-none text-white pl-10 pr-4 py-3 text-sm focus:ring-1 ring-[#2A9D8F] outline-none transition-all"
                value={searchKey} 
                onChange={(e) => setSearchKey(e.target.value)} 
              />
            </div>
            <button 
              onClick={() => router.push('/admin/orphans/add')}
              className="bg-[#2A9D8F] border-2 border-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
            >
              <UserPlus size={16} /> Add New Orphan
            </button>
          </div>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="w-full bg-white border-b border-gray-200 flex overflow-x-auto sticky top-0 z-20">
        {["ALL", "PENDING", "APPROVED"].map((tab) => (
          <button
            key={tab} 
            onClick={() => {setSearchKey(""); setFilter(tab)}}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-gray-200 transition-all ${
              filter === tab ? "bg-gray-50 text-[#2A9D8F] border-b-2 border-[#2A9D8F]" : "text-gray-400 hover:text-[#264653]"
            }`}
          >
            {tab === "ALL" ? "সবগুলো" : tab === "PENDING" ? "পেন্ডিং" : "অ্যাপ্রুভড"} Records
          </button>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
  {loading ? (
    <div className="h-96 flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
        <div className="absolute inset-0 blur-xl bg-[#2A9D8F]/20 animate-pulse"></div>
      </div>
      <p className="mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#264653]/60">
        Loading Orphan Data...
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {orphans.length > 0 ? (
        orphans.map((orphan) => (
          <div key={orphan.orphanId} className="h-full"> 
            <OrphanCard 
              orphan={orphan} 
              onDelete={(id: number) => setDeleteConfirm({ isOpen: true, id })}
              onView={() => router.push(`/admin/orphans/${orphan.orphanId}`)}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full py-32 flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="p-6 bg-gray-50 rounded-full mb-4">
             <FileText size={40} className="text-gray-300" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">
            No orphan records found
          </p>
        </div>
      )}
    </div>
  )}
</div>
      {/* --- Delete Confirmation Modal --- */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-[#264653] mb-2 uppercase tracking-tight">Are you sure?</h3>
              <p className="text-gray-500 text-xs font-medium mb-8 leading-relaxed">
                এই শিশুর প্রোফাইলটি চিরস্থায়ীভাবে মুছে যাবে। এই অ্যাকশনটি রিভার্স করা সম্ভব নয়।
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirm({isOpen: false, id: null})} 
                  className="flex-1 py-4 text-gray-400 font-black uppercase text-[10px] hover:bg-gray-50 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => deleteConfirm.id && handleDelete(deleteConfirm.id)} 
                  className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-red-100 active:scale-95 transition-all"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

 
function OrphanCard({ orphan, onDelete, onView }: any) {
  const getImageUrl = (url: string) => {
    const BASE_FILE_URL = "https://api.insaanbd.org/api/public/files";
    if (!url || url === "string") return "https://api.insaanbd.org/api/public/files/default-avatar.png";
    return url.startsWith('http') ? url : `${BASE_FILE_URL}/${url}`;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group h-full flex flex-col"
    >
      {/* ইমেজ সেকশন */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-200">
        <img 
          src={getImageUrl(orphan.orphanDpUrl)} 
          alt={orphan.orphanName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* শ্যাডো ওভারলে যাতে উপরের ব্যাজগুলো ফুটে ওঠে */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
        
        {/* ID ব্যাজ */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/20">
            #{orphan.orphanId}
          </span>
        </div>

        {/* স্ট্যাটাস ব্যাজ - রিফ্যাক্টরড ডিজাইন */}
        <div className="absolute top-4 right-4">
          <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-lg border uppercase tracking-wider ${
            orphan.orphanStatus === 'APPROVED' 
            ? 'bg-emerald-500 border-emerald-400 text-white' 
            : 'bg-amber-500 border-amber-400 text-white'
          }`}>
            {orphan.orphanStatus}
          </span>
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-5">
          <h3 className="font-black text-[#264653] text-xl truncate uppercase tracking-tight mb-1">
            {orphan.orphanName || "নাম নেই"}
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F]">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{orphan.orphanAddress || "ঠিকানা নেই"}</span>
          </div>
        </div>

        {/* ইনফো গ্রিড */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className="text-[#264653]" />
              <span className="text-[9px] font-black text-gray-400 uppercase">Class</span>
            </div>
            <p className="text-xs font-bold text-[#264653] truncate">{orphan.orphanClassGrade || "N/A"}</p>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <User size={16} className="text-[#264653]" />
              <span className="text-[9px] font-black text-gray-400 uppercase">Guardian</span>
            </div>
            <p className="text-xs font-bold text-[#264653] truncate">{orphan.guardianName || "N/A"}</p>
          </div>
        </div>

        {/* অ্যাকশন এবং মেটা ডেটা */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase">
                <Hash size={12} /> {orphan.orphanGender}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase">
                <Calendar size={12} /> {orphan.orphanAge}Y
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* রিফ্যাক্টরড ডিটেইলস বাটন */}
            <button 
              onClick={onView}
              className="group/btn flex-1 h-12 bg-[#264653] hover:bg-[#2A9D8F] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-200"
            >
              <span>View Details</span>
              <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
            
            {/* ডিলিট বাটন */}
            <button 
              onClick={() => onDelete(orphan.orphanId)}
              className="h-12 w-12 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-red-100"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}