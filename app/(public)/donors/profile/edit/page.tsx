"use client";

import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, Save, User, Phone, MapPin, 
  KeyRound, ShieldCheck, Loader2, Building2, Hash, MessageSquare, Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import donorProfileService from "@/app/lib/services/donorProfileService";

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    donorName: "",
    donorContact: "",
    donorAddress: "",
    donorMessage: "",
    preferredSupportType: "",
    organizationName: "",
    organizationRegistrationNo: "",
    donorDpUrl: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await donorProfileService.getProfile();
        if (res.success) {
          setProfileForm({
            donorName: res.data.donorName || "",
            donorContact: res.data.donorContact || "",
            donorAddress: res.data.donorAddress || "",
            donorMessage: res.data.donorMessage || "",
            preferredSupportType: res.data.preferredSupportType || "",
            organizationName: res.data.organizationName || "",
            organizationRegistrationNo: res.data.organizationRegistrationNo || "",
            donorDpUrl: res.data.donorDpUrl || ""
          });
        }
      } catch (err) {
        toast.error("তথ্য আনতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await donorProfileService.updateProfile(profileForm);
      if (res.success) {
        toast.success("প্রোফাইল আপডেট হয়েছে!");
        router.push("/donors/profile");
      }
    } catch (err) {
      toast.error("আপডেট করা সম্ভব হয়নি");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#2A9D8F] mx-auto mb-2" size={40} />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 font-bold hover:text-[#264653] transition-all mb-2 text-sm">
              <ArrowLeft size={18} /> ফিরে যান
            </button>
            <h1 className="text-4xl font-black text-[#264653] tracking-tighter">সেটিংস <span className="text-[#2A9D8F]">এডিট</span></h1>
          </div>
          <p className="text-gray-400 text-sm font-medium max-w-[300px]">আপনার ব্যক্তিগত এবং প্রতিষ্ঠানের তথ্য আপডেট রাখুন যাতে আমরা আপনার সাথে সহজে যোগাযোগ করতে পারি।</p>
        </div>

        <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: General Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-100 border border-gray-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
               
               <h3 className="text-xl font-black text-[#264653] mb-8 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center text-[#2A9D8F]"><User size={18}/></div>
                 সাধারণ প্রোফাইল
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditInput label="আপনার পূর্ণ নাম" icon={<User size={18}/>} value={profileForm.donorName} onChange={(v:any) => setProfileForm({...profileForm, donorName: v})} />
                  <EditInput label="যোগাযোগ নম্বর" icon={<Phone size={18}/>} value={profileForm.donorContact} onChange={(v:any) => setProfileForm({...profileForm, donorContact: v})} />
                  <div className="md:col-span-2">
                    <EditInput label="ঠিকানা" icon={<MapPin size={18}/>} value={profileForm.donorAddress} onChange={(v:any) => setProfileForm({...profileForm, donorAddress: v})} />
                  </div>
                  <div className="md:col-span-2">
                    <EditInput label="সাপোর্ট টাইপ (উদাঃ Monthly, Food)" icon={<Briefcase size={18}/>} value={profileForm.preferredSupportType} onChange={(v:any) => setProfileForm({...profileForm, preferredSupportType: v})} />
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.1}} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-100 border border-gray-50">
               <h3 className="text-xl font-black text-[#264653] mb-8 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-[#E76F51]/10 flex items-center justify-center text-[#E76F51]"><MessageSquare size={18}/></div>
                 আপনার বার্তা
               </h3>
               <textarea 
                  className="w-full bg-gray-50 border-none rounded-3xl p-6 text-sm font-bold focus:ring-2 focus:ring-[#2A9D8F]/20 h-40 outline-none transition-all placeholder:text-gray-300"
                  placeholder="আপনার কোনো বিশেষ বার্তা থাকলে এখানে লিখুন..."
                  value={profileForm.donorMessage}
                  onChange={(e) => setProfileForm({...profileForm, donorMessage: e.target.value})}
               />
            </motion.div>
          </div>

          {/* Right: Organization Info & Save */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#264653] rounded-[2.5rem] p-8 shadow-2xl text-white">
               <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                 <Building2 size={20} className="text-[#2A9D8F]" /> প্রতিষ্ঠানের তথ্য
               </h3>
               <div className="space-y-5">
                  <OrgInput label="প্রতিষ্ঠানের নাম" value={profileForm.organizationName} onChange={(v:any) => setProfileForm({...profileForm, organizationName: v})} />
                  <OrgInput label="রেজিস্ট্রেশন নম্বর" value={profileForm.organizationRegistrationNo} onChange={(v:any) => setProfileForm({...profileForm, organizationRegistrationNo: v})} />
               </div>
               
               <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10 text-[11px] font-medium leading-relaxed opacity-70">
                 আপনি যদি কোনো প্রতিষ্ঠানের পক্ষ থেকে অনুদান প্রদান করেন, তবে উপরের তথ্যগুলো পূরণ করুন।
               </div>
            </motion.div>

            <button 
               type="submit" 
               disabled={saving}
               className="w-full py-6 bg-[#2A9D8F] text-white rounded-3xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#264653] transition-all shadow-xl shadow-[#2A9D8F]/20 disabled:opacity-50 group"
            >
               {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} className="group-hover:scale-110 transition-transform"/>}
               পরিবর্তন সেভ করুন
            </button>

            <button 
              type="button"
              onClick={() => router.push('/donors/profile/changepassword')}
              className="w-full py-4 bg-gray-100 text-gray-500 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all"
            >
              পাসওয়ার্ড পরিবর্তন করতে চান?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper Components
function EditInput({ label, value, icon, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">{label}</label>
      <div className="relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors">{icon}</span>
        <input 
          className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-[#264653] focus:ring-2 focus:ring-[#2A9D8F]/20 focus:bg-white transition-all outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function OrgInput({ label, value, onChange }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black opacity-40 uppercase tracking-widest ml-1">{label}</label>
      <input 
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white focus:ring-2 focus:ring-[#2A9D8F] outline-none transition-all placeholder:text-white/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}