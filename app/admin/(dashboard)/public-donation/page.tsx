"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle, XCircle, Trash2, Eye, Calendar, 
  Phone, CreditCard, Clock, Search, ExternalLink, Loader2,
  Hash, DollarSign, User as UserIcon, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import publicDonationService from "@/app/lib/services/publicDonationService"; 

export default function ManageDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("PENDING");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(null);

  // Modal States
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const getFullFileUrl = (filename) => {
    if (!filename || filename === "string") return null;
    return filename.startsWith("http") 
      ? filename 
      : `https://api.insaanbd.org/api/public/files/${filename}`;
  };

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await publicDonationService.getAll(filterStatus);
      setDonations(res.data || []);
    } catch (error) {
      toast.error("অনুদান তালিকা লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [filterStatus]);

  const handleStatusUpdate = async (id, newStatus) => {
    if (isProcessing) return;
    try {
      setIsProcessing(id);
      await publicDonationService.updateStatus(id, newStatus);
      toast.success(`সফলভাবে ${newStatus} করা হয়েছে`);
      await fetchDonations();
    } catch (error) {
      toast.error("স্ট্যাটাস আপডেট করা যায়নি");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDelete = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(deleteId);
      await publicDonationService.delete(deleteId);
      toast.success("সফলভাবে ডিলিট করা হয়েছে");
      setDeleteId(null);
      await fetchDonations();
    } catch (error) {
      toast.error("ডিলিট করা সম্ভব হয়নি");
    } finally {
      setIsProcessing(null);
    }
  };

  const filteredData = donations.filter(item => 
    item.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id?.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#FDFEFF] p-4 md:p-10 pt-28">
      <div className="">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#264653] tracking-tight">PUBLIC DONATION</h1>
            <p className="text-gray-400 font-semibold text-sm flex items-center gap-2 uppercase tracking-tighter">
              <span className="w-8 h-[2px] bg-[#2A9D8F]"></span> 
              Contribution Management Portal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
            {["PENDING", "VERIFIED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2.5 rounded-2xl text-[11px] font-black transition-all duration-300 ${
                  filterStatus === status 
                  ? "bg-[#264653] text-white shadow-lg shadow-[#264653]/30 scale-105" 
                  : "text-gray-400 hover:bg-white hover:text-[#264653]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* --- Search Bar --- */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F]/10 to-[#264653]/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden p-1">
            <Search className="ml-5 text-gray-300" size={20} />
            <input 
              type="text" 
              placeholder="ট্রানজেকশন আইডি বা দাতার নাম লিখুন..."
              className="w-full py-4 px-4 outline-none font-bold text-gray-600 placeholder:text-gray-300 placeholder:font-normal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- Grid View --- */}
        {loading && !donations.length ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="font-black">লোড হচ্ছে...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <AlertCircle size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-300 font-black text-xl">কোনো তথ্য খুঁজে পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-6 relative overflow-hidden group hover:border-[#2A9D8F]/30 transition-all duration-500"
                >
                  {/* Status Tag */}
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                    <div className={`w-2 h-2 rounded-full ${filterStatus === 'PENDING' ? 'bg-amber-400' : filterStatus === 'VERIFIED' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                    <span className="text-[10px] font-black text-gray-500 tracking-tighter uppercase">{filterStatus}</span>
                  </div>

                  {/* Header: ID and Receipt */}
                  <div className="flex items-start gap-5 mb-6">
                    <div 
                      onClick={() => setSelectedReceipt(item.receiptUrl)}
                      className="relative w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer group/img"
                    >
                      {item.receiptUrl ? (
                        <img 
                          src={getFullFileUrl(item.receiptUrl)} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
                          alt="receipt" 
                          onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Err"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><CreditCard className="text-gray-300" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                         <Eye size={18} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-[#2A9D8F] bg-[#2A9D8F]/10 px-3 py-1 rounded-lg">ID: #{item.id}</span>
                      <h3 className="mt-2 text-xl font-black text-[#264653] leading-tight line-clamp-1">{item.name}</h3>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400 font-bold mt-1">
                        <Phone size={12} className="text-gray-300" /> {item.phone}
                      </p>
                    </div>
                  </div>

                  {/* Body: Info */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gray-50/80 p-4 rounded-3xl space-y-3 border border-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Amount</span>
                        <span className="text-xl font-black text-[#264653]">৳ {item.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Transaction ID</span>
                        <span className="text-[10px] font-black bg-white px-2 py-1 rounded-md border border-gray-100">{item.transactionId}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 text-blue-400 rounded-xl"><Calendar size={14}/></div>
                        <div className="text-[10px] font-bold text-gray-500 leading-none">
                          <p>{item.donationDate}</p>
                          <p className="text-gray-300 mt-0.5">{new Date(item.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-400 font-medium italic px-2 line-clamp-2">
                      "{item.description || "No specific note provided"}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {filterStatus === "PENDING" && (
                      <>
                        <button 
                          disabled={isProcessing === item.id}
                          onClick={() => handleStatusUpdate(item.id, "VERIFIED")}
                          className="flex-1 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isProcessing === item.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                          Verify
                        </button>
                        <button 
                          disabled={isProcessing === item.id}
                          onClick={() => handleStatusUpdate(item.id, "REJECTED")}
                          className="px-4 py-3.5 bg-amber-50 text-amber-500 rounded-2xl font-black hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    <button 
                      disabled={isProcessing === item.id}
                      onClick={() => setDeleteId(item.id)}
                      className={`py-3.5 rounded-2xl font-black transition-all ${filterStatus !== 'PENDING' ? 'flex-1 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'px-4 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <Trash2 size={18} className="mx-auto" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* --- Image Preview Modal --- */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReceipt(null)} className="absolute inset-0 bg-[#264653]/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-lg w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
              <div className="p-6 border-b flex justify-between items-center">
                <span className="font-black text-[#264653] tracking-tighter uppercase text-xs">Verification Receipt</span>
                <button onClick={() => setSelectedReceipt(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><XCircle size={22} className="text-gray-400" /></button>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="rounded-[2rem] overflow-hidden shadow-inner bg-white border border-gray-100">
                  <img src={getFullFileUrl(selectedReceipt)} className="w-full h-auto max-h-[60vh] object-contain" alt="Receipt" />
                </div>
              </div>
              <div className="p-8 flex justify-center">
                <a 
                  href={getFullFileUrl(selectedReceipt)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#264653] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#264653]/30"
                >
                  <ExternalLink size={16} /> Open Full View
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Delete Confirmation Modal --- */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-[#264653]/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative bg-white p-10 rounded-[3.5rem] max-w-sm w-full text-center shadow-2xl border border-gray-50">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {isProcessing === deleteId ? <Loader2 size={32} className="animate-spin" /> : <Trash2 size={32} />}
              </div>
              <h3 className="text-2xl font-black text-[#264653] mb-3 leading-tight">মুছে ফেলতে চান?</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed px-4">এই রেকর্ডটি ডাটাবেস থেকে স্থায়ীভাবে মুছে ফেলা হবে।</p>
              <div className="flex flex-col gap-3">
                <button 
                  disabled={isProcessing === deleteId}
                  onClick={handleDelete} 
                  className="py-4 bg-red-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                >
                  {isProcessing === deleteId && <Loader2 size={16} className="animate-spin" />}
                  Confirm Delete
                </button>
                <button 
                  disabled={isProcessing === deleteId}
                  onClick={() => setDeleteId(null)} 
                  className="py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}