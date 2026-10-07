import Link from "next/link";
import Image from "next/image";
import { sampleProjects } from "@/lib/sampleData";

async function getProjects() {
  try {
    const res = await fetch('https://likearchitects.kr/wp-json/wp/v2/projects?_embed=1', { next: { revalidate: 10 } });
    let wpProjects = [];
    if (res.ok) {
      wpProjects = await res.json();
    }
    // 워드프레스 데이터가 부족할 경우 샘플 데이터로 채움
    return [...wpProjects, ...sampleProjects];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return sampleProjects;
  }
}

export default async function Project() {
  const projects = await getProjects();
  
  return (
    <section className="min-h-screen py-24 px-8 lg:px-16">
      <div className="space-y-32 max-w-6xl mx-auto">
         {projects.length > 0 ? projects.map((project: any) => (
            <div key={`list-${project.id}`} className="flex flex-col lg:flex-row gap-16 items-start border-b border-gray-200/60 pb-32 last:border-0 last:pb-0">
              
              {/* 좌측: 대형 사진 */}
              <Link href={`/project/${project.id}`} className="w-full lg:w-[65%] bg-[#eaeaea] aspect-[4/3] overflow-hidden relative block group cursor-pointer">
                {project._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                   <Image 
                     src={project._embedded['wp:featuredmedia'][0].source_url} 
                     alt={project.title.rendered} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm tracking-widest uppercase">No Image</div>
                )}
              </Link>
              
              {/* 우측: 도면(Blueprint) 스타일 타이포그래피 */}
              <div className="w-full lg:w-[35%] text-left mt-4 lg:mt-0 lg:sticky lg:top-32">
                <Link href={`/project/${project.id}`}>
                  <h3 className="text-3xl font-medium mb-12 tracking-tight text-black uppercase hover:opacity-70 transition-opacity">{project.title.rendered}</h3>
                </Link>
                
                {/* 도면 표제란 스타일의 메타데이터 표 */}
                <div className="border-t border-black mb-12">
                  <div className="flex border-b border-gray-300 py-4 text-[11px] uppercase tracking-widest">
                    <span className="w-1/3 text-gray-500">Year</span>
                    <span className="w-2/3 text-black font-medium">{project.acf?.year || '—'}</span>
                  </div>
                  <div className="flex border-b border-gray-300 py-4 text-[11px] uppercase tracking-widest">
                    <span className="w-1/3 text-gray-500">Location</span>
                    <span className="w-2/3 text-black font-medium">{project.acf?.location || '—'}</span>
                  </div>
                  <div className="flex border-b border-black py-4 text-[11px] uppercase tracking-widest">
                    <span className="w-1/3 text-gray-500">Client</span>
                    <span className="w-2/3 text-black font-medium">{project.acf?.client || '—'}</span>
                  </div>
                </div>

                <div 
                  className="text-gray-700 font-light leading-[2.0] break-keep text-[13px] mb-8"
                  dangerouslySetInnerHTML={{ __html: project.content?.rendered || '상세 설명이 없습니다.' }}
                />
                
                <Link href={`/project/${project.id}`} className="inline-block mt-8 text-[11px] font-bold tracking-widest text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-1">
                  View Project
                </Link>
              </div>
            </div>
         )) : (
            <p className="text-center text-gray-400 text-sm tracking-widest uppercase">No Projects</p>
         )}
      </div>
    </section>
  );
}
