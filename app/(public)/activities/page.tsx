import ActivityClient from "@/app/(public)/activities/ActivityClient";
import api from "@/app/lib/api/axios";
import { ActivityItem } from "@/app/lib/types/activity";

async function getActivities(): Promise<ActivityItem[]> {
  try {
    const response = await api.get<{ data: ActivityItem[] }>('/public/activities');
    // শুধুমাত্র একটিভ অ্যাক্টিভিটিগুলো দেখানোর জন্য ফিল্টার করতে পারেন
    return response.data.data.filter(item => item.isActive) || [];
  } catch (error) {
    console.error("Activity fetch error:", error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="bg-[#F8F9FA]">
      <ActivityClient items={activities} />
    </main>
  );
}