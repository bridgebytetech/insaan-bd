"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Heart, Gift, Smile, ChevronRight, Zap, Target, Activity } from "lucide-react";
import { useRef } from "react";
import Link from "next/link"; // এটি সবার উপরে ইমপোর্ট করুন

const steps = [
  { 
    id: "01",
    icon: Eye, 
    title: "BROWSE", 
    label: "অন্বেষণ",
    desc: "আমাদের ডিজিটাল প্ল্যাটফর্মে শিশুদের প্রোফাইল এবং তাদের প্রয়োজনীয়তাগুলো বিশ্লেষণ করুন।", 
    color: "#2A9D8F" 
  },
  { 
    id: "02",
    icon: Target, 
    title: "CHOOSE", 
    label: "নির্বাচন",
    desc: "আপনার হৃদয়ের কাছের কোনো লক্ষ্য বা শিশুকে নির্দিষ্ট করে সহায়তার সংকল্প করুন।", 
    color: "#E76F51" 
  },
  { 
    id: "03",
    icon: Gift, 
    title: "DONATE", 
    label: "প্রদান",
    desc: "সম্পূর্ণ এনক্রিপ্টেড এবং স্বচ্ছ পদ্ধতিতে আপনার অনুদানটি সরাসরি ফান্ডে পৌঁছে দিন।", 
    color: "#264653" 
  },
  { 
    id: "04",
    icon: Activity, 
    title: "IMPACT", 
    label: "পরিবর্তন",
    desc: "আপনার সহায়তায় তৈরি হওয়া বাস্তব পরিবর্তনগুলোর নিয়মিত আপডেট ও রিপোর্ট গ্রহণ করুন।", 
    color: "#8AB17D" 
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      {/* --- BACKGROUND ORNAMENTATION --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_100px,#264653_101px)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER SECTION: HIGH CONTRAST --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32">
          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-[#2A9D8F]" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#2A9D8F]">Operational Workflow</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-[#264653] tracking-tighter leading-[0.85]">
              কিভাবে আমরা <br />
              <span className="text-gray-200">কাজ করি</span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="max-w-md p-8 bg-gray-50 border-l-4 border-[#264653]"
          >
            <p className="text-[#264653] font-bold text-lg leading-snug">
              প্রতিটি টাকা, প্রতিটি জীবন। আমরা নিশ্চিত করি আপনার অনুদান যেন সর্বোচ্চ প্রভাব ফেলে।
            </p>
          </motion.div>
        </div>

        {/* --- DYNAMIC STEPS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          
          {/* Animated SVG Connector Line (Desktop Only) */}
          <svg className="hidden lg:block absolute top-1/4 left-0 w-full h-20 pointer-events-none" style={{ zIndex: 0 }}>
             <motion.path
                d="M 0 40 Q 300 80 600 40 T 1200 40"
                fill="none"
                stroke="#2A9D8F"
                strokeWidth="1"
                strokeDasharray="10 10"
                style={{ pathLength }}
             />
          </svg>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-gray-100 p-10 pt-16 flex flex-col justify-between min-h-[450px] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 z-10 overflow-hidden"
            >
              {/* Animated Hover Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#2A9D8F] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div>
                <div className="flex justify-between items-start mb-16">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-none flex items-center justify-center text-white relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" style={{ backgroundColor: step.color }}>
                      <step.icon size={28} />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 border border-gray-200 -z-0 group-hover:border-[#2A9D8F] transition-colors" />
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-black text-gray-100 group-hover:text-gray-200 transition-colors leading-none">{step.id}</span>
                    <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">{step.label}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-3xl font-black text-[#264653] tracking-tighter uppercase leading-none">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-gray-200 group-hover:w-16 group-hover:bg-[#2A9D8F] transition-all duration-500" />
                  <span className="text-[9px] font-black text-gray-300 group-hover:text-[#264653] uppercase tracking-[0.3em] transition-colors">Phase {idx + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PREMIUM CTA FOOTER --- */}
        <div className="mt-32 relative group p-[1px] overflow-hidden rounded-[2rem] bg-gradient-to-r from-gray-200 via-[#2A9D8F]/20 to-gray-200">
  {/* ডাইনামিক ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট */}
  <div className="absolute inset-0 bg-[#264653] transition-colors duration-700 group-hover:bg-[#1d353f]" />
  
  <div className="relative p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
    {/* বাম পাশের টেক্সট কন্টেন্ট */}
    <div className="relative z-10 text-center lg:text-left space-y-6">
      <div className="flex items-center justify-center lg:justify-start gap-4">
        <div className="h-[1px] w-8 bg-[#2A9D8F]" />
        <span className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-[0.5em]">Join the movement</span>
      </div>
      
      <h3 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] lg:max-w-xl">
        একটি শিশুর হাসি <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] to-emerald-200">আপনার অপেক্ষায়।</span>
      </h3>
    </div>

    {/* ডান পাশের ইন্টারেক্টিভ বাটন */}
    <div className="relative">
      <Link href="/orphans">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 bg-white text-[#264653] px-14 py-8 font-black uppercase text-[11px] tracking-[0.4em] shadow-[0_20px_50px_rgba(42,157,143,0.3)] transition-all flex items-center gap-4 group/btn"
        >
          সহায়তা করুন 
          <div className="bg-[#2A9D8F] p-1 rounded-full group-hover/btn:translate-x-2 transition-transform">
             <ChevronRight size={16} className="text-white" />
          </div>
        </motion.button>
      </Link>
      
      {/* অলংকারিক ইলিমেন্ট */}
      <div className="absolute -inset-4 border border-white/10 -z-0 scale-90 group-hover:scale-110 transition-transform duration-700" />
    </div>
  </div>
</div>

      </div>
    </section>
  );
}