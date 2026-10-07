"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  // 페이지 이동 시 사이드바 자동 열림/닫힘 제어
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (pathname.startsWith('/project/')) {
      // 프로젝트 상세 페이지 진입 시 자동으로 숨김 (사진 몰입도 극대화)
      setIsOpen(false);
    } else if (pathname === '/') {
      // 홈 화면 진입 시 데스크탑은 열고, 모바일은 닫아줌
      setIsOpen(!isMobile);
    }
  }, [pathname]);

  return (
    <>
      {/* 토글 아이콘 (열림: 좌측 화살표, 닫힘: 햄버거 메뉴) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-10 left-10 z-[60] w-6 h-6 flex justify-center items-center text-[#222] transition-all duration-500 hover:opacity-60"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          /* 사이드바 접기 (좌측 화살표) */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        ) : (
          /* 사이드바 열기 (비대칭 햄버거 메뉴) */
          <div className="flex flex-col items-start gap-[5px] w-full">
            <span className="block h-[1px] bg-[#222] w-full transition-all duration-300"></span>
            <span className="block h-[1px] bg-[#222] w-2/3 transition-all duration-300"></span>
            <span className="block h-[1px] bg-[#222] w-5/6 transition-all duration-300"></span>
          </div>
        )}
      </button>

      <header 
        className={`
          w-full lg:w-[240px] fixed h-screen top-0 left-0 pt-32 pb-10 px-10
          flex flex-col justify-between bg-white z-50 
          lg:border-r border-gray-200/50
          transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'}
        `}
      >
        <div>
          <Link href="/" className="block mb-16 w-24 relative hover:opacity-70 transition-opacity -ml-1.5">
            <Image 
              src="/logo.png" 
              alt="LIKE ARCHITECTS" 
              width={200} 
              height={200} 
              className="w-full h-auto object-contain"
              priority
            />
          </Link>
          <nav className="flex flex-col gap-6 group/nav">
            <Link onClick={() => setIsOpen(false)} href="/about" className="text-[11px] font-medium text-gray-500 hover:text-black transition-colors uppercase tracking-[0.2em]">ABOUT</Link>
            <Link onClick={() => setIsOpen(false)} href="/news" className="text-[11px] font-medium text-gray-500 hover:text-black transition-colors uppercase tracking-[0.2em]">NEWS</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="text-[11px] font-medium text-gray-500 hover:text-black transition-colors uppercase tracking-[0.2em]">CONTACT</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-8">
          {/* Social Icons */}
          <div className="flex gap-3">
            <Link href="https://www.instagram.com/likearchitects.kr" target="_blank" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </Link>
            <Link href="https://architools.kr/" target="_blank" className="w-8 h-8 rounded-full border border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors" aria-label="Architools">
              <span className="text-[5px] font-black leading-none tracking-tighter">ARCHI</span>
              <span className="text-[5px] font-black leading-none tracking-tighter">TOOLS</span>
            </Link>
          </div>
          <p className="text-[9px] text-gray-500 font-medium tracking-widest uppercase leading-relaxed">&copy; {new Date().getFullYear()} LIKE ARCHITECTS</p>
        </div>
      </header>

      {/* 데스크탑에서 사이드바가 열려있을 때 밀어내는 빈 공간 */}
      <div 
        className={`hidden lg:block transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'w-[240px]' : 'w-0'}`} 
      />
    </>
  );
}
