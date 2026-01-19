
// lib/utils/constants.ts
export const SITE_NAME = 'OrphanCare';
export const SITE_TAGLINE = 'Give Hope, Change Lives';

export const DONATION_TIERS = [
  { amount: 3000, label: 'Basic Support' },
  { amount: 5000, label: 'Standard Support' },
  { amount: 8000, label: 'Premium Support' },
  { amount: 10000, label: 'Full Support' },
];

export const ORPHAN_CATEGORIES = [
  'Education',
  'Healthcare',
  'Nutrition',
  'Shelter',
  'Emergency',
];

export const GALLERY_CATEGORIES = [
  'Education',
  'Events',
  'Healthcare',
  'Community',
  'Celebrations',
];

export const ITEMS_PER_PAGE = 12;

export const stats = [
  {
    icon: "Users",
    value: "250+",
    label: "Total Orphans",
    desc: "Providing a safe haven and education for children in need.",
    color: "#2A9D8F",
  },
  {
    icon: "Heart",
    value: "180+",
    label: "Sponsored",
    desc: "Connecting children with loving sponsors worldwide.",
    color: "#E76F51",
  },
  {
    icon: "Gift",
    value: "70+",
    label: "Waiting",
    desc: "Currently seeking support for new arrivals this month.",
    color: "#264653",
  },
  {
    icon: "TrendingUp",
    value: "500+",
    label: "Families",
    desc: "Strengthening communities through sustainable aid.",
    color: "#8AB17D",
  },
];

export const orphans = [
  {
    id: 1,
    name: "রহিম",
    age: 8,
    gender: "ছেলে",
    story: "স্বপ্ন দেখে ডাক্তার হওয়ার। পড়াশোনায় খুবই মেধাবী।",
    status: "Need Sponsor",
  },
  {
    id: 2,
    name: "আয়শা",
    age: 10,
    gender: "মেয়ে",
    story: "শিক্ষক হতে চায়। বই পড়তে খুব ভালোবাসে।",
    status: "Need Sponsor",
  },
  {
    id: 3,
    name: "সাকিব",
    age: 7,
    gender: "ছেলে",
    story: "ছবি আঁকতে পছন্দ করে। খুব মেধাবী শিশু।",
    status: "Need Sponsor",
  },
  {
    id: 4,
    name: "ফাতিমা",
    age: 9,
    gender: "মেয়ে",
    story: "নার্স হতে চায়। মানুষকে সেবা করতে ভালোবাসে।",
    status: "Need Sponsor",
  },
];

export const testimonials = [
  {
    name: "Mohammad Rashid",
    quote: "আপনার সাহায্যের মাধ্যমে আমি আমার পড়াশোনা চালিয়ে যেতে পারছি। এখন আমি বড় হয়ে ইঞ্জিনিয়ার হওয়ার স্বপ্ন দেখি।",
    impact: "Education Support",
  },
  {
    name: "Anika Tahsin",
    quote: "অনাথ শিশুদের মুখে হাসি ফোটাতে পেরে আমি ধন্য। এই প্ল্যাটফর্মটি সত্যিই স্বচ্ছতার সাথে কাজ করছে।",
    impact: "Platinum Donor",
  },
  {
    name: "Dr. Ahsan Habib",
    quote: "দাতব্য কাজের জন্য এর চেয়ে বিশ্বস্ত মাধ্যম আর হতে পারে না। আমি নিয়মিত এখানে অনুদান দিচ্ছি।",
    impact: "Regular Supporter",
  },
  {
    name: "Sumi Akter",
    quote: "খাবার এবং বাসস্থানের নিশ্চয়তা পেয়ে আমি এখন অনেক শান্তিতে আছি। আমি আপনাদের দোয়া করি।",
    impact: "Shelter Project",
  },
  {
    name: "Farhana Islam",
    quote: "ছোট্ট একটি অনুদান যে কারোর জীবনে এত বড় পরিবর্তন আনতে পারে, তা এখানে না আসলে বুঝতাম না।",
    impact: "Donor Experience",
  },
  {
    name: "Kamrul Hassan",
    quote: "আমার ব্যবসার লভ্যাংশের একটি অংশ প্রতি মাসে অনাথ শিশুদের জন্য বরাদ্দ রাখি, যা আমার মনে প্রশান্তি দেয়।",
    impact: "Business Partner",
  },
  {
    name: "Nasrin Sultana",
    quote: "মেডিকেল ক্যাম্পের মাধ্যমে আমি যে চিকিৎসা পেয়েছি, তার জন্য আপনাদের প্রতি চিরকৃতজ্ঞ।",
    impact: "Medical Aid",
  },
  {
    name: "Zubayer Ahmed",
    quote: "স্বচ্ছ রিপোর্ট এবং সরাসরি যোগাযোগের ব্যবস্থা আমাকে সবচেয়ে বেশি আকৃষ্ট করেছে।",
    impact: "Trusted Donor",
  },
  {
    name: "Fatima Khatun",
    quote: "নতুন জামা আর বই পেয়ে আমি অনেক খুশি। আমি এখন প্রতিদিন স্কুলে যাই।",
    impact: "Child Development",
  },
  {
    name: "Jahidul Islam",
    quote: "সামাজিক দায়বদ্ধতা থেকে আমাদের সবার উচিত এই ধরনের উদ্যোগের পাশে দাঁড়ানো।",
    impact: "Community Hero",
  },
  {
    name: "Mousumi Roy",
    quote: "আমি এক বছরের জন্য একটি শিশুর পড়াশোনার দায়িত্ব নিয়েছি, এটি আমার জীবনের সেরা সিদ্ধান্ত।",
    impact: "Child Sponsorship",
  },
  {
    name: "Abdur Rahman",
    quote: "ঈদের সময় নতুন পোশাক পেয়ে আমাদের এতিমখানার সব শিশু অনেক আনন্দিত ছিল।",
    impact: "Eid Gift Project",
  }
];

