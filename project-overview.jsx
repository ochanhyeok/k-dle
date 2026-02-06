import { useState } from "react";

const projects = [
  // 한국 타겟
  {
    id: "korea-dashboard",
    name: "지금 대한민국",
    emoji: "🇰🇷",
    category: "한국 타겟",
    target: "한국인",
    type: "실시간 대시보드",
    description: "실시간 국민 라이프 대시보드. 지금 기분, 밥상, 수면, 월급, 논쟁 등 여러 채널을 하나로",
    viral: 3,
    revisit: 5,
    adsense: 4,
    devTime: "3~4주",
    difficulty: "상",
    pros: ["매일 새 데이터", "채널 확장 가능", "체류시간 높음"],
    cons: ["초기 유저 확보 어려움", "다양한 채널 개발 부담", "한국 한정"],
    status: "후보",
  },
  {
    id: "korea-fun",
    name: "Korea.fun",
    emoji: "🎮",
    category: "한국 타겟",
    target: "한국인",
    type: "인터랙티브 모음",
    description: "Neal.fun 한국판. 이재용 재산 써보기, 한국 딥다이브, 황당한 군대 딜레마, 무한조합 한식 에디션",
    viral: 5,
    revisit: 3,
    adsense: 4,
    devTime: "3~4주",
    difficulty: "상",
    pros: ["개별 프로젝트가 바이럴", "검증된 포맷", "확장 용이"],
    cons: ["여러 미니 프로젝트 필요", "한국 한정", "Neal.fun 카피 느낌"],
    status: "후보",
  },
  {
    id: "here-where",
    name: "여기 어디게?",
    emoji: "📍",
    category: "한국 타겟",
    target: "한국인",
    type: "지리 퀴즈 게임",
    description: "한국판 GeoGuessr. 한국 로드뷰 보고 위치 맞추기. 데일리 챌린지 + 지역 랭킹",
    viral: 4,
    revisit: 5,
    adsense: 4,
    devTime: "3~4주",
    difficulty: "중",
    pros: ["중독성 강함", "지역 자부심 자극", "데일리 재방문"],
    cons: ["로드뷰 API 비용", "한국 한정", "GeoGuessr과 비교"],
    status: "후보",
  },
  {
    id: "now-only-me",
    name: "지금 나만?",
    emoji: "⏰",
    category: "한국 타겟",
    target: "한국인",
    type: "실시간 공감 게임",
    description: "새벽 2시에 라면 끓이는 사람? [나도!] → 실시간으로 324명이 라면 중. 매시간 새 질문",
    viral: 4,
    revisit: 5,
    adsense: 4,
    devTime: "2~3주",
    difficulty: "중",
    pros: ["극도로 낮은 참여 장벽", "공감 → 공유", "AI 질문 자동생성"],
    cons: ["초기 유저 확보", "한국 한정"],
    status: "후보",
  },
  // K-콘텐츠 해외 타겟
  {
    id: "k-dle",
    name: "K-Dle",
    emoji: "🎬",
    category: "K-콘텐츠 해외",
    target: "해외 K-팬",
    type: "데일리 추측 게임",
    description: "K-Drama/K-Pop 버전 Wordle. Drama-dle, Idol-dle, OST-dle, Scene-dle 4가지 모드",
    viral: 5,
    revisit: 5,
    adsense: 4,
    devTime: "2~3주",
    difficulty: "중",
    pros: ["검증된 Wordle 포맷", "매일 재방문", "SNS 공유 폭발", "콘텐츠 자동화"],
    cons: ["K-팬 한정 타겟", "드라마/아이돌 DB 구축 필요"],
    status: "⭐ 관심",
  },
  {
    id: "k-culture-compass",
    name: "K-Culture Compass",
    emoji: "🧬",
    category: "K-콘텐츠 해외",
    target: "해외 K-팬",
    type: "취향 분석 + 공유",
    description: "좋아하는 드라마/음식/뷰티/K-Pop 입력 → AI가 'Your K-Culture DNA' 결과 생성. SNS 공유 최적화",
    viral: 5,
    revisit: 2,
    adsense: 3,
    devTime: "1~2주",
    difficulty: "하",
    pros: ["바이럴성 극강", "빠른 MVP", "공유 카드 = 무료 마케팅"],
    cons: ["1회성 경험", "재방문 약함", "K-팬 한정"],
    status: "후보",
  },
  {
    id: "what-korea-watches",
    name: "What Korea Watches",
    emoji: "📊",
    category: "K-콘텐츠 해외",
    target: "해외 K-팬",
    type: "실시간 트렌드",
    description: "한국 실시간 OTT 순위 + SNS 트렌드 AI 영어 요약. 한국에서 진짜 핫한 게 뭔지 알려주는 대시보드",
    viral: 3,
    revisit: 4,
    adsense: 5,
    devTime: "3~4주",
    difficulty: "상",
    pros: ["데이터 자동화", "매일 업데이트", "해외 팬 진짜 원하는 정보"],
    cons: ["크롤링 법적 이슈", "API 의존성", "개발 복잡"],
    status: "후보",
  },
  // 글로벌 해외 타겟
  {
    id: "spend-money",
    name: "Spend Elon's Money",
    emoji: "💰",
    category: "글로벌",
    target: "전세계",
    type: "인터랙티브 시뮬",
    description: "최신 억만장자 재산 소비 시뮬레이터. 2025년 물가 반영, 타이머 모드, 구매 요약 카드 공유",
    viral: 5,
    revisit: 2,
    adsense: 3,
    devTime: "1~2주",
    difficulty: "하",
    pros: ["검증된 포맷", "초간단 개발", "바이럴 확실"],
    cons: ["Neal.fun 카피", "1회성", "차별화 어려움"],
    status: "후보",
  },
  {
    id: "how-normal",
    name: "How Normal Am I?",
    emoji: "🧠",
    category: "글로벌",
    target: "전세계",
    type: "성격/습관 테스트",
    description: "10가지 습관 입력 → 세계 평균 대비 얼마나 평범한지 분석. 'You are 73% Normal' 결과 카드 공유",
    viral: 5,
    revisit: 2,
    adsense: 4,
    devTime: "1~2주",
    difficulty: "하",
    pros: ["자기비교 욕구", "빠른 MVP", "Self-help 니치 CPC 높음", "공유 카드"],
    cons: ["1회성", "재방문 약함"],
    status: "⭐ 추천",
  },
  {
    id: "life-weeks",
    name: "Life In Weeks",
    emoji: "⏳",
    category: "글로벌",
    target: "전세계",
    type: "인생 시각화",
    description: "생년월일 입력 → 4,000개 박스(80년×52주) 그리드. 이미 지나간 주 색칠. 각 주에 태그 가능",
    viral: 4,
    revisit: 3,
    adsense: 4,
    devTime: "2주",
    difficulty: "중",
    pros: ["감정적 임팩트", "Self-help CPC 높음", "주간 리마인더 가능"],
    cons: ["Tim Urban 원작 존재", "재방문 구조 약할 수 있음"],
    status: "후보",
  },
  {
    id: "guess-year",
    name: "Guess The Year",
    emoji: "🎵",
    category: "글로벌",
    target: "전세계",
    type: "음악 퀴즈 게임",
    description: "매일 1곡 인트로 듣고 발매 연도 맞추기. 슬라이더 UI, 6번 시도, 데일리 스트릭",
    viral: 4,
    revisit: 5,
    adsense: 3,
    devTime: "2~3주",
    difficulty: "중",
    pros: ["음악 = 보편적", "Heardle 공백 존재", "데일리 재방문"],
    cons: ["음원 저작권 이슈", "Spotify API 의존"],
    status: "후보",
  },
  {
    id: "one-question",
    name: "One Question",
    emoji: "🌍",
    category: "글로벌",
    target: "전세계",
    type: "매일 글로벌 투표",
    description: "매일 1개 질문 → 전 세계 투표 → 국가별/나이별/성별 결과 실시간 시각화. AI 질문 자동생성",
    viral: 5,
    revisit: 5,
    adsense: 4,
    devTime: "2주",
    difficulty: "중",
    pros: ["클릭 1번 참여", "국가 비교 = 바이럴", "매일 새 콘텐츠", "데이터 시각화"],
    cons: ["초기 유저 확보", "글로벌 배포 필요"],
    status: "⭐ 추천",
  },
  {
    id: "ai-or-real",
    name: "AI or Real?",
    emoji: "🖼️",
    category: "글로벌",
    target: "전세계",
    type: "AI 이미지 구별 게임",
    description: "AI 생성 이미지 vs 실제 사진 구별. 매일 10문제, 전 세계 평균 정답률, 감별력 등급",
    viral: 5,
    revisit: 4,
    adsense: 3,
    devTime: "1~2주",
    difficulty: "하~중",
    pros: ["AI = 2025 핫토픽", "자연스러운 공유", "이미지 무한 콘텐츠"],
    cons: ["AI 이미지 소싱 필요", "유사 서비스 존재"],
    status: "후보",
  },
];

