'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, HandHeart, CircleDollarSign, 
  Image as ImageIcon, Star, Settings, X, Activity, Link2 ,MessageSquareQuote,ShieldCheck,Globe
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orphans', label: 'Orphans', icon: Users },
    { href: '/admin/donors', label: 'Donors', icon: HandHeart },
    { href: '/admin/connections', label: 'Connections', icon: Link2 }, // নতুন যুক্ত করা হলো
    { href: '/admin/donations', label: 'Donations', icon: CircleDollarSign },
    { href: '/admin/activities', label: 'Activities', icon: Activity },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareQuote }, // নতুন রিভিউ অপশন
    // { href: '/admin/success-stories', label: 'Stories', icon: Star },\
    { href: '/admin/volunteer', label: 'Volunteers', icon: ShieldCheck }, // নতুন ভলান্টিয়ার অপশন যুক্ত করা হলো
    { href: '/admin/public-donation', label: 'Public Donations', icon: Globe }, // নতুন ভলান্টিয়ার অপশন যুক্ত করা হলো
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Aside */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#264653] text-[#EDF4E8] shadow-2xl z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-[#2A9D8F]/20 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#2A9D8F] tracking-tight">Insaan BD</h1>
            <p className="text-[10px] text-[#EDF4E8]/50 uppercase tracking-[0.2em]">Management System</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden p-2 hover:bg-[#2A9D8F]/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { if(window.innerWidth < 1024) setIsOpen(false) }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#2A9D8F] text-white shadow-lg shadow-[#2A9D8F]/20' 
                    : 'hover:bg-[#EDF4E8]/5 text-[#EDF4E8]/80 hover:text-white'
                }`}
              >
                <Icon size={20} className={`${isActive ? 'text-white' : 'text-[#2A9D8F] group-hover:scale-110 transition-transform'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}