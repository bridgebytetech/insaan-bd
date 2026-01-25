// lib/utils/image.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.insaanbd.org';
const DEFAULT_AVATAR = '/images/default-avatar.png';

/**
 * Build full image URL from API response
 */
export function getImageUrl(path: string | null | undefined): string {
  // Return default if null/empty
  if (!path || path.trim() === '') {
    return DEFAULT_AVATAR;
  }

  const trimmedPath = path.trim();

  // Already full URL
  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
    return trimmedPath;
  }

  // Starts with /uploads - add base URL
  if (trimmedPath.startsWith('/uploads/')) {
    return `${API_BASE_URL}${trimmedPath}`;
  }

  // Starts with uploads (no leading slash)
  if (trimmedPath.startsWith('uploads/')) {
    return `${API_BASE_URL}/${trimmedPath}`;
  }

  // Just filename - assume it's in avatars folder
  if (!trimmedPath.includes('/')) {
    return `${API_BASE_URL}/uploads/avatars/${trimmedPath}`;
  }

  // Other paths
  return `${API_BASE_URL}/uploads/${trimmedPath}`;
}

/**
 * Get fallback avatar URL
 */
export function getFallbackAvatar(name?: string): string {
  if (name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  }
  return DEFAULT_AVATAR;
}