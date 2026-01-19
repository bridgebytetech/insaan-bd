'use client';
import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/app/components/admin/Sidebar';
import { Menu, Bell, UserCircle, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // ১০২৪ পিক্সেল বা তার বেশি হলে সাইডবার ওপেন থাকবে
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#EDF4E8] text-[#264653]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* ডেক্সটপে সাইডবার সব সময় ৭২ সাইজ নিয়ে থাকবে (lg:pl-72)
          মোবাইলে এটি ফুল উইথ থাকবে
      */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-72' : 'pl-0'}`}>
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            {/* lg:hidden ক্লাসটি ব্যবহারের ফলে ডেক্সটপে এই বাটনটি আর দেখা যাবে না 
            */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-[#264653] transition-colors lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            <h2 className="font-semibold text-lg text-[#264653]">Overview</h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#E76F51] rounded-full"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">John Doe</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Super Admin</p>
              </div>
              <button className="p-1 border-2 border-[#2A9D8F] rounded-full transition-transform hover:scale-105">
                <UserCircle size={28} className="text-[#264653]" />
              </button>
              <button title="Logout" className="ml-2 p-2 text-[#E76F51] hover:bg-[#E76F51]/10 rounded-lg transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-70px)]">
          {children}
        </main>
      </div>
    </div>
  );
}