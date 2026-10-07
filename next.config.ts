import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Vercel 이미지 최적화 오류 방지
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 임시로 모든 도메인 허용
      },
      {
        protocol: 'http',
        hostname: '**', // 임시로 모든 도메인 허용
      }
    ],
  },
};

export default nextConfig;
