"use client";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Phone, ShieldCheck, Zap, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
export default function FinalCTA() {

  return (
    <section className="relative py-24 md:py-44 bg-[#F8F9FA] overflow-hidden px:6 md:px-10">
      {/* --- ARCHITECTURAL GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative px:6 md:px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]">
          
          {/* --- LEFT SIDE: THE STATEMENT (7 Columns) --- */}
          <div className="lg:col-span-8 p-10 md:p-20 border-r border-gray-100 relative overflow-hidden group">
            {/* Background Kinetic Text */}
            <span className="absolute -bottom-10 -left-10 text-[15rem] font-black text-gray-50 select-none leading-none -z-10 group-hover:text-[#2A9D8F]/5 transition-colors duration-700">
              INSAN
            </span>

            <div className="space-y-10 relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-[2px] bg-[#E76F51]" />
                <span className="text-[10px] font-black text-[#E76F51] uppercase tracking-[0.5em]">
                  Final Call to Action
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black text-[#264653] leading-[0.9] tracking-tighter"
              >
                আজই কারো মুখে <br />
                <span className="text-[#2A9D8F]">হাসি ফোটান</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-lg md:text-xl text-gray-400 max-w-xl font-medium leading-relaxed"
              >
                আপনার একটি সিদ্ধান্ত বদলে দিতে পারে একটি এতিম শিশুর পৃথিবী। 
                আমরা প্রতিটি অনুদানের সর্বোচ্চ স্বচ্ছতা নিশ্চিত করি।
              </motion.p>

              {/* ACTION AREA */}
              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <Link href="/orphans">
                
                <button className="group relative bg-[#264653] text-white px-10 py-6 font-black uppercase text-[11px] tracking-[0.3em] overflow-hidden transition-all hover:bg-[#2A9D8F]">
                  <span className="relative z-10 flex items-center gap-4">
                    Sponsor Now <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                </Link>
                
               <Link href="/donation">
  <button className="group flex items-center gap-4 px-10 py-6 border border-gray-200 text-[#264653] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-gray-50 transition-all">
    Donate 
    <Heart 
      size={18} 
      className="text-[#E76F51] group-hover:scale-125 transition-transform" 
      fill="#E76F51" 
    />
  </button>
</Link>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTACT & TRUST (4 Columns) --- */}
          <div className="lg:col-span-4 bg-gray-50/50 p-10 md:p-16 flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Trust Protocol</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <ShieldCheck size={20} className="text-[#2A9D8F] shrink-0" />
                    <p className="text-xs font-bold text-[#264653] leading-tight">১০০% স্বচ্ছতা ও সরাসরি ব্যাংক ট্রান্সফার সুবিধা।</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap size={20} className="text-[#E76F51] shrink-0" />
                    <p className="text-xs font-bold text-[#264653] leading-tight">রিয়েল-টাইম আপডেট ও ইমপ্যাক্ট রিপোর্ট।</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-200">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Connect</h4>
                <div className="space-y-8">
                  <a href="tel:+88017000000" className="block group">
                    <p className="text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest mb-1">Help Desk</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#264653] tracking-tighter">+৮৮০ ১৭০০-০০০০০</span>
                      <ArrowUpRight size={20} className="text-gray-300 group-hover:text-[#2A9D8F] transition-colors" />
                    </div>
                  </a>
                  
                  <a href="mailto:support@insanbd.org" className="block group">
                    <p className="text-[9px] font-black text-[#2A9D8F] uppercase tracking-widest mb-1">Email Inquiry</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#264653] tracking-tighter uppercase">Support</span>
                      <ArrowUpRight size={20} className="text-gray-300 group-hover:text-[#2A9D8F] transition-colors" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-12">
               <div className="p-4 bg-white border border-gray-100 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black text-[#264653] uppercase tracking-widest">Operators Online</span>
               </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER TAGS --- */}
        <div className="mt-12 flex flex-wrap justify-between gap-6 opacity-40">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#264653]">© 2026 INSAN FOUNDATION</p>
           <div className="flex gap-8">
             <span className="text-[9px] font-black uppercase tracking-widest">Transparency Audit Passed</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Verified NGO</span>
           </div>
        </div>
      </div>
    </section>
  );
}