export const activities = [
  {
    title: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৪",
    date: "15 Dec 2024",
    desc: "২০০+ এতিম শিশুকে শীতবস্ত্র বিতরণ করা হয়েছে।",
    img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    date: "10 Dec 2024",
    desc: "শিশুদের মানসিক ও শারীরিক বিকাশের জন্য ক্রীড়া আয়োজন।",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "শিক্ষা উপকরণ বিতরণ",
    date: "05 Dec 2024",
    desc: "নতুন শিক্ষাবর্ষের জন্য বই ও খাতা বিতরণ।",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "স্বাস্থ্য পরীক্ষা ক্যাম্প",
    date: "01 Dec 2024",
    desc: "বিনামূল্যে স্বাস্থ্য পরীক্ষা ও চিকিৎসা সেবা।",
    img: "https://images.unsplash.com/photo-1584515933487-759f3d415c22?auto=format&fit=crop&q=80&w=800",
  },
];

export const features = [
  {
    icon: "Shield",
    title: "100% Transparency",
    desc: "সম্পূর্ণ স্বচ্ছতার সাথে কাজ করি",
  },
  {
    icon: "CheckCircle",
    title: "Verified Orphans",
    desc: "সকল তথ্য যাচাইকৃত",
  },
  {
    icon: "Bell",
    title: "Regular Updates",
    desc: "নিয়মিত আপডেট পাবেন",
  },
  {
    icon: "Award",
    title: "Certified NGO",
    desc: "সরকার অনুমোদিত সংস্থা",
  },
  {
    icon: "Users",
    title: "Experienced Team",
    desc: "অভিজ্ঞ ও দক্ষ টিম",
  },
  {
    icon: "FileText",
    title: "Impact Reports",
    desc: "বিস্তারিত রিপোর্ট প্রদান",
  },
];

export const galleryImages = [
  {
    id: 1,
    size: "md:col-span-2 md:row-span-2 col-span-2",
    title: "Education for All",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
    tag: "Education",
  },
  {
    id: 2,
    size: "col-span-1 row-span-1",
    title: "Daily Nutrition",
    url: "https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=600&auto=format&fit=crop",
    tag: "Health",
  },
  {
    id: 3,
    size: "col-span-1 row-span-1",
    title: "Smiling Faces",
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
    tag: "Support",
  },
  {
    id: 4,
    size: "col-span-1 row-span-2",
    title: "Future Leaders",
    url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600&auto=format&fit=crop",
    tag: "Vision",
  },
  {
    id: 5,
    size: "md:col-span-2 col-span-2 row-span-1",
    title: "Community Outreach",
    url: "https://images.unsplash.com/photo-1593113503872-498737d04a75?q=80&w=1000&auto=format&fit=crop",
    tag: "Event",
  },
  {
    id: 6,
    size: "col-span-1 row-span-1",
    title: "Creative Learning",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
    tag: "Skills",
  },
];

export const news = [
  {
    title: "Insaan BD receives National Award",
    date: "20 Dec 2024",
    excerpt: "আমরা জাতীয় পর্যায়ে শ্রেষ্ঠ NGO হিসেবে পুরস্কৃত হয়েছি...",
    category: "Award",
  },
  {
    title: "New Education Program Launched",
    date: "18 Dec 2024",
    excerpt: "আমরা নতুন শিক্ষা কর্মসূচি চালু করেছি যা...",
    category: "Program",
  },
  {
    title: "100 More Children Sponsored",
    date: "15 Dec 2024",
    excerpt: "এই মাসে আরো ১০০ জন শিশু স্পন্সরশিপ পেয়েছে...",
    category: "Success",
  },
];

export const helpWays = [
  {
    icon: "Heart",
    title: "Monthly Sponsorship",
    desc: "একটি শিশুর মাসিক স্পন্সর হন",
    buttonText: "Start Now",
    color: "#2A9D8F",
  },
  {
    icon: "Gift",
    title: "One-Time Donation",
    desc: "এককালীন দান করুন",
    buttonText: "Donate Now",
    color: "#E76F51",
  },
  {
    icon: "HandHeart",
    title: "Volunteer with Us",
    desc: "স্বেচ্ছাসেবক হিসেবে যোগ দিন",
    buttonText: "Join Us",
    color: "#264653",
  },
  {
    icon: "Package",
    title: "Donate Goods",
    desc: "পোশাক, বই ইত্যাদি দান করুন",
    buttonText: "Learn More",
    color: "#8AB17D",
  },
];

export const howItWorksSteps = [
  {
    icon: "Eye",
    title: "Browse",
    desc: "এতিম শিশুদের তালিকা দেখুন",
    color: "#2A9D8F",
  },
  {
    icon: "Heart",
    title: "Choose",
    desc: "একটি শিশু নির্বাচন করুন",
    color: "#E76F51",
  },
  { icon: "Gift", title: "Donate", desc: "দান করুন", color: "#264653" },
  {
    icon: "Smile",
    title: "Impact",
    desc: "জীবন পরিবর্তন করুন",
    color: "#8AB17D",
  },
];