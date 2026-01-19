"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

// Assuming testimonials is imported
const testimonials = [
  { name: "Rahat", quote: "Insaan BD-এর মাধ্যমে আমি একটি শিশুর শিক্ষার দায়িত্ব নিতে পেরেছি। এটি আমার জীবনের সেরা সিদ্ধান্ত।", impact: "Child Sponsor" },
  { name: "Sultana", quote: "তাদের স্বচ্ছতা এবং কাজের প্রতি নিষ্ঠা আমাকে মুগ্ধ করেছে। প্রতিটি টাকা সঠিক পথে যাচ্ছে।", impact: "Monthly Donor" },
  { name: "Karim", quote: "এতিম শিশুদের জন্য এমন কাজ সত্যিই প্রশংসনীয়। আমি তাদের দীর্ঘায়ু কামনা করি।", impact: "Volunteer" },
];

export default function SuccessStories() {
  return (
    <section className="py-32 bg-[#F4F9F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#2A9D8F] font-black uppercase tracking-[0.4em] text-[10px]">Real Impact</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#264653]">Stories of Hope</h2>
          <div className="w-20 h-1.5 bg-[#E76F51] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
            >
              <div className="absolute top-8 right-8 text-[#ECF4E8] group-hover:text-[#2A9D8F]/10 transition-colors">
                <Quote size={60} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#E76F51] text-[#E76F51]" />
                ))}
              </div>

              <p className="text-[#264653] text-lg font-medium leading-relaxed mb-10 relative z-10">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#264653] flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#264653] font-black text-sm uppercase tracking-wider">{item.name}</h4>
                  <p className="text-[#2A9D8F] font-bold text-[10px] uppercase tracking-widest mt-1">{item.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}