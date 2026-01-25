//eita public orphan registration page
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  User,
  MapPin,
  Phone,
  IdCard,
  Heart,
  FileText,
  Camera,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  Package,
  Stethoscope,
  HomeIcon,
  GraduationCap,
  Loader2,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUp,
  UploadCloud,
  AlertCircle,
  Activity,
} from "lucide-react";
import Footer from "@/app/components/shared/Footer";

const needOptions = [
  { id: "EDUCATION", label: "শিক্ষা", icon: BookOpen, color: "#2A9D8F" },
  { id: "FOOD", label: "খাদ্য", icon: Package, color: "#E76F51" },
  { id: "MEDICAL", label: "চিকিৎসা", icon: Stethoscope, color: "#264653" },
  { id: "SHELTER", label: "আবাসন", icon: HomeIcon, color: "#F4A261" },
];

export default function OrphanRegistration() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [formData, setFormData] = useState({
    orphanName: "",
    orphanAge: 0,
    orphanGender: "MALE",
    orphanFatherName: "",
    orphanMotherName: "",
    orphanAddress: "",
    guardianName: "",
    guardianRelationship: "",
    guardianMobile: "",
    guardianNid: "",
    currentSchoolName: "",
    orphanClassGrade: "",
    previousSchoolName: "",
    typeOfSupport: "",
    orphanHealthCondition: "",
    orphanEducationInstituteAddress: "",
    currentSituation: "",
    orphanDpUrl: "",
    birthCertificateUrl: "",
    fatherDeathCertificateUrl: "",
    orphanDob: "", // e.g. "2026-01-25"
    orphanContact: "",
    orphanViaName: "",
    orphanViaContact: "",
    orphanViaAddress: "",
    orphanViaRelation: "",
  });

  const [uploadingFiles, setUploadingFiles] = useState({
    photo: false,
    birth: false,
    death: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    photo: null,
    birth: null,
    death: null,
  });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleFileUpload = async (file: File, type: "photo" | "birth" | "death") => {
  if (!file) return;

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    toast.error("ফাইলের সাইজ ৫ এমবি-র কম হতে হবে");
    return;
  }

  setUploadingFiles((prev) => ({ ...prev, [type]: true }));

  try {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const response = await axios.post(
      "https://api.insaanbd.org/api/public/upload",
      formDataUpload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data.success) {
      const fileUrl = response.data.data.url;
      setUploadedFiles((prev) => ({ ...prev, [type]: file.name }));

      if (type === "photo") {
        setFormData((prev) => ({ ...prev, orphanDpUrl: fileUrl }));
      } else if (type === "birth") {
        setFormData((prev) => ({ ...prev, birthCertificateUrl: fileUrl }));
      } else if (type === "death") {
        setFormData((prev) => ({ ...prev, fatherDeathCertificateUrl: fileUrl }));
      }

      toast.success("ফাইল আপলোড সফল হয়েছে!");
    }
  } catch (error) {
    toast.error("ফাইল আপলোড ব্যর্থ হয়েছে, আবার চেষ্টা করুন");
  } finally {
    setUploadingFiles((prev) => ({ ...prev, [type]: false }));
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.typeOfSupport) {
      toast.error("অনুগ্রহ করে সহায়তার ধরণ নির্বাচন করুন");
      return;
    }

    if (
      !formData.orphanDpUrl ||
      !formData.birthCertificateUrl ||
      !formData.fatherDeathCertificateUrl
    ) {
      toast.error("সকল প্রয়োজনীয় ডকুমেন্ট আপলোড করুন");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://api.insaanbd.org/api/public/orphans/register",
        formData,
      );
      toast.success(
        "নিবন্ধন সফলভাবে সম্পন্ন হয়েছে! অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে।",
      );

      // Reset form
      setFormData({
        orphanName: "",
        orphanAge: 0,
        orphanGender: "MALE",
        orphanFatherName: "",
        orphanMotherName: "",
        orphanAddress: "",
        guardianName: "",
        guardianRelationship: "",
        guardianMobile: "",
        guardianNid: "",
        currentSchoolName: "",
        orphanClassGrade: "",
        previousSchoolName: "",
        typeOfSupport: "",
        orphanHealthCondition: "",
        orphanEducationInstituteAddress: "",
        currentSituation: "",
        orphanDpUrl: "",
        birthCertificateUrl: "",
        fatherDeathCertificateUrl: "",
        orphanDob: "", // e.g. "2026-01-25"
        orphanContact: "",
        orphanViaName: "",
        orphanViaContact: "",
        orphanViaAddress: "",
        orphanViaRelation: "",
      });
      setUploadedFiles({ photo: null, birth: null, death: null });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-6 py-4 bg-white/40 border border-white focus:bg-white focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/10 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-400 font-medium text-[#264653] shadow-sm";
  const labelStyle =
    "block text-xs font-black text-[#264653]/60 mb-2 ml-2 uppercase tracking-[0.15em]";

  if (!mounted) return null;
  console.log(formData);

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFB] relative overflow-x-hidden selection:bg-[#2A9D8F]/30">
        <Toaster position="top-center" />

        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#2A9D8F]/10 to-transparent pointer-events-none" />
        <div className="fixed top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#E76F51]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="fixed bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#2A9D8F]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 pt-40 pb-24 px-6">
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-[#2A9D8F]/20 text-[#2A9D8F] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm"
            >
              <Sparkles size={14} className="animate-pulse" /> Insaan
              Registration Portal
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-[#264653] mb-6 tracking-tighter">
              শিশুর উজ্জ্বল{" "}
              <span className="text-[#2A9D8F] relative">
                ভবিষ্যত
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#2A9D8F]/10 -z-10"></span>
              </span>{" "}
              গড়ি
            </h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              আপনার দেওয়া প্রতিটি তথ্য একটি শিশুর জীবন পরিবর্তনের হাতিয়ার হতে
              পারে। নির্ভুল তথ্য দিয়ে ফর্মটি সম্পন্ন করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Orphan Identity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-2xl p-8 md:p-14 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <User size={120} className="text-[#264653]" />
              </div>

              <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 bg-[#264653] rounded-[1.2rem] flex items-center justify-center text-white shadow-xl rotate-3">
                  <Heart size={28} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#264653] uppercase tracking-tight">
                    শিশুর মৌলিক তথ্য
                  </h2>
                  <p className="text-sm text-gray-400 font-bold">
                    শিশুর জন্মগত ও পারিবারিক পরিচয়
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="md:col-span-2">
                  <label className={labelStyle}>শিশুর পুরো নাম *</label>
                  <div className="relative group">
                    <User
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors"
                      size={20}
                    />
                    <input
                      required
                      type="text"
                      value={formData.orphanName}
                      placeholder="যেমন: মোহাম্মদ আব্দুল্লাহ"
                      className={`${inputStyle} pl-14`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, orphanName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>বয়স (বছর) *</label>
                    <input
                      required
                      type="number"
                      value={formData.orphanAge || ""}
                      placeholder="০"
                      className={inputStyle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)  =>
                        setFormData({
                          ...formData,
                          orphanAge: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>লিঙ্গ *</label>
                    <select
                      className={inputStyle}
                      value={formData.orphanGender}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFormData({
                          ...formData,
                          orphanGender: e.target.value,
                        })
                      }
                    >
                      <option value="MALE">ছেলে</option>
                      <option value="FEMALE">মেয়ে</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>পিতার নাম (মৃত) *</label>
                  <input
                    required
                    type="text"
                    value={formData.orphanFatherName}
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orphanFatherName: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className={labelStyle}>মাতার নাম *</label>
                  <input
                    required
                    type="text"
                    value={formData.orphanMotherName}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        orphanMotherName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>বর্তমান পূর্ণ ঠিকানা *</label>
                  <div className="relative group">
                    <MapPin
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E76F51] transition-colors"
                      size={20}
                    />
                    <input
                      required
                      type="text"
                      value={formData.orphanAddress}
                      placeholder="গ্রাম, ডাকঘর, থানা, জেলা"
                      className={`${inputStyle} pl-14`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                          ...formData,
                          orphanAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>জন্ম তারিখ *</label>
                  <input
                    required
                    type="date"
                    value={formData.orphanDob}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, orphanDob: e.target.value })
                    }
                  />
                </div>

                <div>
  <label className={labelStyle}>
    শিশুর যোগাযোগ নম্বর (যদি থাকে)
  </label>
  <div className="relative group">
    <Phone
      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2A9D8F] transition-colors"
      size={18}
    />
    <input
      type="text" // 'text' এর বদলে 'tel' ব্যবহার করুন
     // শুধুমাত্র নাম্বার অ্যালাউ করবে
      value={formData.orphanContact}
      placeholder="০১৭XXXXXXXX" // 'ঐচ্ছিক' এর বদলে ডেমো নাম্বার দিলে ইউজার বুঝবে এখানে কী দিতে হবে
      className={`${inputStyle} pl-14`}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        // শুধুমাত্র সংখ্যা টাইপ করার লজিক
        const value = e.target.value.replace(/\D/g, ""); 
        setFormData({
          ...formData,
          orphanContact: value,
        });
      }}
    />
  </div>
  {/* ইউজারকে জানানোর জন্য ছোট নোট */}
  <p className="text-[10px] text-gray-400 mt-1 ml-1">* তথ্য না থাকলে খালি রাখুন</p>
