import { AuthProvider } from "@/components/AuthProvider";
import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Case Evidence Analyzer",
  description: "AI-powered factual extraction and timeline generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