const StarRating = ({ value, max = 5 }) => (
  <span className="text-sm">
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < value ? "text-yellow-400" : "text-gray-600"}>★</span>
    ))}
  </span>
);

const Badge = ({ children, color }) => {
  const colors = {
    blue: "bg-blue-900 text-blue-200 border-blue-700",
    green: "bg-green-900 text-green-200 border-green-700",
    purple: "bg-purple-900 text-purple-200 border-purple-700",
    orange: "bg-orange-900 text-orange-200 border-orange-700",
    red: "bg-red-900 text-red-200 border-red-700",
    yellow: "bg-yellow-900 text-yellow-200 border-yellow-700",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${colors[color]}`}>
      {children}
    </span>
  );
};

const categoryColors = {
  "한국 타겟": "blue",
  "K-콘텐츠 해외": "purple",
  "글로벌": "green",
};

const ProjectCard = ({ project, isExpanded, onToggle, isSelected, onSelect }) => (
  <div
    className={`border rounded-xl p-4 transition-all cursor-pointer ${
      isSelected
        ? "border-yellow-500 bg-gray-800 shadow-lg shadow-yellow-500/10"
        : "border-gray-700 bg-gray-850 hover:border-gray-500"
    }`}
  >
    <div className="flex items-start justify-between" onClick={onToggle}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-2xl">{project.emoji}</span>
          <h3 className="text-lg font-bold text-white">{project.name}</h3>
          {project.status === "⭐ 추천" && <Badge color="yellow">추천</Badge>}
          {project.status === "⭐ 관심" && <Badge color="orange">관심</Badge>}
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
          <Badge color={categoryColors[project.category]}>{project.category}</Badge>
          <Badge color="red">{project.target}</Badge>
          <span className="text-xs text-gray-400">{project.type}</span>
        </div>
        <p className="text-sm text-gray-300">{project.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`ml-3 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          isSelected ? "border-yellow-500 bg-yellow-500 text-black" : "border-gray-500 hover:border-gray-300"
        }`}
      >
        {isSelected && "✓"}
      </button>
    </div>

    {isExpanded && (
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">바이럴</span>
            <StarRating value={project.viral} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">재방문</span>
            <StarRating value={project.revisit} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">AdSense$</span>
            <StarRating value={project.adsense} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">개발기간</span>
            <span className="text-sm text-white">{project.devTime}</span>
          </div>
          <div className="flex justify-between items-center col-span-2">
            <span className="text-xs text-gray-400">난이도</span>
            <span className={`text-sm font-medium ${
              project.difficulty === "하" ? "text-green-400" :
              project.difficulty === "중" ? "text-yellow-400" :
              "text-red-400"
            }`}>{project.difficulty}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-green-400 font-medium mb-1">장점</p>
            {project.pros.map((p, i) => (
              <p key={i} className="text-xs text-gray-300 mb-0.5">✅ {p}</p>
            ))}
          </div>
          <div>
            <p className="text-xs text-red-400 font-medium mb-1">단점</p>
            {project.cons.map((c, i) => (
              <p key={i} className="text-xs text-gray-300 mb-0.5">⚠️ {c}</p>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default function ProjectOverview() {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filter, setFilter] = useState("all");

  const categories = ["all", "한국 타겟", "K-콘텐츠 해외", "글로벌"];

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedProjects = projects.filter((p) => selectedIds.has(p.id));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">🗺️ 프로젝트 후보 전체 지도</h1>
        <p className="text-gray-400 text-sm">총 {projects.length}개 후보 — 카드를 눌러 상세 확인, 체크박스로 관심 후보 선택</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-300">{projects.filter(p => p.category === "한국 타겟").length}</p>
          <p className="text-xs text-blue-400">🇰🇷 한국 타겟</p>
        </div>
        <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-300">{projects.filter(p => p.category === "K-콘텐츠 해외").length}</p>
          <p className="text-xs text-purple-400">🎬 K-콘텐츠 해외</p>
        </div>
        <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-300">{projects.filter(p => p.category === "글로벌").length}</p>
          <p className="text-xs text-green-400">🌍 글로벌</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              filter === cat
                ? "bg-white text-black font-medium"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat === "all" ? `전체 (${projects.length})` : `${cat} (${projects.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-3 mb-6">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            isSelected={selectedIds.has(project.id)}
            onSelect={() => toggleSelect(project.id)}
          />
        ))}
      </div>

      {/* Selected Comparison */}
      {selectedProjects.length > 0 && (
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-600 rounded-t-xl p-4 -mx-4 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">
                ✅ 선택한 후보 ({selectedProjects.length}개)
              </h3>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-xs text-gray-400 hover:text-white"
              >
                초기화
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-1 pr-2">프로젝트</th>
                    <th className="text-center py-1 px-1">바이럴</th>
                    <th className="text-center py-1 px-1">재방문</th>
                    <th className="text-center py-1 px-1">Ad$</th>
                    <th className="text-center py-1 px-1">개발</th>
                    <th className="text-center py-1 px-1">난이도</th>
                    <th className="text-center py-1 px-1">총점</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProjects
                    .sort((a, b) => (b.viral + b.revisit + b.adsense) - (a.viral + a.revisit + a.adsense))
                    .map((p) => (
                    <tr key={p.id} className="border-b border-gray-700/50">
                      <td className="py-2 pr-2 font-medium">
                        {p.emoji} {p.name}
                      </td>
                      <td className="text-center text-yellow-400">{p.viral}/5</td>
                      <td className="text-center text-blue-400">{p.revisit}/5</td>
                      <td className="text-center text-green-400">{p.adsense}/5</td>
                      <td className="text-center text-gray-300">{p.devTime}</td>
                      <td className={`text-center ${
                        p.difficulty === "하" ? "text-green-400" :
                        p.difficulty === "중" ? "text-yellow-400" : "text-red-400"
                      }`}>{p.difficulty}</td>
                      <td className="text-center font-bold text-white">
                        {p.viral + p.revisit + p.adsense}/15
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
