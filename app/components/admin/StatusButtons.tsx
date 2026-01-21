import api from "@/app/lib/api/axios"; // আপনার ইন্টারসেপ্টর ফাইলটি এখানে ইমপোর্ট করুন
import { toast } from "react-hot-toast";
import { Check, X } from "lucide-react";

export default function StatusButtons({ id, refresh }: { id: number, refresh: () => void }) {
  const handleAction = async (action: 'approve' | 'reject') => {
    try {
      await api.put(`/admin/orphans/${id}/${action}`);
      toast.success(action === 'approve' ? "অনুমোদন সফল!" : "বাতিল করা হয়েছে");
      refresh();
    } catch (error) {
      toast.error("প্রক্রিয়াটি সম্পন্ন করা যায়নি");
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => handleAction('approve')} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
        <Check size={18} />
      </button>
      <button onClick={() => handleAction('reject')} className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
        <X size={18} />
      </button>
    </div>
  );
}