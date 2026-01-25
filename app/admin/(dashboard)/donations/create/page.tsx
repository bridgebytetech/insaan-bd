"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { donationService } from "@/app/lib/services/donationService";
import { uploadFile } from "@/app/lib/services/uploadService";
import { ArrowLeft, Loader2, Upload, Save, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateDonationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      const url = await uploadFile(file);
      setReceiptUrl(url);
      toast.success("রিসিপ্ট আপলোড হয়েছে");
    } catch (err) {
      toast.error("ফাইল আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const donorId = Number(formData.get("donorId"));
    
    const payload = {
      orphanId: Number(formData.get("orphanId")) || 0,
      donationDate: formData.get("donationDate"),
      donationAmount: Number(formData.get("donationAmount")),
      donationDescription: formData.get("donationDescription"),
      transactionId: formData.get("transactionId"),
      receiptUrl: receiptUrl, // আপলোড করা ফাইলের URL
    };

    try {
      await donationService.create(donorId, payload);
      toast.success("ডোনেশন সফলভাবে রেকর্ড করা হয়েছে");
      router.push("/admin/donations"); // লিস্ট পেজে ফেরত যাবে
    } catch (err) {
      toast.error("তথ্য সেভ করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <div className="bg-[#264653] text-white p-8 border-b-4 border-[#2A9D8F]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#2A9D8F]">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-2xl font-black uppercase tracking-tighter">New <span className="text-[#2A9D8F]">Donation</span> Record</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-none border border-gray-100 p-8 md:p-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Donor ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Donor ID *</label>
              <input name="donorId" required type="number" className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all" placeholder="Enter Donor ID" />
            </div>

            {/* Orphan ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Orphan ID (Optional)</label>
              <input name="orphanId" type="number" className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all" placeholder="Enter Orphan ID" />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Donation Amount (৳) *</label>
              <input name="donationAmount" required type="number" className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all text-xl" placeholder="0.00" />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Donation Date *</label>
              <input name="donationDate" required type="date" className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all" />
            </div>
          </div>

          {/* Transaction ID */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Transaction ID / Reference *</label>
            <input name="transactionId" required className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all" placeholder="e.g. BKASH-XXXXX" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Description</label>
            <textarea name="donationDescription" rows={3} className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-[#2A9D8F] outline-none font-bold transition-all" placeholder="Add any details here..."></textarea>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Payment Receipt (Image)</label>
            <div className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${receiptUrl ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-[#2A9D8F]'}`}>
              {uploading ? (
                <Loader2 className="animate-spin text-[#2A9D8F]" />
              ) : receiptUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={32} />
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">Uploaded Successfully</p>
                  <p className="text-[8px] text-gray-400 truncate max-w-xs">{receiptUrl}</p>
                </div>
              ) : (
                <>
                  <Upload className="text-gray-300 mb-2" size={32} />
                  <p className="text-xs font-bold text-gray-400 uppercase">Click to upload receipt</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || uploading}
            className="w-full bg-[#264653] text-white py-6 font-black uppercase text-sm tracking-[0.4em] hover:bg-[#2A9D8F] transition-all shadow-xl flex items-center justify-center gap-4 disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Save Donation Record</>}
          </button>
        </form>
      </div>
    </div>
  );
}