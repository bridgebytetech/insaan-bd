"use client";
import { useEffect, useState } from "react";
import { adminStoryService } from "@/app/lib/services/adminStoryService";
import { Plus, Edit, Trash2, Star, CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import StoryForm from "@/app/admin/(dashboard)/success-stories/StoryForm";

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await adminStoryService.getAll();
      setStories(res.data.data);
    } catch (err) {
      toast.error("গল্পগুলো লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleToggle = async (id: number, type: "status" | "featured") => {
    try {
      type === "status"
        ? await adminStoryService.toggleStatus(id)
        : await adminStoryService.toggleFeatured(id);
      toast.success("সফলভাবে আপডেট করা হয়েছে");
      fetchStories();
    } catch (err) {
      toast.error("পরিবর্তন ব্যর্থ হয়েছে");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এটি মুছে ফেলতে চান?")) return;
    try {
      await adminStoryService.delete(id);
      toast.success("মুছে ফেলা সফল হয়েছে");
      fetchStories();
    } catch (err) {
      toast.error("মুছে ফেলা সম্ভব হয়নি");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#264653]">সাফল্যের গল্প</h1>
          <p className="text-gray-500 font-medium">প্রভাবশালী সাফল্যের গল্পগুলো পরিচালনা করুন।</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setIsFormOpen(true); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#E76F51] text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
        >
          <Plus size={20} /> নতুন গল্প যুক্ত করুন
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-[#2A9D8F]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any) => (
            <div key={story.storyId} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-56">
                <img src={story.storyPhotoUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleToggle(story.storyId, "featured")}
                    className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${story.isFeatured ? "bg-yellow-400 text-white" : "bg-black/20 text-white hover:bg-yellow-400"}`}
                  >
                    <Star size={18} fill={story.isFeatured ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-[#264653] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {story.storyType === "ORPHAN_STORY" ? "এতিমের গল্প" : "সাধারণ"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-[#264653] line-clamp-1 mb-2">{story.storyTitle}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">{story.storyContent}</p>

                <div className="flex items-center justify-between border-t pt-4">
                  <button onClick={() => handleToggle(story.storyId, "status")}>
                    {story.isActive ? (
                      <span className="text-green-500 flex items-center gap-1 text-xs font-bold"><CheckCircle size={14} /> সক্রিয়</span>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-1 text-xs font-bold"><XCircle size={14} /> নিষ্ক্রিয়</span>
                    )}
                  </button>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditItem(story); setIsFormOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(story.storyId)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <StoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSuccess={fetchStories} editItem={editItem} />
    </div>
  );
}