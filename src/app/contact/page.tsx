export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-24 px-8 text-center bg-transparent text-black">
      <h2 className="text-[10px] font-medium uppercase mb-12 tracking-[0.3em] text-gray-500">Contact</h2>
      <p className="text-black mb-24 font-normal text-[15px] tracking-wide">새로운 프로젝트에 대한 문의를 환영합니다.</p>
      <div className="space-y-6 text-[13px] font-medium tracking-[0.1em] w-full max-w-lg mx-auto uppercase">
        <div className="flex justify-between border-b border-gray-300 pb-4">
          <span className="text-gray-500 w-24 text-left">Email</span>
          <span className="text-black font-medium tracking-wider lowercase">like@likearchitects.kr</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-4">
          <span className="text-gray-500 w-24 text-left">Tel</span>
          <span className="text-black font-medium tracking-wider">02-477-4407</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-4">
          <span className="text-gray-500 w-24 text-left">Location</span>
          <span className="text-black font-medium tracking-wider text-right">서울특별시 송파구 풍성로30, 101</span>
        </div>
      </div>
    </section>
  );
}
