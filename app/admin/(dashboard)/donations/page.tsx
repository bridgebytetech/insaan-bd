"use client";
import { useEffect, useState, useMemo } from "react";
import { donationService } from "@/app/lib/services/donationService";
import { 
  Trash2, CheckCircle, XCircle, Eye, Search,
  Zap, Loader2, Plus, Calendar, DollarSign, 
  User, Heart, FileText, X, Clock, Info, UserCheck, ArrowUpRight, AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminDonations() {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // --- New Search State ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- Modal States ---
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "VERIFY" | "REJECT" | "DELETE" | null;
    id: number | null;
  }>({ isOpen: false, type: null, id: null });
  const [actionNotes, setActionNotes] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      let res;
      if (activeTab === "PENDING") res = await donationService.getPending();
      else if (activeTab === "VERIFIED") res = await donationService.getVerified();
      else res = await donationService.getAll();
      
      setItems(res.data || []);
      
      const totalRes = await donationService.getTotalAmount();
      setTotal(totalRes.data || 0);
    } catch (err) { toast.error("ডাটা পাওয়া যায়নি"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDonations(); }, [activeTab]);

  // --- Search Logic (Memoized for Performance) ---
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const lowerSearch = searchTerm.toLowerCase();
    return items.filter(item => 
      item.donorName?.toLowerCase().includes(lowerSearch) || 
      item.orphanName?.toLowerCase().includes(lowerSearch) ||
      item.donationId?.toString().includes(lowerSearch) ||
      item.transactionId?.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, items]);

  const handleActionExecute = async () => {
    if (!confirmModal.id) return;
    const id = confirmModal.id;

    try {
      if (confirmModal.type === "DELETE") {
        await donationService.delete(id);
        toast.success("রেকর্ড ডিলিট করা হয়েছে");
      } else if (confirmModal.type === "VERIFY") {
        await donationService.verify({ 
          donationId: id, 
          verificationNotes: actionNotes || "Verified by Admin" 
        });
        toast.success("ডোনেশন ভেরিফাই হয়েছে");
      } else if (confirmModal.type === "REJECT") {
        await donationService.reject({ 
          donationId: id, 
          verificationNotes: actionNotes || "Invalid data" 
        });
        toast.success("ডোনেশন রিজেক্ট করা হয়েছে");
      }
      fetchDonations();
    } catch (err) {
      toast.error("অ্যাকশনটি সফল হয়নি");
    } finally {
      closeConfirmModal();
    }
  };

  const openConfirmModal = (type: "VERIFY" | "REJECT" | "DELETE", id: number) => {
    setActionNotes("");
    setConfirmModal({ isOpen: true, type, id });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, type: null, id: null });
    setActionNotes("");
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* --- Sharp Header --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Finance</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              DONATION <span className="text-[#2A9D8F]">MANAGEMENT</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">
              Total Verified Collection: <span className="text-white">৳{total}</span>
            </p>
          </div>

          {/* // AdminDonations পেজের বাটনটি এভাবে পরিবর্তন করুন: */}
<Link 
  href="/admin/donations/create"
  className="w-full md:w-auto group flex items-center justify-center gap-3 bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-4 transition-all font-black uppercase text-sm tracking-widest shadow-xl"
>
  <Plus size={20} /> ডোনেশন রেকর্ড করুন
