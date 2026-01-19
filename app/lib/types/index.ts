// lib/types/index.ts

export type OrphanStatus = 'pending' | 'approved' | 'rejected';
export type DonorStatus = 'active' | 'inactive';
export type DonationType = 'monthly' | 'one-time';

export interface Orphan {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  story: string;
  imageUrl: string;
  status: OrphanStatus;
  dateSubmitted: string;
  monthlyNeed: number;
  currentSponsors: number;
  totalSponsorsNeeded: number;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: DonorStatus;
  dateJoined: string;
  totalDonations: number;
  sponsoredOrphans: string[]; // Orphan IDs
  imageUrl?: string;
}

export interface Donation {
  id: string;
  donorId: string;
  orphanId: string;
  amount: number;
  date: string;
  type: DonationType;
  transactionId: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  dateAdded: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  orphanName: string;
  story: string;
  imageUrl: string;
  datePublished: string;
  outcome: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  about: {
    mission: string;
    vision: string;
    values: string[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

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


export interface GalleryItem {
  photoId: number;
  photoUrl: string;
  photoTitle: string;
  photoCaption: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}