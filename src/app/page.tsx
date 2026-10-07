"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// 카테고리 목록 (추후 워드프레스 ACF 연동 가능)
const CATEGORIES = ["ALL", "ARCHITECTURE", "INTERIOR"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 워드프레스에서 실제 데이터 가져오기
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("https://likearch.mycafe24.com/wp-json/wp/v2/projects?_embed=1&per_page=100");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // 현재 선택된 카테고리에 맞게 프로젝트 필터링 (임시로 모두 노출)
  const filteredProjects = projects.filter((project: any) => {
    if (activeCategory === "ALL") return true;
    // 추후 워드프레스에 카테고리 필드가 추가되면 아래 주석을 풉니다
    // return project.acf?.category === activeCategory;
    return true; 
  });

  return (
    <section className="min-h-screen flex flex-col p-6 lg:p-10 pt-24 lg:pt-24">
      
      {/* 상단 카테고리 필터 영역 */}
      <div className="w-full mb-10 flex flex-wrap gap-8 text-[10px] font-medium tracking-[0.2em] uppercase pl-12 lg:pl-0">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`transition-colors border-b pb-1 ${
              activeCategory === category 
                ? "text-black border-black" 
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 프로젝트 그리드 영역 */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 group/grid">
        {filteredProjects.length > 0 ? filteredProjects.map((project: any) => (
            <Link 
              href={`/project/${project.id}`}
              key={project.id} 
              className="relative bg-[#eaeaea] cursor-pointer overflow-hidden transition-all duration-700 ease-out 
                group/item group-hover/grid:opacity-30 hover:!opacity-100 aspect-square"
            >
              {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <Image 
                  src={project._embedded['wp:featuredmedia'][0].source_url} 
                  alt={project.title.rendered} 
                  fill 
                  className="object-cover transition-transform duration-[1500ms] group-hover/item:scale-105" 
                />
              )}
              {/* 마우스 호버 시 나오는 타이틀 (모바일에서는 항상 표시) */}
              <div className="absolute inset-0 flex items-end justify-center lg:items-center bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-black/10 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 p-4 pb-6 lg:pb-4 text-center">
                <h3 className="text-white text-[12px] lg:text-[13px] font-medium tracking-widest uppercase">
                  {project.title.rendered}
                </h3>
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
