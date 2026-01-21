"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/app/lib/api/axios";
import { 
  Loader2, ArrowLeft, Phone, MapPin, School, Heart, 
  User, ShieldCheck, Sparkles, GraduationCap, 
  FileText, Calendar, Baby, Users 
} from "lucide-react";

export default function OrphanDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [orphan, setOrphan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/admin/orphans/${id}`);
        setOrphan(res.data.data);
      } catch (error) {
        console.error("Error fetching details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#2A9D8F] mb-4" size={48} />
      <p className="text-[#264653] font-black uppercase tracking-widest text-xs">তথ্য লোড হচ্ছে...</p>
    </div>
  );

  if (!orphan) return <div className="text-center py-20 font-bold text-[#264653]">তথ্য পাওয়া যায়নি।</div>;

  const InfoRow = ({ label, value, icon: Icon, color = "text-[#2A9D8F]" }: any) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors">
      <div className={`p-2 rounded-xl bg-white shadow-sm ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 mb-0.5">{label}</p>
        <p className="font-bold text-[#264653] text-sm md:text-base leading-tight">{value || "প্রদান করা হয়নি"}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Navigation & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 px-5 py-3 bg-white rounded-2xl text-[#264653] font-black text-sm shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> ফিরে যান
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Status</p>
            <p className={`font-black uppercase tracking-tighter ${orphan.orphanStatus === 'APPROVED' ? 'text-[#2A9D8F]' : 'text-amber-500'}`}>
              {orphan.orphanStatus}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${orphan.orphanStatus === 'APPROVED' ? 'bg-[#2A9D8F] shadow-[#2A9D8F]/20' : 'bg-amber-500 shadow-amber-500/20'} text-white`}>
            {orphan.orphanStatus === 'APPROVED' ? <ShieldCheck size={24} /> : <Sparkles size={24} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: The Hero Card */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[3.5rem] shadow-xl shadow-[#264653]/5 border border-white text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ECF4E8] rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="relative inline-block mb-6">
                <img 
                  src={orphan.orphanDpUrl || "/default-avatar.png"} 
                  className="w-48 h-48 rounded-[3rem] object-cover ring-8 ring-[#ECF4E8] shadow-2xl mx-auto" 
                  alt={orphan.orphanName} 
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-50 text-[#2A9D8F]">
                  <Heart size={24} fill="currentColor" />
                </div>
              </div>

              <h2 className="text-3xl font-black text-[#264653] mb-2">{orphan.orphanName}</h2>
              <div className="flex justify-center gap-2 mb-6">
                <span className="px-4 py-1.5 bg-[#ECF4E8] text-[#264653] text-[10px] font-black rounded-full uppercase tracking-widest">
                  {orphan.orphanGender === 'MALE' ? 'ছেলে' : 'মেয়ে'}
                </span>
                <span className="px-4 py-1.5 bg-[#264653] text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  {orphan.orphanAge} বছর
                </span>
              </div>
            </div>
          </motion.div>

          <div className="bg-[#264653] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 p-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
              <Users size={80} />
            </div>
            <h3 className="font-black text-lg mb-6 flex items-center gap-3">
              <ShieldCheck className="text-[#2A9D8F]" /> তথ্যদাতা / Reference
            </h3>
            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">নাম</p>
                <p className="font-bold">{orphan.orphanViaName || "সরাসরি আবেদন"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">যোগাযোগ</p>
                <p className="font-bold">{orphan.orphanViaContact || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">সম্পর্ক</p>
                <p className="font-bold">{orphan.orphanViaRelation || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Details Grid */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Family Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-sm border border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#ECF4E8] rounded-2xl flex items-center justify-center text-[#264653]">
                <Baby size={24} />
              </div>
              <h3 className="text-xl font-black text-[#264653]">পারিবারিক ও ব্যক্তিগত তথ্য</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="পিতার নাম" value={orphan.orphanFatherName} icon={User} />
              <InfoRow label="মাতার নাম" value={orphan.orphanMotherName} icon={User} />
              <InfoRow label="অভিভাবকের নাম" value={orphan.guardianName} icon={ShieldCheck} />
              <InfoRow label="মোবাইল নম্বর" value={orphan.guardianMobile} icon={Phone} />
              <div className="md:col-span-2">
                <InfoRow label="বর্তমান ঠিকানা" value={orphan.orphanAddress} icon={MapPin} />
              </div>
            </div>
          </motion.div>

          {/* Education & Support Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-sm border border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center text-[#2A9D8F]">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-black text-[#264653]">শিক্ষা ও বর্তমান পরিস্থিতি</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <InfoRow label="বর্তমান প্রতিষ্ঠান" value={orphan.currentSchoolName || orphan.orphanEducationInstitute} icon={School} />
              <InfoRow label="শ্রেণি/লেভেল" value={orphan.orphanClassGrade || orphan.orphanEducationLevel} icon={Calendar} />
              <InfoRow label="সহায়তার ধরণ" value={orphan.typeOfSupport} icon={Sparkles} />
              <InfoRow label="স্বাস্থ্যের অবস্থা" value={orphan.orphanHealthCondition || "স্বাভাবিক"} icon={Heart} color="text-rose-500" />
            </div>
            
            <div className="bg-[#ECF4E8]/50 p-6 rounded-[2rem] border border-[#2A9D8F]/10">
              <p className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText size={14} /> বর্তমান পরিস্থিতি (Current Situation)
              </p>
              <p className="text-[#264653] font-medium leading-relaxed italic text-sm md:text-base">
                "{orphan.currentSituation || "কোন বিবরণ প্রদান করা হয়নি।"}"
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}