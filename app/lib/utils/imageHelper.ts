// @/app/lib/utils/imageHelper.ts

const API_BASE_URL = "https://api.insaanbd.org";
const DEFAULT_AVATAR = "https://api.insaanbd.org/uploads/default-avatar.png";

export const formatImageUrl = (path: string | null | undefined): string => {
  // 1. Handle Empty Data
  if (!path || path.trim() === "" || path.includes("default-avatar.png")) {
    return DEFAULT_AVATAR;
  }

  const trimmedPath = path.trim();

  // 2. Handle absolute URLs (like Flaticon or external links)
  if (trimmedPath.startsWith("http")) {
    return trimmedPath;
  }

  // 3. Clean the filename
  // This removes prefixes if the backend accidentally saved them
  const filename = trimmedPath
    .replace(/^\//, "")               // Remove leading slash
    .replace(/^uploads\//, "")        // Remove 'uploads/'
    .replace(/^api\/public\/files\//, ""); // Remove 'api/public/files/'

  // 4. Construct the standard endpoint URL
  return `${API_BASE_URL}/api/public/files/${filename}`;
};