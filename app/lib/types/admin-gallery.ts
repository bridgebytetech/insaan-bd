export interface AdminGalleryItem {
  photoId: number;
  photoUrl: string;
  photoTitle: string;
  photoCaption: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;

}

export interface GalleryRequest {
  photoUrl: string;
  title: string;
  description: string;
  time: string;
  displayOrder: number;
}