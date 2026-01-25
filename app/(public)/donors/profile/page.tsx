"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  User, Mail, Phone, MapPin, Building2, ShieldCheck, Heart, Edit3, 
  LogOut, Camera, Loader2, MessageSquare, KeyRound, HandHeart, 
  History, Users, XCircle, ExternalLink, PlusCircle, Search, Info, Calendar, GraduationCap, School, Banknote, FileText, CheckCircle2,StickyNote,Hash ,Quote 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import donorProfileService from "@/app/lib/services/donorProfileService";

export default function DonorProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const receiptInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orphans" | "donations">("profile");
  
  // Data States
  const [donorData, setDonorData] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  
  // Modal States
  const [isOrphanModalOpen, setIsOrphanModalOpen] = useState(false);
  const [availableOrphans, setAvailableOrphans] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState<number | null>(null);

  // Detail Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrphanDetails, setSelectedOrphanDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Donation Modal States
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedOrphanForDonation, setSelectedOrphanForDonation] = useState<any>(null);
  const [submittingDonation, setSubmittingDonation] = useState(false);
  const [donationForm, setDonationForm] = useState({
    amount: "",
    description: "",
    transactionId: "",
    receiptUrl: ""
  });

  const getImageUrl = (fileName: string | null) => {
    const BASE_FILE_URL = "https://api.insaanbd.org/api/public/files";
    const DEFAULT = "https://api.insaanbd.org/uploads/default-avatar.png";
    if (!fileName || fileName === "string" || fileName === "null") return DEFAULT;
    return fileName.startsWith('http') ? fileName : `${BASE_FILE_URL}/${fileName}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, connectionsRes, donationsRes] = await Promise.all([
        donorProfileService.getProfile(),
        donorProfileService.getActiveConnections(),
        donorProfileService.getDonations()
      ]);

      if (profileRes.success) setDonorData(profileRes.data);  
      if (connectionsRes.success) setConnections(connectionsRes.data);
      if (donationsRes.success) setDonations(donationsRes.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/donors/login");
      } else {
        toast.error("তথ্য লোড করা সম্ভব হয়নি");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Donation Handler
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.amount || !donationForm.transactionId) {
      return toast.error("টাকার পরিমাণ এবং ট্রানজেকশন আইডি প্রদান করুন");
    }

    try {
      setSubmittingDonation(true);
      const payload = {
        orphanId: selectedOrphanForDonation.orphanId,
        donationDate: new Date().toISOString().split('T')[0],
        donationAmount: Number(donationForm.amount),
        donationDescription: donationForm.description,
        receiptUrl: donationForm.receiptUrl,
        transactionId: donationForm.transactionId
      };

      const res = await donorProfileService.makeDonation(payload);
      if (res.success) {
        toast.success("ডোনেশন সফলভাবে সাবমিট হয়েছে! ভেরিফিকেশনের পর আপডেট করা হবে।");
        setIsDonationModalOpen(false);
        setDonationForm({ amount: "", description: "", transactionId: "", receiptUrl: "" });
        fetchData(); // Refresh list
      }
    } catch (err) {
      toast.error("ডোনেশন সম্পন্ন করা সম্ভব হয়নি");
    } finally {
      setSubmittingDonation(false);
    }
  };

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const up = await donorProfileService.uploadDp(file); // reuse same upload logic
        if (up.success) {
          setDonationForm({ ...donationForm, receiptUrl: up.data.url });
          toast.success("রিসিট আপলোড হয়েছে");
        }
      } catch (err) {
        toast.error("ফাইল আপলোড ব্যর্থ হয়েছে");
      } finally {
        setUploading(false);
      }
    }
  };

  // existing functions (handleViewDetails, fetchAvailableOrphans, handleConnectRequest, handleDisconnect) remain same...
  const handleViewDetails = async (orphanId: number) => {
    try {
      setLoadingDetails(true);
      setIsDetailModalOpen(true);
      const res = await donorProfileService.getOrphanDetails(orphanId);
      if (res.success) {
        setSelectedOrphanDetails(res.data);
      }
    } catch (err) {
      toast.error("বিস্তারিত তথ্য পাওয়া যায়নি");
      setIsDetailModalOpen(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const fetchAvailableOrphans = async () => {
    try {
      const res = await donorProfileService.getAvailableOrphans();
      if (res.success) setAvailableOrphans(res.data);
    } catch (err) {
      toast.error("শিশুদের তালিকা পাওয়া যায়নি");
    }
  };

  const handleConnectRequest = async (orphanId: number) => {
    const message = window.prompt("শিশুর জন্য একটি বার্তা লিখুন (ঐচ্ছিক):");
    try {
      setIsConnecting(orphanId);
      const res = await donorProfileService.connectOrphan({ 
        orphanId, 
        requestMessage: message || "I would like to sponsor this child." 
      });
      if (res.success) {
        toast.success("রিকোয়েস্ট পাঠানো হয়েছে! অ্যাডমিন এপ্রুভ করলে আপনি কানেক্টেড হবেন।");
        setIsOrphanModalOpen(false);
        fetchData();
      }
    } catch (err) {
      toast.error("অনুরোধ পাঠানো সম্ভব হয়নি");
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (connectionId: number) => {
    if(!window.confirm("আপনি কি নিশ্চিতভাবে ডিসকানেক্ট করতে চান?")) return;
    const reason = window.prompt("ডিসকানেক্ট করার কারণ লিখুন:");
    if (!reason) return;
    try {
      const res = await donorProfileService.disconnectOrphan({ connectionId, disconnectReason: reason });
      if (res.success) {
        toast.success("সফলভাবে ডিসকানেক্ট করা হয়েছে");
        fetchData();
      }
    } catch (err) { toast.error("ব্যর্থ হয়েছে"); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-gray-50">
                <img src={getImageUrl(donorData?.donorDpUrl)} alt="profile" className="w-full h-full object-cover" />
              </div>
              <button 
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()} 
                className="absolute -bottom-2 -right-2 bg-[#264653] text-white p-2.5 rounded-2xl shadow-lg hover:bg-[#2A9D8F] transition-all"
              >
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploading(true);
                  const up = await donorProfileService.uploadDp(file);
                  if (up.success) {
                    await donorProfileService.updateProfile({ donorDpUrl: up.data.url });
                    fetchData();
                    toast.success("প্রোফাইল ছবি আপডেট হয়েছে");
                  }
                  setUploading(false);
                }
              }} />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-[#264653] mb-2">{donorData?.donorName}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 font-medium mb-5">
                <span className="flex items-center gap-1.5"><Mail size={16} className="text-[#2A9D8F]" /> {donorData?.donorEmail}</span>
                <span className="flex items-center gap-1.5"><Phone size={16} className="text-[#2A9D8F]" /> {donorData?.donorContact}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${donorData?.donorStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{donorData?.donorStatus}</span>
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">{donorData?.donorType}</span>
              </div>
            </div>

            <div className="flex md:flex-col gap-3">
              <button onClick={() => router.push("/donors/profile/edit")} className="p-4 bg-gray-50 text-[#264653] rounded-3xl hover:bg-[#2A9D8F]/10 hover:text-[#2A9D8F] transition-all"><Edit3 size={20}/></button>
              <button onClick={() => { localStorage.clear(); router.push("/donors/login"); }} className="p-4 bg-red-50 text-red-500 rounded-3xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={20}/></button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A9D8F]/5 rounded-full -mr-32 -mt-32" />
        </motion.div>

        {/* --- Navigation Tabs --- */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={18}/>} label="প্রোফাইল" />
          <TabButton active={activeTab === "orphans"} onClick={() => setActiveTab("orphans")} icon={<Users size={18}/>} label="সংযুক্ত শিশু" />
          <TabButton active={activeTab === "donations"} onClick={() => setActiveTab("donations")} icon={<History size={18}/>} label="ডোনেশন হিস্ট্রি" />
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && <ProfileView key="profile" donorData={donorData} />}
              {activeTab === "orphans" && <OrphansView 
                key="orphans" 
                connections={connections} 
                onDisconnect={handleDisconnect} 
                getImageUrl={getImageUrl} 
                onViewDetails={handleViewDetails}
                onDonateClick={(orphan: any) => {
                   setSelectedOrphanForDonation(orphan);
                   setIsDonationModalOpen(true);
                }}
              />}
              {activeTab === "donations" && <DonationsView key="donations" donations={donations} />}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#264653] text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-black mb-1">মোট সংযুক্ত শিশু</p>
                <h2 className="text-6xl font-black mb-6">{donorData?.totalConnectedOrphans || 0}</h2>
                <button 
                  onClick={() => { fetchAvailableOrphans(); setIsOrphanModalOpen(true); }}
                  className="w-full py-4 bg-[#2A9D8F] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-[#264653] transition-all shadow-lg"
                >
                  <PlusCircle size={18} /> নতুন শিশু খুঁজুন
                </button>
              </div>
              <ShieldCheck size={120} className="absolute -bottom-6 -right-6 text-white/5" />
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <KeyRound size={14} className="text-[#2A9D8F]" /> Quick Actions
               </h4>
               <div className="space-y-3">
                  <QuickLink icon={<HandHeart size={18}/>} label="ডোনেট করুন" onClick={() => setActiveTab("orphans")} />
                  <QuickLink icon={<MessageSquare size={18}/>} label="পাসওয়ার্ড পরিবর্তন" onClick={() => {}} />
               </div>
            </div>
          </div>
        </div>
      </div>

{/* --- Donation Modal (NEW) --- */}
<AnimatePresence>
  {isDonationModalOpen && (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDonationModalOpen(false)} className="absolute inset-0 bg-[#264653]/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 bg-[#FDFDFD] border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-[#264653]">সহায়তা করুন</h3>
            <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-wider">স্পন্সর: {selectedOrphanForDonation?.orphanName}</p>
          </div>
          <button onClick={() => setIsDonationModalOpen(false)} className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-red-500"><XCircle/></button>
        </div>

        <form onSubmit={handleDonationSubmit} className="p-8 space-y-5">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
             <Info size={18} className="text-amber-600 shrink-0" />
             <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
               দয়া করে আমাদের বিকাশ/নগদ নম্বরে পেমেন্ট করে নিচের বক্সে ট্রানজেকশন আইডি প্রদান করুন। প্রয়োজনে রিসিট আপলোড করতে পারেন।
             </p>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">টাকার পরিমাণ (BDT)</label>
            <div className="relative mt-1">
               <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
               <input 
                required
                type="number" 
                placeholder="যেমন: ২০০০" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#2A9D8F] font-bold text-[#264653]"
                value={donationForm.amount}
                onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">ট্রানজেকশন আইডি (Bkash/Nagad)</label>
            <div className="relative mt-1">
               <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
               <input 
                required
                type="text" 
                placeholder="TRX123456789" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#2A9D8F] font-bold text-[#264653]"
                value={donationForm.transactionId}
                onChange={(e) => setDonationForm({...donationForm, transactionId: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">বর্ণনা (ঐচ্ছিক)</label>
            <textarea 
              rows={2}
              className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#2A9D8F] font-bold text-[#264653] text-sm"
              value={donationForm.description}
              onChange={(e) => setDonationForm({...donationForm, description: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => receiptInputRef.current?.click()}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#2A9D8F] hover:text-[#2A9D8F] transition-all ${donationForm.receiptUrl ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : ''}`}
            >
              {uploading ? <Loader2 className="animate-spin"/> : (donationForm.receiptUrl ? <CheckCircle2 size={18}/> : <FileText size={18}/>)}
              <span className="text-[10px] font-black uppercase tracking-widest">{donationForm.receiptUrl ? "রিসিট যুক্ত হয়েছে" : "রিসিট আপলোড"}</span>
            </button>
            <input type="file" ref={receiptInputRef} className="hidden" onChange={handleReceiptUpload} />
          </div>

          <button 
            disabled={submittingDonation}
            className="w-full py-5 bg-[#264653] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#264653]/20 hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-2"
          >
            {submittingDonation ? <Loader2 className="animate-spin" /> : <Heart size={18}/>} ডোনেশন সাবমিট করুন
          </button>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>

