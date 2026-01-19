import { helpWays } from "@/app/lib/utils/constants";
import { Heart, Gift, HandHeart, Package } from "lucide-react";

const iconMap = {
  Heart,
  Gift,
  HandHeart,
  Package,
};

export default function WaysToHelp() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#D8E7E4] text-[#2A9D8F] rounded-full text-xs font-bold uppercase tracking-wider border border-[#2A9D8F]/10">
            Get Involved
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            বিভিন্ন উপায়ে সাহায্য করুন
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আপনার সুবিধামত যেকোনো উপায়ে অবদান রাখুন
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpWays.map((way, idx) => {
            const Icon = iconMap[way.icon as keyof typeof iconMap];
            
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${way.color}` }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {way.title}
                </h3>
                <p className="text-gray-600 mb-6">{way.desc}</p>
                <button
                  className="w-full px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: way.color }}
                >
                  {way.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}