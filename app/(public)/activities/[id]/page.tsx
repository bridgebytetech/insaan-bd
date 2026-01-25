import api from "@/app/lib/api/axios";
import { ActivityItem } from "@/app/lib/types/activity";
import { Calendar, MapPin, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/shared/Footer";
import SocialShare from "@/app/components/shared/SocialShare"; // আলাদা করা কম্পোনেন্টটি ইমপোর্ট

async function getActivity(id: string): Promise<ActivityItem | null> {
  try {
    const response = await api.get<{ data: ActivityItem }>(`/public/activities/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
}

export default async function ActivityDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  const { id } = await params; 
  const activity = await getActivity(id);

  if (!activity) {
    notFound();
  }

  const getImageUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") 
      ? url 
      : `https://api.insaanbd.org/api/public/files/${url}`;
  };

  return (
    <main className="bg-white min-h-screen pt-32 ">
      <div className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* --- Navigation & Meta --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <Link 
            href="/activities" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#264653]/40 hover:text-[#2A9D8F] transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            ফিরে যান
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#264653]/60">
              <Calendar size={14} className="text-[#2A9D8F]" />
              {activity.activityDate}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#264653]/60">
              <MapPin size={14} className="text-[#E76F51]" />
              {activity.activityLocation}
            </div>
          </div>
        </div>

        {/* --- Headline Section --- */}
        <article className="space-y-10">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-[#264653] leading-[1.1] tracking-tighter uppercase">
              {activity.activityTitle}
            </h1>
            
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-gray-100" />
               
               {/* এখানে সোশ্যাল শেয়ার বাটন ব্যবহার করা হয়েছে */}
               <SocialShare title={activity.activityTitle} />
               
               <div className="h-px flex-1 bg-gray-100" />
            </div>
          </header>

          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 border border-gray-100 shadow-2xl">
            <img 
              src={getImageUrl(activity.activityPhotoUrl)} 
              alt={activity.activityTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-[#264653] text-white px-6 py-2 text-[10px] font-black tracking-widest uppercase">
              Insaan Foundation Media
            </div>
          </div>

          <div className="relative">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl font-medium text-[#264653]/80 leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-[#2A9D8F] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] whitespace-pre-line">
                {activity.activityDescription}
              </p>
            </div>

            <div className="mt-20 p-10 bg-[#F8FAFB] border-l-4 border-[#2A9D8F] relative">
               <Zap className="absolute -top-4 -right-4 text-[#2A9D8F]/10 w-24 h-24" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2A9D8F] mb-4">আমাদের লক্ষ্য</h4>
               <p className="text-[#264653] font-bold text-lg leading-relaxed italic">
                 "সুবিধাবঞ্চিত শিশুদের মুখে হাসি ফোটানোই ইনসান বিডি-র মূল সার্থকতা। আপনার প্রতিটি সহযোগিতা আমাদের এই পথ চলায় সাহস যোগায়।"
               </p>
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8">End of Report</p>
            <Link 
              href="/activities" 
              className="px-12 py-5 bg-[#264653] text-white font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#2A9D8F] transition-all shadow-xl shadow-[#264653]/10"
            >
              আরো কার্যক্রম দেখুন
            </Link>
          </footer>
        </article>
      </div>
      <Footer />
    </main>
  );
}