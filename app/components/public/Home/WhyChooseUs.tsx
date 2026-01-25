"use client";
import { Shield, CheckCircle, Bell, Award, Users, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = { Shield, CheckCircle, Bell, Award, Users, Clock };

const features = [
  { 
    icon: 'Shield', 
    title: 'নিরাপদ লেনদেন', 
    desc: 'আপনার প্রতিটি অনুদান সুরক্ষিত এবং স্বচ্ছ। আমরা আধুনিক এনক্রিপশন ও সিকিউরিটি প্রোটোকল ব্যবহার করি।' 
  },
  { 
    icon: 'Clock', 
    title: 'ইমপ্যাক্ট টাইমলাইন', 
    desc: 'আমাদের প্রতিটি প্রকল্পের শুরু থেকে শেষ পর্যন্ত ডিজিটাল টাইমলাইন আপনি আমাদের সোশ্যাল মিডিয়া হ্যান্ডেলে সরাসরি দেখতে পাবেন।' 
  },
  { 
    icon: 'Users', 
    title: 'সরাসরি যোগাযোগ', 
    desc: 'এতিম শিশুদের সাথে সরাসরি কথা বলার এবং তাদের অবস্থা জানার জন্য আমরা ডিজিটাল কমিউনিকেশন সুবিধা দিচ্ছি।' 
  },
  { 
    icon: 'CheckCircle', 
    title: 'শতভাগ স্বচ্ছতা', 
    desc: 'যেকোনো সময় আমাদের ফিন্যান্সিয়াল হিসাব পরীক্ষার সুবিধা এবং লাইভ ড্যাশবোর্ড অ্যাক্সেসের নিশ্চয়তা।' 
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-44 bg-white overflow-hidden">
      {/* --- BACKGROUND ORNAMENTATION --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F9FBF9] skew-x-[-12deg] translate-x-20 -z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 p-2 px-6 rounded-full bg-[#ECF4E8] text-[#2A9D8F] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-10"
            >
              <Sparkles size={14} />
              Trust Architecture
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black text-[#264653] mb-10 leading-[0.9] tracking-tighter">
              কেন আমাদের <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A9D8F] to-[#264653]">বিশ্বাস করবেন?</span>
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed max-w-md font-medium italic border-l-4 border-[#E76F51] pl-6">
              "আমরা শুধু সাহায্য করি না, প্রতিটি অর্থের সঠিক ব্যবহার নিশ্চিত করি। স্বচ্ছতা আমাদের ফাউন্ডেশনের ডিএনএ।"
            </p>
            
            {/* Trust Stats Mini Card */}
            <div className="bg-white p-8 border border-gray-100 shadow-xl mb-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <Shield size={60} />
              </div>
              <p className="text-[#264653] font-black text-3xl tracking-tighter">১০০% ভেরিফাইড</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">অডিট সম্পন্ন ও পাবলিক রিপোর্ট</p>
            </div>

            <button className="relative overflow-hidden group flex items-center gap-4 bg-[#264653] text-white px-10 py-6 font-black uppercase text-[11px] tracking-[0.4em] transition-all">
              <span className="relative z-10 flex items-center gap-3">
                Transparency Report <ArrowUpRight size={18} />
              </span>
              <div className="absolute inset-0 bg-[#2A9D8F] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Side: Features Grid */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {features.map((feature, idx) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || Shield;
                
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative p-10 md:p-12 bg-white border border-gray-100 hover:border-[#2A9D8F]/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col items-start min-h-[380px] overflow-hidden"
                  >
                    {/* Index Number Background */}
                    <span className="absolute -right-4 -top-4 text-[10rem] font-black text-gray-50 group-hover:text-[#ECF4E8] transition-colors -z-0 select-none">
                      {idx + 1}
                    </span>

                    <div className="relative z-10 w-16 h-16 bg-[#264653] flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#264653]/20">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="relative z-10 space-y-4">
                      <h3 className="font-black text-[#264653] text-2xl tracking-tighter uppercase leading-none">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                        {feature.desc}
                      </p>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50 group-hover:bg-[#2A9D8F] transition-colors" />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}