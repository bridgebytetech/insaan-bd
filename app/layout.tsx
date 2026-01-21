// // app/layout.tsx
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/app/components/public/Navbar";
// import { hind_siliguri } from "@/app/ui/fonts";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "OrphanCare - Give Hope, Change Lives",
//   description:
//     "Support orphaned children in Bangladesh through our donation platform",
//   keywords: "orphan, donation, charity, Bangladesh, support, education",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={hind_siliguri.className}>
//         {/* <Navbar /> */}
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OrphanCare",
  description: "Donation platform for orphans in Bangladesh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}