// @/app/lib/services/uploadService.ts
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.insaanbd.org/api/public/upload", {
    method: "POST",
    body: formData,
  });
  
  const result = await res.json();
  if (result.success) return result.data.url;
  throw new Error("Upload failed");
};