"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import adminOrphanAdminService from "@/app/lib/services/orphanAdminService"; 
import {
  User, Heart, Camera, CheckCircle2, ShieldCheck, 
  ArrowRight, BookOpen, Package, Stethoscope, HomeIcon, 
  GraduationCap, Loader2, UploadCloud, Activity, ArrowLeft,
  Calendar, MapPin, Phone, Users,FileText 
} from "lucide-react";
import { useRouter } from "next/navigation";

const needOptions = [
  { id: "EDUCATION", label: "শিক্ষা", icon: BookOpen, color: "bg-blue-500" },
  { id: "FOOD", label: "খাদ্য", icon: Package, color: "bg-orange-500" },
  { id: "MEDICAL", label: "চিকিৎসা", icon: Stethoscope, color: "bg-rose-500" },
  { id: "SHELTER", label: "আবাসন", icon: HomeIcon, color: "bg-emerald-500" },
];

export default function AdminOrphanRegistration() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialFormState = {
    orphanName: "", orphanAge: 0, orphanGender: "MALE", orphanFatherName: "",
    orphanMotherName: "", orphanAddress: "", guardianName: "", guardianRelationship: "",
    guardianMobile: "", guardianNid: "", currentSchoolName: "", orphanClassGrade: "",
    previousSchoolName: "", typeOfSupport: "", currentSituation: "", orphanDpUrl: "",
    birthCertificateUrl: "", fatherDeathCertificateUrl: "", orphanDob: "", orphanContact: "",
    orphanViaName: "", orphanViaContact: "", orphanViaAddress: "", orphanViaRelation: "",
    orphanEducationInstitute: "", orphanEducationLevel: "", orphanEducationInstituteAddress: "",
    orphanHealthCondition: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [uploadingFiles, setUploadingFiles] = useState({ photo: false, birth: false, death: false });
  const [uploadedFiles, setUploadedFiles] = useState({ photo: null, birth: null, death: null });

  useEffect(() => { setMounted(true); }, []);

  const handleFileUpload = async (file: File, type: string) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("৫ এমবি-র বেশি ফাইল আপলোড করা যাবে না");

    setUploadingFiles(prev => ({ ...prev, [type]: true }));
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const response = await adminOrphanAdminService.uploadFile(uploadData);
      
      if (response.success) {
        const fileUrl = response.data.url;
        setUploadedFiles(prev => ({ ...prev, [type]: file.name }));
        const fieldMapping: any = { photo: 'orphanDpUrl', birth: 'birthCertificateUrl', death: 'fatherDeathCertificateUrl' };
        setFormData(prev => ({ ...prev, [fieldMapping[type]]: fileUrl }));
        toast.success(`${type === 'photo' ? 'ছবি' : 'ডকুমেন্ট'} আপলোড সফল!`);
      }
    } catch (error) {
      toast.error("আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploadingFiles(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.typeOfSupport) return toast.error("সহায়তার ধরণ নির্বাচন করুন");
    if (!formData.orphanDpUrl) return toast.error("শিশুর ছবি আপলোড করা বাধ্যতামূলক");

    setLoading(true);
    try {
      const response = await adminOrphanAdminService.create(formData);
      if (response) {
        toast.success("নতুন শিশুর নিবন্ধন সফল হয়েছে!", { duration: 5000, icon: '🎉' });
        router.push("/admin/orphans");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-5 py-4 bg-white border border-gray-100 focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 rounded-2xl outline-none transition-all placeholder:text-gray-300 font-medium text-[#264653] shadow-sm";
  const labelStyle = "block text-[11px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-[0.15em]";

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <Toaster position="top-right" />
      
      {/* Top Header Background */}
      <div className="h-64 bg-[#264653] w-full absolute top-0 left-0 -z-10 rounded-b-[4rem]" />

      <div className="max-w-5xl mx-auto pt-12 px-6">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-white/10 pb-10">
  <div className="space-y-4">
    {/* আধুনিক ব্যাজ ডিজাইন */}
    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>
      <span className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em]">
        System Secure
      </span>
    </div>

    {/* উন্নত টাইপোগ্রাফি */}
    <div>
      <h1 className="text-5xl md:text-6xl font-black text-black tracking-tight leading-none">
        শিশুর <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text ">নিবন্ধন</span>
      </h1>
      <p className="text-slate-400 font-medium mt-4 text-lg max-w-md leading-relaxed">
        নতুন অনাথ শিশুর তথ্য ডাটাবেসে অত্যন্ত সতর্কতার সাথে এন্ট্রি নিশ্চিত করুন।
      </p>
    </div>
  </div>

  {/* আল্ট্রা-মডার্ন ব্যাক বাটন */}
  <button 
    onClick={() => router.back()} 
    className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <ArrowLeft size={20} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" />
    <span className="text-white font-bold tracking-wide">ফিরে যান</span>
  </button>
</div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Section 1: Basic Info */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Users size={120} />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#2A9D8F]"><Heart size={28} fill="currentColor" /></div>
              <div>
                <h2 className="text-2xl font-black text-[#264653]">মৌলিক তথ্য</h2>
                <p className="text-xs text-gray-400 font-medium">শিশুর ব্যক্তিগত ও পারিবারিক তথ্য</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className={labelStyle}>শিশুর পুরো নাম *</label>
                <div className="relative">
                   <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                   <input required placeholder="যেমন: আব্দুল্লাহ আল মামুন" className={`${inputStyle} pl-14`} value={formData.orphanName} onChange={(e) => setFormData({...formData, orphanName: e.target.value})} />
                </div>
              </div>
              <div>
                <label className={labelStyle}>জন্ম তারিখ *</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input type="date" required className={`${inputStyle} pl-14`} value={formData.orphanDob} onChange={(e) => setFormData({...formData, orphanDob: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>বয়স *</label>
                  <input type="number" required placeholder="0" className={inputStyle} value={formData.orphanAge || ""} onChange={(e) => setFormData({...formData, orphanAge: Number(e.target.value)})} />
                </div>
                <div>
                  <label className={labelStyle}>লিঙ্গ *</label>
                  <select className={inputStyle} value={formData.orphanGender} onChange={(e) => setFormData({...formData, orphanGender: e.target.value})}>
                    <option value="MALE">ছেলে</option>
                    <option value="FEMALE">মেয়ে</option>
                  </select>
                </div>
              </div>
              <input placeholder="পিতার নাম (মৃত) *" className={inputStyle} value={formData.orphanFatherName} onChange={(e) => setFormData({...formData, orphanFatherName: e.target.value})} />
              <input placeholder="মাতার নাম *" className={inputStyle} value={formData.orphanMotherName} onChange={(e) => setFormData({...formData, orphanMotherName: e.target.value})} />
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input placeholder="পূর্ণ বর্তমান ঠিকানা *" className={`${inputStyle} pl-14`} value={formData.orphanAddress} onChange={(e) => setFormData({...formData, orphanAddress: e.target.value})} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Guardian & Education */}
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
              <h3 className="text-xl font-black mb-8 text-[#264653] flex items-center gap-3 underline decoration-[#2A9D8F] decoration-4 underline-offset-8">
                <ShieldCheck className="text-[#2A9D8F]" size={24} /> অভিভাবক
              </h3>
              <div className="space-y-5">
                <input placeholder="অভিভাবকের নাম" className={inputStyle} value={formData.guardianName} onChange={(e) => setFormData({...formData, guardianName: e.target.value})} />
                <input placeholder="শিশুর সাথে সম্পর্ক" className={inputStyle} value={formData.guardianRelationship} onChange={(e) => setFormData({...formData, guardianRelationship: e.target.value})} />
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input placeholder="মোবাইল নম্বর" className={`${inputStyle} pl-12`} value={formData.guardianMobile} onChange={(e) => setFormData({...formData, guardianMobile: e.target.value})} />
                </div>
                <input placeholder="এনআইডি নম্বর (অপশনাল)" className={inputStyle} value={formData.guardianNid} onChange={(e) => setFormData({...formData, guardianNid: e.target.value})} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
              <h3 className="text-xl font-black mb-8 text-[#264653] flex items-center gap-3 underline decoration-[#2A9D8F] decoration-4 underline-offset-8">
                <GraduationCap className="text-[#2A9D8F]" size={24} /> শিক্ষাগত তথ্য
              </h3>
              <div className="space-y-5">
                <input placeholder="বর্তমান প্রতিষ্ঠানের নাম" className={inputStyle} value={formData.currentSchoolName} onChange={(e) => setFormData({...formData, currentSchoolName: e.target.value})} />
                <input placeholder="বর্তমান শ্রেণী/গ্রেড" className={inputStyle} value={formData.orphanClassGrade} onChange={(e) => setFormData({...formData, orphanClassGrade: e.target.value})} />
                <input placeholder="শিক্ষা প্রতিষ্ঠানের ঠিকানা" className={inputStyle} value={formData.orphanEducationInstituteAddress} onChange={(e) => setFormData({...formData, orphanEducationInstituteAddress: e.target.value})} />
                <input placeholder="পূর্বের প্রতিষ্ঠানের নাম (যদি থাকে)" className={inputStyle} value={formData.previousSchoolName} onChange={(e) => setFormData({...formData, previousSchoolName: e.target.value})} />
              </div>
            </motion.div>
          </div>

          {/* Section 3: Support Type (The Dark Card) */}
          <section className="bg-[#264653] p-10 md:p-14 rounded-[4rem] shadow-2xl text-white relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2A9D8F]/20 rounded-full blur-[80px]" />
            <h2 className="text-3xl font-black mb-10 flex items-center gap-4">সহায়তার প্রয়োজনীয়তা</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {needOptions.map((opt) => (
                <button key={opt.id} type="button" 
                  onClick={() => setFormData({...formData, typeOfSupport: opt.id})}
                  className={`p-8 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all group ${formData.typeOfSupport === opt.id ? 'bg-white text-[#264653] scale-105 shadow-2xl ring-4 ring-[#2A9D8F]/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.typeOfSupport === opt.id ? opt.color + ' text-white' : 'bg-white/10 text-white'}`}>
                    <opt.icon size={28} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{opt.label}</span>
                </button>
              ))}
            </div>
            
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 block ml-2">বর্তমান পরিস্থিতি ও বিস্তারিত</label>
            <textarea rows={5} className="w-full bg-white/10 border border-white/10 rounded-[2rem] p-8 text-white outline-none focus:bg-white/15 focus:border-[#2A9D8F] transition-all" 
              placeholder="শিশুর বর্তমান অবস্থা এবং কেন সহায়তা প্রয়োজন তা বিস্তারিত লিখুন..." value={formData.currentSituation} onChange={(e) => setFormData({...formData, currentSituation: e.target.value})} />
          </section>

          {/* Section 4: Document Uploads */}
          <div className="bg-emerald-50/50 p-10 md:p-14 rounded-[4rem] border border-emerald-100 shadow-inner">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#264653] mb-2">প্রয়োজনীয় ডকুমেন্টস</h2>
              <p className="text-gray-500 font-medium italic text-sm">শিশুর সত্যতা নিশ্চিত করতে ডকুমেন্টগুলো প্রয়োজন</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { key: 'photo', label: 'শিশুর ছবি *', icon: Camera },
                { key: 'birth', label: 'জন্ম সনদ *', icon: FileText },
                { key: 'death', label: 'মৃত্যু সনদ *', icon: Activity }
              ].map((f) => (
                <label key={f.key} className="cursor-pointer group">
                  <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], f.key)} />
                  <div className={`h-56 rounded-[2.5rem] border-4 border-dashed flex flex-col items-center justify-center p-6 transition-all relative overflow-hidden ${uploadedFiles[f.key] ? 'bg-white border-emerald-500 shadow-xl' : 'bg-white/50 border-gray-200 hover:border-[#2A9D8F] hover:bg-white'}`}>
                    
                    {uploadingFiles[f.key] ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
                        <span className="text-[10px] font-black animate-pulse">Uploading...</span>
                      </div>
                    ) : uploadedFiles[f.key] ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-200"><CheckCircle2 size={32} /></div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase">Uploaded</span>
                        <span className="mt-2 text-[10px] font-medium text-gray-400 truncate w-32">{uploadedFiles[f.key]}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-[#2A9D8F]">
                        <f.icon size={44} strokeWidth={1.5} />
                        <span className="mt-4 text-[11px] font-black uppercase tracking-widest">{f.label}</span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <motion.button
              type="button"
              onClick={() => router.push("/admin/orphans")}
              whileHover={{ x: -5 }}
              className="w-full sm:w-auto px-10 py-5 bg-white text-[#264653] rounded-3xl font-black text-base shadow-lg border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={20} /> বাতিল করুন
            </motion.button>

            <motion.button 
              disabled={loading} 
              type="submit" 
              whileHover={{ y: -5, scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-16 py-5 bg-gradient-to-r from-[#264653] to-[#1a313a] text-white rounded-3xl font-black text-xl shadow-[0_20px_50px_rgba(38,70,83,0.3)] flex items-center justify-center gap-4 disabled:opacity-50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>নিবন্ধন সম্পন্ন করুন <ArrowRight size={24} /></>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}