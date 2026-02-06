# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

K-dle은 **프로젝트 포트폴리오/브레인스토밍 대시보드** — 12개의 프로젝트 아이디어를 3개 카테고리(한국 타겟, K-콘텐츠 해외, 글로벌)로 시각화하고 비교하는 단일 React(JSX) 컴포넌트이다.

아직 **완전한 애플리케이션이 아님**. `project-overview.jsx` 하나로 구성된 독립 컴포넌트로, React + Tailwind 프로젝트(Next.js, Vite, CRA 등)에 통합하여 사용한다.

## 의존성

- **React** (`useState` 훅 사용)
- **Tailwind CSS** (전체 스타일링)

`package.json`, 빌드 설정, 테스트 설정은 아직 없음. 이 컴포넌트를 실행하려면 기존 React + Tailwind 프로젝트에 임포트해야 한다.

## 아키텍처

`project-overview.jsx` (~480줄)에 모든 것이 담겨 있음:

- **데이터**: `projects` 배열 — 12개 프로젝트 객체. 각각 지표(viral, revisit, adsense), difficulty, devTime, pros/cons, category, status 포함
- **컴포넌트** (모두 같은 파일 내):
  - `StarRating` — 1~5 별점 렌더링
  - `Badge` — 색상 변형이 있는 태그 컴포넌트
  - `ProjectCard` — 펼침/접힘 가능한 프로젝트 카드 + 체크박스 선택
  - `ProjectOverview` (default export) — 카테고리 탭 필터링 + 하단 고정 비교 패널이 있는 메인 컨테이너

## 주요 패턴

- 모든 프로젝트 데이터는 하드코딩 (API 호출 없음)
- 다크 테마 (Tailwind `bg-gray-900`, `gray-800` 등)
- 탭으로 카테고리 필터링, 체크박스로 프로젝트 선택
- 선택된 프로젝트는 하단 고정 비교 테이블에 표시
- 한국어 UI + 일부 영문 라벨 (AdSense$, status 배지)
