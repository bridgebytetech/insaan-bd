// app/layout.tsx



import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/components/public/Navbar";
import { hind_siliguri } from "@/app/ui/fonts";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={hind_siliguri.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


