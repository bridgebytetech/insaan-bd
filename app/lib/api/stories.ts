// lib/api/stories.ts
import { SuccessStory } from '@/app/lib/types';
import storiesData from '@/app/lib/data/stories.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let stories: SuccessStory[] = [...storiesData];

export const storyApi = {
  async getAll(): Promise<SuccessStory[]> {
    await delay(300);
    return [...stories];
  },

  async getById(id: string): Promise<SuccessStory | null> {
    await delay(200);
    return stories.find(s => s.id === id) || null;
  },

  async create(story: Omit<SuccessStory, 'id' | 'datePublished'>): Promise<SuccessStory> {
    await delay(400);
    const newStory: SuccessStory = {
      ...story,
      id: `story-${Date.now()}`,
      datePublished: new Date().toISOString().split('T')[0],
    };
    stories.push(newStory);
    return newStory;
  },

  async update(id: string, updates: Partial<SuccessStory>): Promise<SuccessStory | null> {
    await delay(400);
    const index = stories.findIndex(s => s.id === id);
    if (index === -1) return null;
    stories[index] = { ...stories[index], ...updates };
    return stories[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = stories.findIndex(s => s.id === id);
    if (index === -1) return false;
    stories.splice(index, 1);
    return true;
  },
};
