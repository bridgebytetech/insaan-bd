"use client";

import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface ActivityClientProps {
  items: any[];
}

export default function ActivityClient({ items }: ActivityClientProps) {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-[#264653] mb-4">
          আমাদের সাম্প্রতিক <span className="text-[#2A9D8F]">কার্যক্রম</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
           আর্তমানবতার সেবায় ইনসান ফাউন্ডেশনের নিরন্তর পথচলার কিছু মুহূর্ত।
        </p>
        <div className="w-24 h-1.5 bg-[#E76F51] mx-auto mt-6 rounded-full" />
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((activity) => (
          <div 
            key={activity.activityId}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={activity.activityPhotoUrl} 
                alt={activity.activityTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#264653]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Calendar size={12} />
                {activity.activityDate}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-1 text-[#2A9D8F] text-sm font-bold mb-3 uppercase tracking-wider">
                <MapPin size={14} />
                {activity.activityLocation}
              </div>
              
              <h3 className="text-xl font-bold text-[#264653] mb-3 group-hover:text-[#2A9D8F] transition-colors line-clamp-2">
                {activity.activityTitle}
              </h3>
              
              <p className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed text-sm">
                {activity.activityDescription}
              </p>

              <button className="flex items-center justify-between w-full pt-4 border-t border-gray-50 text-[#264653] font-bold text-sm group/btn">
                বিস্তারিত দেখুন
                <span className="bg-gray-100 p-2 rounded-full group-hover/btn:bg-[#E76F51] group-hover/btn:text-white transition-all">
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">বর্তমানে কোনো কার্যক্রম পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
}