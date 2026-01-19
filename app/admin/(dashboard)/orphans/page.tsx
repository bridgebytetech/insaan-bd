"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";
import api from "@/app/lib/api/axios";

type Orphan = {
  orphanId: number;
  orphanName: string;
  orphanAge: number;
  orphanAddress: string;
  orphanStatus: "PENDING" | "APPROVED" | "REJECTED";
  orphanDpUrl?: string;
};

export default function OrphanManagementPage() {
  const [orphans, setOrphans] = useState<Orphan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [search, setSearch] = useState("");

  const fetchOrphans = async () => {
    try {
      setLoading(true);
      let url = "/admin/orphans";

      if (filter === "pending") url = "/admin/orphans/pending";
      if (filter === "approved") url = "/admin/orphans/approved";
      if (search.trim()) url = `/admin/orphans/search?keyword=${search}`;

      const res = await api.get(url);
      if (res.data.success) {
        setOrphans(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch orphans error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrphans();
  }, [filter]);

  const handleApprove = async (id: number) => {
    await api.put(`/admin/orphans/${id}/approve`);
    fetchOrphans();
  };

  const handleReject = async (id: number) => {
    await api.put(`/admin/orphans/${id}/reject`);
    fetchOrphans();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this orphan?")) return;
    await api.delete(`/admin/orphans/${id}`);
    fetchOrphans();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#264653]">
            Orphan Management
          </h1>
          <p className="text-gray-500 font-medium">
            Manage and review orphan applications
          </p>
        </div>
        <Link
          href="/admin/orphans/add"
          className="flex items-center gap-2 bg-[#2A9D8F] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#264653] transition-all"
        >
          <Plus size={20} /> Add New Orphan
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrphans()}
            type="text"
            placeholder="Search by name or address..."
            className="w-full pl-12 pr-4 py-3 bg-[#EDF4E8]/50 rounded-xl outline-none focus:ring-2 ring-[#2A9D8F]/20 text-[#264653]"
          />
        </div>
        <div className="flex bg-[#EDF4E8]/50 p-1 rounded-xl">
          {["all", "pending", "approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === tab
                  ? "bg-white text-[#264653] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <p className="text-center py-10 font-bold text-gray-400">
          Loading orphans...
        </p>
      ) : orphans.length === 0 ? (
        <p className="text-center py-10 font-bold text-gray-400">
          No orphans found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orphans.map((orphan) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={orphan.orphanId}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={orphan.orphanDpUrl || "/placeholder.png"}
                  alt={orphan.orphanName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    orphan.orphanStatus === "APPROVED"
                      ? "bg-[#2A9D8F] text-white"
                      : "bg-[#E76F51] text-white"
                  }`}
                >
                  {orphan.orphanStatus}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-[#264653]">
                  {orphan.orphanName}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-gray-500 font-medium text-sm">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> Age: {orphan.orphanAge}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {orphan.orphanAddress || "N/A"}
                  </span>
                </div>

                <div className="mt-6 flex gap-2">
                  <Link
                    href={`/admin/orphans/${orphan.orphanId}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#EDF4E8] text-[#264653] py-3 rounded-xl font-bold hover:bg-[#2A9D8F] hover:text-white transition-all"
                  >
                    <Eye size={18} /> Details
                  </Link>

                  {orphan.orphanStatus === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(orphan.orphanId)}
                        className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(orphan.orphanId)}
                        className="p-3 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-500 hover:text-white transition-all"
                      >
                        <Clock size={18} />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(orphan.orphanId)}
                    className="p-3 bg-red-50 text-[#E76F51] rounded-xl hover:bg-[#E76F51] hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