</Link>
        </div>
      </div>

      {/* --- Filter & Search Bar Section --- */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b md:border-b-0 md:border-r border-gray-200">
            {["ALL", "PENDING", "VERIFIED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-5 text-[10px] whitespace-nowrap font-black uppercase tracking-[0.2em] transition-all border-r border-gray-100 last:border-r-0 ${
                  activeTab === tab ? "bg-gray-50 text-[#2A9D8F] border-b-2 border-b-[#2A9D8F]" : "text-gray-400 hover:text-[#264653]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Search Input */}
          {/* Search Input Container */}
<div className="flex-1 relative flex items-center bg-white group border-l border-gray-100">
  {/* Icon Wrapper - Absolute Positioning with perfect center */}
  <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
    <Search 
      size={20} 
      className="text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors duration-300" 
    />
  </div>
  
  {/* Input Field */}
  <input 
    type="text"
    placeholder="সার্চ করুন (নাম, আইডি অথবা ট্রানজেকশন...)"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-14 pr-12 h-[64px] outline-none font-bold text-sm text-[#264653] placeholder:text-gray-300 placeholder:font-medium tracking-tight bg-transparent"
  />

  {/* Clear Button (Optional but very useful for UX) */}
  {searchTerm && (
    <button 
      onClick={() => setSearchTerm("")}
      className="absolute right-4 p-2 text-gray-300 hover:text-red-400 transition-colors"
    >
      <X size={16} />
    </button>
  )}
</div>
        </div>
      </div>

      {/* --- Grid Layout --- */}
      <div className="w-full p-4 md:p-8">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Finance Data...</p>
          </div>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200 shadow-2xl">
                {filteredItems.map((item) => (
                  <div key={item.donationId} className="bg-white border-r border-b border-gray-200 flex flex-col transition-all hover:bg-gray-50 group">
                    <div className="p-6 space-y-4">
                      {/* Status Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <div className="bg-[#264653] text-white px-3 py-1 text-[9px] font-black tracking-widest w-fit">
                            ID: #{item.donationId}
                          </div>
                          <div className="text-[8px] text-gray-400 font-bold flex items-center gap-1">
                            <Clock size={10}/> {new Date(item.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border ${
                          item.donationStatus === 'VERIFIED' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 
                          item.donationStatus === 'PENDING' ? 'border-amber-400 text-amber-500' : 'border-red-300 text-red-400'
                        }`}>
                          {item.donationStatus}
                        </div>
                      </div>

                      {/* Amount */}
                      <div>
                        <h2 className="text-2xl font-black text-[#264653] tracking-tighter">৳{item.donationAmount}</h2>
                        <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">{item.donationType}</p>
                      </div>

                      {/* Info List */}
                      <div className="space-y-2 border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                          <User size={12} className="text-[#2A9D8F]" /> Donor: {item.donorName} <span className="text-[8px] text-gray-400">(#{item.donorId})</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                          <Heart size={12} className="text-[#E76F51]" /> For: {item.orphanName || "General Fund"} {item.orphanId && <span className="text-[8px] text-gray-400">(#{item.orphanId})</span>}
                        </div>
                        <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                          <Calendar size={12} className="text-blue-400" /> Donation Date: {item.donationDate}
                        </div>
                        <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                          <UserCheck size={12} className="text-purple-400" /> Added By: {item.isAddedByDonor ? "Donor" : "Admin"}
                        </div>
                        
                        {item.transactionId && (
                          <div className="flex items-center gap-2 text-[#264653]/50 text-[9px] font-medium break-all">
                            <FileText size={12} /> TXN: {item.transactionId}
                          </div>
                        )}

                        {item.verificationNotes && (
                          <div className="flex items-start gap-2 bg-gray-100 p-2 text-[9px] text-[#264653]/70 italic border-l-2 border-[#2A9D8F]">
                            <Info size={12} className="mt-0.5 shrink-0" /> Note: {item.verificationNotes}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex border border-gray-200 divide-x divide-gray-200">
                          <Link 
                            href={`/admin/donations/${item.donationId}`}
                            className="p-3 hover:bg-gray-100 text-[#264653] transition-colors"
                            title="View Details & Receipt"
                          >
                            <ArrowUpRight size={16}/>
                          </Link>
                          <button 
                            onClick={() => openConfirmModal("DELETE", item.donationId)}
                            className="p-3 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                          >
                            <Trash2 size={16}/>
                          </button>
                        </div>

                        {item.donationStatus === 'PENDING' && (
                          <div className="flex gap-2">
                            <button onClick={() => openConfirmModal("VERIFY", item.donationId)} className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition-all"><CheckCircle size={18}/></button>
                            <button onClick={() => openConfirmModal("REJECT", item.donationId)} className="bg-red-400 text-white p-2 rounded hover:bg-red-500 transition-all"><XCircle size={18}/></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Results State */
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
                <Search size={40} className="text-gray-200 mb-4" />
                <h3 className="text-lg font-black uppercase text-[#264653] tracking-tight">No Matches Found</h3>
                <p className="text-sm text-gray-400">আপনার সার্চের সাথে কোনো রেকর্ড মিলছে না</p>
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="mt-4 text-[10px] font-black uppercase text-[#2A9D8F] underline tracking-widest"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Action Confirmation Modal --- */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#264653]/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md shadow-2xl border-t-8 border-[#2A9D8F]">
            <div className="p-8 space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${confirmModal.type === 'DELETE' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  {confirmModal.type === 'DELETE' ? <AlertTriangle size={40}/> : <CheckCircle size={40}/>}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#264653]">
                  {confirmModal.type === 'DELETE' ? 'Confirm Deletion' : 
                   confirmModal.type === 'VERIFY' ? 'Verify Donation' : 'Reject Donation'}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {confirmModal.type === 'DELETE' ? 'আপনি কি এই রেকর্ডটি ডিলিট করতে নিশ্চিত? এটি আর ফেরত আনা যাবে না।' : 
                   'আপনি কি এই ডোনেশন রেকর্ডের স্ট্যাটাস পরিবর্তন করতে চান?'}
                </p>
              </div>

              {(confirmModal.type === 'VERIFY' || confirmModal.type === 'REJECT') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Notes (Optional)</label>
                  <textarea 
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    className="w-full p-4 bg-gray-50 outline-none font-bold text-sm border border-gray-100 focus:bg-white focus:border-[#2A9D8F] transition-all"
                    placeholder={confirmModal.type === 'VERIFY' ? "e.g. Verified from Bank statement" : "e.g. Fake transaction ID"}
                    rows={2}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleActionExecute}
                  className={`w-full py-4 text-white font-black uppercase text-xs tracking-[0.2em] transition-all ${
                    confirmModal.type === 'DELETE' ? 'bg-red-500 hover:bg-red-600' : 
                    confirmModal.type === 'REJECT' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#2A9D8F] hover:bg-[#264653]'
                  }`}
                >
                  Confirm Action
                </button>
                <button 
                  onClick={closeConfirmModal}
                  className="w-full py-4 bg-gray-100 text-gray-400 font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Add Donation Sidebar Form --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-8 bg-[#264653] text-white flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Record New <span className="text-[#2A9D8F]">Donation</span></h2>
              <button onClick={() => setIsFormOpen(false)} className="hover:rotate-90 transition-transform"><X size={24}/></button>
            </div>
            
            <form onSubmit={async (e: any) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const donorId = formData.get('donorId');
              const data = Object.fromEntries(formData.entries());
              try {
                await donationService.create(Number(donorId), data);
                toast.success("ডোনেশন রেকর্ড করা হয়েছে");
                setIsFormOpen(false);
                fetchDonations();
              } catch (err) { toast.error("ভুল তথ্য দেওয়া হয়েছে"); }
            }} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Select Donor ID *</label>
                <input name="donorId" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" placeholder="e.g. 1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Orphan ID (Optional)</label>
                  <input name="orphanId" type="number" className="w-full p-4 bg-gray-50 outline-none font-bold focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" placeholder="e.g. 101" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Amount (৳) *</label>
                  <input name="donationAmount" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" placeholder="5000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Transaction ID</label>
                <input name="transactionId" required className="w-full p-4 bg-gray-50 outline-none font-bold uppercase focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" placeholder="BKASH-TXN-123" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Donation Date</label>
                <input name="donationDate" type="date" required className="w-full p-4 bg-gray-50 outline-none font-bold focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Description</label>
                <textarea name="donationDescription" rows={3} className="w-full p-4 bg-gray-50 outline-none font-bold focus:bg-white border border-transparent focus:border-[#2A9D8F] transition-all" placeholder="Details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#264653] text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#2A9D8F] transition-all shadow-lg">
                Save Donation Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}