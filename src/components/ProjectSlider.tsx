"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function ProjectSlider({ images }: { images: { url: string; caption: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  // 모바일 터치 스와이프 제스처
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col select-none w-full lg:w-fit max-w-full">
      
      {/* 사진 프레임: 화면 한 페이지에 스크롤 없이 딱 들어오는 3:2 원본 무손실 뷰 (배경 순백색 처리) */}
      <div 
        className="relative w-full h-auto aspect-[3/2] lg:h-[calc(100vh-13rem)] lg:max-h-[740px] lg:w-auto max-w-full bg-white overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex].url}
          alt={`Project image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1920px"
          quality={95}
          className="object-contain"
          priority
        />

        {/* 1안 + 2안 결합 방식: 검은 원형 바탕 완전 제거, 사진 좌/우 절반 클릭 분할 + 호버 시에만 얇은 헤어라인 화살표 페이드인 */}
        {images.length > 1 && (
          <>
            {/* 좌측 50% 이전 사진 클릭 영역 */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20 flex items-center justify-start pl-4 md:pl-8 group/prev focus:outline-none cursor-pointer"
              aria-label="Previous image"
            >
              <span className="w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover:opacity-85 hover:!opacity-100 group-hover/prev:-translate-x-1 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </button>
            
            {/* 우측 50% 다음 사진 클릭 영역 */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20 flex items-center justify-end pr-4 md:pr-8 group/next focus:outline-none cursor-pointer"
              aria-label="Next image"
            >
              <span className="w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover:opacity-85 hover:!opacity-100 group-hover/next:translate-x-1 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l7-7-7-7" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      {/* 사진 하단: 캡션 및 인디케이터 바 (사진 가로 너비와 정확히 일치) */}
      <div className="w-full mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-[11px] text-gray-500">
        
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
