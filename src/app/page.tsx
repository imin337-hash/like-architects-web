"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sampleProjects } from "@/lib/sampleData";
import { useSidebar } from "@/context/SidebarContext";

// 카테고리 목록 (워드프레스 분류와 연동)
const CATEGORIES = ["ALL", "ARCHITECTURE", "INTERIOR", "DESIGN"];

export default function Home() {
  const { isOpen } = useSidebar();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const projects = sampleProjects;


  // 카테고리 순서 정의 (ARCHITECTURE -> INTERIOR -> COMPETITION -> +)
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

  return (
    <section className="min-h-screen flex flex-col px-5 sm:px-6 lg:px-10 pb-10">
      
      {/* 상단 카테고리 필터 영역 (모바일 1줄 고정 & 햄버거 메뉴와 황금 비율 정렬) */}
      <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md pt-8 sm:pt-9 pb-5 sm:pb-6 mb-4 flex flex-nowrap items-center overflow-x-auto hide-scrollbar gap-3.5 sm:gap-6 lg:gap-8 text-[9.5px] sm:text-[10px] font-medium tracking-[0.14em] lg:tracking-[0.2em] uppercase transition-all duration-500 ${isOpen ? 'pl-0' : 'pl-9 sm:pl-12 lg:pl-16'}`}>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
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

      {/* 프로젝트 그리드 영역: 한 줄에 7개씩 표시 (데스크탑) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 group/grid">
        {filteredProjects.length > 0 ? filteredProjects.map((project: any) => (
            <Link 
              href={`/project/${project.id}`}
              key={project.id} 
              className="relative bg-[#eaeaea] cursor-pointer overflow-hidden transition-all duration-700 ease-out 
                group/item group-hover/grid:opacity-30 hover:!opacity-100 aspect-[4/3]"
            >
              {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <Image 
                  src={project._embedded['wp:featuredmedia'][0].source_url} 
                  alt={project.title.rendered} 
                  fill 
                  className="object-cover transition-transform duration-[1500ms] group-hover/item:scale-105" 
                />
              )}
              {/* 마우스 호버 시 나오는 타이틀 및 카테고리 (모바일에서는 항상 표시) */}
              <div className="absolute inset-0 flex items-end justify-center lg:items-center bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-black/35 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 p-3 pb-4 lg:pb-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/70 uppercase mb-1">
                    {project.category} · {project.acf?.year}
                  </span>
                  <h3 className="text-white text-[11px] lg:text-[12px] font-medium tracking-wider uppercase break-words line-clamp-2 px-1">
                    {project.title.rendered}
                  </h3>
                </div>
              </div>
            </Link>
          )
        ) : (
          <div className="col-span-full py-32 text-center text-gray-400 text-[11px] font-medium tracking-[0.2em] uppercase">
            해당 카테고리의 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
