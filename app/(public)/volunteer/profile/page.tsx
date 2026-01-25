"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Plus, Hash,
  Calendar, GraduationCap, Heart, BadgeCheck, Loader2, 
  ArrowRight, ShieldCheck, Clock, LogOut 
} from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function VolunteerProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);

  const FILE_BASE_URL = "https://api.insaanbd.org/api/public/files/";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('volunteerToken');
      
      // টোকেন না থাকলে সরাসরি লগইন পেজে পাঠিয়ে দিবে
      if (!token || token === 'undefined') {
        router.push('/volunteer/login');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      try {
        const [profileRes, orphansRes] = await Promise.all([
          axios.get("https://api.insaanbd.org/api/volunteer/profile", config),
          axios.get("https://api.insaanbd.org/api/volunteer/orphans", config)
        ]);
        
        setProfile(profileRes.data.data);
        setOrphans(orphansRes.data.data);
      } catch (err: any) {
        console.error("Data fetch failed", err);
        // যদি টোকেন ইনভ্যালিড হয় (যেমন সার্ভার থেকে 401 দিলে), তবে লগআউট করাবে
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('volunteerToken');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  const getImageUrl = (filename: string) => {
    if (!filename) return null;
    return filename.startsWith('http') ? filename : `${FILE_BASE_URL}${filename}`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#2A9D8F] mx-auto mb-2" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-28 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- Header & ID Card Section --- */}
        <section className="bg-[#264653] rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A9D8F]/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-20 -mb-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Profile Image with Status Badge */}
            <div className="relative shrink-0">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-[3rem] overflow-hidden border-4 border-[#2A9D8F]/30 shadow-2xl bg-slate-800">
                <img 
                  src={getImageUrl(profile?.volunteerDpUrl) || `https://ui-avatars.com/api/?name=${profile?.volunteerName || 'User'}&background=2A9D8F&color=fff`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.onerror = null; 
                    e.target.src = `https://ui-avatars.com/api/?name=${profile?.volunteerName || 'User'}&background=2A9D8F&color=fff`;
                  }}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#2A9D8F] p-3 rounded-2xl shadow-lg ring-4 ring-[#264653]">
                <BadgeCheck size={24} className="text-white" />
              </div>
            </div>
            
            {/* Identity Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-3">
                  <Hash size={12} className="text-[#2A9D8F]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Volunteer ID: {profile?.volunteerId}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-2">
                  {profile?.volunteerName}
                </h1>
                <p className="text-[#2A9D8F] font-bold text-xs uppercase tracking-[0.4em]">Official Community Volunteer</p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="p-2 bg-white/5 rounded-lg"><Mail size={16}/></div>
                  <span className="text-sm font-medium">{profile?.volunteerEmail}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="p-2 bg-white/5 rounded-lg"><Phone size={16}/></div>
                  <span className="text-sm font-medium">{profile?.volunteerContact}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="p-2 bg-white/5 rounded-lg"><MapPin size={16}/></div>
                  <span className="text-sm font-medium truncate">{profile?.volunteerAddress}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="p-2 bg-white/5 rounded-lg"><ShieldCheck size={16}/></div>
                  <span className="text-sm font-bold text-[#2A9D8F] uppercase tracking-widest">{profile?.volunteerStatus}</span>
                </div>
              </div>
            </div>

            {/* Actions Button Group */}
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/volunteer/profile/addorphan" className="bg-white text-[#264653] hover:bg-[#2A9D8F] hover:text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 active:scale-95">
                <Plus size={20}/> Add New Orphan
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
              >
                <LogOut size={16}/> Logout Account
              </button>
            </div>
          </div>
        </section>

        {/* --- Quick Stats Area --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Orphans</p>
                <h4 className="text-2xl font-black text-[#264653]">{orphans.length}</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Join Date</p>
                <h4 className="text-md font-black text-[#264653]">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                </h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-inner">
                <User size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Account Status</p>
                <h4 className="text-md font-black text-[#264653] uppercase">{profile?.volunteerStatus}</h4>
              </div>
           </div>
        </div>

        {/* --- Orphans List Section --- */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <h2 className="text-2xl md:text-3xl font-black text-[#264653] uppercase tracking-tighter">
              Orphan <span className="text-[#2A9D8F]">Records</span>
            </h2>
            <span className="bg-[#264653] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Count: {orphans.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orphans.map((orphan: any) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={orphan.orphanId} 
                className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 group transition-all hover:shadow-2xl hover:shadow-slate-200"
              >
                <div className="relative h-56 w-full rounded-[2rem] overflow-hidden mb-5 bg-slate-50">
                  <img 
                    src={getImageUrl(orphan.orphanDpUrl) || `https://ui-avatars.com/api/?name=${orphan.orphanName}&background=f1f5f9&color=264653`} 
                    alt={orphan.orphanName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${orphan.orphanName}&background=f1f5f9&color=264653`;
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black text-[#264653] uppercase shadow-sm">
                    {orphan.orphanGender}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#264653] leading-tight line-clamp-1 uppercase tracking-tight">
                    {orphan.orphanName}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Age</span>
                      <span className="text-xs font-black text-[#264653]">{orphan.orphanAge} Years</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Grade</span>
                      <span className="text-xs font-black text-[#264653]">Class {orphan.orphanClassGrade}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      orphan.orphanStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {orphan.orphanStatus}
                    </span>
                    {/* <Link href={`/volunteer/profile/orphan/${orphan.orphanId}`} className="w-10 h-10 flex items-center justify-center bg-[#264653] text-white rounded-xl hover:bg-[#2A9D8F] transition-all">
                      <ArrowRight size={18}/>
                    </Link> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {orphans.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-slate-200" size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">No orphans assigned to your profile yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}