"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Users, Clock, CheckCircle } from "lucide-react";
import DonorTable from "@/app/components/admin/DonorTable";
import Link from "next/link";
import { donorService } from "@/app/lib/donorService";
import toast from "react-hot-toast";

type FilterTab = "ALL" | "PENDING" | "APPROVED";

export default function DonorManagementPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");

  const fetchDonors = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === "PENDING") res = await donorService.getPendingDonors();
      else if (activeTab === "APPROVED")
        res = await donorService.getApprovedDonors();
      else res = await donorService.getAllDonors();
      if (res.success) setDonors(res.data);
    } catch (error) {
      toast.error("Error loading donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [activeTab]);

  const handleApprove = async (id: number) => {
    const res = await donorService.approveDonor(id);
    if (res.success) {
      toast.success("Donor Approved");
      fetchDonors();
    }
  };

  const handleReject = async (id: number) => {
    const res = await donorService.rejectDonor(id);
    if (res.success) {
      toast.error("Donor Rejected");
      fetchDonors();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this donor?")) {
      try {
        const res = await donorService.deleteDonor(id);
        if (res.success) {
          toast.success("Donor Deleted");
          fetchDonors();
        }
      } catch (e) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-[#264653]">Donor Directory</h1>
        <Link
          href="/admin/donors/add"
          className="bg-[#264653] text-white px-6 py-3 rounded-2xl font-bold flex gap-2 hover:bg-opacity-90 transition-all"
        >
          <Plus size={20} /> Register New
        </Link>
      </div>

      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 w-fit shadow-sm">
        {(["ALL", "PENDING", "APPROVED"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab ? "bg-[#264653] text-white shadow-md" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search donors..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-3xl outline-none focus:ring-2 ring-[#2A9D8F]/20"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 font-bold text-gray-400">
          Fetching Data...
        </div>
      ) : (
        <DonorTable
          donors={donors}
          onToggleStatus={(id) =>
            donorService.toggleStatus(id).then(fetchDonors)
          }
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
