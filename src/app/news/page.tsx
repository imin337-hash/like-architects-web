"use client";

import { useState, useEffect } from 'react';

export default function News() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 워드프레스 '글(Posts)'에서 데이터 가져오기
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("https://likearch.mycafe24.com/wp-json/wp/v2/posts?_embed=1&per_page=50");
        const data = await res.json();
        if (Array.isArray(data)) {
          setNewsList(data);
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const toggleNews = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen py-24 px-8 lg:px-16 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[11px] font-medium uppercase text-gray-500 mb-16 tracking-[0.3em]">News & Press</h2>
        
        <div className="border-t border-black">
          {loading ? (
            <div className="py-20 text-center text-[11px] text-gray-400 tracking-[0.2em] uppercase">
              Loading News...
            </div>
          ) : newsList.length > 0 ? (
            newsList.map((news) => {
              // 날짜 포맷 (예: 2026. 09. 15)
              const dateObj = new Date(news.date);
              const formattedDate = `${dateObj.getFullYear()}. ${String(dateObj.getMonth() + 1).padStart(2, '0')}. ${String(dateObj.getDate()).padStart(2, '0')}`;
              
              // 카테고리 이름 가져오기 (없으면 NEWS)
              const categoryName = news._embedded?.['wp:term']?.[0]?.[0]?.name || "NEWS";
              
              // 커스텀 외부 링크 (ACF가 있다면)
              const externalLink = news.acf?.link || "";

              return (
                <div key={news.id} className="border-b border-gray-300 group">
                  {/* 클릭 가능한 제목 줄 */}
                  <button 
                    onClick={() => toggleNews(news.id)}
                    className="w-full flex flex-col md:flex-row md:items-center justify-between py-8 hover:bg-white transition-colors text-left"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full px-4">
                      <span className="text-[10px] tracking-widest text-gray-500 uppercase w-24 shrink-0">
                        {formattedDate}
                      </span>
                      <span className="text-[10px] tracking-widest font-bold text-black uppercase w-16 shrink-0">
                        {categoryName}
                      </span>
                      <h3 className={`text-[15px] font-normal transition-colors ${expandedId === news.id ? 'text-gray-500' : 'text-black group-hover:text-gray-500'}`}
                          dangerouslySetInnerHTML={{ __html: news.title.rendered }}
                      />
                    </div>
                    {/* 열림/닫힘 화살표 아이콘 */}
                    <div className="hidden md:block pr-4 text-gray-400">
                      {expandedId === news.id ? '−' : '+'}
                    </div>
                  </button>

                  {/* 확장되는 상세 내용 영역 */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      expandedId === news.id ? 'max-h-[1000px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 md:pl-[12.5rem] md:pr-4 flex flex-col gap-6">
                      <div 
                        className="text-[14px] font-light leading-relaxed text-black break-keep prose prose-p:my-2 prose-a:text-black prose-a:border-b prose-a:border-black hover:prose-a:text-gray-500 max-w-none"
                        dangerouslySetInnerHTML={{ __html: news.content.rendered }}
                      />
                      {externalLink && (
                        <a 
                          href={externalLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block w-max text-[11px] font-bold tracking-[0.2em] text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-1 mt-4"
                        >
                          Read Article
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center text-[11px] text-gray-400 tracking-[0.2em] uppercase">
              등록된 뉴스가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
