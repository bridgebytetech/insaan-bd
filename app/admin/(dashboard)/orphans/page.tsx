"use client";
import { useState, useEffect } from "react";
import api from "@/app/lib/api/axios";
import OrphanTable from "@/app/components/admin/OrphanTable";
import OrphanStats from "@/app/components/admin/OrphanStats";
import { Plus, Search, Loader2, SlidersHorizontal, Hash, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function AdminOrphansPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orphans");
      setData(res.data.data || []);
    } catch (error) { 
      console.error("Error fetching orphans:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // Filter logic: নাম অথবা ID দিয়ে সার্চ করার জন্য
  const filteredData = data.filter((item: any) => 
    item.orphanName?.toLowerCase().includes(search.toLowerCase()) || 
    item.orphanId?.toString().includes(search)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 p-2 md:p-0">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#264653] text-white rounded-lg text-[10px] font-black uppercase tracking-[0.3em]">
            <Hash size={12} className="text-[#2A9D8F]" />
            Orphan Database v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#264653] tracking-tighter uppercase leading-tight">
            শিশুদের <span className="text-[#2A9D8F]">তালিকা</span>
          </h1>
          <p className="text-[#4A6651] font-bold text-sm border-l-4 border-[#2A9D8F] pl-4 max-w-xl">
            সিস্টেমে নিবন্ধিত সকল শিশুদের প্রোফাইল এবং ইউনিক আইডি (ID) এখান থেকে পরিচালনা ও ফিল্টার করুন।
          </p>
        </div>

        <Link href="/admin/orphans/add" className="group relative px-8 py-5 bg-[#E76F51] text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-3 overflow-hidden transition-all shadow-xl hover:bg-[#264653] hover:shadow-2xl">
          <Plus size={20} />
          <span>নতুন শিশু যুক্ত করুন</span>
        </Link>
      </div>

      {/* Statistics Section */}
      <OrphanStats 
        total={data.length} 
        pending={data.filter((o:any) => o.orphanStatus === 'PENDING').length} 
        approved={data.filter((o:any) => o.orphanStatus === 'APPROVED').length} 
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2A9D8F] transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="শিশুর নাম অথবা আইডি (ID) লিখে সার্চ করুন..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:bg-white focus:border-[#2A9D8F]/30 transition-all font-bold text-[#264653]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#264653] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2A9D8F] transition-all">
          <SlidersHorizontal size={18} />
          <span>অ্যাডভান্সড ফিল্টার</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-[#2A9D8F]" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400">শিশুদের প্রোফাইল ডাটাবেস</h2>
          </div>
          <span className="text-[10px] font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-3 py-1 rounded-full">
            Total Results: {filteredData.length}
          </span>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#2A9D8F] mb-4" size={50} />
            <p className="text-[#264653] font-black tracking-[0.2em] uppercase text-[10px]">তথ্য প্রসেস হচ্ছে...</p>
          </div>
        ) : (
          /* ডাটা হিসেবে filteredData পাস করা হয়েছে */
          <OrphanTable data={filteredData} refresh={fetchData} />
        )}
      </div>
    </div>
  );
}