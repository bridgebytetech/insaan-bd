"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  User, Mail, Phone, MapPin, Building2, ShieldCheck, Heart, 
  Loader2, History, Users, XCircle, Calendar, 
  Banknote, Hash, ArrowLeft, Trash2, CheckCircle, 
  ShieldAlert, Info, School 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Services
import { donorService } from "@/app/lib/services/donorService"; 
import { donationService } from "@/app/lib/services/donationService"; // আপনার দেওয়া সার্ভিস
import donorProfileService from "@/app/lib/services/donorProfileService";
import { connectionService } from "@/app/lib/services/connectionService";
import { Cossette_Texte } from "next/font/google";

// --- Helpers ---
const getImageUrl = (fileName: string | null) => {
  const BASE_FILE_URL = "https://api.insaanbd.org/api/public/files";
  const DEFAULT = "https://api.insaanbd.org/uploads/default-avatar.png";
  if (!fileName || fileName === "string" || fileName === "null") return DEFAULT;
  return fileName.startsWith('http') ? fileName : `${BASE_FILE_URL}/${fileName}`;
};

export default function MasterAdminDonorDetails() {
  const { id } = useParams();
  const router = useRouter();
  const donorIdNum = Number(id);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orphans" | "donations">("profile");
  const [actionLoading, setActionLoading] = useState(false);

  // Data States
  const [donor, setDonor] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  console.log(connections)

  const [totalImpact, setTotalImpact] = useState(0);

  // Orphan Details Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrphanDetails, setSelectedOrphanDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [total, setTotal] = useState(0);
  // console.log(total)

  // --- Data Fetching Logic ---
 const fetchAllData = useCallback(async () => {
  try {
    setLoading(true);
    
    // ৩টি রিকোয়েস্ট একসাথে পাঠানো হচ্ছে
    const [donorRes, allDonations, allConnections] = await Promise.all([
      donorService.getDonorById(donorIdNum),
      donationService.getAll(),
      connectionService.getAll() // নতুন করে কানেকশন ফেচ করা হচ্ছে
    ]);

    // ১. ডোনার প্রোফাইল সেট করা
    if (donorRes.success) {
      setDonor(donorRes.data);
    }

    // ২. কানেকশন ফিল্টার করা (আপনার এন্ডপয়েন্ট ডেটা থেকে)
    if (allConnections && Array.isArray(allConnections.data)) {
      const filteredConnections = allConnections.data.filter(
        (conn: any) => conn.donorId === donorIdNum
      );
      setConnections(filteredConnections);
    }

    // ৩. ডোনেশন ক্যালকুলেশন (আগের মতোই)
    if (allDonations && Array.isArray(allDonations.data)) {
      const filteredDonations = allDonations.data.filter(
        (d: any) => d.donorId === donorIdNum
      );
      setDonations(filteredDonations);

      const calculatedTotal = filteredDonations.reduce((acc: number, curr: any) => {
        if (curr.donationStatus === "VERIFIED" || curr.donationStatus === "APPROVED") {
          return acc + (Number(curr.donationAmount) || 0);
        }
        return acc;
      }, 0);

      setTotal(calculatedTotal);
      setTotalImpact(calculatedTotal);
    }

  } catch (err) {
    console.error("Fetch Error:", err);
    toast.error("তথ্য লোড করা সম্ভব হয়নি");
  } finally {
    setLoading(false);
  }
}, [donorIdNum]);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  // --- Admin Action Handlers ---
  const handleAdminAction = async (action: "approve" | "reject" | "delete" | "toggle") => {
    try {
      setActionLoading(true);
      let res;
      if (action === "approve") res = await donorService.approveDonor(donorIdNum);
      else if (action === "reject") res = await donorService.rejectDonor(donorIdNum);
      else if (action === "toggle") res = await donorService.toggleStatus(donorIdNum);
      else if (action === "delete") {
        if (!confirm("আপনি কি নিশ্চিতভাবে এই ডোনার মুছে ফেলতে চান?")) return;
        res = await donorService.deleteDonor(donorIdNum);
      }

      if (res?.success) {
        toast.success(res.message || "সফল হয়েছে");
        if (action === "delete") router.push("/admin/donors");
        else fetchAllData();
      }
    } catch (err) {
      toast.error("অ্যাকশন ব্যর্থ হয়েছে");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewOrphanDetails = async (orphanId: number) => {
    try {
      setLoadingDetails(true);
      setIsDetailModalOpen(true);
      const res = await donorProfileService.getOrphanDetails(orphanId);
      if (res.success) setSelectedOrphanDetails(res.data);
    } catch (err) {
      toast.error("বিস্তারিত তথ্য পাওয়া যায়নি");
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Master Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      
      {/* --- Floating Admin Header --- */}
      <div className="bg-[#264653] text-white p-6 sticky top-0 z-50 shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 group text-white/80 hover:text-white transition-all">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to List</span>
          </button>
          
          <div className="flex flex-wrap gap-3">
            {donor?.donorStatus === 'PENDING' && (
              <>
                <button disabled={actionLoading} onClick={() => handleAdminAction('approve')} className="px-6 py-2.5 bg-[#2A9D8F] text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:shadow-lg transition-all">
                  <CheckCircle size={14}/> Approve
                </button>
                <button disabled={actionLoading} onClick={() => handleAdminAction('reject')} className="px-6 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:shadow-lg transition-all">
                  <XCircle size={14}/> Reject
                </button>
              </>
            )}
            <button disabled={actionLoading} onClick={() => handleAdminAction('toggle')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all shadow-md ${donor?.isActive ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'}`}>
               {donor?.isActive ? <ShieldAlert size={14}/> : <ShieldCheck size={14}/>} 
               {donor?.isActive ? 'Suspend' : 'Activate'}
            </button>
            <button disabled={actionLoading} onClick={() => handleAdminAction('delete')} className="p-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all shadow-md">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* --- Header Profile Card --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative group shrink-0">
              <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-50">
                <img src={getImageUrl(donor?.donorDpUrl)} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-2 -right-2 p-2.5 rounded-2xl shadow-xl ${donor?.isActive ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                {donor?.isActive ? <ShieldCheck size={20}/> : <ShieldAlert size={20}/>}
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${donor?.donorStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{donor?.donorStatus}</span>
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full uppercase tracking-widest">{donor?.donorType}</span>
              </div>
              <h1 className="text-4xl font-black text-[#264653] mb-4 uppercase leading-tight">{donor?.donorName}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 font-bold">
                <span className="flex items-center gap-2"><Mail size={16} className="text-[#2A9D8F]" /> {donor?.donorEmail}</span>
                <span className="flex items-center gap-2"><Phone size={16} className="text-[#2A9D8F]" /> {donor?.donorContact}</span>
              </div>
            </div>

            <div className="flex md:flex-col gap-3">
               <div className="text-center p-8 bg-[#264653] text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2 relative z-10">Total Impact</p>
                  <p className="text-4xl font-black relative z-10">৳{total}</p>
                  <Banknote className="absolute -bottom-4 -right-4 text-white/5 rotate-12" size={120} />
               </div>
            </div>
          </div>
        </motion.div>

        {/* --- Navigation Tabs --- */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={18}/>} label="Full Profile" />
          <TabButton active={activeTab === "orphans"} onClick={() => setActiveTab("orphans")} icon={<Users size={18}/>} label={`Connected (${connections.length})`} />
          <TabButton active={activeTab === "donations"} onClick={() => setActiveTab("donations")} icon={<History size={18}/>} label={`Donations (${donations.length})`} />
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && <ProfileView key="profile" donorData={donor} />}
              {activeTab === "orphans" && <OrphansView 
                key="orphans" 
                connections={connections} 
                getImageUrl={getImageUrl} 
                onViewDetails={handleViewOrphanDetails}
              />}
              {activeTab === "donations" && <DonationsView key="donations" donations={donations} />}
            </AnimatePresence>
          </div>

          {/* <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-32">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <ShieldCheck size={16} className="text-[#2A9D8F]" /> System Summary
               </h4>
               <div className="space-y-6">
                 <SummaryItem label="Donation Frequency" value={donations.length} color="text-emerald-600" />
                 <SummaryItem label="Avg. Support" value={`৳${donations.length > 0 ? (totalImpact / donations.length).toFixed(0) : 0}`} color="text-blue-600" />
                 <SummaryItem label="Registration" value={new Date(donor?.createdAt).toLocaleDateString('bn-BD')} color="text-gray-600" />
               </div>
            </div>
          </div> */}
          <div className="space-y-6">
  <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-32">
    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
      <ShieldCheck size={16} className="text-[#2A9D8F]" /> System Summary
    </h4>
    <div className="space-y-6">
      {/* ১. ডোনার মোট কতবার ডোনেশন দিয়েছেন (সব স্ট্যাটাস মিলে) */}
      <SummaryItem 
        label="Donation Frequency" 
        value={`${donations.length} Times`} 
        color="text-emerald-600" 
      />
      
      {/* ২. শুধুমাত্র ভেরিফাইড (APPROVED) ডোনেশনগুলোর মোট অংক */}
      <SummaryItem 
        label="Total Verified Amount" 
        value={`৳${total}`} 
        color="text-blue-600" 
      />
      
      <SummaryItem 
        label="Registration" 
        value={donor?.createdAt ? new Date(donor.createdAt).toLocaleDateString('bn-BD') : "---"} 
        color="text-gray-600" 
      />
    </div>
  </div>
</div>
        </div>
      </div>

      {/* --- Orphan Details Modal --- */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-[#264653]/95 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] shadow-2xl"
            >
              {loadingDetails ? (
                <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#2A9D8F]" size={40} /></div>
              ) : selectedOrphanDetails && (
                <div className="p-10 md:p-14">
                  <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-10 right-10 p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <XCircle size={24} />
                  </button>

                  <div className="flex flex-col md:flex-row gap-10 mb-12 items-center md:items-start">
                    <img src={getImageUrl(selectedOrphanDetails.orphanDpUrl)} className="w-44 h-52 rounded-[3rem] object-cover shadow-2xl" alt="" />
                    <div className="text-center md:text-left">
                      <h2 className="text-4xl font-black text-[#264653] mb-4">{selectedOrphanDetails.orphanName}</h2>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                        <Badge label={`${selectedOrphanDetails.orphanAge} Yrs`} color="bg-emerald-50 text-emerald-600" />
                        <Badge label={selectedOrphanDetails.orphanEducationLevel} color="bg-purple-50 text-purple-600" />
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 font-bold justify-center md:justify-start">
                        <MapPin size={18} className="text-[#2A9D8F]" /> {selectedOrphanDetails.orphanAddress}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <DetailSection icon={<Users size={18}/>} title="Family History">
                      <DetailItem label="Father" value={selectedOrphanDetails.orphanFatherName} />
                      <DetailItem label="Guardian" value={selectedOrphanDetails.guardianName} />
                    </DetailSection>

                    <DetailSection icon={<School size={18}/>} title="Educational Info">
                      <DetailItem label="Institution" value={selectedOrphanDetails.orphanEducationInstitute} />
                      <DetailItem label="Class" value={selectedOrphanDetails.orphanClassGrade} />
                    </DetailSection>
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

// --- View Sub-Components ---

function ProfileView({ donorData }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-[#264653] mb-8 flex items-center gap-3">
            <User size={24} className="text-[#2A9D8F]" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <InfoItem label="Address" value={donorData?.donorAddress} />
          <InfoItem label="Preferred Support" value={donorData?.preferredSupportType} />
          <InfoItem label="Donor Message" value={donorData?.donorMessage} />
          <InfoItem label="Registered On" value={new Date(donorData?.createdAt).toLocaleString('bn-BD')} />
        </div>
      </div>
      
      {donorData?.donorType === "ORGANIZATION" && (
        <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
          <h3 className="text-xl font-black text-[#264653] mb-8 flex items-center gap-3">
              <Building2 size={24} className="text-[#2A9D8F]" /> Organization Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <InfoItem label="Name" value={donorData?.organizationName} />
            <InfoItem label="Registration No" value={donorData?.organizationRegistrationNo} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function OrphansView({ connections, getImageUrl }: any) {
  // Status sorting logic: Active > Pending > Disconnected/Others
  const sortedConnections = [...connections].sort((a, b) => {
    const statusOrder: any = { ACTIVE: 1, PENDING: 2, DISCONNECTED: 3 };
    return (statusOrder[a.connectionStatus] || 4) - (statusOrder[b.connectionStatus] || 4);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-6"
    >
      {sortedConnections.length > 0 ? sortedConnections.map((c: any) => (
        <div 
          key={c.connectionId} 
          className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all border-l-4"
          style={{ 
            borderLeftColor: c.connectionStatus === 'ACTIVE' ? '#2A9D8F' : 
                             c.connectionStatus === 'DISCONNECTED' ? '#EF4444' : '#F59E0B' 
          }}
        >
          <div className="p-6 md:p-8">
            {/* --- Top Header: Identity & Status --- */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img 
                    src={getImageUrl(c.orphanDpUrl)} 
                    className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-gray-50 shadow-sm" 
                    alt={c.orphanName} 
                  />
                  <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white shadow-sm border ${
                    c.connectionStatus === 'ACTIVE' ? 'text-emerald-500 border-emerald-100' : 'text-gray-400 border-gray-100'
                  }`}>
                    {c.connectionStatus === 'ACTIVE' ? <CheckCircle size={14} /> : <History size={14} />}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#264653] tracking-tight leading-none mb-1">
                    {c.orphanName}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest bg-[#2A9D8F]/5 px-2 py-0.5 rounded">
                      ID: {c.orphanId}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Age: {c.orphanAge} Yrs
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest mb-2 border shadow-sm ${
                  c.connectionStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  c.connectionStatus === 'DISCONNECTED' ? 'bg-red-50 text-red-600 border-red-100' : 
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {c.connectionStatus}
                </span>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                  Record ID: #{c.connectionId}
                </p>
              </div>
            </div>

            {/* --- Middle: Data Grid (Timeline) --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 bg-gray-50/30 p-5 rounded-[2rem] border border-gray-50">
              <TimelineData 
                icon={<Calendar size={14} />} 
                label="Request Sent" 
                value={new Date(c.requestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
              />
              
              {c.approvalDate ? (
                <TimelineData 
                  icon={<ShieldCheck size={14} />} 
                  label="Admin Approval" 
                  value={new Date(c.approvalDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                />
              ) : (
                <TimelineData 
                  icon={<Loader2 size={14} className="animate-spin" />} 
                  label="Admin Approval" 
                  value="Awaiting Action" 
                  color="text-amber-500"
                />
              )}

              {c.connectionStatus === 'DISCONNECTED' ? (
                <TimelineData 
                  icon={<XCircle size={14} />} 
                  label="Disconnected On" 
                  color="text-red-500"
                  value={c.disconnectDate ? new Date(c.disconnectDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'} 
                />
              ) : (
                <TimelineData 
                  icon={<Heart size={14} />} 
                  label="Relationship" 
                  value="Ongoing Support" 
                  color="text-emerald-600"
                />
              )}
            </div>

            {/* --- Bottom: Content Areas (Messages) --- */}
            <div className="space-y-5">
              {/* Request Message */}
              <div className="relative group/msg">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-2">Donor's Message</p>
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-inner min-h-[60px] flex items-center">
                  <p className="text-sm text-[#264653] font-medium leading-relaxed italic">
                    "{c.requestMessage || "No special message provided by donor."}"
                  </p>
                </div>
              </div>

              {/* Disconnect Reason (Only for Disconnected) */}
              {c.connectionStatus === 'DISCONNECTED' && c.disconnectReason && (
                <div className="relative">
                  <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-2 ml-2">Closing Reason</p>
                  <div className="bg-red-50/50 rounded-3xl p-5 border border-red-100 shadow-sm">
                    <p className="text-sm text-red-700 font-bold leading-relaxed">
                      {c.disconnectReason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )) : (
        <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <History className="mx-auto text-gray-200 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em]">No valid history records</p>
        </div>
      )}
    </motion.div>
  );
}

// Sub-component for clean typography
function TimelineData({ icon, label, value, color = "text-[#264653]" }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 p-2 bg-white rounded-xl text-gray-400 shadow-sm border border-gray-50">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1.5">{label}</span>
        <span className={`text-sm font-black tracking-tight ${color}`}>{value}</span>
      </div>
    </div>
  );
}
// Helper component for cleaner typography in the grid
// function TimelineData({ icon, label, value, color = "text-[#264653]" }: any) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-1 p-1.5 bg-gray-50 rounded-lg text-gray-400">
//         {icon}
//       </div>
//       <div>
//         <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">{label}</p>
//         <p className={`text-sm font-black ${color}`}>{value}</p>
//       </div>
//     </div>
//   );
// }
function DonationsView({ donations }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      {donations.length > 0 ? donations.map((d: any) => (
        <div key={d.donationId} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:border-[#2A9D8F] transition-all">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex gap-6 items-center">
              <div className="h-20 w-20 bg-[#264653] text-white rounded-3xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-[8px] font-black opacity-60 uppercase">Donation</span>
                <span className="text-lg font-black">#{d.donationId}</span>
              </div>
              <div>
                <h4 className="text-3xl font-black text-[#264653]">৳{d.donationAmount}</h4>
                <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest flex items-center gap-1 mt-1">
                  <Calendar size={12}/> {new Date(d.donationDate).toLocaleDateString('bn-BD')}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${d.donationStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {d.donationStatus}
              </span>
              <p className="text-[11px] font-mono text-gray-400 mt-2 flex items-center gap-1"><Hash size={12}/> {d.transactionId || 'N/A'}</p>
            </div>
          </div>
        </div>
      )) : (
        <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-gray-400 font-bold uppercase text-xs">No Donation Records Found</div>
      )}
    </motion.div>
  );
}

// --- Reusable Atomic Components ---

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-8 py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? "bg-[#264653] text-white shadow-xl" : "bg-white text-gray-400 border border-gray-100"}`}>
      {icon} {label}
    </button>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-sm font-bold text-[#264653]">{value || "Not Provided"}</p>
    </div>
  );
}

function SummaryItem({ label, value, color }: { label: string, value: any, color: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black text-gray-400 uppercase">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}

function Badge({ label, color }: { label: string, color: string }) {
  return <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</span>;
}

function DetailSection({ icon, title, children }: any) {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-black text-[#264653] uppercase tracking-widest border-b pb-3 flex items-center gap-3">
        <span className="p-2 bg-[#2A9D8F]/10 rounded-xl text-[#2A9D8F]">{icon}</span> {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black text-gray-400 uppercase">{label}</span>
      <span className="text-sm font-bold text-[#264653]">{value || "N/A"}</span>
    </div>
  );
}