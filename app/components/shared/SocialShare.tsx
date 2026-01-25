"use client"; // এটি অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import { Facebook, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SocialShare({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // ব্রাউজারে লোড হওয়ার পর বর্তমান URL সেট হবে
    setUrl(window.location.href);
  }, []);

  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Sharing failed", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("লিঙ্ক কপি করা হয়েছে!");
    }
  };

  return (
    <div className="flex gap-3">
      <button 
        onClick={shareOnFacebook}
        className="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-[#1877F2] hover:bg-gray-50 transition-all"
      >
        <Facebook size={16} />
      </button>
      <button 
        onClick={shareGeneral}
        className="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-[#2A9D8F] hover:bg-gray-50 transition-all"
      >
        <Share2 size={16} />
      </button>
    </div>
  );
}