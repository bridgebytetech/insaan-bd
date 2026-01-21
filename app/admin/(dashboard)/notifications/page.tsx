"use client";
import { useEffect, useState } from "react";
import api from "@/app/lib/api/axios";
import { AdminNotification } from "@/app/types/notification";
import { CheckCircle, Clock, BellRing, Trash2, Loader2 } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllNotifications = async () => {
    try {
      const res = await api.get("/admin/notifications");
      setNotifications(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const markRead = async (id: number) => {
    await api.put(`/admin/notifications/${id}/mark-read`);
    fetchAllNotifications();
  };

  const markAllReadAll = async () => {
    await api.put("/admin/notifications/mark-all-read");
    fetchAllNotifications();
  };

  useEffect(() => { fetchAllNotifications(); }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#264653]">Notifications</h1>
          <p className="text-gray-500 font-medium">Manage all platform alerts and updates.</p>
        </div>
        <button 
          onClick={markAllReadAll}
          className="px-4 py-2 bg-white border border-gray-200 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <CheckCircle size={16} className="text-[#2A9D8F]" /> Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-[#2A9D8F]" /></div>
        ) : notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.notificationId} 
              className={`p-6 border-b border-gray-50 flex gap-4 transition-all ${!n.isRead ? 'bg-[#2A9D8F]/5' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${!n.isRead ? 'bg-[#2A9D8F] text-white' : 'bg-gray-100 text-gray-400'}`}>
                <BellRing size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className={`font-bold ${!n.isRead ? 'text-[#264653]' : 'text-gray-500'}`}>{n.notificationTitle}</h3>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12}/> {new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{n.notificationMessage}</p>
                {!n.isRead && (
                  <button 
                    onClick={() => markRead(n.notificationId)}
                    className="mt-3 text-xs font-black text-[#2A9D8F] uppercase tracking-wider hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-20 text-center text-gray-400">No notifications found</div>
        )}
      </div>
    </div>
  );
}