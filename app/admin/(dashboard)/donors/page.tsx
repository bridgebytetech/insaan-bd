"use client";
import { useEffect, useState, useCallback } from "react";
import { donorService } from "@/app/lib/services/donorService";
import { useRouter } from "next/navigation"; // রিডাইরেক্টের জন্য যোগ করা হয়েছে
import { 
  Trash2, Eye, CheckCircle, XCircle, X,
  ToggleRight, ToggleLeft, Loader2, Zap, 
  Search, Plus, Hash, Mail, AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";
import Link from  "next/link";

// --- Sub-component for Avatar to handle errors gracefully ---
const DonorAvatar = ({ src, name, size = "w-16 h-16" }: { src?: string, name: string, size?: string }) => {
  const [imgError, setImgError] = useState(false);
  if (!src || imgError) {
    return (
      <div className={`${size} rounded-full bg-[#2A9D8F]/10 border-2 border-dashed border-[#2A9D8F]/30 flex items-center justify-center text-xl font-black text-[#264653]`}>
        {name?.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <img 
      src={src} 
      alt={name} 
      onError={() => setImgError(true)}
      className={`${size} rounded-full object-cover border-4 border-white shadow-md`}
    />
  );
};

export default function AdminDonorManagement() {
  const router = useRouter(); // Router ইনিশিয়ালাইজ করা হয়েছে
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [donorType, setDonorType] = useState("INDIVIDUAL");
  
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: number | null}>({
    isOpen: false, id: null
  });

  // --- Fetch Donors Logic ---
 // ১. স্টেট সেকশনে এটি যোগ করুন (যদি প্রয়োজন থাকে)
const [totalImpact, setTotalImpact] = useState(0);

// ২. fetchDonors ফাংশনে এরর হ্যান্ডলিং ঠিক করুন
const fetchDonors = useCallback(async (query = searchQuery) => {
  try {
    setLoading(true);
    let res;
    if (query) {
      res = await donorService.searchDonors(query);
    } else {
      switch (activeTab) {
        case "PENDING": res = await donorService.getPendingDonors(); break;
        case "APPROVED": res = await donorService.getApprovedDonors(); break;
        default: res = await donorService.getAllDonors();
      }
    }
    
    // কনসোল চেক করার জন্য
    console.log("Donor Response:", res);
    
    // নিশ্চিত করুন ডাটা স্ট্রাকচার ঠিক আছে কি না
    setDonors(res.data?.data || res.data || []); 
    
    // যদি আপনার ব্যাকএন্ড থেকে টোটাল ইমপ্যাক্ট আসে তবেই সেট করুন
    if(res.data?.totalImpact) {
        setTotalImpact(res.data.totalImpact);
    }
    
  } catch (err) {
    console.error("Fetch Error:", err);
    toast.error("ডাটা পাওয়া যায়নি");
  } finally {
    setLoading(false);
  }
}, [activeTab, searchQuery]);


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonors();
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchDonors]);

  // --- Handle Actions ---
  const handleAction = async (id: number, action: string) => {
    if (actionLoading === id) return;
    try {
      setActionLoading(id);
      let res;
      if (action === "approve") res = await donorService.approveDonor(id);
      else if (action === "reject") res = await donorService.rejectDonor(id);
      else if (action === "toggle") res = await donorService.toggleStatus(id);
      else if (action === "delete") res = await donorService.deleteDonor(id);
      
      if (res && res.success) {
        toast.success(res.message || "সফল হয়েছে");
        if (action === "delete") {
          setDonors(prev => prev.filter(d => d.donorId !== id));
          setDeleteConfirm({ isOpen: false, id: null });
        } else {
          await fetchDonors();
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "অ্যাকশন সম্পন্ন করা সম্ভব হয়নি");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className={`w-full min-h-screen bg-[#f8fafc] ${isFormOpen ? 'overflow-hidden' : ''}`}>
      
      {/* --- Header Section --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Admin</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Donors <span className="text-[#2A9D8F]">Management</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                className="w-full bg-[#2d515f] border-none text-white pl-10 pr-4 py-3 text-sm focus:ring-1 ring-[#2A9D8F] outline-none transition-all"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <Link 
  href="/admin/donors/add" 
  className="bg-[#2A9D8F] border-2 border-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
>
  <Plus size={16} /> Add New Donor
</Link>
          </div>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="w-full bg-white border-b border-gray-200 flex overflow-x-auto sticky top-0 z-20">
        {["ALL", "PENDING", "APPROVED"].map((tab) => (
          <button
            key={tab} 
            onClick={() => {setSearchQuery(""); setActiveTab(tab)}}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-gray-200 transition-all ${
              activeTab === tab ? "bg-gray-50 text-[#2A9D8F] border-b-2 border-[#2A9D8F]" : "text-gray-400 hover:text-[#264653]"
            }`}
          >
            {tab} Records
          </button>
        ))}
      </div>

      {/* --- Donor Cards Grid --- */}
      <div className="w-full p-4 md:p-8">
        {loading && donors.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Donor Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200">
            {donors.length > 0 ? donors.map((donor) => (
              <div key={donor.donorId} className="bg-white border-r border-b border-gray-200 flex flex-col sm:flex-row transition-all hover:shadow-inner hover:bg-gray-50 group">
                <div className="w-full sm:w-28 bg-gray-50/50 flex flex-col items-center justify-center py-6 sm:py-0 border-b sm:border-b-0 sm:border-r border-gray-100">
                   <div className="bg-[#264653] text-white text-[9px] font-black px-2 py-0.5 mb-4 rounded">
                     ID: {donor.donorId}
                   </div>
                   <DonorAvatar src={donor.donorDpUrl} name={donor.donorName} />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="max-w-[180px]">
                        <h3 className="font-black text-[#264653] uppercase leading-tight truncate text-lg">{donor.donorName}</h3>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1 truncate">
                          <Mail size={10} /> {donor.donorEmail}
                        </div>
                      </div>
                      <button 
                        disabled={actionLoading === donor.donorId}
                        onClick={() => handleAction(donor.donorId, "toggle")} 
                        className={`transition-all ${donor.isActive ? 'text-[#2A9D8F]' : 'text-gray-300'} disabled:opacity-50`}
                      >
                        {donor.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                        donor.donorStatus === 'APPROVED' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
                        donor.donorStatus === 'REJECTED' ? 'bg-red-50 border-red-200 text-red-600' : 
                        'bg-amber-50 border-amber-200 text-amber-600'
                      }`}>
                        {donor.donorStatus}
                      </span>
                      <span className="text-[8px] font-black bg-slate-100 px-2 py-0.5 rounded text-slate-500">{donor.donorType}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-[9px] font-black text-[#264653]/40 uppercase tracking-widest">
                        <Hash size={10}/> Connections: {donor.totalConnectedOrphans || 0}
                    </div>
                    <div className="flex gap-1">
                      {donor.donorStatus === "PENDING" && (
                         <button 
                           disabled={actionLoading === donor.donorId}
                           onClick={() => handleAction(donor.donorId, "approve")} 
                           className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                           title="Approve"
                         >
                           {actionLoading === donor.donorId ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18}/>}
                         </button>
                      )}
                      
                      {/* MODIFIED EYE BUTTON: এখন এটি রিডাইরেক্ট করবে */}
                      <button 
                        onClick={() => router.push(`/admin/donors/${donor.donorId}`)} 
                        className="p-2 text-[#264653] hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18}/>
                      </button>

                      <button onClick={() => setDeleteConfirm({ isOpen: true, id: donor.donorId })} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-gray-200 bg-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">No donor records found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      
      {/* Delete Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in-95">
            <AlertTriangle size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-black text-[#264653] mb-2">আপনি কি নিশ্চিত?</h3>
            <p className="text-gray-500 text-sm mb-6">এই রেকর্ডটি চিরস্থায়ীভাবে মুছে যাবে।</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm({isOpen: false, id: null})} className="flex-1 py-3 text-gray-400 font-bold uppercase text-[10px]">Cancel</button>
              <button onClick={() => deleteConfirm.id && handleAction(deleteConfirm.id, "delete")} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold uppercase text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Donor Drawer */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />
          <div className="relative w-full max-w-xl h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 bg-[#264653] text-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase">Add New <span className="text-[#2A9D8F]">Donor</span></h2>
              <button onClick={() => setIsFormOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={20}/></button>
            </div>

            <form onSubmit={async (e: any) => {
              e.preventDefault();
              setLoading(true);
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              try {
                const res = await donorService.createDonor(data);
                if(res.success) {
                  toast.success("সফলভাবে তৈরি হয়েছে!");
                  setIsFormOpen(false);
                  fetchDonors();
                }
              } catch (err) { toast.error("তৈরি করা সম্ভব হয়নি"); }
              finally { setLoading(false); }
            }} className="p-8 space-y-5 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Donor Type</label>
                <select name="donorType" value={donorType} onChange={(e) => setDonorType(e.target.value)} className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]">
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                  <option value="ORGANIZATION">ORGANIZATION</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">{donorType === "ORGANIZATION" ? "Representative Name" : "Full Name"}</label>
                <input name="donorName" required className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="Ex: John Doe" />
              </div>

              {donorType === "ORGANIZATION" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">Org. Name</label>
                    <input name="organizationName" required className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">Reg. No</label>
                    <input name="organizationRegistrationNo" className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Email</label>
                  <input name="donorEmail" type="email" required className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Password</label>
                  <input name="donorPassword" type="password" required className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Contact Number</label>
                <input name="donorContact" required className="w-full p-4 bg-gray-50 outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" />
              </div>

              <button disabled={loading} type="submit" className="w-full bg-[#264653] text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#2A9D8F] transition-all disabled:opacity-50 mt-4">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Register Donor Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}