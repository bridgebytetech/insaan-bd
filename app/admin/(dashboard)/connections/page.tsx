"use client";
import { useEffect, useState } from "react";
import { connectionService } from "@/app/lib/services/connectionService";
import { 
  Zap, Loader2, Link2, Unlink, CheckCircle, XCircle, 
  ArrowRight, MessageSquare, Calendar, Plus, X 
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminConnections() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      let res;
      if (activeTab === "PENDING") res = await connectionService.getPending();
      else if (activeTab === "ACTIVE") res = await connectionService.getActive();
      else if (activeTab === "DISCONNECT_REQUESTS") res = await connectionService.getDisconnectRequests();
      else res = await connectionService.getAll();
      
      setItems(res.data || []);
    } catch (err) { toast.error("ডাটা লোড করা যায়নি"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  // ম্যানুয়াল কানেকশন সাবমিট (যদি এপিআই সাপোর্ট করে)
  const handleManualConnect = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // দ্রষ্টব্য: আপনার কাছে এই এপিআই এন্ডপয়েন্টটি আছে কিনা নিশ্চিত হয়ে নিন
      // await connectionService.createManual(data); 
      toast.success("নতুন কানেকশন তৈরি হয়েছে");
      setIsFormOpen(false);
      fetchData();
    } catch (err) { toast.error("তৈরি করা সম্ভব হয়নি"); }
  };

  const handleProcess = async (id: number, type: 'approve' | 'reject' | 'approveDC' | 'rejectDC') => {
    const notes = prompt("Enter Administration Notes:") || "Processed by Admin";
    try {
      if (type === 'approve') await connectionService.approve({ connectionId: id, approvalNotes: notes });
      if (type === 'reject') await connectionService.reject({ connectionId: id, approvalNotes: notes });
      if (type === 'approveDC') await connectionService.approveDisconnect({ connectionId: id, approvalNotes: notes });
      if (type === 'rejectDC') await connectionService.rejectDisconnect({ connectionId: id, approvalNotes: notes });
      
      toast.success("অ্যাকশন সফল হয়েছে");
      fetchData();
    } catch (err) { toast.error("অ্যাকশন ব্যর্থ হয়েছে"); }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* --- Header --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#E76F51]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link2 size={18} className="text-[#E76F51]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Admin</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">কানেকশন <span className="text-[#E76F51]">ম্যানেজমেন্ট</span></h1>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#E76F51] hover:bg-white hover:text-[#264653] text-white px-8 py-4 font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2 shadow-xl"
          >
            <Plus size={18} /> New Manual Connection
          </button>
        </div>
      </div>

      {/* --- Tabs --- */}
      <div className="w-full bg-white border-b border-gray-200 flex overflow-x-auto">
        {["PENDING", "ACTIVE", "DISCONNECT_REQUESTS", "ALL"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-gray-200 transition-all ${
              activeTab === tab ? "bg-gray-50 text-[#E76F51] border-b-2 border-b-[#E76F51]" : "text-gray-400 hover:text-[#264653]"
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* --- Grid --- */}
      <div className="w-full p-4 md:p-8">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center"><Loader2 className="animate-spin text-[#E76F51]" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-l border-gray-200">
            {items.map((conn) => (
               <div key={conn.connectionId} className="bg-white border-r border-b border-gray-200 flex flex-col group">
                  <div className="p-8 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-[#2A9D8F] uppercase mb-1">Donor</p>
                      <h3 className="font-black text-[#264653] uppercase">{conn.donorName}</h3>
                    </div>
                    <ArrowRight className="text-gray-200" />
                    <div className="flex-1 text-right">
                      <p className="text-[9px] font-black text-[#E76F51] uppercase mb-1">Orphan</p>
                      <h3 className="font-black text-[#264653] uppercase">{conn.orphanName}</h3>
                    </div>
                  </div>
                  
                  <div className="px-8 pb-8 flex gap-2">
                    {activeTab === "PENDING" && (
                      <button onClick={() => handleProcess(conn.connectionId, 'approve')} className="flex-1 bg-emerald-500 text-white py-3 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all">Approve Request</button>
                    )}
                    {activeTab === "DISCONNECT_REQUESTS" && (
                      <button onClick={() => handleProcess(conn.connectionId, 'approveDC')} className="flex-1 bg-red-500 text-white py-3 font-black text-[10px] uppercase tracking-widest">Approve Disconnect</button>
                    )}
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Manual Connection Modal --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8 bg-[#264653] text-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Manual <span className="text-[#E76F51]">Link</span></h2>
              <button onClick={() => setIsFormOpen(false)}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleManualConnect} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Donor ID</label>
                <input name="donorId" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="e.g. 5" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Orphan ID</label>
                <input name="orphanId" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="e.g. 12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Approval Note</label>
                <textarea name="approvalNotes" rows={3} className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="Linked manually by system admin..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#264653] text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#E76F51] transition-all">
                Create Relationship
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}