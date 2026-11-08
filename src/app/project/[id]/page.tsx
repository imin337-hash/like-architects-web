import Image from "next/image";
import Link from "next/link";
import { sampleProjects } from "@/lib/sampleData";
import ProjectSlider from "@/components/ProjectSlider";

async function getProject(id: string) {
  return sampleProjects.find(p => p.id === id) || null;
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 tracking-widest uppercase">
        Project Not Found
      </div>
    );
  }

  // 본문에서 이미지 추출 및 제거 로직
  let contentHtml = project.content?.rendered || '';
  const images: { url: string; caption: string }[] = [];

  // 1. 본문(content) 안에 있는 모든 이미지 src와 캡션 추출 (figure 태그 포함)
  const figureRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi;
  let figureMatch;
  while ((figureMatch = figureRegex.exec(contentHtml)) !== null) {
    const figureContent = figureMatch[1];
    
    // figure 내부에서 img src 찾기
    const imgMatch = /<img[^>]+src="([^">]+)"/i.exec(figureContent);
    if (imgMatch) {
      const url = imgMatch[1];
      
      // figure 내부에서 figcaption 텍스트 찾기
      const captionMatch = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i.exec(figureContent);
      const caption = captionMatch ? captionMatch[1].replace(/<[^>]+>/g, '').trim() : "";
      
      images.push({ url, caption });
    }
  }

  // 3. figure 없이 단독으로 있는 img 태그도 추가 (캡션 없는 경우)
  const imgRegex = /<img[^>]+src="([^">]+)"/gi;
  let imgMatch: RegExpExecArray | null;
  while ((imgMatch = imgRegex.exec(contentHtml)) !== null) {
    if (imgMatch) {
      const src = imgMatch[1];
      if (!images.some(img => img.url === src)) {
        images.push({ url: src, caption: "" });
      }
    }
  }

  // 4. 본문에서 이미지와 figure 태그 완전히 삭제 (텍스트만 남기기 위해)
  contentHtml = contentHtml.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '');
  contentHtml = contentHtml.replace(/<img[^>]*>/gi, '');

  return (
    <article className="min-h-screen lg:h-screen lg:overflow-hidden bg-white text-black pt-20 lg:pt-22 pb-8 px-6 lg:px-12 w-full">
      <div className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-14 items-start">
        
        {/* ========================================================
            좌측: 화면 왼쪽에 딱 붙는 정보 & 설명글 영역 (독립 스크롤)
        ========================================================= */}
        <div className="w-full lg:w-[360px] xl:w-[400px] 2xl:w-[440px] shrink-0 lg:h-[calc(100vh-7.5rem)] lg:overflow-y-auto lg:pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-7 order-2 lg:order-1">
            
            {/* 타이틀 영역 */}
            <div className="border-b border-black pb-6">
              <h1 className="text-2xl lg:text-3xl font-medium tracking-tight text-black uppercase leading-tight">
                {project.title.rendered}
              </h1>
              {project.acf?.title_ko && (
                <p className="text-[13px] text-gray-400 font-light tracking-wider mt-1.5">
                  {project.acf.title_ko}
                </p>
              )}
            </div>

            {/* 도면 표제란 스타일의 메타데이터 표 */}
            <div className="text-[11px] uppercase tracking-widest space-y-0">
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Category</span>
                <span className="font-medium text-black">{project.category || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Year</span>
                <span className="font-medium text-black">{project.acf?.year || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Location</span>
                <span className="font-medium text-black">{project.acf?.location || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Program</span>
                <span className="font-medium text-black">{project.acf?.program || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Area</span>
                <span className="font-medium text-black">{project.acf?.area || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="text-gray-400 font-mono text-[10px]">Status</span>
                <span className="font-medium text-black">{project.acf?.status || 'Completed'}</span>
              </div>
              <div className="flex justify-between border-b border-black py-3">
                <span className="text-gray-400 font-mono text-[10px]">Client</span>
                <span className="font-medium text-black">{project.acf?.client || '—'}</span>
              </div>
            </div>

            {/* 설계 설명글 전문 (좌측 정보 컬럼에 통합) */}
            <div className="pt-2">
              <h2 className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-mono mb-4">
                Architectural Concept
              </h2>
              <div 
                className="prose max-w-none w-full
                           text-[#2b2b2b] font-light leading-[2.1] tracking-normal break-keep
                           prose-p:text-[13px] prose-p:md:text-[13.5px] prose-p:mb-5 prose-p:leading-[2.1]
                           prose-headings:font-medium prose-headings:text-black prose-headings:text-base
                           prose-a:text-black prose-a:border-b prose-a:border-black hover:prose-a:text-gray-500"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>

            {/* 목록으로 복귀 */}
            <div className="pt-4 pb-8 border-t border-gray-200">
              <Link 
                href="/" 
                className="inline-block text-[10px] font-bold tracking-[0.2em] text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-1"
              >
                ← Back to Works
              </Link>
            </div>

          </div>

          {/* ========================================================
              우측: 우측 화면을 자연스럽게 채우는 와이드 슬라이더
          ========================================================= */}
          <div className="w-full lg:flex-1 min-w-0 order-1 lg:order-2">
            <ProjectSlider images={images} />
          </div>

        </div>

      </article>
    );
  }
