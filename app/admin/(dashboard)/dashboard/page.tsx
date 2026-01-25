"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users, Heart, Link2, ShieldCheck, Clock, 
  TrendingUp, ArrowUpRight, Loader2, AlertCircle, Bell, 
  BadgeDollarSign, ArrowRight, Zap, RefreshCcw, Activity
} from "lucide-react";
// Recharts import
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import api from "@/app/lib/api/axios";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // গ্রাফের জন্য ডাটা ফরম্যাট করা (XY Graph Data)
  const chartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Orphans', total: stats.totalOrphans, active: stats.connectedOrphans },
      { name: 'Donors', total: stats.totalDonors, active: stats.activeDonorsWithConnections },
      { name: 'Volunteers', total: stats.totalVolunteers, active: stats.approvedVolunteers },
      { name: 'Connections', total: stats.totalActiveConnections, active: stats.totalActiveConnections },
    ];
  }, [stats]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsSyncing(true);
      const [statsRes, notifRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/notifications")
      ]);
      if (statsRes.data.success) setStats(statsRes.data.data);
      setRecentActivities(notifRes.data.data.slice(0, 5));
    } catch (err) {
      setError(true);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (error) return <ErrorState reload={fetchDashboardData} />;
  if (!stats) return <LoadingState />;

  return (
    <div className="w-full space-y-8 md:space-y-12 pb-16 overflow-x-hidden px-4 md:px-8 max-w-[1600px] mx-auto">
      
      {/* --- Adaptive Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#2A9D8F]">
            <Zap size={20} className="fill-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">System Operational</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#264653] tracking-tight leading-[0.9]">
            Insaan <span className="text-[#2A9D8F]">Pulse</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest">
            Last Synced: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button 
            onClick={fetchDashboardData}
            className={`p-4 rounded-2xl border border-gray-100 bg-white text-gray-500 transition-all active:scale-90 ${isSyncing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={18} />
          </button>
          <Link href="/admin/notifications" className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white text-[#264653] px-6 py-4 rounded-2xl border border-gray-100 font-black text-xs uppercase tracking-widest shadow-sm">
            <Bell size={18} className="text-[#E76F51]" /> 
            Notifications <span className="bg-[#E76F51] text-white px-2 py-0.5 rounded-full text-[9px] ml-1">{stats.unreadNotifications}</span>
          </Link>
        </div>
      </div>

      {/* --- Main Metrics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Cash Flow" val={`৳${stats.totalVerifiedDonations.toLocaleString()}`} icon={BadgeDollarSign} color="text-emerald-500" bg="bg-emerald-50" trend="+12.5%" />
        <StatCard label="Live Connections" val={stats.totalActiveConnections} icon={Link2} color="text-blue-500" bg="bg-blue-50" trend="Active" />
        <StatCard label="Total Orphans" val={stats.totalOrphans} icon={Users} color="text-[#2A9D8F]" bg="bg-[#2A9D8F]/5" trend={`${stats.approvedOrphans} Approved`} />
        <StatCard label="Total Donors" val={stats.totalDonors} icon={Heart} color="text-[#E76F51]" bg="bg-[#E76F51]/5" trend={`${stats.activeDonorsWithConnections} Active`} />
      </div>

      {/* --- Growth Analytics XY Graph --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* XY Analytics Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h3 className="text-xl font-black text-[#264653] uppercase tracking-tighter flex items-center gap-2">
                   <TrendingUp className="text-[#2A9D8F]" size={20} /> Entity Growth
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global scaling & Engagement Metrics</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F]" />
                   <span className="text-[9px] font-black uppercase text-gray-400">Total Count</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#E76F51]" />
                   <span className="text-[9px] font-black uppercase text-gray-400">Live/Active</span>
                </div>
              </div>
           </div>

           <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ stroke: '#2A9D8F', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '15px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2A9D8F" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#E76F51" 
                  strokeWidth={3} 
                  fill="transparent"
                  strokeDasharray="8 8"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Inventory Column */}
        <div className="bg-[#264653] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <Activity className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5 rotate-12" />
          <h3 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
              Orphan Status
          </h3>
          <div className="space-y-8 relative z-10">
            <ProgressRow label="Connected" count={stats.connectedOrphans} total={stats.totalOrphans} color="bg-[#2A9D8F]" />
            <ProgressRow label="Available" count={stats.availableOrphans} total={stats.totalOrphans} color="bg-blue-400" />
            <ProgressRow label="Verification Pending" count={stats.pendingOrphans} total={stats.totalOrphans} color="bg-amber-400" />
          </div>
          
          <div className="mt-10 pt-8 border-t border-white/10 flex justify-between relative z-10">
            <div>
                <p className="text-[10px] font-black text-white/40 uppercase">Total Volunteers</p>
                <p className="text-xl font-black">{stats.totalVolunteers}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-white/40 uppercase">Volunteer Pending</p>
                <p className="text-xl font-black text-amber-400">{stats.pendingVolunteers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Logs & System Feed --- */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-[#264653] flex items-center gap-3">
              <Clock size={22} className="text-[#E76F51]" /> System Logs
            </h3>
            <Link href="/admin/notifications" className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
               <ArrowUpRight size={20} className="text-[#264653]" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivities.length > 0 ? recentActivities.map((act, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={act.notificationId} 
                className="flex items-start gap-4 p-5 bg-white border border-gray-50 hover:border-gray-200 hover:shadow-md rounded-2xl transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 ${act.isRead ? 'bg-gray-100 text-gray-400' : 'bg-[#2A9D8F]/10 text-[#2A9D8F]'}`}>
                  <Bell size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-[#264653] uppercase tracking-tight">{act.notificationTitle}</p>
                    <span className="text-[9px] font-black text-gray-300 uppercase">{new Date(act.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{act.notificationMessage}</p>
                </div>
              </motion.div>
            )) : (
                <div className="text-center py-10 text-gray-400 font-bold uppercase text-[10px] tracking-widest">No Recent Logs</div>
            )}
          </div>
        </div>
      </div>

      {/* --- Action Center Quick Badges --- */}
      {/* <div className="bg-white border-4 border-[#264653] p-6 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 relative z-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-[#264653] tracking-tighter italic">NEEDS REVIEW</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Critical Approval Queue</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <QueueBox label="Donors" count={stats.pendingDonors} color="border-amber-200 text-amber-600" />
            <QueueBox label="Volunteers" count={stats.pendingVolunteers} color="border-emerald-200 text-emerald-600" />
            <QueueBox label="Requests" count={stats.pendingConnectionRequests} color="border-blue-200 text-blue-600" />
            <QueueBox label="Verifications" count={stats.pendingDonationVerifications} color="border-red-200 text-red-600" />
          </div>
        </div>
      </div> */}
    </div>
  );
}

// --- Helper Components ---

function StatCard({ label, val, icon: Icon, color, bg, trend }: any) {
  return (
    <motion.div whileHover={{ y: -8 }} className="p-6 md:p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col gap-6 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div className={`w-14 h-14 md:w-16 md:h-16 ${bg} rounded-3xl flex items-center justify-center shrink-0 ${color} group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} />
        </div>
        <span className="text-[10px] font-black px-3 py-1 bg-gray-50 text-gray-400 rounded-full uppercase tracking-tighter">
            {trend}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h2 className="text-3xl md:text-4xl font-black text-[#264653] tracking-tighter leading-none truncate">{val}</h2>
      </div>
    </motion.div>
  );
}

function ProgressRow({ label, count, total, color }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
        <span>{label}</span>
        <span className="text-white">{count} / {total}</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percentage}%` }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  );
}

function QueueBox({ label, count, color }: any) {
    return (
      <div className={`p-4 border-2 rounded-3xl text-center min-w-[110px] ${color} bg-white transition-all hover:shadow-lg hover:-translate-y-1`}>
        <p className="text-2xl font-black leading-none">{count}</p>
        <p className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-60">{label}</p>
      </div>
    );
}

function LoadingState() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 border-4 border-[#2A9D8F] border-t-transparent rounded-full"
      />
      <p className="mt-6 font-black text-[#264653] uppercase tracking-[0.5em] text-xs animate-pulse">Syncing Intelligence</p>
    </div>
  );
}

function ErrorState({ reload }: { reload: () => void }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-white">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-red-100">
        <AlertCircle size={48} />
      </div>
      <h2 className="text-3xl font-black text-[#264653] uppercase tracking-tighter">Connection Lost</h2>
      <p className="text-gray-400 mt-2 font-medium max-w-xs mx-auto text-sm">Our satellite link to the central database has been interrupted.</p>
      <button 
        onClick={reload} 
        className="mt-8 px-10 py-4 bg-[#264653] text-white font-black rounded-2xl shadow-xl hover:bg-[#2A9D8F] transition-all uppercase text-[10px] tracking-widest"
      >
        Retry Connection
      </button>
    </div>
  );
}