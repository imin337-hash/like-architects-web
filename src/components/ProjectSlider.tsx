"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function ProjectSlider({ images }: { images: { url: string; caption: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // 키보드 좌우 방향키 탐색
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col select-none w-fit max-w-full">
      
      {/* 사진 프레임: 화면 한 페이지에 스크롤 없이 딱 들어오는 3:2 원본 무손실 뷰 (배경 순백색 처리) */}
      <div className="relative aspect-[3/2] h-[calc(100vh-13rem)] max-h-[740px] w-auto max-w-full bg-white overflow-hidden group">
        <Image
          src={images[currentIndex].url}
          alt={`Project image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1920px"
          quality={95}
          className="object-contain"
          priority
        />

        {/* 선명하고 직관적인 좌/우 넘김 화살표 */}
        {images.length > 1 && (
          <>
            {/* 이전(좌) 화살표 */}
            <button
              onClick={prevSlide}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 text-white shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95 z-20"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* 다음(우) 화살표 */}
            <button
              onClick={nextSlide}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95 z-20"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* 사진 하단: 캡션 및 인디케이터 바 (사진 가로 너비와 정확히 일치) */}
      <div className="w-full mt-3 pt-2.5 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-gray-500">
        
        {/* 좌측: 사진 캡션 */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Plate</span>
          <span className="text-[12px] text-black font-light tracking-wide">
            {images[currentIndex].caption || `Photo ${currentIndex + 1}`}
          </span>
        </div>

        {/* 우측: 번호 카운터 및 페이지 점 */}
        {images.length > 1 && (
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* 점 인디케이터 */}
            <div className="flex gap-1.5 items-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 transition-all rounded-full ${
                    idx === currentIndex 
                      ? 'w-5 bg-black' 
                      : 'w-1.5 bg-gray-300 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* 번호 카운터 */}
            <span className="text-[11px] font-mono text-black font-medium tracking-widest pl-1">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
