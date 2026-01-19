'use client';
import { useState } from 'react';
import { ArrowLeft, Save, Upload, Star, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewSuccessStory() {
  const [isFeatured, setIsFeatured] = useState(false);
  const [storyType, setStoryType] = useState('ORPHAN_STORY');

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin/success-stories" className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#264653]">
          <ArrowLeft size={20} /> Back
        </Link>
        <h1 className="text-2xl font-black text-[#264653]">New Success Story</h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <form className="space-y-8">
          {/* Main Info */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Story Title</label>
                <input type="text" className="w-full p-5 bg-[#EDF4E8]/50 rounded-[2rem] outline-none focus:ring-2 ring-[#2A9D8F] font-bold" placeholder="Give your story a catchy title" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Story Type</label>
                <select 
                  value={storyType} 
                  onChange={(e) => setStoryType(e.target.value)}
                  className="w-full p-5 bg-[#EDF4E8]/50 rounded-[2rem] outline-none font-bold"
                >
                  <option value="ORPHAN_STORY">Orphan's Journey</option>
                  <option value="DONOR_STORY">Donor's Experience</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">The Story Content</label>
              <textarea className="w-full p-8 bg-[#EDF4E8]/50 rounded-[3rem] outline-none h-48 focus:ring-2 ring-[#2A9D8F] font-medium" placeholder="Write the heart-touching story here..."></textarea>
            </div>

            {/* Entity Connections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[#264653]/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">Connect Orphan (ID)</label>
                <input type="number" className="w-full p-4 bg-white rounded-2xl outline-none border border-gray-100" placeholder="e.g. 102" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#2A9D8F] uppercase tracking-widest">Connect Donor (ID)</label>
                <input type="number" className="w-full p-4 bg-white rounded-2xl outline-none border border-gray-100" placeholder="e.g. 50" />
              </div>
            </div>
          </div>

          {/* Media & Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100">
              <label className="flex flex-col items-center justify-center h-48 border-4 border-dashed border-[#EDF4E8] rounded-[2.5rem] cursor-pointer hover:border-[#2A9D8F]/50 transition-all">
                <Upload size={32} className="text-[#2A9D8F] mb-2" />
                <span className="font-black text-[#264653]">Upload Story Photo</span>
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="bg-[#264653] p-8 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
              <Star size={40} className={`mb-4 transition-colors ${isFeatured ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
              <h4 className="font-black mb-2">Feature Story?</h4>
              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-6">Promote to homepage</p>
              <button 
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-16 h-8 rounded-full relative transition-all ${isFeatured ? 'bg-[#2A9D8F]' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isFeatured ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <button className="w-full py-6 bg-[#264653] text-[#EDF4E8] rounded-[3rem] font-black text-2xl shadow-xl hover:bg-[#2A9D8F] transition-all flex items-center justify-center gap-3">
            <Save /> Publish Success Story
          </button>
        </form>
      </div>
    </div>
  );
}