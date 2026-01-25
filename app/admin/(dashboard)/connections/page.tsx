"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Zap, Loader2, Plus, Search, Clock, UserCheck, 
  MessageSquare, ArrowRight, Trash2, CheckCircle2, XCircle, AlertTriangle
} from "lucide-react";
import { connectionService } from "@/app/lib/services/connectionService";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminConnections() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    id: number | null;
    type: 'APPROVE' | 'REJECT' | 'APPROVE_DISCONNECT' | 'REJECT_DISCONNECT' | 'DELETE' | null;
    notes: string;
    isSubmitting: boolean;
  }>({
    isOpen: false,
    id: null,
    type: null,
    notes: "",
    isSubmitting: false
  });

  const getImageUrl = (url: string) => {
    const BASE_FILE_URL = "https://api.insaanbd.org/api/public/files";
    if (!url || url === "string" || url === "") return "https://api.insaanbd.org/uploads/default-avatar.png";
    return url.startsWith('http') ? url : `${BASE_FILE_URL}/${url}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let res;
      if (activeTab === "PENDING") res = await connectionService.getPending();
      else if (activeTab === "ACTIVE") res = await connectionService.getActive();
      else if (activeTab === "DISCONNECT_REQUESTS") res = await connectionService.getDisconnectRequests();
      else res = await connectionService.getAll();
      setItems(res.data || []);
    } catch (err) {
      toast.error("তথ্য লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const filteredItems = useMemo(() => {
    let base = items;
    if (!searchTerm) return base;
    return base.filter(i => 
      i.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      i.orphanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.connectionId?.toString().includes(searchTerm)
    );
  }, [searchTerm, items]);

  // --- হ্যান্ডেল অ্যাকশন (FIXED VERSION) ---
  const handleActionExecute = async () => {
    // ১. ভ্যালিডেশন
    if (actionModal.id === null || !actionModal.type) {
        toast.error("তথ্য অসম্পূর্ণ");
        return;
    }
    
    setActionModal(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // ২. সঠিক ডাটা ফরম্যাট নিশ্চিত করা
      const connectionId = Number(actionModal.id);
      const approvalNotes = actionModal.notes.trim() || "Approved by Admin"; // নোট খালি থাকলে ডিফল্ট টেক্সট
      
      const payload = { connectionId, approvalNotes };
      
      // ৩. সঠিক সার্ভিস কল করা
      switch (actionModal.type) {
        case 'APPROVE':
          await connectionService.approve(payload);
          toast.success("সফলভাবে এপ্রুভ হয়েছে");
          break;
        case 'REJECT':
          await connectionService.reject(payload);
          toast.success("রিজেক্ট করা হয়েছে");
          break;
        case 'APPROVE_DISCONNECT':
          await connectionService.approveDisconnect(payload);
          toast.success("ডিসকানেক্ট এপ্রুভ হয়েছে");
          break;
        case 'REJECT_DISCONNECT':
          await connectionService.rejectDisconnect(payload);
          toast.success("ডিসকানেক্ট রিকোয়েস্ট বাতিল হয়েছে");
          break;
        case 'DELETE':
          await connectionService.terminateConnection(connectionId);
          toast.success("ডিলিট করা হয়েছে");
          break;
      }
      
      // ৪. সাকসেস হলে ডাটা রিফ্রেশ এবং মোডাল ক্লোজ
      await fetchData();
      setActionModal({ isOpen: false, id: null, type: null, notes: "", isSubmitting: false });

    } catch (error: any) {
      // ৫. এরর ডিটেইলস দেখা (Debugging)
      console.log("Error Response Data:", error.response?.data);
      const serverMsg = error.response?.data?.message || "সার্ভার এরর (400 Bad Request)";
      toast.error(serverMsg);
    } finally {
      setActionModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      
      {/* Action Modal */}
      <AnimatePresence>
        {actionModal.isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !actionModal.isSubmitting && setActionModal({ ...actionModal, isOpen: false })} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${actionModal.type === 'DELETE' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600'}`}>
                   {actionModal.type === 'DELETE' ? <AlertTriangle size={24} /> : <MessageSquare size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {actionModal.type?.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID #{actionModal.id}</p>
                </div>
              </div>

              {actionModal.type !== 'DELETE' && (
                <textarea 
                  placeholder="অ্যাকশনের কারণ বা নোট লিখুন..." 
                  value={actionModal.notes} 
                  onChange={(e) => setActionModal({...actionModal, notes: e.target.value})} 
                  className="w-full h-32 bg-slate-50 rounded-2xl p-4 text-sm font-medium outline-none border-2 border-transparent focus:border-[#2A9D8F] transition-all" 
                />
              )}
              
              {actionModal.type === 'DELETE' && (
                <p className="text-sm text-slate-500 font-medium mb-4">আপনি কি নিশ্চিত যে আপনি এটি মুছে ফেলতে চান?</p>
              )}

              <div className="flex gap-3 mt-6">
                <button disabled={actionModal.isSubmitting} onClick={() => setActionModal({ ...actionModal, isOpen: false })} className="flex-1 py-4 font-black uppercase text-[10px] text-slate-400 bg-slate-100 rounded-2xl">Cancel</button>
                <button disabled={actionModal.isSubmitting} onClick={handleActionExecute} className={`flex-1 py-4 font-black uppercase text-[10px] text-white rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${actionModal.type === 'DELETE' ? 'bg-red-500' : 'bg-[#264653]'}`}>
                  {actionModal.isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Confirm Action"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30">
        <div className=" px-4 sm:px-6">
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#264653] rounded-2xl flex items-center justify-center shadow-lg">
                <Zap size={22} className="text-[#2A9D8F]" fill="#2A9D8F" />
              </div>
              <h1 className="text-lg sm:text-xl font-black text-[#264653] uppercase">Connections</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-12 text-sm font-bold" />
            </div>

            <Link href="/admin/connections/add" className="bg-[#2A9D8F] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] flex items-center gap-2 shadow-lg hover:bg-[#264653] transition-all">
              <Plus size={18} /> New Pairing
            </Link>
          </div>

          <div className="flex gap-1 overflow-x-auto no-scrollbar border-t border-slate-50">
            {["ALL", "PENDING", "ACTIVE", "DISCONNECT_REQUESTS"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-4 text-[10px] font-black uppercase transition-all relative ${activeTab === tab ? "text-[#2A9D8F]" : "text-slate-400"}`}>
                {tab.replace(/_/g, ' ')}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2A9D8F] rounded-t-full" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className=" p-6 md:p-10">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
            <p className="text-[10px] font-black uppercase text-slate-400">Loading Network...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div layout key={item.connectionId} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-500 font-black text-[10px]">#{item.connectionId}</div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase"><Clock size={12} className="inline mr-1"/> {new Date(item.requestDate).toLocaleDateString()}</span>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 ${
                    item.connectionStatus === 'ACTIVE' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                    item.connectionStatus === 'PENDING' ? 'bg-amber-50 border-amber-100 text-amber-500' : 'bg-red-50 border-red-100 text-red-500'
                  }`}>
                    {item.connectionStatus}
                  </div>
                </div>

                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-dashed border-slate-200">
                    <div className="w-12 h-12 bg-[#264653] rounded-2xl flex items-center justify-center shadow-lg"><UserCheck className="text-[#2A9D8F]" size={20} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Sponsor</p>
                      <h3 className="text-sm font-black text-[#264653] truncate">{item.donorName}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-emerald-50/30 p-4 rounded-3xl border border-dashed border-emerald-100/50">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                      <img src={getImageUrl(item.orphanDpUrl)} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-[#2A9D8F] uppercase">Orphan Child</p>
                      <h3 className="text-sm font-black text-[#264653] truncate">{item.orphanName}</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <Link href={`/admin/connections/${item.connectionId}`} className="text-[9px] font-black uppercase text-slate-400 hover:text-[#2A9D8F] flex items-center gap-1">
                    Logs <ArrowRight size={14} />
                  </Link>

                  <div className="flex gap-2">
                    {/* এপ্রুভ বাটন লজিক */}
                    {item.connectionStatus === "PENDING" && activeTab !== "DISCONNECT_REQUESTS" && (
                      <>
                        <button onClick={() => setActionModal({ isOpen: true, id: item.connectionId, type: 'REJECT', notes: "", isSubmitting: false })} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><XCircle size={18} /></button>
                        <button onClick={() => setActionModal({ isOpen: true, id: item.connectionId, type: 'APPROVE', notes: "", isSubmitting: false })} className="bg-[#2A9D8F] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-[#264653] transition-all flex items-center gap-2"><CheckCircle2 size={16} /> Approve</button>
                      </>
                    )}

                    {/* ডিসকানেক্ট বাটন লজিক */}
                    {(activeTab === "DISCONNECT_REQUESTS" || item.connectionStatus === "DISCONNECT_REQUESTED") && (
                      <>
                        <button onClick={() => setActionModal({ isOpen: true, id: item.connectionId, type: 'REJECT_DISCONNECT', notes: "", isSubmitting: false })} className="bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl text-[10px] font-black">Keep</button>
                        <button onClick={() => setActionModal({ isOpen: true, id: item.connectionId, type: 'APPROVE_DISCONNECT', notes: "", isSubmitting: false })} className="bg-red-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-black shadow-lg">Confirm</button>
                      </>
                    )}

                    {item.connectionStatus === "ACTIVE" && (
                      <button onClick={() => setActionModal({ isOpen: true, id: item.connectionId, type: 'DELETE', notes: "", isSubmitting: false })} className="w-11 h-11 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}