"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, XCircle, Trash2, RefreshCw, 
  Clock, Loader2, AlertCircle 
} from "lucide-react";

interface Review {
  reviewId: number;
  name: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

// --- Custom Confirmation Modal Component ---
const ConfirmModal = ({ 
  isOpen, onClose, onConfirm, title, message, confirmText, type 
}: { 
  isOpen: boolean, onClose: () => void, onConfirm: () => void, 
  title: string, message: string, confirmText: string, type: 'danger' | 'success' | 'warning' 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center"
        >
          <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
            type === 'danger' ? 'bg-red-50 text-red-500' : 
            type === 'success' ? 'bg-teal-50 text-teal-500' : 'bg-orange-50 text-orange-500'
          }`}>
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-black text-[#264653] mb-2 uppercase tracking-tight">{title}</h3>
          <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className={`flex-1 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 ${
                type === 'danger' ? 'bg-[#E76F51]' : 'bg-[#2A9D8F]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function AdminReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [actionId, setActionId] = useState<number | null>(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    type: 'danger' | 'success' | 'warning';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    type: 'warning',
    onConfirm: () => {}
  });

  const getAuthHeaders = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.insaanbd.org/api/admin/reviews`, {
        method: 'GET',
        headers: getAuthHeaders(),
        cache: 'no-store'
      });
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setAllReviews(result.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAction = async (id: number, endpoint: string) => {
    setActionId(id);
    try {
      const res = await fetch(`https://api.insaanbd.org/api/admin/reviews/${id}/${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });
      const result = await res.json();
      if (result.success) await fetchReviews(); 
      else alert(result.message || "Action failed!");
    } catch (err) {
      alert("Network error occurred!");
    } finally {
      setActionId(null);
    }
  };

  const triggerDelete = (id: number) => {
    setModalConfig({
      isOpen: true,
      title: "Confirm Delete",
      message: "This action is permanent. Do you really want to remove this review from the archives?",
      confirmText: "Delete Now",
      type: "danger",
      onConfirm: async () => {
        setActionId(id);
        try {
          const res = await fetch(`https://api.insaanbd.org/api/admin/reviews/${id}`, { 
            method: 'DELETE',
            headers: getAuthHeaders(),
          });
          const result = await res.json();
          if (result.success) {
            setAllReviews(prev => prev.filter(item => item.reviewId !== id));
          }
        } catch (err) {
          alert("Delete failed!");
        } finally {
          setActionId(null);
        }
      }
    });
  };

  const filteredReviews = allReviews.filter(rev => rev.status === filter);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-12 font-sans text-[#264653]">
      <ConfirmModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <div className="">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">
              Review <span className="text-[#2A9D8F]">Moderation</span>
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">Manage public voices and impact stories.</p>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                  filter === s ? 'bg-[#264653] text-white shadow-md' : 'text-gray-400 hover:text-[#264653]'
                }`}
              >
                {s} ({allReviews.filter(r => r.status === s).length})
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-300 gap-4">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Syncing Archives...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredReviews.map((rev) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={rev.reviewId}
                  className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${
                    rev.status === 'APPROVED' ? 'bg-[#2A9D8F]' : rev.status === 'REJECTED' ? 'bg-[#E76F51]' : 'bg-orange-300'
                  }`} />

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F8F9FA] flex items-center justify-center rounded-2xl font-black text-xl border border-gray-100 group-hover:border-[#2A9D8F] transition-colors">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-tight">{rev.name}</h3>
                        <p className="text-[10px] text-gray-300 font-mono">#{rev.reviewId} • {new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAction(rev.reviewId, 'toggle')}
                      disabled={actionId === rev.reviewId}
                      className="p-2 text-gray-300 hover:text-[#264653] transition-colors"
                    >
                      <RefreshCw size={16} className={actionId === rev.reviewId ? "animate-spin" : ""} />
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium italic">"{rev.message}"</p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex gap-2">
                      {filter !== 'APPROVED' && (
                        <button 
                          onClick={() => handleAction(rev.reviewId, 'approve')}
                          className="bg-[#2A9D8F]/10 text-[#2A9D8F] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2A9D8F] hover:text-white transition-all disabled:opacity-50"
                        >
                          Approve
                        </button>
                      )}
                      {filter !== 'REJECTED' && (
                        <button 
                          onClick={() => handleAction(rev.reviewId, 'reject')}
                          className="bg-[#E76F51]/10 text-[#E76F51] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E76F51] hover:text-white transition-all disabled:opacity-50"
                        >
                          Reject
                        </button>
                      )}
                    </div>

                    <button 
                      onClick={() => triggerDelete(rev.reviewId)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredReviews.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
            <Clock className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}