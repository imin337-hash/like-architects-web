import Link from "next/link";
import { aboutData } from "@/lib/aboutData";

export default function About() {
  const { studio, architect, awards, awardsNote, careers } = aboutData;

  return (
    <article className="min-h-screen py-24 px-8 lg:px-16 bg-transparent text-black">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        
        {/* =========================================
            Section 01: Studio & Philosophy
        ========================================== */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-black">
            <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em]">
              Studio & Philosophy
            </h2>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest">01</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-[15px] font-normal text-black">
                {studio.title_ko}
              </h3>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-mono mt-0.5">
                {studio.title_en}
              </p>
            </div>
            
            <div className="space-y-3 text-[14px] font-light leading-relaxed text-black break-keep">
              {studio.philosophy.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </div>
        </section>


        {/* =========================================
            Section 02: Principal Architect
        ========================================== */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-black">
            <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em]">
              Principal Architect
            </h2>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest">02</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-[15px] font-normal text-black">
                {architect.name_ko}
              </h3>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-mono mt-0.5">
                {architect.name_en} / {architect.role}
              </p>
            </div>

            <div className="space-y-3 text-[14px] font-light leading-relaxed text-black break-keep">
              {architect.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-1 text-[11px] text-gray-500 font-light">
              {architect.credentials.map((row, i) => (
                <div key={i} className="flex flex-wrap gap-x-5 gap-y-1">
                  {row.map((item, j) => (
                    <span key={j}>• {item}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* =========================================
            Section 03: Awards & Honors
        ========================================== */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-black">
            <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em]">
              Awards & Honors
            </h2>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest">03</span>
          </div>

          <div className="space-y-3">
            <div className="divide-y divide-gray-200">
              {awards.map((award, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4 py-3">
                  <div className="flex items-baseline gap-6">
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase w-12 shrink-0">
                      {award.year}
                    </span>
                    <span className="text-[14px] font-light text-black break-keep">
                      {award.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-black tracking-widest uppercase shrink-0">
                    {award.prize}
                  </span>
                </div>
              ))}
            </div>

            {awardsNote && (
              <p className="pt-2 text-[10px] font-mono text-gray-400 font-light">
                {awardsNote}
              </p>
            )}
          </div>
        </section>


                {/* =========================================
            Section 04: Careers & People
        ========================================== */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-black">
            <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em]">
              Careers & People
            </h2>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest">04</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-[15px] font-normal text-black">
                {careers.title_ko}
              </h3>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-mono mt-0.5">
                {careers.title_en}
              </p>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-black break-keep">
              {careers.desc}
            </p>
            <div className="pt-2">
              <a 
                href={`mailto:${careers.email}`} 
                className="inline-block text-[11px] font-bold tracking-[0.2em] text-black hover:text-gray-500 transition-colors uppercase border-b border-black hover:border-transparent pb-0.5"
              >
                {careers.email}
              </a>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
