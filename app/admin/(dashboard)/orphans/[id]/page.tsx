"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, MapPin, School, FileText, Shield, 
  User, Link as LinkIcon, Heart, CheckCircle, XCircle, Trash2, AlertTriangle, 
  UserCheck, Calendar, Phone, Activity, Globe, Info, Clock, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import orphanAdminService from "@/app/lib/services/orphanAdminService";
import toast from "react-hot-toast";

export default function OrphanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [orphan, setOrphan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    type: "APPROVE" | "REJECT" | "DELETE" | null;
  }>({ show: false, type: null });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await orphanAdminService.getById(Number(params.id));
      setOrphan(res.data);
    } catch (error) {
      toast.error("তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  const handleAction = async () => {
    try {
      setActionLoading(true);
      const id = Number(params.id);

      if (confirmModal.type === "APPROVE") {
        await orphanAdminService.approve(id);
        toast.success("সফলভাবে অ্যাপ্রুভ করা হয়েছে");
      } else if (confirmModal.type === "REJECT") {
        await orphanAdminService.reject(id);
        toast.success("প্রোফাইলটি রিজেক্ট করা হয়েছে");
      } else if (confirmModal.type === "DELETE") {
        await orphanAdminService.delete(id);
        toast.success("সফলভাবে ডিলিট করা হয়েছে");
        router.push("/admin/orphans"); 
        return;
      }

      await fetchDetails();
      setConfirmModal({ show: false, type: null });
    } catch (error) {
      toast.error("প্রক্রিয়াটি সম্পন্ন করা যায়নি");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A9D8F]"></div>
      <p className="text-gray-400 font-bold">প্রোফাইল লোড হচ্ছে...</p>
    </div>
  );

  if (!orphan) return <div className="min-h-screen flex items-center justify-center font-bold">ডেটা পাওয়া যায়নি!</div>;

  const getImageUrl = (url: string) => {
    if (!url || url === "string") return "https://api.insaanbd.org/api/public/files/default-avatar.png";
    return url.startsWith("http") ? url : `https://api.insaanbd.org/api/public/files/${url}`;
  };

// ১. তারিখ ফরম্যাট করার জন্য উন্নত ফাংশন
const formatDate = (dateString: string) => {
  // যদি কি (key) না থাকে, খালি থাকে বা "string" লেখা থাকে
  if (!dateString || dateString === "string" || dateString.trim() === "") {
    return "প্রদান করা হয়নি";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "ভুল ফরম্যাট";
    
    return date.toLocaleDateString('bn-BD', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return "N/A";
  }
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 pt-28">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-3 text-gray-500 hover:text-[#264653] bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
               <h2 className="text-xl font-black text-[#264653]">অরফান আইডি: #{orphan.orphanId}</h2>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">System Record Details</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {orphan.orphanStatus !== "APPROVED" && (
              <button onClick={() => setConfirmModal({ show: true, type: "APPROVE" })} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all"><CheckCircle size={18} /> অ্যাপ্রুভ</button>
            )}
            {orphan.orphanStatus !== "REJECTED" && (
              <button onClick={() => setConfirmModal({ show: true, type: "REJECT" })} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-red-500 border border-red-200 px-6 py-2.5 rounded-xl font-bold hover:bg-red-50 transition-all"><XCircle size={18} /> রিজেক্ট</button>
            )}
            <button onClick={() => setConfirmModal({ show: true, type: "DELETE" })} className="p-2.5 bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
          </div>
        </div>

        {/* Main Profile Layout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#264653] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 relative">
            <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-48 h-48 rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                <img src={getImageUrl(orphan.orphanDpUrl)} className="w-full h-full object-cover" alt={orphan.orphanName} />
              </div>
              <div className={`absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-xl ${orphan.orphanStatus === 'APPROVED' ? 'bg-emerald-500' : orphan.orphanStatus === 'REJECTED' ? 'bg-red-500' : 'bg-amber-500'}`}>
                {orphan.orphanStatus === 'APPROVED' ? <CheckCircle size={24} /> : <XCircle size={24} />}
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${orphan.orphanStatus === 'APPROVED' ? 'bg-emerald-400' : 'bg-amber-400'}`}>{orphan.orphanStatus}</span>
                <span className="px-4 py-1 rounded-full bg-white/10 text-[10px] font-black tracking-widest uppercase border border-white/20 flex items-center gap-1"><Globe size={10}/> {orphan.orphanSource}</span>
                {orphan.isConnected && (
                  <span className="px-4 py-1 rounded-full bg-blue-500 text-[10px] font-black tracking-widest uppercase flex items-center gap-1"><Heart size={10} fill="white"/> Connected</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black">{orphan.orphanName}</h1>
              <p className="flex items-center justify-center md:justify-start gap-2 text-white/70 font-bold"><MapPin size={20} className="text-[#2A9D8F]" /> {orphan.orphanAddress}</p>
            </div>
          </div>

          {/* Detailed Content Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Column 1: Personal & Education */}
            <div className="lg:col-span-2 space-y-10">
              
              <section>
                <SectionTitle icon={<User size={18}/>} title="ব্যক্তিগত ও যোগাযোগ তথ্য" color="text-emerald-600" bgColor="bg-emerald-50" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-[2.5rem]">
                  <InfoItem label="লিঙ্গ" value={orphan.orphanGender} />
                  <InfoItem label="বয়স" value={`${orphan.orphanAge} বছর`} />
                  <InfoItem label="জন্ম তারিখ" value={formatDate(orphan.orphanDob)} />
                  <InfoItem label="পিতার নাম" value={orphan.orphanFatherName} />
                  <InfoItem label="মাতার নাম" value={orphan.orphanMotherName} />
                  <InfoItem label="যোগাযোগ" value={orphan.orphanContact} />
                </div>
              </section>

              <section>
                <SectionTitle icon={<School size={18}/>} title="শিক্ষা ও প্রতিষ্ঠান" color="text-blue-600" bgColor="bg-blue-50" />
                <div className="bg-gray-50 p-6 rounded-[2.5rem] space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="বর্তমান প্রতিষ্ঠান" value={orphan.currentSchoolName} />
                    <InfoItem label="পূর্বের প্রতিষ্ঠান" value={orphan.previousSchoolName} />
                    {/* <InfoItem label="শিক্ষার স্তর" value={orphan.orphanEducationLevel} /> */}
                    {/* <InfoItem label="ইনস্টিটিউট টাইপ" value={orphan.orphanEducationInstitute} /> */}
                    <InfoItem label="শ্রেণী/গ্রেড" value={orphan.orphanClassGrade} />
                    <InfoItem label="প্রতিষ্ঠানের ঠিকানা" value={orphan.orphanEducationInstituteAddress} />
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle icon={<Activity size={18}/>} title="বর্তমান অবস্থা ও চাহিদা" color="text-rose-600" bgColor="bg-rose-50" />
                <div className="bg-gray-50 p-6 rounded-[2.5rem] space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoItem label="স্বাস্থ্যগত অবস্থা" value={orphan.orphanHealthCondition} />
                      <InfoItem label="প্রয়োজনীয় সহযোগিতার ধরন" value={orphan.typeOfSupport} />
                   </div>
                   <div className="p-4 bg-white border border-gray-100 rounded-2xl italic text-gray-600 text-sm leading-relaxed">
                      " {orphan.currentSituation || "পরিস্থিতির বিস্তারিত তথ্য নেই"} "
                   </div>
                </div>
              </section>
            </div>

            {/* Column 2: Guardian, System & Files */}
            <div className="space-y-10">
              <section>
                <SectionTitle icon={<Shield size={18}/>} title="অভিভাবক ও ভলান্টিয়ার" color="text-purple-600" bgColor="bg-purple-50" />
                <div className="bg-gray-50 p-6 rounded-[2.5rem] space-y-4">
                  <InfoItem label="নাম" value={orphan.guardianName} />
                  <InfoItem label="সম্পর্ক" value={orphan.guardianRelationship} />
                  <InfoItem label="মোবাইল" value={orphan.guardianMobile} />
                  <InfoItem label="এনআইডি" value={orphan.guardianNid} />
                  <hr className="border-gray-200" />
                  {orphan.addedByVolunteerId > 0 ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><UserCheck size={20}/></div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase">Volunteer Source</p>
                        <p className="text-sm font-bold text-[#264653]">{orphan.addedByVolunteerName}</p>
                      </div>
                    </div>
                  ) : <p className="text-xs text-gray-400">সরাসরি ওয়েবসাইট থেকে যুক্ত</p>}
                </div>
              </section>

              <section>
                <SectionTitle icon={<LinkIcon size={18}/>} title="রেফারেন্স তথ্য" color="text-teal-600" bgColor="bg-teal-50" />
                <div className="bg-gray-50 p-6 rounded-[2.5rem] space-y-4">
                  <InfoItem label="রেফারেন্স নাম" value={orphan.orphanViaName} />
                  <InfoItem label="রেফারেন্স যোগাযোগ" value={orphan.orphanViaContact} />
                  <InfoItem label="সম্পর্ক" value={orphan.orphanViaRelation} />
                  <InfoItem label="ঠিকানা" value={orphan.orphanViaAddress} />
                </div>
              </section>

              {orphan.isConnected && (
                <section>
                  <SectionTitle icon={<Heart size={18}/>} title="দাতা (Donor)" color="text-pink-600" bgColor="bg-pink-50" />
                  <div className="bg-pink-50/50 border border-pink-100 p-6 rounded-[2.5rem]">
                    <p className="text-[10px] font-black text-pink-400 uppercase mb-1">Current Benefactor</p>
                    <h4 className="font-bold text-[#264653]">{orphan.currentDonorName}</h4>
                    <p className="text-xs text-gray-400">Donor ID: #{orphan.currentDonorId}</p>
                  </div>
                </section>
              )}

              <section>
                <SectionTitle icon={<FileText size={18}/>} title="সংযুক্ত ডকুমেন্ট" color="text-orange-600" bgColor="bg-orange-50" />
                <div className="flex flex-col gap-3">
                  <DocumentLink label="জন্ম নিবন্ধন" url={orphan.birthCertificateUrl} />
                  <DocumentLink label="মৃত্যু সনদ" url={orphan.fatherDeathCertificateUrl} />
                </div>
              </section>

              {/* Meta Stats Section */}
              <section className="bg-[#264653]/5 p-6 rounded-[2.5rem] border border-[#264653]/10 space-y-4">
                <div className="flex items-center gap-2 text-[#264653] font-black text-xs uppercase"><Clock size={14}/> System Meta</div>
                <div className="grid grid-cols-1 gap-3">
                   <div className="flex justify-between text-[11px] font-bold"><span className="text-gray-400">Created At:</span> <span className="text-[#264653]">{formatDate(orphan.createdAt)}</span></div>
                   <div className="flex justify-between text-[11px] font-bold"><span className="text-gray-400">Last Update:</span> <span className="text-[#264653]">{formatDate(orphan.updatedAt)}</span></div>
                </div>
              </section>

            </div>
          </div>
        </motion.div>

        {/* Modal Logic remains same for brevity but with UI enhancement */}
        <AnimatePresence>
          {confirmModal.show && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmModal({ show: false, type: null })} className="absolute inset-0 bg-[#264653]/60 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-md p-8 rounded-[3rem] shadow-2xl text-center">
                <div className="mb-4 flex justify-center">{confirmModal.type === "APPROVE" ? <CheckCircle className="text-emerald-500" size={54} /> : confirmModal.type === "REJECT" ? <AlertTriangle className="text-amber-500" size={54} /> : <Trash2 className="text-red-500" size={54} />}</div>
                <h2 className="text-2xl font-black text-[#264653] mb-4">নিশ্চিত করুন</h2>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmModal({ show: false, type: null })} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold">বাতিল</button>
                  <button onClick={handleAction} className={`flex-1 py-4 text-white rounded-2xl font-bold ${confirmModal.type === "APPROVE" ? "bg-emerald-500" : confirmModal.type === "REJECT" ? "bg-amber-500" : "bg-red-500"}`}>
                    {actionLoading ? "লোডিং..." : "হ্যাঁ, নিশ্চিত"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- হেল্পার কম্পোনেন্টসমূহ ---

function SectionTitle({ icon, title, color, bgColor }: any) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2.5 ${bgColor} ${color} rounded-xl shadow-sm`}>{icon}</div>
      <h3 className="text-lg font-black text-[#264653] tracking-tight">{title}</h3>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: any }) {
  // যদি ভ্যালু null, undefined, অথবা "string" (টেক্সট) হয়
  const isEmpty = !value || value === "string" || value === "";

  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</p>
      <p className={`font-bold text-[15px] leading-tight break-words ${isEmpty ? 'text-gray-300 italic' : 'text-[#264653]'}`}>
        {isEmpty ? "তথ্য নেই" : String(value)} 
      </p>
    </div>
  );
}
function DocumentLink({ label, url }: { label: string; url: string }) {
  const getFullUrl = (u: string) => {
    if (!u || u === "string") return null;
    return u.startsWith("http") ? u : `https://api.insaanbd.org/api/public/files/${u}`;
  };

  const fileUrl = getFullUrl(url);

  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${fileUrl ? 'bg-white border-gray-100 hover:border-[#2A9D8F] cursor-pointer' : 'bg-gray-50 border-gray-100 opacity-60 pointer-events-none'}`}>
      <div className="flex items-center gap-3">
        <FileText size={18} className={fileUrl ? "text-[#2A9D8F]" : "text-gray-300"} />
        <span className="font-bold text-[#264653] text-sm">{label}</span>
      </div>
      {fileUrl ? (
        <a href={fileUrl} target="_blank" className="p-2 bg-gray-50 text-[#264653] rounded-lg hover:bg-[#264653] hover:text-white transition-colors">
          <ExternalLink size={14} />
        </a>
      ) : <span className="text-[10px] font-bold text-gray-300 uppercase">Not Provided</span>}
    </div>
  );
}