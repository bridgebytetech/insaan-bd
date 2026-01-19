import GalleryClient from "@/app/(public)/gallery/GalleryClient";
import api from "@/app/lib/api/axios";
import { GalleryItem } from "@/app/lib/types/index"; // যেখানে ইন্টারফেসটি রেখেছেন

async function getGalleryData(): Promise<GalleryItem[]> {
  try {
    const response = await api.get<{ data: GalleryItem[] }>('/public/gallery');
    return response.data.data || [];
  } catch (error) {
    console.error("Gallery data fetch error:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryData();

  return <GalleryClient items={galleryItems} />;
}