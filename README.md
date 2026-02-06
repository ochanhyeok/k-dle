# 🇰🇷 K-Dle

**매일 새로운 K-Drama & K-Pop 퍼즐 게임**

> Wordle에서 영감을 받은 한류 팬을 위한 데일리 퀴즈 게임입니다.

🔗 **https://k-dle.vercel.app**

## 게임 모드

| 모드 | 설명 |
|------|------|
| 🎬 **Drama-dle** | 힌트를 보고 K-Drama 제목을 맞추세요 |
| 🎤 **Idol-dle** | 속성을 비교하며 K-Pop 아이돌을 찾으세요 |
| 📝 **Lyric-dle** | 번역된 가사로 노래를 맞추세요 |
| 🎭 **Scene-dle** | 장면 묘사로 드라마를 맞추세요 |

## 주요 기능

- 매일 자정(UTC) 새로운 퍼즐 갱신
- 6번의 기회로 정답 맞추기
- 글로벌 일일 통계 (Firebase 연동)
- 결과 공유 (클립보드 복사)
- 연속 정답 스트릭 추적
- 다크 테마 UI

## 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Cloud Firestore)
- **Deployment**: Vercel

## 로컬 실행

```bash
git clone https://github.com/ochanhyeok/k-dle.git
cd k-dle
npm install
```

`.env.local` 파일을 생성하고 Firebase config를 입력하세요:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── drama-dle/
│   ├── idol-dle/
│   ├── lyric-dle/
│   └── scene-dle/
├── components/           # React 컴포넌트
│   ├── drama-dle/
│   ├── idol-dle/
│   ├── lyric-dle/
│   ├── scene-dle/
│   └── ui/               # 공통 UI 컴포넌트
├── data/                 # 게임 데이터 (드라마, 아이돌, 가사, 장면)
└── lib/                  # 게임 로직 및 유틸리티
    ├── firebase.ts       # Firebase 초기화
    ├── daily-stats.ts    # 글로벌 일일 통계
    ├── unified-stats.ts  # 개인 통계 (localStorage)
    └── share.ts          # 결과 공유
```

## 라이선스

이 프로젝트는 비공식 팬 프로젝트입니다. 모든 K-Drama 제목, K-Pop 아티스트명, 곡명 등의 지적재산권은 각 권리자에게 있습니다.
