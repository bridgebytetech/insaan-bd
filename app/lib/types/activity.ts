export interface ActivityItem {
  activityId: number;
  activityTitle: string;
  activityDescription: string;
  activityPhotoUrl: string;
  activityDate: string;
  activityLocation: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminActivityItem {
  activityId: number;
  activityTitle: string;
  activityDescription: string;
  activityPhotoUrl: string;
  activityDate: string;
  activityLocation: string;
  isActive: boolean;
  createdAt: string;
}

export interface ActivityRequest {
  activityTitle: string;
  activityDescription: string;
  activityPhotoUrl: string;
  activityDate: string;
  activityLocation: string;
}