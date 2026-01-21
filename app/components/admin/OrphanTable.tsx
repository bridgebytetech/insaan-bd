"use client";
import Link from "next/link";
import { Eye, Edit, Trash2, MapPin, User, Calendar, Hash } from "lucide-react";
import StatusButtons from "./StatusButtons";
import api from "@/app/lib/api/axios";
import { toast } from "react-hot-toast";

export default function OrphanTable({ data, refresh }: { data: any[], refresh: () => void }) {
  
  const deleteOrphan = async (id: number) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই প্রোফাইলটি মুছে ফেলতে চান?")) {
      try {
        await api.delete(`/admin/orphans/${id}`);
        toast.success("সফলভাবে মুছে ফেলা হয়েছে");
        refresh();
      } catch (error) {
        toast.error("মুছে ফেলা সম্ভব হয়নি");
      }
    }
  };

  return (
    <div className="relative">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#2A9D8F]/5">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#ECF4E8]/50">
              {/* ID Column Header */}
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 border-b border-gray-100 w-20">ID</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 border-b border-gray-100">শিশু ও অবস্থান</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 border-b border-gray-100">বিবরণ</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 border-b border-gray-100 text-center">অবস্থা</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#264653]/60 border-b border-gray-100 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((orphan) => (
              <tr key={orphan.orphanId} className="group hover:bg-[#ECF4E8]/20 transition-all duration-300">
                {/* ID Column Cell */}
                <td className="px-8 py-5">
                   <div className="bg-[#264653] text-[#2A9D8F] text-[11px] font-black px-2 py-1.5 rounded-lg text-center shadow-sm">
                      #{orphan.orphanId}
                   </div>
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={orphan.orphanDpUrl || "/default-avatar.png"} 
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md shadow-[#264653]/5" 
                        alt={orphan.orphanName} 
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${orphan.orphanStatus === 'APPROVED' ? 'bg-[#2A9D8F]' : 'bg-amber-500'}`} />
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-[#264653] text-lg leading-tight mb-1">{orphan.orphanName}</p>
                      <p className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        <MapPin size={12} className="text-[#2A9D8F]" /> {orphan.orphanAddress}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#264653]">{orphan.orphanGender === 'MALE' ? 'ছেলে' : 'মেয়ে'}</p>
                    <p className="text-xs font-medium text-gray-500">{orphan.orphanAge} বছর বয়স</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                      orphan.orphanStatus === 'APPROVED' 
                      ? 'bg-[#2A9D8F]/10 text-[#2A9D8F] border border-[#2A9D8F]/20' 
                      : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {orphan.orphanStatus === 'APPROVED' ? 'ভেরিফাইড' : 'পেন্ডিং'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-end items-center gap-1">
                    <StatusButtons id={orphan.orphanId} refresh={refresh} />
                    <div className="w-px h-6 bg-gray-200 mx-2" />
                    <div className="flex items-center gap-1">
                      <Link 
                        href={`/admin/orphans/${orphan.orphanId}`} 
                        className="p-2.5 text-gray-400 hover:text-[#2A9D8F] hover:bg-[#2A9D8F]/10 rounded-xl transition-all"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </Link>
                      <Link 
                        href={`/admin/orphans/edit/${orphan.orphanId}`} 
                        className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Profile"
                      >
                        <Edit size={20} />
                      </Link>
                      <button 
                        onClick={() => deleteOrphan(orphan.orphanId)} 
                        className="p-2.5 text-gray-400 hover:text-[#E76F51] hover:bg-[#E76F51]/10 rounded-xl transition-all"
                        title="Delete Record"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((orphan) => (
          <div key={orphan.orphanId} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={orphan.orphanDpUrl || "/default-avatar.png"} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-md" 
                  alt="" 
                />
                {/* ID Tag on Image for Mobile */}
                <div className="absolute -top-2 -left-2 bg-[#264653] text-[#2A9D8F] text-[9px] font-black px-2 py-0.5 rounded shadow-lg border border-[#2A9D8F]/20">
                  ID {orphan.orphanId}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-[#264653] text-lg leading-tight">{orphan.orphanName}</h3>
                  <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                    orphan.orphanStatus === 'APPROVED' ? 'bg-[#2A9D8F]/10 text-[#2A9D8F]' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {orphan.orphanStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1 uppercase tracking-tighter">
                  <MapPin size={12} className="text-[#2A9D8F]" /> {orphan.orphanAddress}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-50">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                  <User size={14} className="text-[#2A9D8F]" /> {orphan.orphanGender}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                  <Calendar size={14} className="text-[#2A9D8F]" /> {orphan.orphanAge} বছর
                </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <StatusButtons id={orphan.orphanId} refresh={refresh} />
              <div className="flex gap-2">
                <Link href={`/admin/orphans/${orphan.orphanId}`} className="p-3 bg-gray-50 text-[#264653] rounded-xl"><Eye size={18} /></Link>
                <Link href={`/admin/orphans/edit/${orphan.orphanId}`} className="p-3 bg-gray-50 text-blue-500 rounded-xl"><Edit size={18} /></Link>
                <button onClick={() => deleteOrphan(orphan.orphanId)} className="p-3 bg-gray-50 text-[#E76F51] rounded-xl"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}