
// lib/api/gallery.ts
import { GalleryImage } from '@/app/lib/types';
import galleryData from '@/app/lib/data/gallery.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let images: GalleryImage[] = [...galleryData];

export const galleryApi = {
  async getAll(): Promise<GalleryImage[]> {
    await delay(300);
    return [...images];
  },

  async getByCategory(category: string): Promise<GalleryImage[]> {
    await delay(300);
    return images.filter(img => img.category === category);
  },

  async create(image: Omit<GalleryImage, 'id' | 'dateAdded'>): Promise<GalleryImage> {
    await delay(400);
    const newImage: GalleryImage = {
      ...image,
      id: `gal-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    images.push(newImage);
    return newImage;
  },

  async update(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
    await delay(400);
    const index = images.findIndex(img => img.id === id);
    if (index === -1) return null;
    images[index] = { ...images[index], ...updates };
    return images[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = images.findIndex(img => img.id === id);
    if (index === -1) return false;
    images.splice(index, 1);
    return true;
  },

  async getCategories(): Promise<string[]> {
    await delay(200);
    return [...new Set(images.map(img => img.category))];
  },
};
