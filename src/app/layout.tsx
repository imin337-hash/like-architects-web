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
  // [공사 중 스위치] 정식 오픈하실 때는 마지막의 true를 false로 바꾸시면 됩니다!
  // (process.env.NODE_ENV === 'production' 덕분에 사장님 컴퓨터(localhost)에서는 항상 진짜 사이트가 보입니다.)
  const isUnderConstruction = process.env.NODE_ENV === 'production' && true;

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
