import { Shield, CheckCircle, Bell, Award, Users, FileText, ArrowUpRight } from "lucide-react";

const iconMap = { Shield, CheckCircle, Bell, Award, Users, FileText };

const features = [
  { icon: 'Shield', title: 'নিরাপদ লেনদেন', desc: 'আপনার প্রতিটি অনুদান সুরক্ষিত এবং স্বচ্ছ। আমরা উন্নত সিকিউরিটি ব্যবহার করি।' },
  { icon: 'FileText', title: 'মাসিক রিপোর্ট', desc: 'আমরা প্রতি মাসে কাজের বিস্তারিত রিপোর্ট প্রদান করি যা আপনি সরাসরি ডাউনলোড করতে পারবেন।' },
  { icon: 'Users', title: 'সরাসরি যোগাযোগ', desc: 'এতিম শিশুদের সাথে সরাসরি কথা বলার এবং তাদের অবস্থা জানার সুযোগ থাকছে।' },
  { icon: 'CheckCircle', title: 'শতভাগ স্বচ্ছতা', desc: 'যেকোনো সময় আমাদের ফিন্যান্সিয়াল হিসাব পরীক্ষার সুবিধা এবং ড্যাশবোর্ড অ্যাক্সেস।' },
];

export default function WhyChooseUs() {
  return (
    // py-32 বা py-40 ব্যবহার করে সেকশনটাকে অনেক লম্বা করা হয়েছে
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32 h-fit">
            <div className="inline-block p-2 px-6 rounded-full bg-[#ECF4E8] text-[#2A9D8F] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8">
              Trust & Transparency
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-[#264653] mb-8 leading-[1.1] tracking-tight">
              কেন আমাদের <br className="hidden md:block" />
              <span className="text-[#2A9D8F]">বিশ্বাস করবেন?</span>
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed max-w-md">
              আমরা শুধু সাহায্য করি না, প্রতিটি অর্থের সঠিক ব্যবহার নিশ্চিত করি। স্বচ্ছতা আমাদের প্রধান ভিত্তি।
            </p>
            
            <button className="w-full sm:w-auto group flex items-center justify-center gap-4 bg-[#264653] text-white px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-[#264653]/20 hover:bg-[#2A9D8F] transition-all duration-300">
              <span>View Transparency Report</span>
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Features Grid */}
          <div className="w-full lg:w-[60%]">
            {/* gap-8 বা gap-10 ব্যবহার করে কার্ডগুলোর দূরত্ব বাড়ানো হয়েছে */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {features.map((feature, idx) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || Shield;
                
                return (
                  <div 
                    key={idx} 
                    // কার্ডের প্যাডিং এবং হাইট বাড়ানো হয়েছে (min-h-[320px])
                    className="p-10 md:p-12 rounded-[3rem] border border-gray-100 bg-[#F9FBF9] hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(42,157,143,0.15)] transition-all duration-500 group flex flex-col items-start min-h-[320px]"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-10 group-hover:bg-[#2A9D8F] transition-colors duration-500">
                      <Icon className="w-8 h-8 text-[#2A9D8F] group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="font-black text-[#264653] text-2xl mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-500 text-base leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}