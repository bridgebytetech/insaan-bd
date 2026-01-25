// app/(public)/activities/page.tsx
import ActivityClient from "@/app/(public)/activities/ActivityClient";
import api from "@/app/lib/api/axios";
import { ActivityItem } from "@/app/lib/types/activity";
import Footer from "@/app/components/shared/Footer";

async function getActivities(): Promise<ActivityItem[]> {
  try {
    const response = await api.get<{ data: ActivityItem[] }>(
      "/public/activities",
    );
    return response.data.data.filter((item) => item.isActive) || [];
  } catch (error) {
    console.error("Activity fetch error:", error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="bg-white min-h-screen">
      <ActivityClient items={activities} />
      <Footer />
    </main>
  );
}
