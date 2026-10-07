import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "LIKE ARCHITECTS",
  description: "Architecture firm website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-screen bg-white text-[#222222] font-sans selection:bg-[#222] selection:text-white">
        
        <Sidebar />

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 w-full min-h-screen relative">
          {children}
        </main>
        
      </body>
    </html>
  );
}
