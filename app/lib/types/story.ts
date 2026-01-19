export interface SuccessStory {
  storyId: number;
  storyTitle: string;
  storyContent: string;
  storyPhotoUrl: string;
  storyType: "ORPHAN_STORY" | "GENERAL_STORY"; // API অনুযায়ী
  orphanName?: string;
  donorName?: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}