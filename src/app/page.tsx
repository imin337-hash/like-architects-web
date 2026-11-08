"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sampleProjects } from "@/lib/sampleData";
import { useSidebar } from "@/context/SidebarContext";

// 카테고리 정의 (전체 및 3개 분류 체계)
const CATEGORIES = ["ALL", "ARCHITECTURE", "INTERIOR", "DESIGN"];

export default function Home() {
  const { isOpen } = useSidebar();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeTouchedId, setActiveTouchedId] = useState<string | null>(null);
  const projects = sampleProjects;

  // 카테고리 순서 정의
  const CATEGORY_ORDER = ["ARCHITECTURE", "INTERIOR", "DESIGN"];

  // 현재 선택된 카테고리에 맞게 프로젝트 필터링 및 정렬
  const filteredProjects = [...projects]
    .filter((project: any) => {
      if (activeCategory === "ALL") return true;
      
      const terms = project._embedded?.['wp:term']?.flat() || [];
      const categoryNames = terms.map((term: any) => term.name?.toUpperCase());
      if (project.category) {
        categoryNames.push(project.category.toUpperCase());
      }
      
      return categoryNames.includes(activeCategory); 
    })
    .sort((a: any, b: any) => {
      // 최신 연도순 정렬 (Year 내림차순: 2026 -> 2024 -> 2023 ...)
      const yearA = parseInt(a.acf?.year || "0", 10);
      const yearB = parseInt(b.acf?.year || "0", 10);
      if (yearB !== yearA) {
        return yearB - yearA;
      }

      return 0; // 연도가 동일하면 등록 순서 유지
    });

  // 모바일 터치 인터랙션 (C방식: 첫 번째 터치 시 제목 오버레이 노출, 두 번째 터치 시 상세 이동)
  const handleCardClick = (e: React.MouseEvent, projectId: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      if (activeTouchedId !== projectId) {
        e.preventDefault();
        e.stopPropagation();
        setActiveTouchedId(projectId);
      }
    }
  };

  return (
    <section 
      onClick={() => setActiveTouchedId(null)}
      className="min-h-screen flex flex-col px-5 sm:px-6 lg:px-10 pb-10"
    >
      
      {/* 상단 카테고리 필터 영역 (모바일 1줄 고정 & 햄버거 메뉴와 황금 비율 정렬) */}
      <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md pt-8 sm:pt-9 pb-5 sm:pb-6 mb-4 flex flex-nowrap items-center overflow-x-auto hide-scrollbar gap-3.5 sm:gap-6 lg:gap-8 text-[9.5px] sm:text-[10px] font-medium tracking-[0.14em] lg:tracking-[0.2em] uppercase transition-all duration-500 ${isOpen ? 'pl-0' : 'pl-9 sm:pl-12 lg:pl-16'}`}>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={(e) => {
              e.stopPropagation();
              setActiveCategory(category);
              setActiveTouchedId(null);
            }}
            className={`flex-shrink-0 whitespace-nowrap transition-colors border-b pb-1 ${
              activeCategory === category 
                ? "text-black border-black font-semibold" 
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 프로젝트 그리드 영역: 데스크탑 6열, 모바일 2열 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 group/grid">
        {filteredProjects.length > 0 ? filteredProjects.map((project: any) => {
          const isTouched = activeTouchedId === project.id;
          return (
            <Link 
              href={`/project/${project.id}`}
              key={project.id}
              onClick={(e) => handleCardClick(e, project.id)}
              className={`relative bg-[#eaeaea] cursor-pointer overflow-hidden transition-all duration-700 ease-out 
                group/item aspect-[4/3] ${
                  isTouched 
                    ? '!opacity-100 ring-2 ring-black/10' 
                    : 'group-hover/grid:opacity-30 hover:!opacity-100'
                }`}
            >
              {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <Image 
                  src={project._embedded['wp:featuredmedia'][0].source_url} 
                  alt={project.title.rendered} 
                  fill 
                  className={`object-cover transition-transform duration-[1500ms] ${
                    isTouched ? 'scale-105' : 'group-hover/item:scale-105'
                  }`}
                />
              )}
              {/* 타이틀 및 카테고리 오버레이 (C방식: 평소 100% 무노출 ➔ 데스크탑 호버 또는 모바일 터치 시 페이드인) */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px] transition-opacity duration-300 p-3 text-center ${
                  isTouched 
                    ? 'opacity-100' 
                    : 'opacity-0 lg:group-hover/item:opacity-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/80 uppercase mb-1">
                    {project.category} · {project.acf?.year}
                  </span>
                  <h3 className="text-white text-[11px] lg:text-[12px] font-medium tracking-wider uppercase break-words line-clamp-2 px-1">
                    {project.title.rendered}
                  </h3>
                </div>
              </div>
            </Link>
          );
        }) : (
          <div className="col-span-full py-32 text-center text-gray-400 text-[11px] font-medium tracking-[0.2em] uppercase">
            해당 카테고리의 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
