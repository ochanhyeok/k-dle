# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

K-dle은 한국 콘텐츠 기반 데일리 퀴즈 웹앱입니다. 매일 새로운 퍼즐이 4개 게임 모드로 제공됩니다.

- **Drama-dle**: 힌트로 K-드라마 맞추기
- **Idol-dle**: 속성 비교로 K-Pop 아이돌 맞추기
- **Lyric-dle**: 가사 힌트로 K-Pop 노래 맞추기
- **Scene-dle**: 장면 묘사로 K-드라마 맞추기

## 기술 스택

- **Next.js 16** (App Router, Turbopack)
- **React 19**, **TypeScript**, **Tailwind CSS**
- **Firebase Firestore** (글로벌 통계, 팬덤, 파티, 이모지 투표)
- **Vercel** 배포 (main 푸시 시 자동 배포)

## 빌드 & 실행

```bash
npm install
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
```

## 아키텍처

### 데이터 (src/data/)
- `dramas.ts`, `idols.ts`, `lyrics.ts`, `scenes.ts` — 각 200개 항목
- `i18n/` — 드라마, 가사, 장면, 아이돌 속성 번역 (ko, es)
- 퍼즐 셔플: `mixIndex()` LCG 함수 (각 모드별 다른 오프셋)

### 게임 로직 (src/lib/)
- `game.ts` — Drama-dle 로직 (힌트 생성, 추측 검증, 상태 저장)
- `idol-game.ts` — Idol-dle 로직 (속성 비교)
- `lyric-game.ts` — Lyric-dle 로직 (가사 힌트)
- `scene-game.ts` — Scene-dle 로직 (장면 묘사 힌트)

### 통계 & 커뮤니티 (src/lib/)
- `unified-stats.ts` — localStorage 기반 통합 개인 통계
- `daily-stats.ts` — Firebase 글로벌 통계
- `fandom.ts` — 22개 팬덤 대결 시스템
- `party.ts` — 파티 모드 (Firebase)
- `emoji-voting.ts` — 이모지 반응 투표
- `share.ts` — 결과 공유 (Web Share API + clipboard)
- `achievements.ts` — 뱃지/업적 시스템

### 컴포넌트 (src/components/)
- `drama-dle/`, `idol-dle/`, `lyric-dle/`, `scene-dle/` — 각 게임 메인 컴포넌트
- `party/` — 파티 모드 페이지
- `ui/` — 공통 UI (Toast, Timer, Header, Modal 등)

### 페이지 (src/app/)
- `/` — 메인 페이지
- `/{mode}` — 각 게임 모드
- `/{mode}/archive` — 과거 퍼즐 아카이브
- `/party` — 파티 모드
- `/stats` — 글로벌 통계
- `/badges` — 뱃지 컬렉션

## 주요 패턴

- 다크/라이트 테마 (CSS 변수)
- 다국어 지원 (en/ko/es) — `src/lib/i18n.tsx`
- 일일 게임 상태는 localStorage에 저장
- 파티 모드는 `?party=CODE` 쿼리 파라미터로 동작 (localStorage 저장 스킵)
- 아카이브 모드는 `archivePuzzleNumber` prop으로 구분