{/* --- Other Modals remain exactly as they were --- */}
<AnimatePresence>
  {isOrphanModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOrphanModalOpen(false)} className="absolute inset-0 bg-[#264653]/60 backdrop-blur-md" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-black text-[#264653]">শিশুদের তালিকা</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">আপনার পছন্দের শিশুকে স্পন্সর করুন</p>
          </div>
          <button onClick={() => setIsOrphanModalOpen(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
            <XCircle size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FDFDFD]">
          {availableOrphans.length > 0 ? availableOrphans.map((orphan: any) => (
            <div key={orphan.orphanId} className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm flex gap-5 group hover:border-[#2A9D8F] transition-all">
              <img src={getImageUrl(orphan.orphanDpUrl)} alt={orphan.orphanName} className="w-24 h-28 rounded-2xl object-cover bg-gray-50 shadow-md" />
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[#264653] text-lg truncate">{orphan.orphanName}</h4>
                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-tighter">{orphan.orphanAge} বছর • {orphan.orphanEducationLevel}</p>
                
                <div className="space-y-1.5 mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium truncate"><MapPin size={12} className="text-[#2A9D8F]"/> {orphan.orphanAddress}</div>
                   <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium"><Heart size={12} className="text-red-400"/> {orphan.orphanHealthCondition || "সুস্থ"}</div>
                </div>

                <button 
                  disabled={orphan.isConnected || isConnecting === orphan.orphanId}
                  onClick={() => handleConnectRequest(orphan.orphanId)}
                  className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    orphan.isConnected 
                    ? "bg-emerald-100 text-emerald-600 cursor-not-allowed" 
                    : "bg-[#264653] text-white hover:bg-[#2A9D8F]"
                  }`}
                >
                  {isConnecting === orphan.orphanId ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : orphan.isConnected ? (
                    <>
                      <ShieldCheck size={14} /> Already Sponsored
                    </>
                  ) : (
                    <>
                      <HandHeart size={14} /> Sponsor Now
                    </>
                  )}
                </button>
              </div>
            </div>
          )) : <div className="col-span-full py-10 text-center text-gray-400">শিশুদের তথ্য লোড হচ্ছে...</div>}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

{/* Detail Modal */}
<AnimatePresence>
  {isDetailModalOpen && (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-[#264653]/80 backdrop-blur-sm" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl"
      >
        {loadingDetails ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
          </div>
        ) : selectedOrphanDetails && (
          <div className="p-8 md:p-12">
            <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
              <XCircle size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start">
              <img src={getImageUrl(selectedOrphanDetails.orphanDpUrl)} className="w-40 h-48 rounded-[2.5rem] object-cover shadow-xl border-4 border-white" alt="" />
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-[#264653] mb-2">{selectedOrphanDetails.orphanName}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedOrphanDetails.orphanAge} বছর</span>
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedOrphanDetails.orphanGender}</span>
                  <span className="px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedOrphanDetails.orphanEducationLevel}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium justify-center md:justify-start">
                   <MapPin size={16} className="text-[#2A9D8F]" /> {selectedOrphanDetails.orphanAddress}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                <h3 className="text-sm font-black text-[#264653] uppercase tracking-widest border-b pb-2 flex items-center gap-2"><Users size={16} className="text-[#2A9D8F]"/> পারিবারিক তথ্য</h3>
                <div className="space-y-3">
                  <DetailItem label="পিতার নাম" value={selectedOrphanDetails.orphanFatherName} />
                  <DetailItem label="মাতার নাম" value={selectedOrphanDetails.orphanMotherName} />
                  <DetailItem label="অভিভাবক" value={`${selectedOrphanDetails.guardianName} (${selectedOrphanDetails.guardianRelationship})`} />
                  <DetailItem label="অভিভাবকের মোবাইল" value={selectedOrphanDetails.guardianMobile} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-[#264653] uppercase tracking-widest border-b pb-2 flex items-center gap-2"><GraduationCap size={16} className="text-[#2A9D8F]"/> শিক্ষা ও প্রতিষ্ঠান</h3>
                <div className="space-y-3">
                  <DetailItem label="প্রতিষ্ঠানের নাম" value={selectedOrphanDetails.currentSchoolName || selectedOrphanDetails.orphanEducationInstitute} />
                  <DetailItem label="শ্রেণী/গ্রেড" value={selectedOrphanDetails.orphanClassGrade} />
                  <DetailItem label="প্রতিষ্ঠানের ঠিকানা" value={selectedOrphanDetails.orphanEducationInstituteAddress} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-[#264653] uppercase tracking-widest border-b pb-2 flex items-center gap-2"><Heart size={16} className="text-[#2A9D8F]"/> স্বাস্থ্য ও বর্তমান অবস্থা</h3>
                <div className="space-y-3">
                  <DetailItem label="শারীরিক অবস্থা" value={selectedOrphanDetails.orphanHealthCondition} />
                  <DetailItem label="প্রয়োজনীয় সাপোর্ট" value={selectedOrphanDetails.typeOfSupport} />
                  <DetailItem label="বর্তমান অবস্থা" value={selectedOrphanDetails.currentSituation} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-[#264653] uppercase tracking-widest border-b pb-2 flex items-center gap-2"><Info size={16} className="text-[#2A9D8F]"/> অন্যান্য তথ্য</h3>
                <div className="space-y-3">
                  <DetailItem label="জন্ম তারিখ" value={selectedOrphanDetails.orphanDob} />
                  <DetailItem label="মাধ্যমে আসা" value={`${selectedOrphanDetails.orphanViaName} (${selectedOrphanDetails.orphanViaRelation})`} />
                  <DetailItem label="যোগাযোগের নম্বর" value={selectedOrphanDetails.orphanViaContact} />
                </div>
              </section>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </div>
  );
}

// --- Tab Components ---

function ProfileView({ donorData }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black text-[#264653] mb-8 flex items-center gap-2"><User size={20} className="text-[#2A9D8F]" /> সাধারণ তথ্য</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <InfoItem label="ঠিকানা" value={donorData?.donorAddress} />
          <InfoItem label="সাপোর্ট টাইপ" value={donorData?.preferredSupportType} />
          <InfoItem label="ডোনার মেসেজ" value={donorData?.donorMessage} />
          <InfoItem label="যোগদানের তারিখ" value={new Date(donorData?.createdAt).toLocaleDateString('bn-BD')} />
        </div>
      </div>
      {donorData?.donorType === "ORGANIZATION" && (
        <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
          <h3 className="text-lg font-black text-[#264653] mb-6 flex items-center gap-2"><Building2 size={20} className="text-[#2A9D8F]" /> প্রতিষ্ঠানের তথ্য</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem label="নাম" value={donorData?.organizationName} />
            <InfoItem label="রেজিস্ট্রেশন নং" value={donorData?.organizationRegistrationNo} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function OrphansView({ connections, onDisconnect, getImageUrl, onViewDetails, onDonateClick }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {connections.length > 0 ? connections.map((c: any) => (
        <div key={c.connectionId} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex flex-col gap-4 group hover:border-[#2A9D8F] transition-all shadow-sm">
          
          <div className="flex gap-4 items-center">
            {/* Image Section with Connection ID Badge */}
            <div className="relative shrink-0">
              <img src={getImageUrl(c.orphanDpUrl)} className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm" alt="" />
              <div className="absolute -top-2 -left-2 bg-[#264653] text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                ID: {c.connectionId}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-black text-[#264653] truncate text-lg">{c.orphanName}</h4>
              <p className="text-xs font-bold text-gray-400 uppercase">বয়স: {c.orphanAge} বছর</p>
            </div>
          </div>

          {/* Admin Message Section - Placed between info and buttons */}
          {c.approvalNotes && (
            <div className="bg-[#2A9D8F]/5 p-3 rounded-xl border border-[#2A9D8F]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <MessageSquare size={10} className="text-[#2A9D8F]" />
                <span className="text-[9px] font-black text-[#264653] uppercase tracking-wider">Message from Admin:</span>
              </div>
              <p className="text-[10px] font-bold text-gray-500 italic leading-relaxed pl-1">
                "{c.approvalNotes}"
              </p>
            </div>
          )}

          {/* Action Buttons - Unchanged as per your requirement */}
          <div className="flex gap-2">
              <button 
                onClick={() => onViewDetails(c.orphanId)}
                className="flex-1 py-2 bg-[#264653]/10 text-[#264653] text-[9px] font-black uppercase rounded-lg hover:bg-[#264653] hover:text-white transition-all"
              >
                Details
              </button>
              <button 
                onClick={() => onDonateClick(c)}
                className="flex-1 py-2 bg-[#2A9D8F] text-white text-[9px] font-black uppercase rounded-lg hover:bg-[#264653] transition-all flex items-center justify-center gap-1"
              >
                <Banknote size={12}/> Donate
              </button>
              <button 
                onClick={() => onDisconnect(c.connectionId)} 
                className="p-2 text-red-400 hover:bg-red-50 rounded-lg border border-gray-50"
              >
                <XCircle size={18}/>
              </button>
          </div>
          
        </div>
      )) : (
        <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100 text-gray-400 uppercase text-xs font-bold">
          কোন শিশু সংযুক্ত নেই
        </div>
      )}
    </motion.div>
  );
}

function DonationsView({ donations }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-4"
    >
      {donations.length > 0 ? (
        donations.map((d: any) => (
          <div 
            key={d.donationId} 
            className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:border-[#2A9D8F] transition-all group relative overflow-hidden"
          >
            {/* Top Row: ID, Amount & Status */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                {/* Donation ID Stylized Icon/Box */}
                <div className="flex flex-col items-center justify-center px-3 py-2 bg-[#264653] text-white rounded-2xl min-w-[60px] shadow-lg shadow-[#264653]/10">
                  {/* <span className="text-[8px] font-black uppercase opacity-60 leading-none mb-1">ID</span> */}
                  <span className="text-sm font-black leading-none">#DON-{d.donationId}</span>
                </div>
                
                <div>
                  <h4 className="text-2xl font-black text-[#264653]">৳{d.donationAmount}</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={12} className="text-[#2A9D8F]" /> 
                    {new Date(d.donationDate).toLocaleDateString('bn-BD')}
                  </p>
                </div>
              </div>

              <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border ${
                d.donationStatus === 'APPROVED' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {d.donationStatus}
              </span>
            </div>

            {/* Middle Row: Grid Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-50">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">সংশ্লিষ্ট শিশু</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#264653]/10 flex items-center justify-center">
                    <User size={12} className="text-[#264653]" />
                  </div>
                  <span className="text-sm font-bold text-[#264653]">{d.orphanName}</span>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">ট্রানজেকশন আইডি</p>
                <div className="flex items-center gap-2">
                  <Hash size={12} className="text-[#2A9D8F]" />
                  <span className="text-sm font-mono font-bold text-gray-600">{d.transactionId || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Additional Details */}
            <div className="mt-4 space-y-3">
              {/* Donor Message Style */}
              {d.donationDescription && (
                <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Quote size={10} className="text-[#264653] opacity-40" />
                    <span className="text-[9px] font-black text-[#264653] uppercase opacity-70">Note from You:</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#264653]/80 leading-relaxed pl-1">
                    {d.donationDescription}
                  </p>
                </div>
              )}

              {/* Admin Verification Note */}
              {d.verificationNotes && (
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MessageSquare size={10} className="text-amber-600" />
                    <span className="text-[9px] font-black text-amber-700 uppercase">Verification Note:</span>
                  </div>
                  <p className="text-[10px] font-bold text-amber-800 italic">
                    "{d.verificationNotes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <History size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">কোন ডোনেশন হিস্ট্রি পাওয়া যায়নি</p>
        </div>
      )}
    </motion.div>
  );
}
// UI Helpers (TabButton, InfoItem, DetailItem, QuickLink) remain same...
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? "bg-[#264653] text-white shadow-lg" : "bg-white text-gray-400 border border-gray-100"}`}>{icon} {label}</button>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-sm font-bold text-[#264653]">{value || "প্রদান করা হয়নি"}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tight">{label}</span>
      <span className="text-sm font-bold text-[#264653]">{value || "N/A"}</span>
    </div>
  );
}

function QuickLink({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-[#2A9D8F]/10 text-[#264653] transition-all group">
      <div className="flex items-center gap-4"><span className="text-[#2A9D8F]">{icon}</span><span className="text-[11px] font-black uppercase">{label}</span></div>
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}