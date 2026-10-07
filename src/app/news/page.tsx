"use client";

import { useState } from 'react';

const sampleNews = [
  { 
    id: 1, 
    title: "LIKE ARCHITECTS, 2026 한국건축문화대상 우수상 수상", 
    date: "2026. 09. 15", 
    category: "AWARD",
    content: "라이크 건축사사무소가 설계한 'The Minimalist Concrete' 프로젝트가 2026년 한국건축문화대상 우수상을 수상했습니다. 자연과 건축의 경계를 허문 실험적인 시도가 심사위원들의 높은 평가를 받았습니다.",
    link: ""
  },
  { 
    id: 2, 
    title: "건축전문지 SPACE 11월호 프로젝트 게재", 
    date: "2026. 08. 20", 
    category: "PRESS",
    content: "공간 매거진 11월호에 라이크 건축사사무소의 철학과 최근 프로젝트가 10페이지에 걸쳐 실렸습니다. 비워짐의 미학을 주제로 한 대표 건축사의 심도 깊은 대담을 확인하실 수 있습니다.",
    link: "https://vmspace.com"
  },
  { 
    id: 3, 
    title: "신입/경력 건축 설계직 채용 공고", 
    date: "2026. 07. 01", 
    category: "NOTICE",
    content: "라이크 건축사사무소에서 새로운 공간의 가능성을 함께 탐구할 열정적인 건축가를 찾습니다. 포트폴리오와 이력서를 info@likearchitects.kr 로 제출해 주시기 바랍니다.",
    link: ""
  },
  { 
    id: 4, 
    title: "DD HOUSE 프로젝트 준공 완료", 
    date: "2026. 05. 12", 
    category: "PROJECT",
    content: "2년간 심혈을 기울여 온 DD HOUSE가 성공적으로 준공되었습니다. 클라이언트의 삶을 온전히 담아낸 이 공간은 향후 주요 건축 매체들을 통해 자세히 소개될 예정입니다.",
    link: ""
  },
];

export default function News() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleNews = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen py-24 px-8 lg:px-16 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[11px] font-medium uppercase text-gray-500 mb-16 tracking-[0.3em]">News & Press</h2>
        
        <div className="border-t border-black">
          {sampleNews.map((news) => (
            <div key={news.id} className="border-b border-gray-300 group">
              {/* 클릭 가능한 제목 줄 */}
              <button 
                onClick={() => toggleNews(news.id)}
                className="w-full flex flex-col md:flex-row md:items-center justify-between py-8 hover:bg-white transition-colors text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full px-4">
                  <span className="text-[10px] tracking-widest text-gray-500 uppercase w-24 shrink-0">
                    {news.date}
                  </span>
                  <span className="text-[10px] tracking-widest font-bold text-black uppercase w-16 shrink-0">
                    {news.category}
                  </span>
                  <h3 className={`text-[15px] font-normal transition-colors ${expandedId === news.id ? 'text-gray-500' : 'text-black group-hover:text-gray-500'}`}>
                    {news.title}
                  </h3>
                </div>
                {/* 열림/닫힘 화살표 아이콘 */}
                <div className="hidden md:block pr-4 text-gray-400">
                  {expandedId === news.id ? '−' : '+'}
                </div>
              </button>

              {/* 확장되는 상세 내용 영역 */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  expandedId === news.id ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 md:pl-[12.5rem] md:pr-4 flex flex-col gap-6">
                  <p className="text-[14px] font-light leading-relaxed text-black break-keep">
                    {news.content}
                  </p>
                  {news.link && (
                    <a 
                      href={news.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-max text-[11px] font-bold tracking-[0.2em] text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-1"
                    >
                      Read Article
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
