import { Target, Award, ChevronRight, Heart } from "lucide-react";

export default function Introduction() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Gradient Bridge - Connects with the Stat section above */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#ECF4E8] to-transparent" />
      
      {/* Subtle Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#ECF4E8]/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#2A9D8F]/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* LEFT COLUMN: Visual Assets */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative group">
              {/* Main Image Container with Organic Border */}
              <div className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl shadow-[#264653]/10 transform transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                  alt="Insaan BD Mission"
                  className="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Floating Stat Widget - Revised for better "Card" feel */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 z-20 bg-white p-6 md:p-8 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-50 flex flex-col items-center">
                <div className="w-14 h-14 bg-[#2A9D8F] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-[#2A9D8F]/20">
                  <Heart size={28} fill="currentColor" />
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-black text-[#264653] tracking-tight">২০২০</h4>
                  <p className="text-[#4A6651] text-[10px] font-extrabold uppercase tracking-widest mt-1">
                    প্রতিষ্ঠিত বছর
                  </p>
                </div>
              </div>

              {/* Decorative "Splat" background element */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#2A9D8F]/5 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              {/* Label */}
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#2A9D8F]" />
                <span className="text-[#2A9D8F] font-extrabold text-sm uppercase tracking-[0.2em]">
                  Our Identity
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-6xl font-black text-[#264653] leading-tight">
                আমরা কারা এবং <br />
                <span className="text-[#2A9D8F] italic relative">
                  আমরা কী করি
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#E76F51]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-[#264653] font-medium leading-relaxed">
                  Insaan BD একটি অলাভজনক সংস্থা যা ২০২০ সাল থেকে এতিম শিশুদের জীবনমান উন্নয়নে কাজ করছে।
                </p>
                <p className="text-gray-600 leading-relaxed max-w-xl">
                  আমাদের মূল লক্ষ্য হলো এতিম শিশুদের শিক্ষা, স্বাস্থ্যসেবা এবং মৌলিক চাহিদা পূরণে সহায়তা করা। প্রতিটি শিশুর একটি সুন্দর ভবিষ্যৎ পাওয়ার অধিকার আছে।
                </p>
              </div>

              {/* Values - Two Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                {[
                  { icon: Target, label: "Our Mission", color: "bg-[#2A9D8F]", desc: "শিশুদের শিক্ষা নিশ্চিত করা" },
                  { icon: Award, label: "Our Vision", color: "bg-[#E76F51]", desc: "সুন্দর ও সমৃদ্ধ ভবিষ্যৎ" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`${item.color} p-3 rounded-xl text-white shadow-md`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#264653] text-base">{item.label}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA & Trust Badges */}
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-8">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#264653] text-white rounded-2xl font-bold hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-[#264653]/10">
                  Read Full Story
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white"
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="Supporter"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-[#264653]">৫০০+ সমর্থক</p>
                    <p className="text-gray-500 text-xs">আমাদের সাথে আছেন</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}