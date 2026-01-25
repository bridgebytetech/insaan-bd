// "use client";

// import { useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import api from "@/app/lib/api/donorApi";
// import { Heart, ArrowLeft, Send, DollarSign, Calendar, Hash, FileText, Link as LinkIcon } from "lucide-react";
// import toast from "react-hot-toast";

// function DonationForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orphanId = searchParams.get("orphanId");
//   const orphanName = searchParams.get("name");

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     orphanId: Number(orphanId),
//     donationDate: new Date().toISOString().split('T')[0],
//     donationAmount: "",
//     donationDescription: "",
//     receiptUrl: "",
//     transactionId: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.donationAmount || !formData.transactionId) {
//       return toast.error("টাকার পরিমাণ এবং ট্রানজেকশন আইডি আবশ্যক।");
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/donor/donations", {
//         ...formData,
//         donationAmount: Number(formData.donationAmount),
//       });

//       if (res.data.success) {
//         toast.success("ডোনেশন তথ্য সফলভাবে জমা দেওয়া হয়েছে! এডমিন এটি যাচাই করবেন।", {
//           duration: 4000,
//           icon: '✅'
//         });
//         setTimeout(() => router.push("/donors/profile"), 2000);
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "ডোনেশন জমা দেওয়া সম্ভব হয়নি।");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20">
//       <div className="max-w-2xl mx-auto px-6">
        
//         <button 
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-gray-400 hover:text-[#264653] mb-8 font-bold text-sm transition-colors"
//         >
//           <ArrowLeft size={18} /> প্রোফাইলে ফিরে যান
//         </button>

//         <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-40 h-40 bg-[#E76F51]/5 rounded-bl-[100px] -z-0" />
          
//           <div className="relative z-10">
//             <div className="flex items-center gap-4 mb-10">
//               <div className="p-4 bg-[#FEF1EE] text-[#E76F51] rounded-3xl">
//                 <Heart size={32} fill="currentColor" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-black text-[#264653] tracking-tighter">অনুদান দিন</h1>
//                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
//                   শিশু: <span className="text-[#E76F51]">{orphanName || "নির্ধারিত নয়"}</span>
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               {/* Amount */}
//               <div className="md:col-span-1 space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">টাকার পরিমাণ (BDT)</label>
//                 <div className="relative">
//                   <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                   <input
//                     type="number"
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E76F51]/20 outline-none font-bold text-[#264653]"
//                     placeholder="৫০০০"
//                     value={formData.donationAmount}
//                     onChange={(e) => setFormData({...formData, donationAmount: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Transaction ID */}
//               <div className="md:col-span-1 space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ট্রানজেকশন আইডি (TxID)</label>
//                 <div className="relative">
//                   <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                   <input
//                     type="text"
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E76F51]/20 outline-none font-bold text-[#264653]"
//                     placeholder="TRX98234..."
//                     value={formData.transactionId}
//                     onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Date */}
//               <div className="md:col-span-1 space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ডোনেশনের তারিখ</label>
//                 <div className="relative">
//                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                   <input
//                     type="date"
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E76F51]/20 outline-none font-bold text-[#264653]"
//                     value={formData.donationDate}
//                     onChange={(e) => setFormData({...formData, donationDate: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Receipt URL */}
//               <div className="md:col-span-1 space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">রসিদের লিংক (ঐচ্ছিক)</label>
//                 <div className="relative">
//                   <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                   <input
//                     type="url"
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E76F51]/20 outline-none font-bold text-[#264653]"
//                     placeholder="https://imgur.com/..."
//                     value={formData.receiptUrl}
//                     onChange={(e) => setFormData({...formData, receiptUrl: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2 space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মন্তব্য (ঐচ্ছিক)</label>
//                 <div className="relative">
//                   <FileText className="absolute left-4 top-4 text-gray-300" size={18} />
//                   <textarea
//                     rows={3}
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E76F51]/20 outline-none font-bold text-[#264653]"
//                     placeholder="আপনার অনুদান সম্পর্কে কিছু লিখুন..."
//                     value={formData.donationDescription}
//                     onChange={(e) => setFormData({...formData, donationDescription: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="md:col-span-2 pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-5 bg-[#264653] text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-[#E76F51] shadow-xl hover:shadow-[#E76F51]/20 active:scale-[0.98] disabled:opacity-70"
//                 >
//                   {loading ? (
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   ) : (
//                     <>
//                       <Send size={18} /> তথ্য জমা দিন
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function DonationPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <DonationForm />
//     </Suspense>
//   );
// }