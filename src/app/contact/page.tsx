"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";

declare global {
  interface Window {
    daum?: any;
  }
}

// 옵션 상수 정의
const SCOPE_OPTIONS = [
  "건축설계(신축)",
  "리모델링(증축·대수선)",
  "용도변경",
  "인테리어 디자인",
  "기획설계 & 규모검토",
  "기타",
];

const AREA_OPTIONS = [
  "50평 미만 (~165㎡)",
  "50평 ~ 100평 (165㎡ ~ 330㎡)",
  "100평 ~ 300평 (330㎡ ~ 990㎡)",
  "300평 이상 (990㎡~)",
  "기타 (직접 입력)",
];

const BUDGET_OPTIONS = [
  "1억 미만",
  "1억 ~ 3억",
  "3억 ~ 5억",
  "5억 ~ 10억",
  "10억 이상",
  "상담 후 협의",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  // 주소 상태
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // 의뢰 분야 (다중 선택 체크박스 + 기타)
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [customScope, setCustomScope] = useState("");

  // 의뢰 면적 (셀렉트 + 기타)
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [customArea, setCustomArea] = useState("");

  // 예산 (셀렉트)
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  // 개인정보 수집 및 이용 동의
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

  // 의뢰 분야 체크 토글
  const toggleScope = (option: string) => {
    setSelectedScopes((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  // 주소 검색 팝업 열기
  const handleOpenAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          const selectedAddr = data.jibunAddress || data.autoJibunAddress || data.address;
          setAddress(selectedAddr);
        },
      }).open();
    } else {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // 대지 주소와 상세 주소 결합
    const fullAddress = detailAddress ? `${address} (${detailAddress})` : address;
    data.address = fullAddress;

    // 의뢰 분야 조합
    const formattedScopes = selectedScopes.map((s) =>
      s === "기타" ? (customScope ? `기타(${customScope})` : "기타") : s
    ).join(", ");
    data.scope = formattedScopes || "미선택";

    // 의뢰 면적 조합
    data.area = selectedArea === "기타 (직접 입력)" ? (customArea ? `기타(${customArea})` : "기타") : selectedArea || "미선택";

    // 예산 조합
    data.budget = selectedBudget || "미선택";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setAddress("");
        setDetailAddress("");
        setSelectedScopes([]);
        setCustomScope("");
        setSelectedArea("");
        setCustomArea("");
        setSelectedBudget("");
        setPrivacyAgreed(false);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
      
      <article className="min-h-screen py-16 lg:py-20 px-8 lg:px-16 bg-transparent text-black">
        <div className="max-w-[1400px] mx-auto">
          
          {/* 2단 그리드: Studio & Process (좌측 1단) / Project Inquiry (우측 1단) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
            
            {/* =========================================
                Column 1: Studio & Process (라이크 건축사사무소 & 설계 프로세스)
            ========================================== */}
            <section className="flex flex-col space-y-8">
              <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em] pb-3 border-b border-black">
                Process & Contact
              </h2>

              {/* 1.1 메인 타이틀 & 서문 */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-[18px] font-medium tracking-wide text-black mb-1">
                    라이크 건축사사무소
                  </h3>
                  <p className="text-[10px] text-gray-400 tracking-[0.25em] uppercase font-mono">
                    LIKE ARCHITECTS
                  </p>
                </div>
                <p className="text-[13px] font-light leading-relaxed tracking-wide text-gray-700 break-keep min-h-[42px]">
                  초기 기획과 법규 검토부터 예산에 맞춘 실시설계, 현장 감리까지 전 과정을 함께합니다.<br className="hidden sm:inline" />
                  불필요한 시행착오와 공사비 낭비를 줄이고, 대지가 지닌 가능성을 극대화하여 오래도록 가치 있는 공간을 만듭니다.
                </p>
              </div>

              {/* 1.2 설계 프로세스 (5단계) */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
                    Design Stages
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono tracking-wider">01 — 05</span>
                </div>
                
                <div className="space-y-3 text-[12px]">
                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">01</span>
                    <div>
                      <h5 className="font-medium text-black tracking-wide text-[12.5px] mb-0.5">
                        상담 (Consultation)
                      </h5>
                      <p className="text-gray-500 font-light text-[11.5px] leading-relaxed break-keep">
                        요구사항과 라이프스타일, 예산 및 일정의 전반적 방향성을 협의합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">02</span>
                    <div>
                      <h5 className="font-medium text-black tracking-wide text-[12.5px] mb-0.5">
                        대지분석 및 기획 (Site & Pre-Design)
                      </h5>
                      <p className="text-gray-500 font-light text-[11.5px] leading-relaxed break-keep">
                        법규와 현장 여건을 분석하고 최적의 배치 및 기획 대안을 수립합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">03</span>
                    <div>
                      <h5 className="font-medium text-black tracking-wide text-[12.5px] mb-0.5">
                        기본설계 및 인허가 (Schematic & Permit)
                      </h5>
                      <p className="text-gray-500 font-light text-[11.5px] leading-relaxed break-keep">
                        공간의 형태와 구성을 구체화하고 관할 지자체 건축 인허가를 완료합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">04</span>
                    <div>
                      <h5 className="font-medium text-black tracking-wide text-[12.5px] mb-0.5">
                        실시설계 (Detailed Design)
                      </h5>
                      <p className="text-gray-500 font-light text-[11.5px] leading-relaxed break-keep">
                        시공이 가능하도록 구조·설비 협의와 정밀한 상세 도서를 작성합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">05</span>
                    <div>
                      <h5 className="font-medium text-black tracking-wide text-[12.5px] mb-0.5">
                        공사감리 및 완성 (Supervision)
                      </h5>
                      <p className="text-gray-500 font-light text-[11.5px] leading-relaxed break-keep">
                        도면의 의도가 현장에서 충실히 실현되도록 시공 품질을 감리합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1.3 오피스 위치 및 연락처 안내 */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
                    Office & Contact
                  </h4>
                  <div className="flex gap-2.5 text-[11px] text-gray-500 font-light">
                    <a 
                      href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%ED%92%8D%EC%84%B1%EB%A1%9C30" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:underline text-black font-medium"
                    >
                      ↗ 네이버 지도
                    </a>
                    <span className="text-gray-300">|</span>
                    <a 
                      href="https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%ED%92%8D%EC%84%B1%EB%A1%9C30" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:underline text-black font-medium"
                    >
                      ↗ 카카오맵
                    </a>
                  </div>
                </div>

                <div className="space-y-0.5 text-[12.5px] font-light text-gray-800 leading-snug">
                  <p className="text-black font-medium">서울특별시 송파구 풍성로30, 101 (풍납동)</p>
                  <p className="text-[11px] text-gray-400 font-mono">101, 30, Pungseong-ro, Songpa-gu, Seoul, Korea</p>
                </div>

                <div className="space-y-2 text-[12px] font-light text-gray-700 pt-1">
                  <div className="flex items-baseline">
                    <span className="w-24 shrink-0 text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">TEL</span>
                    <span className="text-black font-medium">02-477-4407</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-24 shrink-0 text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">E-MAIL</span>
                    <a href="mailto:like@likearchitects.kr" className="text-black hover:underline font-medium">
                      like@likearchitects.kr
                    </a>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-24 shrink-0 text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">INSTAGRAM</span>
                    <Link 
                      href="https://www.instagram.com/likearchitects.kr" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-black hover:underline font-medium"
                    >
                      @likearchitects.kr
                    </Link>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-24 shrink-0 text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">HOURS</span>
                    <span className="break-keep">평일 09:30 – 18:30 (점심시간 11:30 – 13:00 / 주말·공휴일 휴무)</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-24 shrink-0 text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">PARKING</span>
                    <span className="break-keep">주차 문의 (방문 상담 사전 예약제)</span>
                  </div>
                </div>
              </div>

              {/* 1.4 공공정보 서비스 바로가기 */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
                  Public Info Services
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <a 
                    href="https://www.eum.go.kr/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-gray-300 px-3.5 py-1.5 text-[11px] font-light text-gray-700 hover:border-black hover:bg-black hover:text-white transition-all bg-white/40"
                  >
                    <span>토지이용계획 열람 (토지이음)</span>
                    <span className="text-[9px] opacity-60">↗</span>
                  </a>
                  <a 
                    href="https://cloud.eais.go.kr/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-gray-300 px-3.5 py-1.5 text-[11px] font-light text-gray-700 hover:border-black hover:bg-black hover:text-white transition-all bg-white/40"
                  >
                    <span>건축물대장 발급 (세움터)</span>
                    <span className="text-[9px] opacity-60">↗</span>
                  </a>
                </div>
              </div>
            </section>


            {/* =========================================
                Column 2: Project Inquiry (프로젝트 문의 폼)
            ========================================== */}
            <section className="flex flex-col space-y-8">
              <h2 className="text-[11px] font-medium uppercase text-gray-500 tracking-[0.3em] pb-3 border-b border-black">
                Project Inquiry
              </h2>

              {/* 2.1 메인 헤더 & 서문 */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-[18px] font-medium tracking-wide text-black mb-1">
                    프로젝트 문의
                  </h3>
                  <p className="text-[10px] text-gray-400 tracking-[0.25em] uppercase font-mono">
                    PROJECT INQUIRY FORM
                  </p>
                </div>
                <p className="text-[13px] font-light leading-relaxed tracking-wide text-gray-700 break-keep min-h-[42px]">
                  대지 지번 주소와 계획 중이신 공간 개요를 남겨주시면 보다 정밀한 상담 준비가 가능합니다.<br className="hidden sm:inline" />
                  보내주신 내용을 바탕으로 대지 조건과 실무적 변수를 면밀히 검토하여 순차적으로 연락을 드립니다.
                </p>
              </div>

              {/* 2.2 입력 폼 */}
              <div className="border-t border-gray-200 pt-6">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-[12px]">
                  
                  {/* 1. 성함 & 연락처 (2열) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block mb-1">
                        의뢰인 / 법인명 *
                      </label>
                      <input 
                        required 
                        type="text" 
                        name="name" 
                        placeholder="홍길동" 
                        className="w-full border-b border-gray-300 py-1.5 focus:outline-none focus:border-black bg-transparent transition-colors placeholder:text-gray-300 text-[12px]" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block mb-1">
                        연락처 *
                      </label>
                      <input 
                        required 
                        type="tel" 
                        name="phone" 
                        placeholder="010-0000-0000" 
                        className="w-full border-b border-gray-300 py-1.5 focus:outline-none focus:border-black bg-transparent transition-colors placeholder:text-gray-300 text-[12px]" 
                      />
                    </div>
                  </div>

                  {/* 2. 이메일 */}
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block mb-1">
                      이메일 주소 *
                    </label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      placeholder="example@domain.com" 
                      className="w-full border-b border-gray-300 py-1.5 focus:outline-none focus:border-black bg-transparent transition-colors placeholder:text-gray-300 text-[12px]" 
                    />
                  </div>

                  {/* 3. 대지 지번 주소 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block">
                      대지 위치 (지번 주소) *
                    </label>
                    <div className="flex items-center gap-2 border-b border-gray-300 py-0.5 focus-within:border-black transition-colors">
                      <input 
                        required 
                        type="text" 
                        name="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="우측 '주소 검색' 버튼을 클릭해 주세요 *" 
                        className="w-full py-1 text-[12px] focus:outline-none bg-transparent placeholder:text-gray-300" 
                      />
                      <button
                        type="button"
                        onClick={handleOpenAddressSearch}
                        className="shrink-0 text-[10px] tracking-widest uppercase border border-black px-2.5 py-1 hover:bg-black hover:text-white transition-colors"
                      >
                        주소 검색
                      </button>
                    </div>
                    <input 
                      type="text" 
                      value={detailAddress}
                      onChange={(e) => setDetailAddress(e.target.value)}
                      placeholder="추가 지번 또는 상세 위치 (선택)" 
                      className="w-full border-b border-gray-200 py-1 text-[11px] focus:outline-none focus:border-gray-400 bg-transparent text-gray-700 placeholder:text-gray-300 transition-colors" 
                    />
                  </div>

                  {/* 4. 의뢰 분야 (체크박스 그리드) */}
                  <div className="space-y-2 pt-1">
                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block">
                      의뢰 분야 (복수 선택 가능)
                    </label>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-[11.5px]">
                      {SCOPE_OPTIONS.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black transition-colors select-none">
                          <input
                            type="checkbox"
                            checked={selectedScopes.includes(opt)}
                            onChange={() => toggleScope(opt)}
                            className="w-3.5 h-3.5 accent-black rounded-none cursor-pointer"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {selectedScopes.includes("기타") && (
                      <input
                        type="text"
                        value={customScope}
                        onChange={(e) => setCustomScope(e.target.value)}
                        placeholder="기타 의뢰 분야를 직접 입력해 주세요"
                        className="w-full border-b border-gray-300 py-1 text-[11px] focus:outline-none focus:border-black bg-transparent mt-1"
                      />
                    )}
                  </div>

                  {/* 5. 의뢰 면적 & 예상 예산 (2열 드롭다운) */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block mb-1">
                        의뢰 규모 / 면적
                      </label>
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full border-b border-gray-300 py-1.5 text-[11.5px] focus:outline-none focus:border-black bg-transparent text-gray-700 cursor-pointer"
                      >
                        <option value="">면적 범위 선택</option>
                        {AREA_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {selectedArea === "기타 (직접 입력)" && (
                        <input
                          type="text"
                          value={customArea}
                          onChange={(e) => setCustomArea(e.target.value)}
                          placeholder="예상 면적 직접 입력"
                          className="w-full border-b border-gray-300 py-1 text-[11px] focus:outline-none focus:border-black bg-transparent mt-1"
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block mb-1">
                        예상 예산 범위
                      </label>
                      <select
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        className="w-full border-b border-gray-300 py-1.5 text-[11.5px] focus:outline-none focus:border-black bg-transparent text-gray-700 cursor-pointer"
                      >
                        <option value="">예산 범위 선택</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 6. 프로젝트 개요 및 문의 내용 */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block">
                      프로젝트 개요 및 문의 내용 *
                    </label>
                    <textarea 
                      required 
                      name="overview" 
                      rows={3} 
                      placeholder="용도, 원하는 공간 컨셉, 주요 요구사항 등을 자유롭게 기재해 주세요." 
                      className="w-full border border-gray-200 p-2 text-[11.5px] focus:outline-none focus:border-black bg-white/40 transition-colors resize-none leading-relaxed placeholder:text-gray-300" 
                    />
                  </div>

                  {/* 7. 희망 일정 (한 줄 입력) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400 block">
                      희망 착공·입주 일정 / 상담 가능 시간 (선택)
                    </label>
                    <input 
                      type="text" 
                      name="schedule" 
                      placeholder="예: 2026년 하반기 착공 희망, 평일 오후 방문 상담 선호" 
                      className="w-full border-b border-gray-300 py-1 text-[11.5px] focus:outline-none focus:border-black bg-transparent placeholder:text-gray-300 transition-colors" 
                    />
                  </div>

                  {/* 개인정보 수집 및 이용 동의 */}
                  <div className="pt-2 border-t border-gray-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-800 select-none">
                        <input
                          required
                          type="checkbox"
                          checked={privacyAgreed}
                          onChange={(e) => setPrivacyAgreed(e.target.checked)}
                          className="w-3.5 h-3.5 accent-black rounded-none cursor-pointer"
                        />
                        <span>[필수] 개인정보 수집 및 이용 동의</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPrivacyDetail(!showPrivacyDetail)}
                        className="text-[10px] text-gray-400 hover:text-black underline underline-offset-2 transition-colors"
                      >
                        {showPrivacyDetail ? "닫기" : "내용보기"}
                      </button>
                    </div>
                    
                    {showPrivacyDetail && (
                      <div className="p-2.5 bg-gray-50 border border-gray-200 text-[10.5px] leading-relaxed text-gray-600 space-y-1 mt-1">
                        <p>• <strong>수집 항목</strong>: 의뢰인명, 연락처, 이메일, 대지 위치</p>
                        <p>• <strong>수집 목적</strong>: 프로젝트 설계 의뢰 검토 및 유선·이메일 상담</p>
                        <p>• <strong>보유 기간</strong>: 상담 종료 및 목적 달성 시까지 (최대 1년 보관 후 파기)</p>
                      </div>
                    )}
                  </div>

                  {/* 전송 버튼 & 결과 메시지 */}
                  <div className="pt-1">
                    <button 
                      type="submit" 
                      disabled={status === "loading" || !privacyAgreed}
                      className="w-full py-3 bg-black text-white text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      {status === "loading" ? "전송 중..." : "설계 의뢰서 접수하기"}
                    </button>
                    
                    {status === "success" && (
                      <p className="mt-2 text-[11px] text-green-700 font-medium tracking-wide text-center">
                        의뢰가 성공적으로 접수되었습니다. 면밀히 검토 후 순차적으로 연락드리겠습니다.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="mt-2 text-[11px] text-red-600 font-medium tracking-wide text-center">
                        전송에 실패했습니다. 대표 이메일(like@likearchitects.kr)로 문의해 주시기 바랍니다.
                      </p>
                    )}
                  </div>

                </form>
              </div>
            </section>

          </div>
        </div>
      </article>
    </>
  );
}
