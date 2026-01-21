"use client";
import { useEffect, useState } from "react";
import { donorService } from "@/app/lib/services/donorService";
import { 
  Trash2, Eye, CheckCircle, XCircle, X,
  ToggleRight, ToggleLeft, Loader2, Zap, 
  Search, Plus, Hash, Mail, Phone, User
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminDonorManagement() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      let res;
      if (searchQuery) {
        res = await donorService.searchDonors(searchQuery);
      } else {
        switch (activeTab) {
          case "PENDING": res = await donorService.getPendingDonors(); break;
          case "APPROVED": res = await donorService.getApprovedDonors(); break;
          default: res = await donorService.getAllDonors();
        }
      }
      setDonors(res.data || []);
    } catch (err) {
      toast.error("ডাটা পাওয়া যায়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [activeTab]);

  const handleAction = async (id: number, action: string) => {
    try {
      let res;
      if (action === "approve") res = await donorService.approveDonor(id);
      if (action === "reject") res = await donorService.rejectDonor(id);
      if (action === "toggle") res = await donorService.toggleStatus(id);
      if (action === "delete") {
        if (!confirm("আপনি কি নিশ্চিত ভাবে এই ডোনার প্রোফাইলটি ডিলিট করতে চান?")) return;
        res = await donorService.deleteDonor(id);
      }
      if (res.success) {
        toast.success(res.message || "সফল হয়েছে");
        fetchDonors();
      }
    } catch (err) {
      toast.error("অ্যাকশন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] relative">
      {/* --- Full-Width Sharp Header --- */}
      <div className="w-full bg-[#264653] text-white p-6 md:p-10 border-b-4 border-[#2A9D8F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#2A9D8F] fill-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Admin</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              ডোনার <span className="text-[#2A9D8F]">ম্যানেজমেন্ট</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                className="w-full bg-[#2d515f] border-none text-white pl-10 pr-4 py-3 text-sm focus:ring-1 ring-[#2A9D8F] outline-none"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && fetchDonors()}
              />
            </div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus size={16} /> Add New Donor
            </button>
          </div>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="w-full bg-white border-b border-gray-200 flex overflow-x-auto">
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
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Donor Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 border-t border-l border-gray-200">
            {donors.length > 0 ? donors.map((donor) => (
              <div key={donor.donorId} className="bg-white border-r border-b border-gray-200 flex flex-col sm:flex-row transition-all hover:bg-gray-50 group">
                
                {/* ID & Initial Column */}
                <div className="w-full sm:w-24 bg-gray-50/50 flex flex-col items-center justify-center py-6 sm:py-0 border-b sm:border-b-0 sm:border-r border-gray-100">
                   <div className="bg-[#264653] text-white text-[11px] font-black px-3 py-1 mb-3 rounded shadow-sm">
                      #{donor.donorId}
                   </div>
                   <div className="w-12 h-12 rounded-full bg-white border-2 border-[#2A9D8F]/20 flex items-center justify-center text-xl font-black text-[#264653]">
                     {donor.donorName?.charAt(0)}
                   </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-[#264653] uppercase leading-tight line-clamp-1">{donor.donorName}</h3>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1">
                          <Mail size={10} /> {donor.donorEmail}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAction(donor.donorId, "toggle")} 
                        className={donor.isActive ? 'text-[#2A9D8F]' : 'text-gray-300'}
                        title={donor.isActive ? "Deactivate" : "Activate"}
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
                      <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded border bg-gray-50 text-gray-400">
                        {donor.donorType}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-[9px] font-black text-[#264653]/40 uppercase tracking-widest">
                       <Hash size={10}/> Connections: {donor.totalConnectedOrphans || 0}
                    </div>
                    <div className="flex gap-1">
                      {donor.donorStatus === "PENDING" && (
                         <button 
                           onClick={() => handleAction(donor.donorId, "approve")} 
                           className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                           title="Approve Donor"
                         >
                           <CheckCircle size={18}/>
                         </button>
                      )}
                      <Link 
                        href={`/admin/donors/${donor.donorId}`} 
                        className="p-2 text-[#264653] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye size={18}/>
                      </Link>
                      <button 
                        onClick={() => handleAction(donor.donorId, "delete")} 
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18}/>
                      </button>
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

      {/* --- Manual Donor Add Sidebar Form --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 bg-[#264653] text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Add New <span className="text-[#2A9D8F]">Donor</span></h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manual Registration</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full">
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={async (e: any) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              try {
                const res = await donorService.createDonor(data);
                if(res.success) {
                  toast.success("Donor registered successfully!");
                  setIsFormOpen(false);
                  fetchDonors();
                }
              } catch (err) { toast.error("তৈরি করা সম্ভব হয়নি"); }
            }} className="p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Donor Type</label>
                  <select name="donorType" className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]">
                    <option value="INDIVIDUAL">INDIVIDUAL</option>
                    <option value="ORGANIZATION">ORGANIZATION</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Name</label>
                  <input name="donorName" required className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="John Doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email Address</label>
                  <input name="donorEmail" type="email" required className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Password</label>
                  <input name="donorPassword" type="password" required className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Contact Number</label>
                <input name="donorContact" required className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="+880 1XXX-XXXXXX" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Address</label>
                <textarea name="donorAddress" rows={2} className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="Enter physical address..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-6 border-dashed border-gray-200">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Organization Name</label>
                  <input name="organizationName" className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="Company Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Reg. No</label>
                  <input name="organizationRegistrationNo" className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="REG-XXX" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Support Message</label>
                <textarea name="donorMessage" rows={2} className="w-full p-4 bg-gray-50 border-none outline-none font-bold text-sm focus:ring-1 ring-[#2A9D8F]" placeholder="Any message..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[#264653] text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#2A9D8F] transition-all shadow-xl">
                Register Donor Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}