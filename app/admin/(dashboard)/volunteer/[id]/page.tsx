"use client";

import React, { useEffect, useState,useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, 
  ShieldCheck, Clock, BadgeCheck, Loader2, ExternalLink,Download
} from "lucide-react";
import api from '@/app/lib/api/axios';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

export default function VolunteerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null); // PDF করার জন্য রেফারেন্স

  // আপনার generatePDF ফাংশনটি এভাবে আপডেট করুন
const generatePDF = async () => {
  if (!pdfRef.current) return;
  setIsExporting(true);
  const loadingToast = toast.loading("Generating PDF...");

  try {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      // 'data-html2canvas-ignore' অ্যাট্রিবিউট থাকা এলিমেন্টগুলোকে PDF এ দেখাবে না
      ignoreElements: (element) => element.hasAttribute('data-html2canvas-ignore'),
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`Volunteer_${data.volunteerId}.pdf`);
    toast.success("PDF Downloaded!", { id: loadingToast });
  } catch (error) {
    toast.error("Failed to generate PDF", { id: loadingToast });
  } finally {
    setIsExporting(false);
  }
};
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/admin/volunteers/${id}`);
        setData(res.data.data);
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-4">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40}/>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Profile</p>
      </div>
    );
  }

  if (!data) return <div className="p-20 text-center font-bold">Volunteer not found!</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Banner & Navigation */}
      <div className="h-64 bg-[#264653] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="px-6 pt-10 relative z-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 px-4 py-4 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white hover:bg-white/20 transition-all uppercase tracking-widest border border-white/10"
          >
            <ArrowLeft size={14}/> Back to Directory
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
        <motion.div 
        ref={pdfRef} // এটি যোগ করুন
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-slate-50 bg-gradient-to-b from-slate-50/50 to-white">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-44 h-44 rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-slate-100">
                  <img 
                    src={`https://api.insaanbd.org/uploads/${data.volunteerDpUrl}`} 
                    alt={data.volunteerName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    crossOrigin="anonymous"
                    onError={(e: any) => e.target.src = 'https://ui-avatars.com/api/?name=' + data.volunteerName}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#2A9D8F] text-white p-3 rounded-2xl shadow-lg z-20">
                  <BadgeCheck size={20} />
                </div>
              </div>

              {/* Name & Status */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] shadow-sm ${
                    data.volunteerStatus === 'APPROVED' 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {data.volunteerStatus}
                  </span>
                  <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] bg-slate-100 text-slate-500 border border-slate-200">
                    ID: {data.volunteerId}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[#264653] uppercase tracking-tighter leading-none">
                  {data.volunteerName}
                </h1>
                <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                  <Clock size={16} className="text-[#2A9D8F]" />
                  Member since {new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Contact */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-[#2A9D8F] rounded-full" />
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard icon={<Mail/>} label="Official Email" value={data.volunteerEmail} />
                  <InfoCard icon={<Phone/>} label="Phone Number" value={data.volunteerContact} />
                  <div className="md:col-span-2">
                    <InfoCard icon={<MapPin/>} label="Residential Address" value={data.volunteerAddress} />
                  </div>
                </div>
              </section>

              {/* Status Note Area */}
              <div className="p-6 bg-[#264653]/5 rounded-[2rem] border border-[#264653]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldCheck size={80} className="text-[#264653]" />
                </div>
                <h4 className="text-[10px] font-black text-[#264653] uppercase tracking-widest mb-2">Internal Note</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  "This volunteer profile has been verified by the Insaan Foundation admin team. All contact information is restricted for official use only."
                </p>
              </div>
            </div>

            {/* Right Column: Identity Card Style */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                <h3 className="text-xs font-black text-[#264653] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#2A9D8F]" /> System Identity
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">System UID</span>
                    <span className="text-xs font-black text-[#264653]">#INS-{data.volunteerId}</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Profile Verf.</span>
                    <BadgeCheck size={18} className="text-[#2A9D8F]" />
                  </div>

                  {/* <button 
  onClick={generatePDF}
  disabled={isExporting}
  className="w-full mt-4 bg-[#2A9D8F] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#264653] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
  data-html2canvas-ignore
>
  {isExporting ? <Loader2 className="animate-spin" size={14}/> : <Download size={14}/>}
  {isExporting ? "Exporting..." : "Export Profile PDF"}
</button> */}
                </div>
              </div>

              <div className="text-center p-4">
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter italic">
                   Last synced: {new Date().toLocaleTimeString()}
                 </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Sub-component for Cleaner Layout
function InfoCard({ icon, label, value }: any) {
  return (
    <div className="group bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#2A9D8F]/30 hover:shadow-md hover:shadow-slate-100 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2A9D8F] group-hover:text-white transition-all duration-300">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.15em] mb-1">{label}</p>
          <p className="text-sm font-bold text-[#264653] truncate group-hover:text-[#2A9D8F] transition-colors">
            {value || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
}