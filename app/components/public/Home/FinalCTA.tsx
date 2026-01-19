import { Globe, Sparkles, Heart, ArrowRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 bg-[#FDFDFD] overflow-hidden">
      {/* Background Elements - Fixed for Mobile Scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#ECF4E8] rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#2A9D8F]/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Globe Icon Container */}
        <div className="relative inline-block mb-12">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-[2.5rem] shadow-2xl shadow-[#2A9D8F]/20 flex items-center justify-center relative z-20 border border-gray-50 transform hover:rotate-6 transition-transform">
            <Globe className="w-10 h-10 md:w-14 md:h-14 text-[#2A9D8F] animate-[spin_15s_linear_infinite]" />
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#E76F51] rounded-full blur-2xl opacity-40 animate-pulse" />
        </div>

        <div className="space-y-8 mb-16">
          <div className="flex items-center justify-center gap-3 text-[#2A9D8F] font-extrabold text-[10px] md:text-xs uppercase tracking-[0.4em]">
            <Sparkles size={16} />
            Join the Global Mission
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-[#264653] leading-[0.95] tracking-tighter">
            আজই কারো মুখে <br />
            <span className="text-[#2A9D8F] italic font-serif relative">
              হাসি ফোটান
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E76F51]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" />
              </svg>
            </span>
          </h2>

          <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            আপনার ছোট্ট একটি পদক্ষেপ একটি এতিম শিশুর জীবনকে বদলে দিতে পারে। আমাদের সাথে যুক্ত হোন।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="w-full sm:w-auto group px-12 py-6 bg-[#264653] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-[#264653]/30 hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-3">
            Sponsor an Orphan
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>

          <button className="w-full sm:w-auto px-12 py-6 bg-white text-[#264653] border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-[#264653] transition-all flex items-center justify-center gap-3">
            <Heart size={22} className="text-[#E76F51]" fill="#E76F51" />
            Make a Donation
          </button>
        </div>

        {/* Trusted Contact Footer */}
        <div className="mt-20 py-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ECF4E8] flex items-center justify-center text-[#2A9D8F]">
              <Phone size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Help Desk</p>
              <p className="text-[#264653] font-black text-lg">+880 1700-000000</p>
            </div>
          </div>
          <div className="px-4 py-1 rounded-full bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
            Available Sat-Thu, 9am - 6pm
          </div>
        </div>
      </div>
    </section>
  );
}