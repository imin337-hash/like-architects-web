export default function About() {
  return (
    <article className="min-h-screen py-32 px-10 lg:px-20 bg-transparent text-black">
      <div className="max-w-4xl mx-auto space-y-40">
        
        {/* 1. Philosophy */}
        <section>
          <h2 className="text-[10px] font-medium uppercase text-gray-500 mb-12 tracking-[0.3em]">Philosophy</h2>
          <p className="text-lg lg:text-xl font-light leading-[2.2] tracking-wide break-keep text-black">
            "당신이 가장 좋아하는 공간은 어떤 모습입니까?"<br className="hidden md:block"/>
            LIKE ARCHITECTS는 이 단순한 질문에서 출발합니다.<br className="hidden md:block"/>
            우리는 형태를 강요하기보다, 당신의 삶과 취향이 온전히 묻어나는 '진짜 좋아하는 공간'을 설계합니다.
          </p>
        </section>

        {/* 2. Principal CV */}
        <section className="border-t border-gray-300 pt-16">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <h2 className="w-full md:w-1/4 text-[10px] font-medium uppercase text-gray-500 tracking-[0.3em]">Principal</h2>
            <div className="w-full md:w-3/4 space-y-12">
              <div>
                <h3 className="text-2xl font-medium tracking-[0.15em] uppercase mb-2 text-black">LEE JAE HO</h3>
                <p className="text-[11px] text-gray-500 tracking-widest uppercase">KIRA, 대표 건축사</p>
              </div>
              <ul className="space-y-4 text-[12px] font-light tracking-wide text-gray-800 uppercase">
                <li className="flex"><span className="w-24 text-gray-500">2026 —</span><span className="text-black font-medium">LIKE ARCHITECTS</span></li>
                <li className="flex"><span className="w-24 text-gray-500">2015 —</span><span className="text-black font-medium">ETAA</span></li>
                <li className="flex"><span className="w-24 text-gray-500">2013 —</span><span className="text-black font-medium">DA GROUP</span></li>
                <li className="flex"><span className="w-24 text-gray-500">2010 —</span><span className="text-black font-medium">SPACE</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Awards & Exhibitions */}
        <section className="border-t border-black pt-16">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <h2 className="w-full md:w-1/4 text-[10px] font-medium uppercase text-gray-500 tracking-[0.3em]">Awards</h2>
            <div className="w-full md:w-3/4">
              <ul className="text-[12px] font-light tracking-widest text-black uppercase">
                <li className="flex border-b border-gray-300 pb-6 mb-6">
                  <span className="w-24 text-gray-500">2026</span>
                  <span className="font-medium">한국건축문화대상 우수상</span>
                </li>
                <li className="flex border-b border-gray-300 pb-6 mb-6">
                  <span className="w-24 text-gray-500">2025</span>
                  <span className="font-medium">제주건축문화대상 본상</span>
                </li>
                <li className="flex border-b border-gray-300 pb-6">
                  <span className="w-24 text-gray-500">2024</span>
                  <span className="font-medium">신진건축사대상 대상</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
