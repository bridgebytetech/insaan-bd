"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Heart, HandHelping, Link2, ShieldCheck, Clock, 
  TrendingUp, ArrowUpRight, Loader2, AlertCircle, Bell, BadgeDollarSign, ArrowRight
} from "lucide-react";
import api from "@/app/lib/api/axios";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, notifRes] = await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/admin/notifications")
        ]);
        if (statsRes.data.success) setStats(statsRes.data.data);
        setRecentActivities(notifRes.data.data.slice(0, 4));
      } catch (err) {
        setError(true);
      }
    };
    fetchDashboardData();
  }, []);

  if (error) return <ErrorState />;
  if (!stats) return <LoadingState />;

  return (
    <div className="space-y-10 pb-16">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#264653] tracking-tight">Executive Overview</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time operational status of Insaan BD.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link href="/admin/notifications" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 text-amber-700 px-5 py-3 rounded-2xl border border-amber-100 font-bold">
            <Bell size={18} /> {stats.unreadNotifications} New Alerts
          </Link>
          <button className="flex-1 md:flex-none bg-[#264653] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#264653]/20">
            <TrendingUp size={18} /> Analytics
          </button>
        </div>
      </div>

      {/* --- High Level Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Donations" val={`৳${stats.totalVerifiedDonations.toLocaleString()}`} icon={BadgeDollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Active Connections" val={stats.totalActiveConnections} icon={Link2} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Verified Orphans" val={stats.approvedOrphans} icon={Users} color="text-[#2A9D8F]" bg="bg-[#EDF4E8]" />
        <StatCard label="Verified Donors" val={stats.approvedDonors} icon={Heart} color="text-[#E76F51]" bg="bg-[#E76F51]/5" />
      </div>

      {/* --- Middle Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#264653] mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#2A9D8F]" /> Orphan Inventory
          </h3>
          <div className="space-y-6">
            <ProgressRow label="Connected" count={stats.connectedOrphans} total={stats.totalOrphans} color="bg-[#2A9D8F]" />
            <ProgressRow label="Available" count={stats.availableOrphans} total={stats.totalOrphans} color="bg-blue-400" />
            <ProgressRow label="Pending" count={stats.pendingOrphans} total={stats.totalOrphans} color="bg-amber-400" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-[#264653] flex items-center gap-2">
              <Clock size={20} className="text-[#E76F51]" /> Recent Activity
            </h3>
            <Link href="/admin/notifications" className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">View History</Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.notificationId} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-100 transition-all">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.isRead ? 'bg-gray-200 text-gray-500' : 'bg-[#2A9D8F] text-white'}`}>
                  <Bell size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#264653]">{act.notificationTitle}</p>
                  <p className="text-xs text-gray-500 truncate">{act.notificationMessage}</p>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{new Date(act.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Action Queue --- */}
      <div className="bg-[#264653] p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-[#264653]/40">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-black italic">Action Required</h2>
          <p className="text-white/60 font-medium">There are {stats.pendingDonationVerifications + stats.pendingConnectionRequests} pending tasks.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <QueueBadge label="Donations" count={stats.pendingDonationVerifications} />
          <QueueBadge label="Connections" count={stats.pendingConnectionRequests} />
        </div>
        <button className="px-10 py-4 bg-[#2A9D8F] hover:bg-white hover:text-[#2A9D8F] rounded-2xl font-black transition-all flex items-center gap-3">
          Launch Review Center <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

// --- Internal Helper Components ---

function StatCard({ label, val, icon: Icon, color, bg }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="p-7 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
      <div className={`w-16 h-16 ${bg} rounded-[1.5rem] flex items-center justify-center ${color}`}><Icon size={32} /></div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
        <h2 className="text-3xl font-black text-[#264653] tracking-tighter">{val}</h2>
      </div>
    </motion.div>
  );
}

function ProgressRow({ label, count, total, color }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-black">
        <span className="text-gray-400 uppercase tracking-widest text-[10px]">{label}</span>
        <span className="text-[#264653]">{count}</span>
      </div>
      <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`h-full ${color} rounded-full`} />
      </div>
    </div>
  );
}

function QueueBadge({ label, count }: any) {
  return (
    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black">{count}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#2A9D8F]" size={50} />
      <p className="font-black text-[#264653] animate-pulse uppercase tracking-[0.3em] text-xs">Syncing Satellite Data</p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-inner"><AlertCircle size={40} /></div>
      <div>
        <h2 className="text-2xl font-black text-[#264653]">System Link Failure</h2>
        <p className="text-gray-500 mt-2">Unable to connect to the central intelligence.</p>
      </div>
      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#264653] text-white font-bold rounded-2xl shadow-xl">Re-establish Connection</button>
    </div>
  );
}