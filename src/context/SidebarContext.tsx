"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  setIsOpen: () => {},
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
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

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
