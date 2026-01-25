"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ArrowLeft, UserCheck, User, Send, 
  Loader2, Search, Check, Info, XCircle 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/app/lib/api/axios";
import { connectionService } from "@/app/lib/services/connectionService";

export default function AddConnectionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [selectedOrphan, setSelectedOrphan] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const [donorSearch, setDonorSearch] = useState("");
  const [orphanSearch, setOrphanSearch] = useState("");
  const [donors, setDonors] = useState([]);
  const [orphans, setOrphans] = useState([]);
  const [isSearchingDonor, setIsSearchingDonor] = useState(false);
  const [isSearchingOrphan, setIsSearchingOrphan] = useState(false);

  // Debounced Donor Search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (donorSearch.length < 2) return setDonors([]);
      setIsSearchingDonor(true);
      try {
        const res = await api.get(`/admin/donors?search=${donorSearch}&status=APPROVED`);
        setDonors(res.data.data || []);
      } catch (err) { console.error(err); }
      finally { setIsSearchingDonor(false); }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [donorSearch]);

  // Debounced Orphan Search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (orphanSearch.length < 2) return setOrphans([]);
      setIsSearchingOrphan(true);
      try {
        const res = await api.get(`/admin/orphans?search=${orphanSearch}&status=AVAILABLE`);
        setOrphans(res.data.data || []);
      } catch (err) { console.error(err); }
      finally { setIsSearchingOrphan(false); }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [orphanSearch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonor || !selectedOrphan) return toast.error("Selection incomplete!");

    try {
      setIsSubmitting(true);
      const payload = {
        donorId: parseInt(selectedDonor.donorId || selectedDonor.id),
        orphanId: parseInt(selectedOrphan.orphanId || selectedOrphan.id),
        approvalNotes: notes || "Administrative manual pairing"
      };

      await api.post("/admin/connections/manual", payload);
      toast.success("Bridge created successfully!");
      router.push("/admin/connections");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to establish bridge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 font-sans">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/admin/connections" className="flex items-center gap-2 text-slate-400 hover:text-[#264653] transition-all group">
            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-slate-100"><ArrowLeft size={18} /></div>
            <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Back</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-black text-[#264653] uppercase tracking-[0.2em]">Establish <span className="text-[#2A9D8F]">Bridge</span></h1>
          </div>
          <div className="w-20 hidden sm:block" /> 
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Logic Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Donor Block */}
                <div className="space-y-4">
                  <header className="flex items-center gap-3 ml-1">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]  text-slate-500">1</div>
                    <label className="text-[30px] font-black text-[#299D8F] uppercase tracking-widest">Select Donor</label>
                  </header>
                  
                  <AnimatePresence mode="wait">
                    {selectedDonor ? (
                      <SelectedCard key="donor-card" data={selectedDonor} onClear={() => setSelectedDonor(null)} type="DONOR" />
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2A9D8F] transition-colors" size={18} />
                        <input 
                          value={donorSearch}
                          onChange={(e) => setDonorSearch(e.target.value)}
                          placeholder="Donor Name or ID..." 
                          className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-[#2A9D8F]/30 transition-all outline-none" 
                        />
                        <SearchDropdown items={donors} loading={isSearchingDonor} onSelect={setSelectedDonor} type="DONOR" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Orphan Block */}
                <div className="space-y-4">
                  <header className="flex items-center gap-3 ml-1">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">2</div>
                    <label className="text-[30px] font-black text-[#299D8F] uppercase tracking-widest">Select Orphan</label>
                  </header>

                  <AnimatePresence mode="wait">
                    {selectedOrphan ? (
                      <SelectedCard key="orphan-card" data={selectedOrphan} onClear={() => setSelectedOrphan(null)} type="ORPHAN" />
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2A9D8F] transition-colors" size={18} />
                        <input 
                          value={orphanSearch}
                          onChange={(e) => setOrphanSearch(e.target.value)}
                          placeholder="Search Orphans..." 
                          className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-[#2A9D8F]/30 transition-all outline-none" 
                        />
                        <SearchDropdown items={orphans} loading={isSearchingOrphan} onSelect={setSelectedOrphan} type="ORPHAN" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Notes Area */}
              <div className="space-y-4">
                <header className="flex items-center gap-3 ml-1">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">3</div>
                  <label className="text-[30px] font-black text-[#299D8F] uppercase tracking-widest">Administrative Context</label>
                </header>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention why this manual connection is required (e.g., Special Sponsorship)" 
                  className="w-full h-32 bg-slate-50/50 border border-slate-100 rounded-[1.5rem] py-5 px-6 text-sm font-semibold focus:bg-white focus:border-[#2A9D8F]/30 transition-all outline-none resize-none" 
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                disabled={isSubmitting || !selectedDonor || !selectedOrphan}
                className="w-full py-5 bg-[#264653] text-white rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-3 shadow-xl hover:bg-[#1d353f] active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <>Finalize Bridge Connection <Send size={16} className="text-[#2A9D8F]" /></>}
              </button>
            </div>
          </div>

          {/* Guidelines / Summary Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#264653] p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
              <Zap className="absolute right-[-20px] top-[-20px] w-32 h-32 text-white/5 rotate-12" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={16} className="text-[#2A9D8F]" />
                  <h3 className="text-sm font-black uppercase tracking-widest">Bridge Protocol</h3>
                </div>
                <ul className="space-y-3">
                   <li className="flex gap-3 text-[11px] font-medium leading-relaxed text-slate-300">
                     <Check size={14} className="text-emerald-400 shrink-0" />
                     Immediate activation upon submission.
                   </li>
                   <li className="flex gap-3 text-[11px] font-medium leading-relaxed text-slate-300">
                     <Check size={14} className="text-emerald-400 shrink-0" />
                     Donor will be notified via email/dashboard.
                   </li>
                </ul>
              </div>
            </div>

            {/* Visual Bridge */}
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center space-y-8 shadow-sm">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Connection Preview</p>
                <div className="flex items-center gap-6">
                  <motion.div animate={selectedDonor ? { scale: [1, 1.1, 1] } : {}} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-colors ${selectedDonor ? 'bg-[#264653] text-[#2A9D8F] shadow-lg shadow-emerald-900/10' : 'bg-slate-50 text-slate-200'}`}><UserCheck size={28} /></motion.div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`h-1 w-12 rounded-full ${selectedDonor && selectedOrphan ? 'bg-[#2A9D8F]' : 'bg-slate-100'}`} />
                  </div>
                  <motion.div animate={selectedOrphan ? { scale: [1, 1.1, 1] } : {}} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-colors ${selectedOrphan ? 'bg-[#2A9D8F] text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-200'}`}><User size={28} /></motion.div>
                </div>
                {!selectedDonor && !selectedOrphan && <p className="text-[10px] font-bold text-slate-400 italic">Waiting for selection...</p>}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

// --- Internal UI Components ---

function SearchDropdown({ items, loading, onSelect, type }: any) {
  if (loading) return (
    <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-2xl border p-6 z-50 shadow-2xl flex justify-center">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={20} />
    </div>
  );
  if (items.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="absolute top-full left-0 w-full mt-3 bg-white rounded-[1.5rem] border border-slate-100 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-h-72 overflow-y-auto p-2"
    >
      {items.map((item: any) => (
        <button 
          key={type === 'DONOR' ? item.donorId : item.orphanId}
          type="button"
          onClick={() => onSelect(item)}
          className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all group text-left border-b border-slate-50 last:border-0"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#264653] font-black text-sm uppercase overflow-hidden shrink-0 border border-slate-200/50">
            {item.profilePicUrl ? <img src={`https://api.insaanbd.org/api/public/files/${item.profilePicUrl}`} className="w-full h-full object-cover" /> : (item.name || item.donorName || item.orphanName)?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-[#264653] uppercase truncate tracking-tight">{item.name || item.donorName || item.orphanName}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {item.donorId || item.orphanId}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <Check size={14} className="text-emerald-500" />
          </div>
        </button>
      ))}
    </motion.div>
  );
}

function SelectedCard({ data, onClear, type }: any) {
  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="relative flex items-center gap-5 p-5 bg-[#264653] text-white rounded-[1.5rem] border-2 border-[#2A9D8F] shadow-xl"
    >
      <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-[#2A9D8F] border border-white/5 shrink-0">
        <UserCheck size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black uppercase truncate tracking-wider">{data.name || data.donorName || data.orphanName}</p>
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1 italic">Verified {type}</p>
      </div>
      <button 
        onClick={onClear} 
        type="button" 
        className="p-2 hover:bg-white/10 rounded-full transition-colors group"
        title="Change Selection"
      >
        <XCircle size={18} className="text-white/30 group-hover:text-red-400" />
      </button>
    </motion.div>
  );
}