import StoryClient from "@/app/(public)/success-stories/StoryClient";
import api from "@/app/lib/api/axios";
import { SuccessStory } from "@/app/lib/types/story";

async function getStories() {
  try {
    const [allRes, featuredRes] = await Promise.all([
      api.get<{ data: SuccessStory[] }>("/public/stories"),
      api.get<{ data: SuccessStory[] }>("/public/stories/featured"),
    ]);

    return {
      all: allRes.data.data.filter((s) => s.isActive) || [],
      featured: featuredRes.data.data.filter((s) => s.isActive) || [],
    };
  } catch (error) {
    console.error("Story fetch error:", error);
    return { all: [], featured: [] };
  }
}

export default async function SuccessStoriesPage() {
  const { all, featured } = await getStories();

  return <StoryClient stories={all} featuredStories={featured} />;
}
