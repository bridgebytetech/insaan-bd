import {
  ArrowUpRight,
  Newspaper,
  Timer,
  Hash,
  ArrowRight,
  Sparkles
} from "lucide-react";

import Link from "next/link";

export default function ActivitiesPage() {
  const activities = [
    {
      id: "01",
      title: "খাদ্য নিরাপত্তা নিশ্চিতকরণ প্রজেক্ট ২০২৪",
      desc: "আমরা সফলভাবে সিলেট বিভাগের ৩০০ জন অনাথ শিশুর জন্য দীর্ঘমেয়াদী পুষ্টিকর খাদ্য সরবরাহ নিশ্চিত করেছি। এটি আমাদের 'জিরো হাঙ্গার' ভিশনের একটি অংশ।",
      tag: "Nutrition Update",
      date: "JAN 18, 2026",
      category: "OPERATIONS"
    },
    {
      id: "02",
      title: "মানসম্মত শিক্ষা ও উপকরণ বিতরণ",
      desc: "নতুন শিক্ষাবর্ষে শিশুদের হাতে পৌঁছে দেওয়া হয়েছে উন্নত মানের পাঠ্যপুস্তক ও শিক্ষা উপকরণ। মানসম্মত শিক্ষকদের মাধ্যমে চলছে নিয়মিত পাঠদান।",
      tag: "Education News",
      date: "JAN 15, 2026",
      category: "ACADEMIC"
    },
    {
      id: "03",
      title: "জরুরি স্বাস্থ্যসেবা ও হেলথ কার্ড বিতরণ",
      desc: "প্রতিটি অনাথ শিশুর জন্য একটি ইউনিক হেলথ কার্ড তৈরি করা হয়েছে, যার মাধ্যমে তারা যেকোনো জরুরি মুহূর্তে দ্রুত চিকিৎসা সেবা গ্রহণ করতে পারবে।",
      tag: "Health Bulletin",
      date: "JAN 10, 2026",
      category: "MEDICAL"
    },
    {
      id: "04",
      title: "নিরাপদ আবাসন ও মেন্টাল ওয়েলবিং",
      desc: "শিশুদের মানসিক বিকাশের জন্য আবাসন ব্যবস্থায় আমূল পরিবর্তন আনা হয়েছে এবং নিয়মিত কাউন্সেলিং সেশন আয়োজন করা হচ্ছে।",
      tag: "Shelter Update",
      date: "JAN 05, 2026",
      category: "SOCIETY"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Newspaper Header */}
        <div className="border-y-2 border-[#264653] py-8 mb-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="hidden md:block text-xs font-black uppercase tracking-widest text-gray-400">
            Official Bulletin <br /> Vol. 24 / Issue 01
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-[#264653] tracking-tighter uppercase text-center">
            Activities <span className="text-[#E76F51] font-serif italic">&</span> Updates
          </h1>
          <div className="text-right text-xs font-black uppercase tracking-widest text-gray-400">
            Sylhet, Bangladesh <br /> {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Newspaper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-gray-200">
          
          {/* Main Headline Story (Left Side) */}
          <div className="md:col-span-8 md:border-r border-gray-200 md:pr-12 pb-12">
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 text-[#2A9D8F] font-black text-xs mb-4 uppercase tracking-[0.2em]">
                <Newspaper size={14} /> Top Headline
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#264653] mb-6 leading-tight hover:text-[#2A9D8F] transition-colors">
                {activities[0].title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-serif">
                {activities[0].desc}
              </p>
              <div className="flex items-center justify-between py-6 border-t border-dashed border-gray-200">
                <div className="flex gap-4">
                   <span className="text-xs font-black bg-[#264653] text-white px-3 py-1 uppercase">{activities[0].category}</span>
                   <span className="text-xs font-black text-gray-400 uppercase flex items-center gap-1"><Timer size={12}/> {activities[0].date}</span>
                </div>
                <button className="flex items-center gap-2 font-black text-xs uppercase text-[#E76F51]">
                  Full Article <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Side Column Stories */}
          <div className="md:col-span-4 md:pl-12 space-y-12 pb-12">
            {activities.slice(1).map((act, i) => (
              <div key={i} className="group cursor-pointer border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                  <Hash size={12} className="text-[#E76F51]" /> {act.id} / {act.category}
                </div>
                <h3 className="text-xl font-black text-[#264653] mb-3 leading-snug group-hover:text-[#2A9D8F] transition-all">
                  {act.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {act.desc}
                </p>
                <div className="text-[10px] font-black text-gray-300 uppercase italic">
                  Posted on {act.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ticker/Info */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
           <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
              <p className="text-xs font-black text-[#264653] uppercase flex items-center gap-2 italic">
                <Sparkles size={14}/> Recent Impact: 120+ New Orphans Registered this week
              </p>
           </div>
           <Link href="/updates" className="text-xs font-black uppercase underline decoration-2 decoration-[#2A9D8F] underline-offset-4">
              View All Corporate Updates
           </Link>
        </div>

      </div>
    </div>
  );
}