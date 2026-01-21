"use client";
import { useEffect, useState } from "react";
import { donationService } from "@/app/lib/services/donationService";
import { 
  Trash2, CheckCircle, XCircle, Eye, 
  Zap, Loader2, Plus, Calendar, DollarSign, 
  User, Heart, FileText, X, Search 
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDonations() {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    } catch (err) { toast.error("ডাটা পাওয়া যায়নি"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDonations(); }, [activeTab]);

  const handleVerify = async (id: number) => {
    const notes = prompt("Verification Notes (optional):") || "Verified by Admin";
    try {
      await donationService.verify({ donationId: id, verificationNotes: notes });
      toast.success("ডোনেশন ভেরিফাই হয়েছে");
      fetchDonations();
    } catch (err) { toast.error("ভেরিফিকেশন ব্যর্থ হয়েছে"); }
  };

  const handleReject = async (id: number) => {
    const notes = prompt("Reason for rejection:") || "Invalid data";
    try {
      await donationService.reject({ donationId: id, verificationNotes: notes });
      toast.success("ডোনেশন রিজেক্ট করা হয়েছে");
      fetchDonations();
    } catch (err) { toast.error("ব্যর্থ হয়েছে"); }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* --- Sharp Header --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Finance</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              ডোনেশন <span className="text-[#2A9D8F]">ম্যানেজমেন্ট</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">
              Total Verified Collection: <span className="text-white">৳{total}</span>
            </p>
          </div>

          <button 
            onClick={() => setIsFormOpen(true)}
            className="group flex items-center gap-3 bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-8 py-4 transition-all font-black uppercase text-sm tracking-widest shadow-xl"
          >
            <Plus size={20} /> ডোনেশন রেকর্ড করুন
          </button>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="w-full bg-white border-b border-gray-200 flex overflow-x-auto">
        {["ALL", "PENDING", "VERIFIED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-gray-200 transition-all ${
              activeTab === tab ? "bg-gray-50 text-[#2A9D8F] border-b-2 border-b-[#2A9D8F]" : "text-gray-400 hover:text-[#264653]"
            }`}
          >
            {tab} History
          </button>
        ))}
      </div>

      {/* --- Grid Layout --- */}
      <div className="w-full p-4 md:p-8">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Finance Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200 shadow-2xl">
            {items.map((item) => (
              <div key={item.donationId} className="bg-white border-r border-b border-gray-200 flex flex-col transition-all hover:bg-gray-50 group">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#264653] text-white px-3 py-1 text-[9px] font-black tracking-widest">
                      ID: #{item.donationId}
                    </div>
                    <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border ${
                      item.donationStatus === 'VERIFIED' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 
                      item.donationStatus === 'PENDING' ? 'border-amber-400 text-amber-500' : 'border-red-300 text-red-400'
                    }`}>
                      {item.donationStatus}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-[#264653] tracking-tighter">৳{item.donationAmount}</h2>
                    <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">{item.donationType}</p>
                  </div>

                  <div className="space-y-2 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                      <User size={12} className="text-[#2A9D8F]" /> Donor: {item.donorName}
                    </div>
                    <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                      <Heart size={12} className="text-[#E76F51]" /> For: {item.orphanName || "General Fund"}
                    </div>
                    <div className="flex items-center gap-2 text-[#264653]/70 text-[10px] font-bold uppercase">
                      <Calendar size={12} className="text-blue-400" /> {item.donationDate}
                    </div>
                    {item.transactionId && (
                      <div className="flex items-center gap-2 text-[#264653]/50 text-[9px] font-medium break-all">
                        <FileText size={12} /> TXN: {item.transactionId}
                      </div>
                    )}
                  </div>

                  {/* Actions Box */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex border border-gray-200 divide-x divide-gray-200">
                      <button className="p-3 hover:bg-gray-100 text-[#264653]" title="View Receipt"><Eye size={16}/></button>
                      <button 
                        onClick={() => { if(confirm("Are you sure?")) donationService.delete(item.donationId).then(fetchDonations) }}
                        className="p-3 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>

                    {item.donationStatus === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleVerify(item.donationId)} className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition-all"><CheckCircle size={18}/></button>
                        <button onClick={() => handleReject(item.donationId)} className="bg-red-400 text-white p-2 rounded hover:bg-red-500 transition-all"><XCircle size={18}/></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Add Donation Sidebar Form --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-8 bg-[#264653] text-white flex justify-between items-center sticky top-0">
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
                toast.success("ডোনেশন রেকর্ড করা হয়েছে");
                setIsFormOpen(false);
                fetchDonations();
              } catch (err) { toast.error("ভুল তথ্য দেওয়া হয়েছে"); }
            }} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Select Donor ID *</label>
                <input name="donorId" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="e.g. 1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Orphan ID (Optional)</label>
                  <input name="orphanId" type="number" className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="e.g. 101" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Amount (৳) *</label>
                  <input name="donationAmount" required type="number" className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="5000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Transaction ID</label>
                <input name="transactionId" required className="w-full p-4 bg-gray-50 outline-none font-bold uppercase" placeholder="BKASH-TXN-123" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Donation Date</label>
                <input name="donationDate" type="date" required className="w-full p-4 bg-gray-50 outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Description</label>
                <textarea name="donationDescription" rows={3} className="w-full p-4 bg-gray-50 outline-none font-bold" placeholder="Details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#264653] text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#2A9D8F] transition-all">
                Save Donation Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}