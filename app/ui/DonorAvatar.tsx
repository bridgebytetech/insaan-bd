"use client";
import React, { useState } from "react";
import { formatImageUrl } from "@/app/lib/utils/imageHelper";
import { User } from "lucide-react";

interface Props {
  url?: string;
  name?: string;
  className?: string;
}

export default function DonorAvatar({ url, name, className = "w-10 h-10" }: Props) {
  const [error, setError] = useState(false);
  const fallback = "https://api.insaanbd.org/uploads/default-avatar.png";

  return (
    <div className={`${className} rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0`}>
      {error ? (
        <img src={fallback} alt="fallback" className="w-full h-full object-cover" />
      ) : (
        <img
          src={formatImageUrl(url)}
          alt={name || "Donor"}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}