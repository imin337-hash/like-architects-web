---
name: LIKE ARCHITECTS Design System
description: LIKE ARCHITECTS 웹사이트 구축을 위한 고유의 디자인 시스템 및 개발 규칙
---

# LIKE ARCHITECTS SKILL (Design System & Rules)

## 1. Core Concept: "따뜻한 미니멀리즘과 건축적 공간감 (Warm Minimalism & Spatial Depth)"
* O-BBA의 극단적 절제미를 바탕으로 하되, 건축적 깊이감과 따뜻한 온도를 더한다.
* 장식을 완전히 배제하고, 사진(공간)과 타이포그래피(도면) 자체가 디자인이 되도록 한다.

## 2. Design System
### 2.1 Colors
* **Background**: `bg-[#faf9f8]` (웜 화이트/콘크리트 화이트) - 차가운 순백색(#FFFFFF) 사용 금지.
* **Text**: `text-[#222222]` (다크 그레이/먹색) - 완전한 흑색(#000000) 사용 자제. 눈이 편안한 명암비 유지.
* **Accent**: 무채색 내에서의 톤 변화만 허용. 컬러풀한 포인트 컬러 사용 절대 금지.

### 2.2 Typography (Structural Typography)
* **Font**: 모던 고딕 (Tailwind `font-sans`). 영문은 대문자(Uppercase)와 넓은 자간(`tracking-widest`, `tracking-[0.2em]`)을 혼용하여 도면의 표제란 같은 정제된 느낌 부여.
* **Blueprint Style**: 프로젝트 메타 데이터(Year, Location, Client)는 얇은 선(`border`)과 정밀한 간격으로 정렬하여 건축 도면처럼 디자인.

## 3. UI/UX Interaction Rules
### 3.1 Focus Effect (스포트라이트)
* 갤러리(그리드)에서 하나의 사진에 마우스를 올리면(Hover), 화면 전체의 나머지 요소들이 부드럽게 암전(Dimming / `opacity-30`)되며 해당 작품에만 시선이 집중되도록 함.
* "빛과 사람에 집중한다"는 철학의 시각적 구현.

### 3.2 Asymmetric & Parallax (건축적 깊이감)
* 천편일률적인 정방형 바둑판을 피하고, Masonry 형태나 크기가 섞인 비대칭 그리드를 사용하여 공간감을 부여함.

## 4. Development Stack & Data
* **Frontend**: Next.js (App Router) + Tailwind CSS v4
* **Backend**: Headless WordPress (`likearchitects.kr`)
* **API**: WP REST API (`/wp-json/wp/v2/projects?_embed=1`)
* **Data Mapping**:
  - Image: `project._embedded['wp:featuredmedia'][0].source_url`
  - Meta: `project.acf.year`, `project.acf.location`, `project.acf.client`
