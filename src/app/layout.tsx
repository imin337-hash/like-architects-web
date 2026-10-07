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

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 공사 중 화면 모드 (Vercel 환경 변수로 제어)
  const isUnderConstruction = process.env.UNDER_CONSTRUCTION?.toLowerCase() === 'true';

  if (isUnderConstruction) {
    return (
      <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="flex items-center justify-center min-h-screen bg-white text-black font-sans p-8">
          <div className="text-center space-y-8">
            <h1 className="text-2xl lg:text-3xl font-medium tracking-[0.3em] uppercase">
              LIKE ARCHITECTS
            </h1>
            <p className="text-[11px] lg:text-[12px] tracking-widest text-gray-500 uppercase leading-relaxed">
              웹사이트 리뉴얼 작업 중입니다.<br/>
              Website is currently under construction.
            </p>
          </div>
        </body>
      </html>
    );
  }

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
