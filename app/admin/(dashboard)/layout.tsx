"use client";
import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/app/components/admin/Sidebar';
import { Menu, Bell, UserCircle, LogOut, Clock, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import api from "@/app/lib/api/axios";
import Link from 'next/link';
import { logout } from "@/app/lib/api/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifs, setRecentNotifs] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Add this

  // Add this effect to check if component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchNotifications = async () => {
    // Only fetch if component is mounted (client-side only)
    if (!isMounted) return;
    
    try {
      const [countRes, unreadRes] = await Promise.all([
        api.get("/admin/notifications/unread-count"),
        api.get("/admin/notifications/unread")
      ]);
      setUnreadCount(countRes.data.data);
      setRecentNotifs(unreadRes.data.data.slice(0, 5));
    } catch (err) {
      console.error("Notification fetch error:", err);
      // Optionally set default values on error
      setUnreadCount(0);
      setRecentNotifs([]);
    }
  };

  useEffect(() => {
    // Only run if mounted
    if (!isMounted) return;
    
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [isMounted]); // Add isMounted as dependency

  return (
    <div 
      className="admin-layout" 
      style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
    >
      <div className="flex min-h-screen bg-[#EDF4E8] text-[#264653] overflow-x-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-72' : 'pl-0'}`}>
          <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden outline-none"
              >
                <Menu size={24} />
              </button>
              <h2 className="font-black text-lg hidden md:block tracking-tight uppercase">Dashboard Overview</h2>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Notification Dropdown */}
              <div className="relative ">
                <button 
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                  className="p-2.5 hover:bg-gray-100 rounded-full text-gray-500 relative transition-all outline-none"
                >
                  <Bell size={22} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-[#E76F51] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotifOpen && (
                    <>
                      <div className="fixed inset-0 z-[-1]" onClick={() => setIsNotifOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-[calc(100vw-32px)] sm:w-96 bg-white border border-gray-100 rounded-3xl shadow-2xl z-[70] overflow-hidden"
                      >
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                          <span className="font-black text-[#264653]">Recent Alerts</span>
                          <Link href="/admin/notifications" onClick={() => setIsNotifOpen(false)} className="text-xs font-bold text-[#2A9D8F] hover:underline">View All</Link>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {recentNotifs.length > 0 ? (
                            recentNotifs.map((n: any) => (
                              <div key={n.notificationId} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#2A9D8F]/10 flex items-center justify-center text-[#2A9D8F] shrink-0">
                                    <BellRing size={14} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-[#264653] leading-tight truncate">{n.notificationTitle}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{n.notificationMessage}</p>
                                    <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1"><Clock size={10}/> {new Date(n.createdAt).toLocaleTimeString()}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-10 text-center">
                              <p className="text-sm text-gray-400 font-medium">No unread notifications</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
              
              {/* Profile Dropdown */}
              <div className="relative flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-[#264653] leading-none mb-1">Super Admin</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Insaan BD Control</p>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                    className="p-0.5 border-2 border-[#2A9D8F] rounded-full hover:bg-gray-50 transition-all outline-none"
                  >
                    <UserCircle size={32} className="text-[#264653]" strokeWidth={1.5} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <>
                        <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[70] overflow-hidden py-2"
                        >
                          <div className="px-4 py-2 border-b border-gray-50 mb-1 sm:hidden">
                              <p className="text-xs font-black text-[#264653]">Super Admin</p>
                          </div>
                          <button 
                            onClick={() => { if(confirm("Are you sure?")) logout(); }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut size={18} /> Log Out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            <div className="h-full min-h-full">
               {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}