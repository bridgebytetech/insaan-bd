import { news } from "@/app/lib/utils/constants";
import { Clock, ChevronRight, FileText } from "lucide-react";



export default function LatestNews() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#D8E7E4] text-[#2A9D8F] rounded-full text-xs font-bold uppercase tracking-wider border border-[#2A9D8F]/10">
            News & Updates
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            সর্বশেষ আপডেট
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আমাদের সাম্প্রতিক খবর এবং ঘোষণা
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {news.map((item, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center relative overflow-hidden">
                <FileText className="w-16 h-16 text-white" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4 mr-2" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 group">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 bg-[#E2EBDD] text-[#4A6651] font-bold rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all inline-flex items-center space-x-2">
            <span>View All News</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}