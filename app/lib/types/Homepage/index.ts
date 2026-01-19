export interface DashboardStats {
  totalOrphans: number;
  approvedOrphans: number;
  pendingOrphans: number;
  rejectedOrphans: number;
  totalDonors: number;
  activeDonors: number;
  totalDonations: number;
  monthlyRevenue: number;
}


export interface Stat {
  icon: string;
  value: string;
  label: string;
  desc: string;
  color: string;
}

export interface Orphan {
  id: number;
  name: string;
  age: number;
  gender: string;
  story: string;
  status: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  impact: string;
}

export interface Activity {
  title: string;
  date: string;
  desc: string;
  img: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface GalleryImage {
  id: number;
  size: string;
  title: string;
  url: string;
  tag: string;
}

export interface News {
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

export interface HelpWay {
  icon: string;
  title: string;
  desc: string;
  buttonText: string;
  color: string;
}