</div>
                <div className="md:col-span-2">
                <label className={labelStyle}>
                  স্বাস্থ্যের অবস্থা (শারীরিক ও মানসিক) *
                </label>
                <div className="relative group">
                  <Activity
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E9C46A] transition-colors"
                    size={20}
                  />
                  <input
                    required
                    type="text"
                    value={formData.orphanHealthCondition}
                    placeholder="যেমন: সুস্থ, বা কোনো দীর্ঘস্থায়ী রোগ থাকলে উল্লেখ করুন"
                    className={`${inputStyle} pl-14`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        orphanHealthCondition: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              </div>
              {/* Health Condition Section */}
              
            </motion.div>

            {/* Section 2: Guardian & Education Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* Guardian Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] shadow-xl border border-white"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center text-[#2A9D8F]">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-xl font-black text-[#264653]">অভিভাবক</h2>
                </div>
                <div className="space-y-6">
                  <input
                    placeholder="অভিভাবকের নাম"
                    value={formData.guardianName}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, guardianName: e.target.value })
                    }
                  />
                  <input
                    placeholder="সম্পর্ক (যেমন: চাচা/মামা)"
                    value={formData.guardianRelationship}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        guardianRelationship: e.target.value,
                      })
                    }
                  />
                  <div className="relative">
                    <Phone
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      placeholder="মোবাইল নাম্বার"
                      value={formData.guardianMobile}
                      className={`${inputStyle} pl-14`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                          ...formData,
                          guardianMobile: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="relative">
                    <IdCard
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      placeholder="এনআইডি নম্বর"
                      value={formData.guardianNid}
                      className={`${inputStyle} pl-14`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                          ...formData,
                          guardianNid: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </motion.div>

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] shadow-xl border border-white"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#F4A261]/10 rounded-2xl flex items-center justify-center text-[#F4A261]">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-xl font-black text-[#264653]">
                    শিক্ষাগত তথ্য
                  </h2>
                </div>
                <div className="space-y-6">
                  <input
                    placeholder="স্কুল/মাদ্রাসার নাম"
                    value={formData.currentSchoolName}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        currentSchoolName: e.target.value,
                      })
                    }
                  />
                  {/* প্রতিষ্ঠানের ঠিকানা - নতুন যোগ করা হয়েছে */}
    <input
      placeholder="শিক্ষা প্রতিষ্ঠানের ঠিকানা"
      value={formData.orphanEducationInstituteAddress}
      className={inputStyle}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({
          ...formData,
          orphanEducationInstituteAddress: e.target.value,
        })
      }
    />
                  <input
                    placeholder="বর্তমান শ্রেণি"
                    value={formData.orphanClassGrade}
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orphanClassGrade: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="পূর্বের পড়াশোনা (যদি থাকে)"
                    value={formData.previousSchoolName}
                    className={inputStyle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        previousSchoolName: e.target.value,
                      })
                    }
                  />
                </div>
              </motion.div>
            </div>

            {/* Section 3: Type of Support */}
            {/* Section 3: Type of Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#264653] p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    আপনার কি ধরণের সহায়তা প্রয়োজন?
                  </h2>
                  <p className="text-white/50 font-medium">
                    নিচের অপশনগুলো থেকে যেকোনো একটি বেছে নিন
                  </p>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-xl flex items-center gap-2 border border-white/10">
                  <AlertCircle size={16} className="text-[#2A9D8F]" />
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                    Single Choice
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 relative z-10">
                {needOptions.map((opt) => {
                  // 🔄 Check if current option is the selected one
                  const isSelected = formData.typeOfSupport === opt.id;

                  return (
                    <label key={opt.id} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="supportType" // Same name ensures only one is selected
                        checked={isSelected}
                        className="hidden"
                        onChange={() =>
                          setFormData({ ...formData, typeOfSupport: opt.id })
                        }
                      />

                      <div
                        className={`h-full py-8 px-4 border rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 
            ${
              isSelected
                ? "bg-white scale-[1.05] shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-white"
                : "bg-white/5 border-white/10 group-hover:bg-white/10"
            }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors 
              ${isSelected ? "bg-gray-100 text-[#2A9D8F]" : "bg-white/10 text-white"}`}
                        >
                          <opt.icon
                            size={28}
                            className="transition-transform group-hover:scale-110"
                          />
                        </div>

                        <span
                          className={`font-black text-xs uppercase tracking-widest transition-colors text-center
              ${isSelected ? "text-[#264653]" : "text-white"}`}
                        >
                          {opt.label}
                        </span>

                        {/* Selection Indicator */}
                        <div
                          className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                        >
                          <CheckCircle2 size={22} className="text-[#2A9D8F]" />
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              <textarea
                rows={4}
                value={formData.currentSituation}
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-white/30 transition-all placeholder:text-white/20 font-medium relative z-10"
                placeholder="শিশুর বর্তমান পরিস্থিতি এবং পরিবারের অবস্থা বিস্তারিত বর্ণনা করুন..."
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, currentSituation: e.target.value })
                }
              />
            </motion.div>

            {/* Section 4: Referral Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] shadow-xl border border-white"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-[#E76F51]/10 rounded-[1.2rem] flex items-center justify-center text-[#E76F51] shadow-xl">
                  <User size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#264653] uppercase tracking-tight">
                    রেফারেল তথ্য
                  </h2>
                  <p className="text-sm text-gray-400 font-bold">
                    যিনি এই শিশুর পক্ষে আবেদন করছেন (ঐচ্ছিক)
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                <input
                  placeholder="রেফারকারীর নাম"
                  value={formData.orphanViaName}
                  className={inputStyle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, orphanViaName: e.target.value })
                  }
                />
                <input
                  placeholder="রেফারকারীর মোবাইল"
                  value={formData.orphanViaContact}
                  className={inputStyle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({
                      ...formData,
                      orphanViaContact: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="রেফারকারীর ঠিকানা"
                  value={formData.orphanViaAddress}
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      orphanViaAddress: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="শিশুর সাথে সম্পর্ক"
                  value={formData.orphanViaRelation}
                  className={inputStyle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({
                      ...formData,
                      orphanViaRelation: e.target.value,
                    })
                  }
                />
              </div>
            </motion.div>

            {/* Section 5: Document Upload */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#2A9D8F] to-[#1B7A6E] p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

              <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl">
                  <FileText size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    প্রয়োজনীয় ডকুমেন্ট
                  </h2>
                  <p className="text-white/70 font-medium">
                    সকল ডকুমেন্ট আপলোড করুন (সর্বোচ্চ ৫ এমবি)
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {/* Photo Upload */}
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Camera size={20} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-sm">
                      শিশুর ছবি *
                    </h3>
                  </div>

                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "photo")
                      }
                      disabled={uploadingFiles.photo}
                    />
                    <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
                      {uploadingFiles.photo ? (
                        <Loader2
                          className="mx-auto text-white animate-spin mb-2"
                          size={32}
                        />
                      ) : uploadedFiles.photo ? (
                        <CheckCircle2
                          className="mx-auto text-white mb-2"
                          size={32}
                        />
                      ) : (
                        <UploadCloud
                          className="mx-auto text-white/50 group-hover:text-white transition-colors mb-2"
                          size={32}
                        />
                      )}
                      <p className="text-white/70 text-xs font-bold">
                        {uploadedFiles.photo || "ক্লিক করে আপলোড করুন"}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Birth Certificate Upload */}
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileText size={20} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-sm">
                      জন্ম সনদ *
                    </h3>
                  </div>

                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "birth")
                      }
                      disabled={uploadingFiles.birth}
                    />
                    <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
                      {uploadingFiles.birth ? (
                        <Loader2
                          className="mx-auto text-white animate-spin mb-2"
                          size={32}
                        />
                      ) : uploadedFiles.birth ? (
                        <CheckCircle2
                          className="mx-auto text-white mb-2"
                          size={32}
                        />
                      ) : (
                        <UploadCloud
                          className="mx-auto text-white/50 group-hover:text-white transition-colors mb-2"
                          size={32}
                        />
                      )}
                      <p className="text-white/70 text-xs font-bold">
                        {uploadedFiles.birth || "ক্লিক করে আপলোড করুন"}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Death Certificate Upload */}
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileText size={20} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-sm">
                      পিতার মৃত্যু সনদ *
                    </h3>
                  </div>

                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "death")
                      }
                      disabled={uploadingFiles.death}
                    />
                    <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
                      {uploadingFiles.death ? (
                        <Loader2
                          className="mx-auto text-white animate-spin mb-2"
                          size={32}
                        />
                      ) : uploadedFiles.death ? (
                        <CheckCircle2
                          className="mx-auto text-white mb-2"
                          size={32}
                        />
                      ) : (
                        <UploadCloud
                          className="mx-auto text-white/50 group-hover:text-white transition-colors mb-2"
                          size={32}
                        />
                      )}
                      <p className="text-white/70 text-xs font-bold">
                        {uploadedFiles.death || "ক্লিক করে আপলোড করুন"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20 relative z-10">
                <p className="text-white/80 text-sm font-medium flex items-start gap-3">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <span>
                    সকল ডকুমেন্ট অবশ্যই পরিষ্কার এবং পাঠযোগ্য হতে হবে। ছবি
                    JPG/PNG এবং সনদপত্র PDF অথবা JPG/PNG ফরম্যাটে হতে পারে।
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Submit Section */}
            <div className="flex flex-col items-center gap-6 py-12">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full md:w-auto px-16 py-7 bg-[#2A9D8F] text-white rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(42,157,143,0.3)] flex items-center justify-center gap-4 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-4">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      নিবন্ধন জমা দিন
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#2A9D8F]" /> Your data
                is secured with InsaanBD
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
