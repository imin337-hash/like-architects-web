"use client";

import { useState } from 'react';

const sampleNews = [
  { 
    id: 1, 
    title: "테스트 뉴스 제목 1", 
    date: "2024. 01. 01", 
    category: "TEST",
    content: "이 글은 웹사이트 레이아웃 및 폰트 확인을 위해 작성된 테스트용 텍스트입니다. 추후 정식 뉴스로 교체될 예정입니다.",
    link: ""
  },
  { 
    id: 2, 
    title: "테스트 뉴스 제목 2", 
    date: "2024. 01. 02", 
    category: "TEST",
    content: "이 글은 웹사이트 레이아웃 및 폰트 확인을 위해 작성된 테스트용 텍스트입니다. 추후 정식 뉴스로 교체될 예정입니다.",
    link: ""
  },
  { 
    id: 3, 
    title: "테스트 뉴스 제목 3", 
    date: "2024. 01. 03", 
    category: "TEST",
    content: "이 글은 웹사이트 레이아웃 및 폰트 확인을 위해 작성된 테스트용 텍스트입니다. 추후 정식 뉴스로 교체될 예정입니다.",
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
