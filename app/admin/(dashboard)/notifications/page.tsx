"use client";
import { useEffect, useState, useCallback } from "react";
import api from "@/app/lib/api/axios";
import { AdminNotification } from "@/app/lib/types/notification";
import { 
  CheckCircle, Clock, BellRing, Trash2, Loader2, 
  Inbox, Sparkles, Filter, MoreHorizontal, CheckCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchAllNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/notifications");
      setNotifications(res.data.data);
    } catch (err) { 
      toast.error("Failed to sync notifications");
    } finally { 
      setLoading(false); 
    }
  }, []);

  const markRead = async (id: number) => {
    try {
      setActionLoading(id);
      await api.put(`/admin/notifications/${id}/mark-read`);
      setNotifications(prev => 
        prev.map(n => n.notificationId === id ? { ...n, isRead: true } : n)
      );
      toast.success("Notification marked as read", { icon: '✅', style: { borderRadius: '15px', fontWeight: 'bold'} });
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const markAllReadAll = async () => {
    const loadingToast = toast.loading("Updating all alerts...");
    try {
      await api.put("/admin/notifications/mark-all-read");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("Inbox cleared!", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to clear inbox", { id: loadingToast });
    }
  };

  useEffect(() => { fetchAllNotifications(); }, [fetchAllNotifications]);

  const displayedNotifications = filter === "UNREAD" 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#2A9D8F]">
            <Sparkles size={18} className="fill-[#2A9D8F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Insaan Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#264653] tracking-tighter">
            System <span className="text-[#2A9D8F]">Alerts</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Manage your critical mission updates
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={markAllReadAll}
            className="flex-1 md:flex-none px-6 py-4 bg-[#264653] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        </div>
      </div>

      {/* --- Filter Tabs & Stats --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex p-1 gap-1 w-full sm:w-auto">
          {["ALL", "UNREAD"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`flex-1 sm:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all ${
                filter === t ? "bg-[#264653] text-white shadow-lg" : "text-gray-400 hover:text-[#264653]"
              }`}
            >
              {t} {t === "UNREAD" && `(${notifications.filter(n => !n.isRead).length})`}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 px-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
           <Inbox size={14} /> Total Records: {notifications.length}
        </div>
      </div>

      {/* --- Notification List --- */}
      <div className="space-y-3 relative">
        {loading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Syncing Inbox...</p>
          </div>
        ) : displayedNotifications.length > 0 ? (
          <div className="grid gap-3">
            <AnimatePresence mode="popLayout">
              {displayedNotifications.map((n) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={n.notificationId} 
                  className={`group relative p-6 md:p-8 rounded-[2.5rem] border transition-all flex flex-col md:flex-row gap-6 ${
                    !n.isRead 
                    ? 'bg-white border-[#2A9D8F]/20 shadow-xl shadow-[#2A9D8F]/5' 
                    : 'bg-gray-50/50 border-transparent grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  {/* Status Glow Indicator */}
                  {!n.isRead && <div className="absolute top-8 left-4 w-1.5 h-1.5 bg-[#2A9D8F] rounded-full animate-pulse shadow-[0_0_10px_#2A9D8F]" />}

                  <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 ${!n.isRead ? 'bg-[#264653] text-white' : 'bg-white border border-gray-100 text-gray-300'}`}>
                    <BellRing size={22} className={!n.isRead ? "animate-bounce mt-1" : ""} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <h3 className={`text-lg font-black tracking-tight uppercase ${!n.isRead ? 'text-[#264653]' : 'text-gray-400'}`}>
                        {n.notificationTitle}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100/50 rounded-full text-[10px] font-black text-gray-400 flex items-center gap-1.5">
                        <Clock size={12}/> {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                      </span>
                    </div>
                    <p className={`text-sm md:text-base font-medium leading-relaxed ${!n.isRead ? 'text-gray-600' : 'text-gray-400'}`}>
                      {n.notificationMessage}
                    </p>
                    
                    {!n.isRead && (
                      <div className="pt-4">
                        <button 
                          disabled={actionLoading === n.notificationId}
                          onClick={() => markRead(n.notificationId)}
                          className="flex items-center gap-2 text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.2em] px-4 py-2 bg-[#2A9D8F]/10 rounded-xl hover:bg-[#2A9D8F] hover:text-white transition-all disabled:opacity-50"
                        >
                          {actionLoading === n.notificationId ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                          Mark as completed
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Desktop Hover Action */}
                  <div className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-[3rem] border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
               <Inbox size={40} />
            </div>
            <div>
              <p className="text-xl font-black text-[#264653] uppercase tracking-tighter">Inbox Zero</p>
              <p className="text-gray-400 text-sm font-medium">No alerts currently require your attention.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}