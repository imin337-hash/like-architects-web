import Image from "next/image";
import Link from "next/link";
import { sampleProjects } from "@/lib/sampleData";

async function getProject(id: string) {
  // 샘플 데이터에서 먼저 찾기 (데모용)
  const sample = sampleProjects.find(p => p.id === id);
  if (sample) return sample;

  // 워드프레스에서 찾기
  try {
    const res = await fetch(`https://likearch.mycafe24.com/wp-json/wp/v2/projects/${id}?_embed=1`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
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

  return (
    <article className="min-h-screen bg-white text-black pt-32 pb-24 px-8 lg:px-12">
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
        
        {/* 우측: 스크롤되는 메인 콘텐츠 (사진 및 텍스트) */}
        <div className="w-full lg:flex-1 order-2 lg:order-2">
          
          {/* 썸네일(Hero)을 본문 최상단에 배치 */}
          {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <div className="w-full mb-24">
              <Image 
                src={project._embedded['wp:featuredmedia'][0].source_url} 
                alt={project.title.rendered} 
                width={1600}
                height={1200}
                className="w-full h-auto object-cover" 
                priority
              />
            </div>
          )}

          {/* 본문 콘텐츠 (워드프레스 에디터) */}
          <div 
            className="prose max-w-none w-full 
                       text-black font-light leading-[2.2] tracking-wide break-keep
                       prose-p:text-[14px] prose-p:md:text-[15px] prose-p:mb-24 prose-p:max-w-2xl
                       prose-img:w-full prose-img:h-auto prose-img:my-24 prose-img:object-cover
                       prose-headings:font-medium prose-headings:text-black prose-headings:tracking-tight prose-headings:text-2xl
                       prose-a:text-black prose-a:border-b prose-a:border-black hover:prose-a:text-gray-500"
            dangerouslySetInnerHTML={{ __html: project.content?.rendered || '' }}
          />
        </div>

        {/* 좌측: 고정된 프로젝트 정보 (Sticky) */}
        <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-32 self-start order-1 lg:order-1 mb-16 lg:mb-0">
          <h1 className="text-lg lg:text-xl font-medium tracking-wide text-black uppercase mb-6 whitespace-nowrap text-ellipsis overflow-hidden">
            {project.title.rendered}
          </h1>

          {/* 프로젝트 요약 설명 */}
          <div className="text-[12.5px] leading-relaxed text-gray-600 font-light mb-12 break-keep">
            {project.acf?.summary || project.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '이곳에 프로젝트에 대한 간략한 설명이 들어갑니다. 공간의 의도나 주요 특징을 요약해서 보여줄 수 있습니다.'}
          </div>
          
          <div className="border-t border-black mb-16 text-[11px] uppercase tracking-widest">
            <div className="flex justify-between border-b border-gray-300 py-5">
              <span className="text-gray-500 w-1/3">Year</span>
              <span className="font-medium text-black w-2/3 text-right">{project.acf?.year || '—'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-5">
              <span className="text-gray-500 w-1/3">Location</span>
              <span className="font-medium text-black w-2/3 text-right truncate pl-4">{project.acf?.location || '—'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-5">
              <span className="text-gray-500 w-1/3">Program</span>
              <span className="font-medium text-black w-2/3 text-right truncate pl-4">{project.acf?.program || 'Residential'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-5">
              <span className="text-gray-500 w-1/3">Area</span>
              <span className="font-medium text-black w-2/3 text-right truncate pl-4">{project.acf?.area || '320 ㎡'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-5">
              <span className="text-gray-500 w-1/3">Status</span>
              <span className="font-medium text-black w-2/3 text-right truncate pl-4">{project.acf?.status || 'Completed'}</span>
            </div>
            <div className="flex justify-between border-b border-black py-5">
              <span className="text-gray-500 w-1/3">Client</span>
              <span className="font-medium text-black w-2/3 text-right truncate pl-4">{project.acf?.client || '—'}</span>
            </div>
          </div>

          <Link href="/" className="inline-block text-[10px] font-bold tracking-[0.2em] text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-1">
            Back to Home
          </Link>
        </div>

      </div>
    </article>
  );
}
