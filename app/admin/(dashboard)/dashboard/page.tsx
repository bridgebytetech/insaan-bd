"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, Heart, HandHelping, Link2, ShieldCheck, Clock, 
  TrendingUp, ArrowUpRight, Loader2, AlertCircle, Bell,BadgeDollarSign
} from "lucide-react";
import api from "@/app/lib/api/axios";

// API Response Type mapping
type DashboardStats = {
  totalOrphans: number;
  approvedOrphans: number;
  pendingOrphans: number;
  connectedOrphans: number;
  availableOrphans: number;
  totalDonors: number;
  approvedDonors: number;
  pendingDonors: number;
  activeDonorsWithConnections: number;
  totalVolunteers: number;
  approvedVolunteers: number;
  pendingVolunteers: number;
  totalActiveConnections: number;
  pendingConnectionRequests: number;
  pendingDisconnectRequests: number;
  totalVerifiedDonations: number;
  pendingDonationVerifications: number;
  unreadNotifications: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(true);
      }
    };
    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle size={50} className="text-red-400" />
        <h2 className="text-xl font-bold text-[#264653]">Server Connection Error</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#264653] text-white rounded-xl">Retry</button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
        <p className="text-[#264653] font-bold animate-pulse">Processing Real-time Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16 px-2">
      {/* --- Top Header & Notification Summary --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#264653] tracking-tight">Executive Overview</h1>
          <p className="text-gray-500 font-medium mt-1">Operational status of Insaan BD platform.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100">
            <Bell size={18} />
            <span className="font-bold">{stats.unreadNotifications} New Alerts</span>
          </div>
          <button className="bg-[#264653] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#264653]/20">
            <TrendingUp size={18} /> Reports
          </button>
        </div>
      </div>

      {/* --- Main High-Level Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Donations" val={`৳${stats.totalVerifiedDonations.toLocaleString()}`} icon={BadgeDollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Active Connections" val={stats.totalActiveConnections} icon={Link2} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Verified Orphans" val={stats.approvedOrphans} icon={Users} color="text-[#2A9D8F]" bg="bg-[#EDF4E8]" />
        <StatCard label="Verified Donors" val={stats.approvedDonors} icon={Heart} color="text-[#E76F51]" bg="bg-[#E76F51]/5" />
      </div>

      {/* --- Detailed Management Sections --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Orphans Breakdown */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#264653] mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#2A9D8F]" /> Orphan Inventory
          </h3>
          <div className="space-y-5">
            <ProgressRow label="Connected" count={stats.connectedOrphans} total={stats.totalOrphans} color="bg-[#2A9D8F]" />
            <ProgressRow label="Available" count={stats.availableOrphans} total={stats.totalOrphans} color="bg-blue-400" />
            <ProgressRow label="Pending Verification" count={stats.pendingOrphans} total={stats.totalOrphans} color="bg-amber-400" />
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 hover:bg-gray-100 text-[#264653] font-bold rounded-xl transition-all flex items-center justify-center gap-2">
            View All Orphans <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Stakeholders (Donors & Volunteers) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#264653] mb-6 flex items-center gap-2">
            <HandHelping size={20} className="text-[#E76F51]" /> Human Resources
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase">Donors (Pending)</p>
              <p className="text-2xl font-black text-[#264653]">{stats.pendingDonors}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase">Volunteers</p>
              <p className="text-2xl font-black text-[#264653]">{stats.totalVolunteers}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase">Vol. (Pending)</p>
              <p className="text-2xl font-black text-[#264653]">{stats.pendingVolunteers}</p>
            </div>
            <div className="p-4 bg-[#264653] rounded-2xl">
              <p className="text-xs font-bold text-gray-300 uppercase">Active Donors</p>
              <p className="text-2xl font-black text-white">{stats.activeDonorsWithConnections}</p>
            </div>
          </div>
        </div>

        {/* Action Required (Queues) */}
        <div className="bg-[#264653] p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#2A9D8F]" /> Approval Queue
            </h3>
            <div className="space-y-4">
              <QueueItem label="Connection Requests" count={stats.pendingConnectionRequests} />
              <QueueItem label="Donation Verifications" count={stats.pendingDonationVerifications} />
              <QueueItem label="Disconnect Requests" count={stats.pendingDisconnectRequests} />
            </div>
          </div>
          <button className="w-full mt-8 py-4 bg-[#2A9D8F] hover:bg-[#238b7f] rounded-2xl font-bold transition-all shadow-lg">
            Review All Requests
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ label, val, icon: Icon, color, bg }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5"
    >
      <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center ${color}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <h2 className="text-2xl font-black text-[#264653] mt-0.5">{val}</h2>
      </div>
    </motion.div>
  );
}

function ProgressRow({ label, count, total, color }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-gray-500">{label}</span>
        <span className="text-[#264653]">{count}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function QueueItem({ label, count }: any) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${count > 0 ? 'bg-amber-500 text-white' : 'bg-white/10 text-gray-400'}`}>
        {count}
      </span>
    </div>
  );
}