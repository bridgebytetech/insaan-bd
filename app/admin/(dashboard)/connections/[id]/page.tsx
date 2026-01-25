"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { connectionService } from "@/app/lib/services/connectionService";
import { 
  ArrowLeft, User, Heart, 
  Zap, Link as LinkIcon, 
  Trash2, AlertTriangle, Mail, Phone, Calendar, Info, Loader2, Clock, X, AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function ConnectionDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTerminating, setIsTerminating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // এটি আপনার বর্তমান ফাংশন
const getImageUrl = (url: string) => {
  const BASE_FILE_URL = "https://api.insaanbd.org/api/public/files";
  const DEFAULT_AVATAR = "https://api.insaanbd.org/uploads/default-avatar.png"; // একটি ব্যাকআপ ইমেজ রাখুন

  if (!url || url === "string" || url === "null" || url === "") {
    return DEFAULT_AVATAR;
  }

  // যদি ডাটাবেস থেকে আসা URL এ ইতিমধ্যেই http থাকে তবে সেটিই রিটার্ন করবে
  if (url.startsWith('http')) return url;

  // অন্যথায় বেজ URL এর সাথে ফাইলনেম যোগ করবে
  return `${BASE_FILE_URL}/${url}`;
};

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await connectionService.getById(Number(id));
      setData(res.data);
    } catch (err) {
      toast.error("কানেকশন ডাটা পাওয়া যায়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const handleTerminate = async () => {
    try {
      setIsTerminating(true);
      await connectionService.terminateConnection(Number(id));
      toast.success("সফলভাবে টার্মিনেট করা হয়েছে");
      router.push("/admin/connections");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "টার্মিনেশন ব্যর্থ হয়েছে");
      setShowConfirmModal(false);
    } finally {
      setIsTerminating(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc] space-y-4">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Fetching Network Data...</p>
    </div>
  );

  if (!data) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-gray-400">No Data Found</div>;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pb-20 relative">
      
      {/* --- Custom Professional Confirmation Modal --- */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#264653]/80 backdrop-blur-md animate-in fade-in duration-300"></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50/50">
                <AlertCircle size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-[#264653] uppercase tracking-tighter mb-2">Are you sure?</h3>
              <p className="text-gray-500 text-sm font-medium px-4">
                This will permanently dissolve the connection between <span className="text-[#E76F51] font-bold">{data.donorName}</span> and <span className="text-[#2A9D8F] font-bold">{data.orphanName}</span>.
              </p>
            </div>
            <div className="flex border-t border-gray-100">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleTerminate}
                disabled={isTerminating}
                className="flex-1 py-5 text-[11px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                {isTerminating ? <Loader2 size={16} className="animate-spin"/> : "Confirm Terminate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#264653] p-4 text-white sticky top-0 z-10 border-b-4 border-[#2A9D8F]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 hover:text-[#2A9D8F] transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to List</span>
          </button>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#2A9D8F] fill-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Connection Manager</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* ORPHAN CARD */}
          <div className="bg-white rounded-2xl shadow-xl border-t-8 border-[#E76F51] p-8 relative overflow-hidden group">
             <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Target Orphan</div>
             <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-[#E76F51] overflow-hidden shadow-2xl bg-gray-50 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={getImageUrl(data.orphanDpUrl)} 
                      alt={data.orphanName} 
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.target.src = "/default-avatar.png"; }}
                    />
                  </div>
                  <div className="absolute -bottom-2 right-2 bg-[#E76F51] text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <Heart size={16} fill="white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                   <p className="text-[10px] font-black text-[#E76F51] uppercase tracking-[0.3em] mb-2">Orphan Child Info</p>
                   <h2 className="text-3xl font-black text-[#264653] uppercase leading-tight tracking-tighter mb-3">{data.orphanName}</h2>
                   <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                      <span className="bg-[#264653] text-white text-[14px] font-black px-4 py-1.5 rounded-lg shadow-md border border-white/10">ORPHAN ID: #{data.orphanId}</span>
                      {data.orphanAge && <span className="bg-gray-100 text-[#264653] text-[12px] font-bold px-3 py-1 rounded-lg uppercase">Age: {data.orphanAge} Years</span>}
                   </div>
                </div>
             </div>
          </div>

          {/* DONOR CARD */}
          <div className="bg-white rounded-2xl shadow-xl border-t-8 border-[#2A9D8F] p-8 relative overflow-hidden group text-center sm:text-left">
             <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Sponsoring Donor</div>
             <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-2xl bg-[#264653] flex items-center justify-center text-[#2A9D8F] shadow-2xl group-hover:rotate-3 transition-transform duration-500">
                   <User size={64} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.3em] mb-2">Donor / Sponsor Info</p>
                   <h2 className="text-3xl font-black text-[#264653] uppercase leading-tight tracking-tighter mb-3">{data.donorName}</h2>
                   <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                      <span className="bg-[#2A9D8F] text-white text-[14px] font-black px-4 py-1.5 rounded-lg shadow-md border border-white/10">DONOR ID: #{data.donorId}</span>
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase border border-emerald-100">VERIFIED DONOR</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-8 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info size={18} className="text-[#264653]"/>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#264653]">Relationship Details</h3>
                </div>
                <div className={`px-4 py-1 rounded text-[10px] font-black border ${data.connectionStatus === 'ACTIVE' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-amber-50 border-amber-200 text-amber-600'}`}>
                  {data.connectionStatus}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                <DataRow label="Donor Contact" value={data.donorContact} icon={<Phone size={18} className="text-[#2A9D8F]"/>} />
                <DataRow label="Donor Email" value={data.donorEmail} icon={<Mail size={18} className="text-[#2A9D8F]"/>} />
                <DataRow label="Application Date" value={new Date(data.requestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} icon={<Calendar size={18} className="text-[#E76F51]"/>} />
                <DataRow label="Approval / Last Update" value={data.approvalDate ? new Date(data.approvalDate).toLocaleString() : 'N/A'} icon={<Clock size={18} className="text-blue-500"/>} />
              </div>
            </div>

            {(data.requestMessage || data.approvalNotes) && (
              <div className="bg-[#264653] p-8 rounded-2xl shadow-xl text-white">
                <h4 className="text-[10px] font-black text-[#2A9D8F] uppercase mb-4 tracking-[0.3em]">Admin Logs & Communication</h4>
                <div className="p-6 bg-white/5 border-l-4 border-[#2A9D8F] rounded-r-lg">
                  <p className="text-lg font-medium italic leading-relaxed text-gray-200">"{data.approvalNotes || data.requestMessage}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 shadow-2xl rounded-2xl border border-gray-200 flex flex-col items-center">
               <div className="w-16 h-1 w-12 bg-gray-100 rounded-full mb-6"></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2 text-[#264653]">
                 <LinkIcon size={16} className="text-[#2A9D8F]"/> Network Control
               </h3>
               
               <div className="w-full p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mb-8 text-center group hover:border-[#2A9D8F]/30 transition-colors">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Global Network ID</p>
                  <p className="text-3xl font-black text-[#264653]">#C-{data.connectionId}</p>
               </div>

               {/* --- Professional Terminate Button --- */}
               <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full relative group overflow-hidden bg-white border-2 border-red-500 text-red-500 px-6 py-5 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(239,68,68,0.5)] active:scale-95 flex items-center justify-center gap-3"
                >
                  <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Terminate Connection</span>
                </button>

                <p className="text-[9px] text-gray-400 font-bold mt-6 text-center leading-relaxed uppercase tracking-tighter">
                  Archiving this connection will stop all future logs.
                </p>
            </div>

            <div className="bg-amber-50 p-6 border border-amber-200 rounded-2xl flex gap-4">
               <AlertTriangle className="text-amber-500 shrink-0" size={24}/>
               <div>
                  <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Crucial Action</p>
                  <p className="text-[11px] font-bold text-amber-700 mt-1 uppercase leading-tight">Irreversible Operation. Check reconciliation.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value, icon }: any) {
  return (
    <div className="flex items-center gap-6 p-6 hover:bg-gray-50/80 transition-colors group">
      <div className="p-4 bg-gray-100 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200 shadow-sm group-hover:shadow-md">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-md font-black text-[#264653] uppercase leading-tight mt-0.5">{value || 'NOT PROVIDED'}</p>
      </div>
    </div>
  );
}