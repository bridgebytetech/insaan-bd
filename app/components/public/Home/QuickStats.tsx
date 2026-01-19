import { stats } from "@/app/lib/utils/constants";
import { Users, Heart, Gift, TrendingUp } from "lucide-react";

const iconMap = {
  Users,
  Heart,
  Gift,
  TrendingUp,
};

export default function QuickStats() {
  return (
    <section className="py-24 bg-[#ECF4E8] relative overflow-hidden">
      {/* Optional: Subtle decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#2A9D8F]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area - Fully Centered */}
        <div className="mb-20 text-center">
          <h2 className="text-[#264653] text-4xl md:text-5xl font-bold mb-6">
            Our Impact in Numbers
          </h2>
          <div className="h-1.5 w-24 bg-[#2A9D8F] rounded-full mx-auto"></div>
        </div>

        {/* Stats Layout - Improved Spacing & Centering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            
            return (
              <div 
                key={idx} 
                className="group flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-300 hover:bg-white/50 hover:shadow-xl hover:shadow-[#2A9D8F]/5"
              >
                {/* Icon Container with consistent sizing */}
                <div
                  className="mb-6 p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  <Icon size={32} strokeWidth={2} />
                </div>

                {/* Content - Vertical stack with consistent spacing */}
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-5xl font-black text-[#264653] tracking-tighter">
                      {stat.value.replace("+", "")}
                    </span>
                    <span className="text-3xl font-bold text-[#2A9D8F]">+</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#264653] uppercase tracking-[0.15em] mb-4">
                    {stat.label}
                  </h3>

                  <p className="text-[#4A6651] text-sm leading-relaxed max-w-[220px] min-h-[3rem]">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}