import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/app/components/public/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Insaan BD Foundation",
  description: "Pure Humanity - Supporting Orphan Children",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="public-layout" style={{ fontFamily: 'var(--font-hind), var(--font-figtree), sans-serif' }}>
        <Navbar />
        <main>
          {children}
        </main>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </AuthProvider>
  );
}