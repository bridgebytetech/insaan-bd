// @/app/types/notification.ts (অথবা সরাসরি ফাইলের উপরে)
export type AdminNotification = {
  notificationId: number;
  notificationType: "ORPHAN_REGISTRATION" | "DONATION_VERIFICATION" | "CONNECTION_REQUEST" | string;
  notificationTitle: string;
  notificationMessage: string;
  referenceId: number;
  referenceType: string;
  isRead: boolean;
  createdAt: string;
};