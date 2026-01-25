"use client";
import { motion } from "framer-motion";
import { Target, Award, ChevronRight, Heart, Sparkles, ShieldCheck,Users ,Star } from "lucide-react";
import Link from "next/link"

export default function Introduction() {
  return (
    <section className="relative py-24 md:py-44 bg-white overflow-hidden">
      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* Vertical Title for Museum Feel */}
      <div className="absolute top-0 left-4 h-full hidden xl:flex items-center pointer-events-none">
        <span className="text-[12rem] font-black text-gray-50/60 uppercase tracking-tighter origin-center -rotate-90 select-none">
          Legacy
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          
          {/* --- LEFT COLUMN: LAYERED VISUALS --- */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] max-w-[500px] mx-auto lg:ml-0">
              
              {/* Main Image with Precision Border */}
              <motion.div 
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1, ease: "circOut" }}
                className="relative z-10 w-full h-full border-[12px] border-white shadow-2xl shadow-gray-200 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                  alt="Insaan BD Mission"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>

              {/* Floating Architectural Badge */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-10 -right-10 md:-right-16 z-20 bg-[#264653] p-10 shadow-3xl text-white min-w-[200px]"
              >
                <Sparkles className="text-[#2A9D8F] mb-4" size={32} />
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/50 mb-1">Since</p>
                <h4 className="text-5xl font-black tracking-tighter">২০২৬</h4>
                <div className="h-1 w-12 bg-[#2A9D8F] mt-4" />
              </motion.div>

              {/* Back Accent - Soft Geometric */}
              <div className="absolute -bottom-12 -left-12 w-full h-full border-2 border-gray-100 -z-10" />
            </div>
          </div>

          {/* --- RIGHT COLUMN: SOPHISTICATED COPY --- */}
          <div className="w-full lg:w-1/2 space-y-12">
            
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.6em]">About our foundation</span>
                <div className="flex-1 h-[1px] bg-gray-100" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-[#264653] leading-[0.85] tracking-tighter">
                আমরা এবং <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] to-[#264653]">আমাদের উদ্দেশ্য</span>
              </h2>
            </header>

            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-[#264653] font-bold leading-snug border-l-4 border-[#E76F51] pl-8">
                Insaan BD একটি অলাভজনক সংস্থা যা প্রতিটি এতিম শিশুর মৌলিক অধিকার নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
              </p>
              
              <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
                আমাদের লক্ষ্য কেবল সাহায্য করা নয়, বরং একটি শিশুকে স্বাবলম্বী হিসেবে গড়ে তোলা। আমরা শিক্ষা, স্বাস্থ্য এবং মানসিক বিকাশের মাধ্যমে একটি স্থায়ী ইতিবাচক পরিবর্তন আনতে কাজ করি।
              </p>
            </div>

            {/* Premium Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              {[
                { icon: ShieldCheck, title: "Mission", desc: "পূর্ণ স্বচ্ছতা ও জবাবদিহিতা", color: "#2A9D8F" },
               { icon: Award, title: "Vision", desc: "স্বাবলম্বী ও আত্মবিশ্বাসী ভবিষ্যৎ", color: "#E76F51" },
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-5 p-6 border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="p-3 bg-white shadow-sm transition-colors group-hover:bg-[#264653]">
                    <item.icon size={22} className="group-hover:text-white" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#264653] text-[10px] uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs font-bold text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION SECTION */}
            <div className="flex flex-col sm:flex-row items-center gap-10 pt-4">
              <Link href="/activities">
                <button className="relative group overflow-hidden bg-[#264653] text-white px-10 py-6 font-black uppercase text-[10px] tracking-[0.4em] transition-all">
                  <span className="relative z-10 flex items-center gap-4">
                    Full Story <ChevronRight size={18} />
                  </span>
                  <div className="absolute inset-0 bg-[#2A9D8F] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>

      <div className="flex items-center gap-4">
  <div className="flex -space-x-4">
    {[
      { icon: Heart, bg: "bg-[#2A9D8F]/10", color: "text-[#2A9D8F]" },
      { icon: Users, bg: "bg-[#264653]/10", color: "text-[#264653]" },
      { icon: ShieldCheck, bg: "bg-[#E76F51]/10", color: "text-[#E76F51]" },
      { icon: Star, bg: "bg-[#2A9D8F]/10", color: "text-[#2A9D8F]" }
    ].map((item, i) => {
      const Icon = item.icon;
      return (
        <div
          key={i}
          className={`w-12 h-12 ${item.bg} ${item.color} rounded-full border-4 border-white flex items-center justify-center shadow-sm transition-all duration-300 hover:z-10 hover:scale-110 cursor-pointer`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </div>
      );
    })}
  </div>
  
  <div className="h-10 w-[1px] bg-gray-100 mx-2" />
  
<div>
  <p className="text-lg font-black text-[#264653] leading-none tracking-tighter">সম্মিলিত প্রচেষ্টা</p>
  <p className="text-[9px] font-black text-[#E76F51] uppercase tracking-[0.2em] mt-1.5">
    একটি মানবিক পরিবার
  </p>
</div>
</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}