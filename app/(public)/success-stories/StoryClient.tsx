"use client";

import React from 'react';
import { Heart, Quote, User, ArrowRight } from 'lucide-react';
import type {SuccessStory} from "@/app/lib/types/story"
interface Props {
  stories: SuccessStory[];
  featuredStories: SuccessStory[];
}

export default function StoryClient({ stories, featuredStories }: Props) {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#264653]/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#E76F51]/10 text-[#E76F51] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            Success Stories
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#264653] mt-6 mb-4">
            বদলে যাওয়ার <span className="text-[#2A9D8F]">গল্পসমূহ</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            আপনার দান এবং আমাদের প্রচেষ্টায় যাদের জীবনে পরিবর্তন এসেছে, তাদের বাস্তব জীবনের গল্প।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Featured Story - Big Hero Card */}
        {featuredStories.length > 0 && (
          <section>
            <div className="relative rounded-[2rem] overflow-hidden bg-[#264653] text-white flex flex-col lg:flex-row shadow-2xl shadow-teal-900/20">
              <div className="lg:w-1/2 h-[350px] lg:h-auto relative">
                <img 
                  src={featuredStories[0].storyPhotoUrl} 
                  className="w-full h-full object-cover opacity-80" 
                  alt="Featured"
                />
                <div className="absolute top-6 left-6 bg-[#E76F51] p-3 rounded-2xl">
                  <Quote className="text-white fill-white" size={24} />
                </div>
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[#2A9D8F] font-bold text-sm mb-4 uppercase tracking-[0.3em]">Featured Story</p>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                  {featuredStories[0].storyTitle}
                </h2>
                <p className="text-gray-300 line-clamp-4 mb-8 text-lg italic leading-relaxed">
                  "{featuredStories[0].storyContent}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{featuredStories[0].orphanName || "Anonymous"}</p>
                    <p className="text-xs text-gray-400">Beneficiary</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Stories Grid */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-[#264653]">সকল গল্প</h2>
            <div className="h-[2px] flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((story) => (
              <div key={story.storyId} className="group cursor-pointer">
                <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200">
                  <img 
                    src={story.storyPhotoUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={story.storyTitle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                     <button className="w-full py-3 bg-white text-[#264653] font-bold rounded-xl text-sm flex items-center justify-center gap-2">
                        সম্পূর্ণ পড়ুন <ArrowRight size={16} />
                     </button>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2A9D8F] bg-[#2A9D8F]/5 px-2 py-1 rounded">
                      {story.storyType.replace('_', ' ')}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                       {new Date(story.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#264653] group-hover:text-[#E76F51] transition-colors line-clamp-2 mb-3">
                    {story.storyTitle}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {story.storyContent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}