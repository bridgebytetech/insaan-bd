"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, CheckCircle, XCircle, Trash2, 
  Eye, Loader2, AlertTriangle, User, Users, ChevronRight
} from "lucide-react";
import Link from 'next/link';
import api from '@/app/lib/api/axios';
import toast from 'react-hot-toast';

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, action: null });

  const fetchVolunteers = useCallback(async (type = filter, keyword = search) => {
    setLoading(true);
    try {
      let url = "/admin/volunteers";
      if (keyword) url = `/admin/volunteers/search?keyword=${keyword}`;
      else if (type === "pending") url = "/admin/volunteers/pending";
      else if (type === "approved") url = "/admin/volunteers/approved";

      const res = await api.get(url);
      setVolunteers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load volunteers data");
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVolunteers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, filter, fetchVolunteers]);

  const executeAction = async () => {
    const { id, action } = confirmModal;
    try {
      if (action === 'approve') await api.put(`/admin/volunteers/${id}/approve`);
      else if (action === 'reject') await api.put(`/admin/volunteers/${id}/reject`);
      else if (action === 'delete') await api.delete(`/admin/volunteers/${id}`);
      
      toast.success(`Volunteer successfully ${action}ed`);
      fetchVolunteers();
    } catch (err) {
      toast.error("Action failed. Please try again.");
    } finally {
      setConfirmModal({ isOpen: false, id: null, action: null });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-24 pb-20 px-4 md:px-10">
      
      {/* --- Page Title & Stats --- */}
      <div className=" mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2 text-[#2A9D8F]">
            <Users size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Community Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#264653] tracking-tighter uppercase">
            Volunteer <span className="text-[#2A9D8F]">Base</span>
          </h1>
        </div>

        {/* --- Toolbar: Search & Filter Integrated --- */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Enhanced Search */}
          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2A9D8F] transition-colors" size={18}/>
            <input 
              type="text" 
              placeholder="Quick search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 py-3.5 pl-12 pr-6 rounded-2xl shadow-sm focus:border-[#2A9D8F] focus:ring-4 focus:ring-[#2A9D8F]/5 outline-none font-bold text-[#264653] text-sm transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-100 w-full lg:w-auto">
            {['all', 'pending', 'approved'].map((t) => (
              <button 
                key={t} onClick={() => setFilter(t)}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-[#264653] text-white shadow-lg' : 'text-slate-500 hover:text-[#264653]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
            <div className="relative">
               <Loader2 className="animate-spin text-[#2A9D8F]" size={48}/>
               <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#264653]" size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing database...</span>
          </div>
        ) : (
          <>
            {volunteers.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <User className="mx-auto text-slate-200 mb-4" size={64}/>
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">No volunteers matching criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                <AnimatePresence mode='popLayout'>
                  {volunteers.map((v: any) => (
                    <motion.div 
                      layout 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={v.volunteerId} 
                      className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                    >
                      {/* Status Indicator Bar */}
                      <div className={`absolute top-0 left-0 w-full h-1.5 ${v.volunteerStatus === 'APPROVED' ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                      <div className="flex items-start gap-5">
                        <div className="relative shrink-0">
                          <img 
                            src={v.volunteerDpUrl ? `https://api.insaanbd.org/api/public/files/${v.volunteerDpUrl}` : "https://ui-avatars.com/api/?name=" + v.volunteerName} 
                            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50 shadow-inner" 
                            alt={v.volunteerName}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                             <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${v.volunteerStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                               {v.volunteerStatus}
                             </span>
                          </div>
                          <h3 className="text-lg font-black text-[#264653] uppercase tracking-tight truncate">{v.volunteerName}</h3>
                          <p className="text-slate-400 text-[10px] font-bold truncate mb-3">{v.volunteerEmail}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="flex gap-1.5">
                          {v.volunteerStatus === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => setConfirmModal({ isOpen: true, id: v.volunteerId, action: 'approve' })}
                                className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                              >
                                <CheckCircle size={18}/>
                              </button>
                              <button 
                                onClick={() => setConfirmModal({ isOpen: true, id: v.volunteerId, action: 'reject' })}
                                className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                              >
                                <XCircle size={18}/>
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => setConfirmModal({ isOpen: true, id: v.volunteerId, action: 'delete' })}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={18}/>
                          </button>
                        </div>

                        <Link 
                          href={`/admin/volunteer/${v.volunteerId}`} 
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#264653] text-white rounded-xl hover:bg-[#2A9D8F] transition-all font-black text-[9px] uppercase tracking-widest shadow-md"
                        >
                          View Profile <ChevronRight size={14}/>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Custom Confirm Modal --- */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmModal({ isOpen: false, id: null, action: null })}
              className="absolute inset-0 bg-[#264653]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl relative z-10 text-center border border-white/20"
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 ${
                confirmModal.action === 'delete' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
              }`}>
                <AlertTriangle size={40}/>
              </div>
              <h3 className="text-2xl font-black text-[#264653] uppercase tracking-tighter mb-2">Confirmation</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-10">
                Are you sure you want to <span className="text-[#264653]">{confirmModal.action}</span> this volunteer? This cannot be undone.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmModal({ isOpen: false, id: null, action: null })}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#264653] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeAction}
                  className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl active:scale-95 transition-all ${
                    confirmModal.action === 'delete' ? 'bg-red-500 shadow-red-200' : 'bg-[#2A9D8F] shadow-emerald-200'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}