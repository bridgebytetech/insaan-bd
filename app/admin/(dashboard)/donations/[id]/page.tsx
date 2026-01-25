"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { donationService } from "@/app/lib/services/donationService";
import { 
  ArrowLeft, Calendar, User, Heart, 
  FileText, CheckCircle, XCircle, Clock, 
  Download, ExternalLink, Hash, Info, 
  Zap, DollarSign, UserCheck
} from "lucide-react";
import toast from "react-hot-toast";

export default function DonationDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ফাইল ওপেন করার জন্য সঠিক এন্ডপয়েন্ট কনস্ট্রাক্ট করা (Production API Fixed)
  const getFileUrl = (filename: string) => {
    if (!filename) return "#";
    
    // যদি filename এর মধ্যে পুরো পাথ থাকে (যেমন localhost বা অন্য কিছু), তবে শুধু ফাইলের নামটুকু আলাদা করবে
    const actualFilename = filename.includes('/') 
      ? filename.split('/').pop() 
      : filename;

    // সবসময় প্রোডাকশন এপিআই লিঙ্ক রিটার্ন করবে
    return `https://api.insaanbd.org/api/public/files/${actualFilename}`;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await donationService.getById(Number(id));
        setData(res.data);
      } catch (err) {
        toast.error("ডাটা পাওয়া যায়নি");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc] space-y-4">
      <div className="w-12 h-12 border-4 border-[#2A9D8F] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Finance Record...</p>
    </div>
  );

  if (!data) return <div className="p-10 text-center font-bold">No Data Found</div>;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Top Navigation --- */}
      <div className="bg-[#264653] p-4 md:p-6 text-white sticky top-0 z-10 border-b-4 border-[#2A9D8F]">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 hover:text-[#2A9D8F] transition-all">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to History</span>
          </button>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#2A9D8F] fill-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan BD Finance</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Main Info Column --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="bg-white p-8 border-l-8 border-[#2A9D8F] shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID: {data.transactionId}</span>
                  <h1 className="text-5xl font-black text-[#264653] tracking-tighter mt-1">৳{data.donationAmount}</h1>
                </div>
                <div className={`px-4 py-2 text-xs font-black uppercase tracking-[0.2em] border-2 ${
                  data.donationStatus === 'VERIFIED' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 
                  data.donationStatus === 'PENDING' ? 'bg-amber-50 border-amber-400 text-amber-500' : 'bg-red-50 border-red-300 text-red-400'
                }`}>
                  {data.donationStatus}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Donation Type</p>
                  <p className="font-bold text-[#264653]">{data.donationType}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Record Created</p>
                  <p className="font-bold text-[#264653]">{new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#264653]">Entity Details</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <DetailRow icon={<User className="text-[#2A9D8F]"/>} label="Donor" value={data.donorName} sub={`ID: #${data.donorId}`} />
                <DetailRow icon={<Heart className="text-[#E76F51]"/>} label="Orphan / Fund" value={data.orphanName || "General Fund"} sub={data.orphanId ? `ID: #${data.orphanId}` : "Not Assigned"} />
                <DetailRow icon={<Calendar className="text-blue-400"/>} label="Payment Date" value={data.donationDate} />
                <DetailRow icon={<UserCheck className="text-purple-400"/>} label="Entry Method" value={data.isAddedByDonor ? "Directly Added by Donor" : "Added by Admin"} />
              </div>
            </div>

            {/* Verification Note */}
            {data.verificationNotes && (
              <div className="bg-amber-50 p-6 border-l-4 border-amber-400">
                <div className="flex gap-3">
                  <Info className="text-amber-500 shrink-0" size={20}/>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600">Admin Notes</h4>
                    <p className="text-sm text-amber-800 font-medium mt-1 italic">"{data.verificationNotes}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Description / Remarks</h3>
              <p className="text-[#264653] leading-relaxed font-medium">
                {data.donationDescription || "No additional description provided for this donation."}
              </p>
            </div>
          </div>

          {/* --- Sidebar / Receipt Column --- */}
          <div className="space-y-6">
            <div className="bg-[#264653] text-white p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <FileText size={16} className="text-[#2A9D8F]"/> Receipt Document
              </h3>
              
              {data.receiptUrl ? (
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-white/10 border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center group">
                    <div className="w-16 h-16 bg-[#2A9D8F] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={32}/>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Digital Copy Attached</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <a 
                      href={getFileUrl(data.receiptUrl)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#2A9D8F] hover:bg-white hover:text-[#264653] text-white py-4 transition-all font-black uppercase text-[10px] tracking-widest"
                    >
                      <ExternalLink size={16}/> View / Open File
                    </a>
                    <a 
                      href={getFileUrl(data.receiptUrl)} 
                      download
                      className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white py-4 transition-all font-black uppercase text-[10px] tracking-widest border border-white/20"
                    >
                      <Download size={16}/> Save to Device
                    </a>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center opacity-40">
                  <XCircle size={40} className="mx-auto mb-4"/>
                  <p className="text-[10px] font-bold uppercase tracking-widest">No receipt uploaded</p>
                </div>
              )}
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="text-gray-300" size={24}/>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Internal ID</p>
                  <p className="font-black text-[#264653]">#DON-{data.donationId}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Component for List Rows
function DetailRow({ icon, label, value, sub }: any) {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-black text-[#264653] uppercase">{value}</p>
        </div>
      </div>
      {sub && <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1">{sub}</span>}
    </div>
  );
}