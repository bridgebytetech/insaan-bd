"use client";
import { motion } from "framer-motion";
import { Eye, Heart, Gift, Smile, ArrowRight } from "lucide-react";

const steps = [
  { icon: Eye, title: "Browse", desc: "এতিম শিশুদের তালিকা দেখুন", color: "#2A9D8F" },
  { icon: Heart, title: "Choose", desc: "একটি শিশু নির্বাচন করুন", color: "#E76F51" },
  { icon: Gift, title: "Donate", desc: "সহজে দান করুন", color: "#F4A261" },
  { icon: Smile, title: "Impact", desc: "জীবন পরিবর্তন করুন", color: "#8AB17D" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#264653] relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2A9D8F]/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-[#2A9D8F] uppercase tracking-[0.4em] mb-4">Process</h2>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            কীভাবে সাহায্য করবেন
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Desktop Connecting Arrow */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 translate-x-1/2 z-20">
                  <ArrowRight className="text-[#2A9D8F]/30" size={32} />
                </div>
              )}

              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-[2.5rem] h-full transition-all duration-300 hover:bg-white/10 hover:border-[#2A9D8F]/50">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon size={30} />
                </div>

                <div className="relative">
                   <span className="absolute -top-10 right-0 text-6xl font-black text-white/5 select-none">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}