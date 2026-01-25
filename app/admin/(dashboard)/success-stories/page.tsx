"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { storyService } from "@/app/lib/services/storyService";
import { 
  Trash2, Edit3, Star, Plus, Image as ImageIcon, 
  Loader2, X, Save, Search, Camera, Sparkles, Globe, Lock
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminStoryManagement() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    storyTitle: "",
    storyContent: "",
    storyPhotoUrl: "",
    storyType: "ORPHAN_STORY",
    orphanId: 0,
    donorId: 0,
    isFeatured: false
  });

  // --- ডাটা লোড করা ---
  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await storyService.getAllStories();
      // সার্ভার রেসপন্স স্ট্রাকচার অনুযায়ী ডাটা সেট করা
      setStories(res.data || res || []);
    } catch (err) {
      toast.error("ডাটা লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);

  // --- ইমেজ আপলোড লজিক (Perfectly Done) ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      return toast.error("ফাইল ১০ এমবি এর বেশি হতে পারবে না!");
    }

    // লোকাল প্রিভিউ দেখানো
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const res = await storyService.uploadFile(file);
      if (res.success) {
        // const fullImageUrl = `https://api.insaanbd.org/api/files/${res.data.url}`;
        setFormData(prev => ({ ...prev, storyPhotoUrl: res.data.url }));
        toast.success("ছবি আপলোড সফল হয়েছে");
      }
    } catch (err) {
      toast.error("ছবি আপলোড ব্যর্থ হয়েছে");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  // --- স্টোরি সেভ করা ---
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (uploading) return toast.error("দয়া করে ছবি আপলোড শেষ হওয়া পর্যন্ত অপেক্ষা করুন");

  try {
    const payload: any = {
      storyTitle: formData.storyTitle.trim(),
      storyContent: formData.storyContent.trim(),
      storyPhotoUrl: formData.storyPhotoUrl.trim(),
      storyType: formData.storyType,
      isFeatured: Boolean(formData.isFeatured),
      orphanId: formData.storyType === "ORPHAN_STORY" ? Number(formData.orphanId) || 0 : 0,
      donorId: formData.storyType === "DONOR_STORY" ? Number(formData.donorId) || 0 : 0,
    };

    console.log("📤 Sending payload:", payload);
    console.log("📤 Payload type:", typeof payload);
    console.log("📤 Is plain object?", payload.constructor === Object);
    console.log("📤 Stringified:", JSON.stringify(payload)); // ← ADD THIS

    if (editingId) {
      await storyService.updateStory(editingId, payload);
      toast.success("আপডেট সফল!");
    } else {
      await storyService.createStory(payload);
      toast.success("নতুন স্টোরি পাবলিশ হয়েছে!");
    }

    closeModal();
    fetchStories();
  } catch (err: any) {
    console.error("Story submit error:", err.response || err);
    console.log("📤 Request config:", err.config);
    console.log("📤 Request headers:", err.config?.headers);
    console.log("📤 Request data:", err.config?.data); // ← ADD THIS
    
    const errorMsg = err.response?.data?.message || "সেভ করা সম্ভব হয়নি। এপিআই পাথ চেক করুন।";
    toast.error(errorMsg);
  }
};


  // --- হেল্পার ফাংশনস ---
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImagePreview(null);
    setFormData({
      storyTitle: "", storyContent: "", storyPhotoUrl: "",
      storyType: "ORPHAN_STORY", orphanId: 0, donorId: 0, isFeatured: false
    });
  };

  const handleEdit = (story: any) => {
    setEditingId(story.storyId);
    setFormData(story);
    setImagePreview(story.storyPhotoUrl);
    setIsModalOpen(true);
  };

  const filteredStories = stories.filter(s => 
    s.storyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBFCFE] p-6 lg:p-12">
      
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="flex items-center gap-5">
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
             <Sparkles className="text-blue-500" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">IMPACT <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">STORIES</span></h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Insaan BD Administrator</p>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" placeholder="শিরোনাম দিয়ে খুঁজুন..." 
              className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus size={16} /> New Story
          </button>
        </div>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
           <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
           <p className="text-slate-300 font-black text-[10px] tracking-widest uppercase">Fetching stories...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredStories.map((story) => (
            <div key={story.storyId} className="group bg-white rounded-[3.5rem] p-5 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500">
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6">
                <img
  src={`https://api.insaanbd.org/api/public/files/${story.storyPhotoUrl}`}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  alt=""
  onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')}
/>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <button 
                  onClick={() => storyService.toggleFeatured(story.storyId).then(fetchStories)}
                  className={`absolute top-5 right-5 p-3 rounded-2xl backdrop-blur-md transition-all ${story.isFeatured ? 'bg-yellow-400 text-white shadow-lg' : 'bg-white/30 text-white hover:bg-white/50'}`}
                >
                  <Star size={18} fill={story.isFeatured ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="px-3">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {story.storyType.replace('_', ' ')}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${story.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-200'}`} />
                </div>
                
                <h3 className="text-xl font-black text-slate-800 mb-3 line-clamp-1 tracking-tight">{story.storyTitle}</h3>
                <p className="text-slate-400 text-sm font-medium line-clamp-3 leading-relaxed mb-8">{story.storyContent}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 gap-3">
                  <button 
                    onClick={() => handleEdit(story)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 size={14}/> Edit
                  </button>
                  <button 
                    onClick={() => storyService.toggleStatus(story.storyId).then(fetchStories)}
                    className={`p-4 rounded-2xl transition-all ${story.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}
                  >
                    {story.isActive ? <Globe size={18}/> : <Lock size={18}/>}
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm("Confirm deletion?")) {
                        await storyService.deleteStory(story.storyId);
                        fetchStories();
                      }
                    }}
                    className="p-4 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-in Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeModal} />
          
          <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 flex flex-col max-h-[90vh]">
              
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                    {editingId ? "UPDATE STORY" : "CREATE STORY"}
                  </h2>
                  <p className="text-blue-500 text-[10px] font-black tracking-widest uppercase mt-1">Impact Details & Narrative</p>
                </div>
                <button onClick={closeModal} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-full transition-all group">
                   <X className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pr-3 custom-scrollbar">
                
                {/* Image Upload Box */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Story Banner</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative h-60 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 transition-all"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-300">
                         <Camera size={40} className="mb-2 group-hover:scale-110 transition-transform" />
                         <span className="font-bold text-xs">Browse Visual Content</span>
                      </div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                         <Loader2 className="animate-spin text-blue-500" size={32} />
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>

                <div className="space-y-4">
                  <input 
                    required value={formData.storyTitle} 
                    onChange={e => setFormData({...formData, storyTitle: e.target.value})}
                    className="w-full p-6 bg-slate-50 border-none rounded-[1.5rem] outline-none focus:ring-4 ring-blue-500/5 font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="Enter story title..."
                  />

                  <textarea 
                    rows={5} required value={formData.storyContent} 
                    onChange={e => setFormData({...formData, storyContent: e.target.value})}
                    className="w-full p-6 bg-slate-50 border-none rounded-[1.5rem] outline-none focus:ring-4 ring-blue-500/5 font-medium text-slate-600 leading-relaxed placeholder:text-slate-300"
                    placeholder="Write the impact narrative here..."
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-2">
                       <select 
                        value={formData.storyType} 
                        onChange={e => setFormData({...formData, storyType: e.target.value})}
                        className="w-full p-3 bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-slate-500 outline-none cursor-pointer"
                      >
                        <option value="ORPHAN_STORY">Orphan Story</option>
                        <option value="DONOR_STORY">Donor Story</option>
                        <option value="SUCCESS_STORY">Success Story</option>
                      </select>
                    </div>
                    
                    <input 
                      type="number" placeholder="Relevant ID"
                      value={formData.storyType === 'ORPHAN_STORY' ? formData.orphanId : formData.donorId}
                      onChange={e => setFormData({...formData, [formData.storyType === 'ORPHAN_STORY' ? 'orphanId' : 'donorId']: Number(e.target.value)})}
                      className="p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" disabled={uploading}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {uploading ? "IMAGE UPLOADING..." : <><Save size={18} /> {editingId ? "SAVE CHANGES" : "PUBLISH TO LIVE"}</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}