"use client";

import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  Plus, Camera, FileText, ArrowLeft, Loader2, 
  CheckCircle2, Info, User, Shield
} from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddOrphan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<any>({
    orphanName: '', orphanAge: 0, orphanGender: 'MALE', orphanFatherName: '',
    orphanMotherName: '', orphanAddress: '', guardianName: '', guardianRelationship: '',
    guardianMobile: '', guardianNid: '', currentSchoolName: '', orphanClassGrade: '',
    previousSchoolName: '', typeOfSupport: '', currentSituation: '', orphanDpUrl: '',
    birthCertificateUrl: '', fatherDeathCertificateUrl: '', orphanDob: '',
    orphanContact: '', orphanViaName: '', orphanViaContact: '', orphanViaAddress: '',
    orphanViaRelation: '', orphanEducationInstitute: '', orphanEducationLevel: '',
    orphanEducationInstituteAddress: '', orphanHealthCondition: ''
  });

  const handleFileUpload = async (e: any, fieldName: string) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(fieldName);
    const upData = new FormData();
    upData.append('file', file);

    try {
      const res = await axios.post("https://api.insaanbd.org/api/public/upload", upData);
      setFormData({ ...formData, [fieldName]: res.data.data.url });
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('volunteerToken');
      await axios.post("https://api.insaanbd.org/api/volunteer/orphans", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push('/volunteer/profile');
    } catch (err) {
      alert("Failed to submit orphan data");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none transition-all font-medium text-[#264653] placeholder:text-gray-300";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-2";

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/volunteer/profile" className="inline-flex items-center gap-2 text-xs font-black text-[#2A9D8F] mb-8 uppercase tracking-widest">
          <ArrowLeft size={16}/> Back to Profile
        </Link>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Header Info */}
          <div className="bg-[#264653] p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black uppercase tracking-tight">Add Orphan</h1>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Volunteer Data Entry Form</p>
            </div>
            <div className="flex -space-x-4">
              {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#264653] bg-[#2A9D8F] flex items-center justify-center font-black">?</div>)}
            </div>
          </div>

          {/* Section 1: Basic Info */}
          <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-50 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <User className="text-[#2A9D8F]" size={20}/>
              <h2 className="text-lg font-black text-[#264653] uppercase">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Orphan Name</label>
                <input required className={inputClass} placeholder="শিশুর নাম" 
                  onChange={e => setFormData({...formData, orphanName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Age</label>
                  <input required type="number" className={inputClass} 
                    onChange={e => setFormData({...formData, orphanAge: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} onChange={e => setFormData({...formData, orphanGender: e.target.value})}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input required type="date" className={inputClass} 
                  onChange={e => setFormData({...formData, orphanDob: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Health Condition</label>
                <input className={inputClass} placeholder="শারীরিক অবস্থা" 
                  onChange={e => setFormData({...formData, orphanHealthCondition: e.target.value})} />
              </div>
            </div>

            {/* Photo Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
               {[
                 { label: 'Orphan Photo', field: 'orphanDpUrl', icon: <Camera/> },
                 { label: 'Birth Certificate', field: 'birthCertificateUrl', icon: <FileText/> },
                 { label: 'Death Certificate', field: 'fatherDeathCertificateUrl', icon: <Shield/> }
               ].map((item) => (
                 <div key={item.field} className="relative">
                    <label className={labelClass}>{item.label}</label>
                    <div 
                      onClick={() => (document.getElementById(item.field) as any).click()}
                      className="h-32 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-[#2A9D8F] transition-all bg-gray-50/50 overflow-hidden"
                    >
                      {formData[item.field] ? (
                        <div className="flex items-center gap-2 text-[#2A9D8F] font-black text-[10px] uppercase">
                          <CheckCircle2 size={16}/> Uploaded
                        </div>
                      ) : (
                        uploading === item.field ? <Loader2 className="animate-spin text-[#2A9D8F]"/> : 
                        <div className="text-gray-300 flex flex-col items-center gap-1">
                          {item.icon}
                          <span className="text-[8px] font-black uppercase">Select File</span>
                        </div>
                      )}
                    </div>
                    <input type="file" id={item.field} className="hidden" onChange={(e) => handleFileUpload(e, item.field)} />
                 </div>
               ))}
            </div>
          </section>

          {/* Section 2: Family & Support */}
          <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-50 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <Info className="text-[#2A9D8F]" size={20}/>
              <h2 className="text-lg font-black text-[#264653] uppercase">Guardian & Education</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label className={labelClass}>Guardian Name</label>
                <input required className={inputClass} onChange={e => setFormData({...formData, guardianName: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input required className={inputClass} onChange={e => setFormData({...formData, guardianRelationship: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Guardian Mobile</label>
                <input required className={inputClass} onChange={e => setFormData({...formData, guardianMobile: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Current School</label>
                <input className={inputClass} onChange={e => setFormData({...formData, currentSchoolName: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Class Grade</label>
                <input className={inputClass} onChange={e => setFormData({...formData, orphanClassGrade: e.target.value})} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Current Situation & Support Needed</label>
              <textarea 
                className={`${inputClass} h-32 py-4`} 
                placeholder="শিশুর বর্তমান অবস্থা এবং কি ধরণের সহায়তা প্রয়োজন তা বিস্তারিত লিখুন..."
                onChange={e => setFormData({...formData, currentSituation: e.target.value})}
              />
            </div>
          </section>

          <button 
            disabled={loading || uploading !== null}
            className="w-full bg-[#264653] text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? "Submitting Data..." : "Complete Registration"}
            {!loading && <Plus size={18}/>}
          </button>
        </form>
      </div>
    </div>
  );
}