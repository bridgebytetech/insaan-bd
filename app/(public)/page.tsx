import Hero from "@/app/components/public/Home/Hero";
import QuickStats from "@/app/components/public/Home/QuickStats";
import Introduction from "@/app/components/public/Home/Introduction";
import HowItWorks from "@/app/components/public/Home/HowItWorks";
import SuccessStories from "@/app/components/public/Home/SuccessStories";
import WhyChooseUs from "@/app/components/public/Home/WhyChooseUs";
import RecentActivities from "@/app/components/public/Home/RecentActivities";
import GalleryPreview from "@/app/components/public/Home/GalleryPreview";
import WaysToHelp from "@/app/components/public/Home/WaysToHelp";
import LatestNews from "@/app/components/public/Home/LatestNews";
import Newsletter from "@/app/components/public/Home/Newsletter";
import FinalCTA from "@/app/components/public/Home/FinalCTA";
import DonationForm from "@/app/components/public/Home/DonationForm";
import Footer from "@/app/components/shared/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <QuickStats />
      <Introduction />
      <HowItWorks />

      <WhyChooseUs />
      <RecentActivities />
      {/* <GalleryPreview /> */}
      {/* <WaysToHelp /> */}
      {/* <LatestNews /> */}
      {/* <Newsletter /> */}
      <FinalCTA />
      <SuccessStories />
      {/* <DonationForm /> */}
      <Footer />
    </main>
  );
}

export const metadata = {
  title: "Insaan BD - সহমর্মিতার হাত একটি শিশুর জন্য",
  description:
    "আপনার সামান্য অবদান হতে পারে একটি এতিম শিশুর উজ্জ্বল ভবিষ্যতের চাবিকাঠি।",
};
