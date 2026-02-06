"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "en" | "es" | "ko";

const STORAGE_KEY = "k-dle-lang";

const translations = {
  en: {
    // Homepage
    "home.hero": "Daily K-Drama & K-Pop Puzzles",
    "home.subtitle": "Test your knowledge with daily challenges.\nGuess dramas, idols, lyrics, and iconic scenes.",
    "home.footer": "K-Dle is an unofficial fan project. All IP belongs to respective owners.",
    "home.about": "About",
    "home.privacy": "Privacy",
    "home.terms": "Terms",

    // Mode descriptions
    "mode.drama.desc": "Guess the K-Drama from progressive clues",
    "mode.idol.desc": "Identify the K-Pop idol from attributes",
    "mode.lyric.desc": "Name the song from translated lyrics",
    "mode.scene.desc": "Recognize the drama from scene descriptions",

    // Game subtitles (for GameHeader)
    "game.subtitle.drama": "Guess the K-Drama",
    "game.subtitle.idol": "Guess the K-Pop Idol",
    "game.subtitle.lyric": "Name the Song from Lyrics",
    "game.subtitle.scene": "Recognize the K-Drama Scene",

    // Game common
    "game.loading": "Loading...",
    "game.guessIn": "Guess the K-Drama in {n} tries",
    "game.idolGuessIn": "Guess the K-Pop idol in {n} tries",
    "game.lyricGuessIn": "Name the song from translated lyrics",
    "game.sceneGuessIn": "Recognize the K-Drama from the scene description",
    "game.placeholder.drama": "Type a K-Drama title...",
    "game.placeholder.idol": "Type an idol name...",
    "game.placeholder.lyric": "Type a song title...",
    "game.placeholder.scene": "Type a K-Drama title...",

    // Results
    "result.brilliant": "Brilliant!",
    "result.gotIt": "You got it!",
    "result.perfectEar": "Perfect ear!",
    "result.sceneMaster": "Scene master!",
    "result.betterLuck": "Better luck tomorrow!",
    "result.guessedIn": "You guessed {title} in {n} {tries}",
    "result.idolGuessedIn": "{name} ({group}) in {n} {tries}",
    "result.lyricGuessedIn": "{title} by {artist} in {n} {tries}",
    "result.sceneGuessedIn": "{title} in {n} {tries}",
    "result.answerWas": "The answer was {title} ({titleKo})",
    "result.answerWasIdol": "The answer was {name} ({group})",
    "result.answerWasLyric": "The answer was {title} by {artist}",
    "result.try": "try",
    "result.tries": "tries",
    "result.shareResult": "Share Result",
    "result.shareStats": "Share My Stats",

    // Stats
    "stats.played": "Played",
    "stats.winRate": "Win Rate",
    "stats.winPct": "Win %",
    "stats.streak": "Streak",
    "stats.max": "Max",
    "stats.title": "Statistics",
    "stats.dayStreak": "{n} day streak",
    "stats.guessDistribution": "Guess Distribution",
    "stats.streakRanks": "Streak Ranks",

    // Daily Stats
    "daily.title": "Today's Global Stats",
    "daily.loading": "Loading global stats...",
    "daily.players": "Players",
    "daily.avgGuesses": "Avg Guesses",

    // Countdown
    "countdown.nextPuzzle": "Next puzzle in",

    // Next Game
    "next.tryAnother": "Try another mode",

    // Compare
    "compare.title": "Compare",
    "compare.friend": "Friend",
    "compare.you": "You",

    // Streak
    "streak.title": "Your Daily Streak",
    "streak.start": "Play any mode to start your streak",
    "streak.rank": "Rank: {title}",
    "streak.keepGoing": "Keep going!",

    // Ranks
    "rank.newcomer": "Newcomer",
    "rank.trainee": "Trainee",
    "rank.debut": "Debut",
    "rank.risingStar": "Rising Star",
    "rank.allKill": "All-Kill",
    "rank.hallyuLegend": "Hallyu Legend",
    "rank.rising": "Rising",
    "rank.legend": "Legend",

    // How to Play
    "help.title": "How to Play",
    "help.intro": "Test your K-Drama & K-Pop knowledge with daily puzzles.",
    "help.rule1": "You have <strong>6 tries</strong> to guess each puzzle",
    "help.rule2": "New puzzles every day at midnight UTC",
    "help.rule3": "Share your results without spoilers",
    "help.rule4": "Build your streak — earn fan ranks!",
    "help.gameModes": "Game Modes",
    "help.drama.desc": "Guess the K-Drama from progressive text clues. Each wrong guess reveals a new hint — from genre to cast.",
    "help.idol.desc": "Guess the K-Pop idol. Each guess shows attribute comparisons — group, position, nationality, debut year, and more.",
    "help.lyric.desc": "Name the song from translated lyrics. One new line is revealed with each attempt.",
    "help.scene.desc": "Recognize the K-Drama from a scene description that gets more specific with each guess.",
    "help.days": "days",

    // Toast
    "toast.copied": "Copied to clipboard!",

    // Idol attrs
    "idol.name": "Name",
    "idol.gender": "Gender",
    "idol.group": "Group",
    "idol.position": "Position",
    "idol.nationality": "Nation",
    "idol.debut": "Debut",
    "idol.company": "Company",
    "idol.generation": "Gen",

    // Lyric
    "lyric.remaining": "{n} more line{s} remaining...",
    "lyric.ostHint": "Hint: This is a K-Drama OST",

    // Scene
    "scene.theScene": "The Scene",

    // 404
    "notFound.title": "Page Not Found",
    "notFound.desc": "The page you're looking for doesn't exist. Let's get you back to the puzzles!",
    "notFound.back": "Back to K-Dle",

    // Aria
    "aria.backHome": "Back to home",
    "aria.statistics": "Statistics",
    "aria.help": "Help",
  },

  es: {
    // Homepage
    "home.hero": "Puzzles Diarios de K-Drama y K-Pop",
    "home.subtitle": "Pon a prueba tu conocimiento con desafios diarios.\nAdivina dramas, idols, letras y escenas.",
    "home.footer": "K-Dle es un proyecto de fans no oficial. Toda la PI pertenece a sus respectivos propietarios.",
    "home.about": "Acerca de",
    "home.privacy": "Privacidad",
    "home.terms": "Terminos",

    // Mode descriptions
    "mode.drama.desc": "Adivina el K-Drama con pistas progresivas",
    "mode.idol.desc": "Identifica al idol de K-Pop por sus atributos",
    "mode.lyric.desc": "Nombra la cancion por la letra traducida",
    "mode.scene.desc": "Reconoce el drama por descripciones de escenas",

    // Game subtitles
    "game.subtitle.drama": "Adivina el K-Drama",
    "game.subtitle.idol": "Adivina el Idol de K-Pop",
    "game.subtitle.lyric": "Nombra la Cancion",
    "game.subtitle.scene": "Reconoce la Escena del K-Drama",

    // Game common
    "game.loading": "Cargando...",
    "game.guessIn": "Adivina el K-Drama en {n} intentos",
    "game.idolGuessIn": "Adivina el idol de K-Pop en {n} intentos",
    "game.lyricGuessIn": "Nombra la cancion por la letra traducida",
    "game.sceneGuessIn": "Reconoce el K-Drama por la descripcion de la escena",
    "game.placeholder.drama": "Escribe un titulo de K-Drama...",
    "game.placeholder.idol": "Escribe un nombre de idol...",
    "game.placeholder.lyric": "Escribe un titulo de cancion...",
    "game.placeholder.scene": "Escribe un titulo de K-Drama...",

    // Results
    "result.brilliant": "Brillante!",
    "result.gotIt": "Lo adivinaste!",
    "result.perfectEar": "Oido perfecto!",
    "result.sceneMaster": "Maestro de escenas!",
    "result.betterLuck": "Mejor suerte manana!",
    "result.guessedIn": "Adivinaste {title} en {n} {tries}",
    "result.idolGuessedIn": "{name} ({group}) en {n} {tries}",
    "result.lyricGuessedIn": "{title} de {artist} en {n} {tries}",
    "result.sceneGuessedIn": "{title} en {n} {tries}",
    "result.answerWas": "La respuesta era {title} ({titleKo})",
    "result.answerWasIdol": "La respuesta era {name} ({group})",
    "result.answerWasLyric": "La respuesta era {title} de {artist}",
    "result.try": "intento",
    "result.tries": "intentos",
    "result.shareResult": "Compartir Resultado",
    "result.shareStats": "Compartir Estadisticas",

    // Stats
    "stats.played": "Jugados",
    "stats.winRate": "Victorias",
    "stats.winPct": "% Victoria",
    "stats.streak": "Racha",
    "stats.max": "Max",
    "stats.title": "Estadisticas",
    "stats.dayStreak": "racha de {n} dias",
    "stats.guessDistribution": "Distribucion de Intentos",
    "stats.streakRanks": "Rangos de Racha",

    // Daily Stats
    "daily.title": "Estadisticas Globales de Hoy",
    "daily.loading": "Cargando estadisticas globales...",
    "daily.players": "Jugadores",
    "daily.avgGuesses": "Prom. Intentos",

    // Countdown
    "countdown.nextPuzzle": "Siguiente puzzle en",

    // Next Game
    "next.tryAnother": "Prueba otro modo",

    // Compare
    "compare.title": "Comparar",
    "compare.friend": "Amigo",
    "compare.you": "Tu",

    // Streak
    "streak.title": "Tu Racha Diaria",
    "streak.start": "Juega cualquier modo para iniciar tu racha",
    "streak.rank": "Rango: {title}",
    "streak.keepGoing": "Sigue asi!",

    // Ranks
    "rank.newcomer": "Novato",
    "rank.trainee": "Aprendiz",
    "rank.debut": "Debut",
    "rank.risingStar": "Estrella en Ascenso",
    "rank.allKill": "All-Kill",
    "rank.hallyuLegend": "Leyenda Hallyu",
    "rank.rising": "Ascenso",
    "rank.legend": "Leyenda",

    // How to Play
    "help.title": "Como Jugar",
    "help.intro": "Pon a prueba tu conocimiento de K-Drama y K-Pop con puzzles diarios.",
    "help.rule1": "Tienes <strong>6 intentos</strong> para adivinar cada puzzle",
    "help.rule2": "Nuevos puzzles cada dia a medianoche UTC",
    "help.rule3": "Comparte tus resultados sin spoilers",
    "help.rule4": "Construye tu racha — gana rangos de fan!",
    "help.gameModes": "Modos de Juego",
    "help.drama.desc": "Adivina el K-Drama con pistas de texto progresivas. Cada intento erroneo revela una nueva pista — desde el genero hasta el elenco.",
    "help.idol.desc": "Adivina el idol de K-Pop. Cada intento muestra comparaciones de atributos — grupo, posicion, nacionalidad, ano de debut y mas.",
    "help.lyric.desc": "Nombra la cancion por la letra traducida. Se revela una nueva linea con cada intento.",
    "help.scene.desc": "Reconoce el K-Drama por una descripcion de escena que se vuelve mas especifica con cada intento.",
    "help.days": "dias",

    // Toast
    "toast.copied": "Copiado al portapapeles!",

    // Idol attrs
    "idol.name": "Nombre",
    "idol.gender": "Genero",
    "idol.group": "Grupo",
    "idol.position": "Posicion",
    "idol.nationality": "Nacion",
    "idol.debut": "Debut",
    "idol.company": "Empresa",
    "idol.generation": "Gen",

    // Lyric
    "lyric.remaining": "{n} linea{s} mas restante{s}...",
    "lyric.ostHint": "Pista: Este es un OST de K-Drama",

    // Scene
    "scene.theScene": "La Escena",

    // 404
    "notFound.title": "Pagina No Encontrada",
    "notFound.desc": "La pagina que buscas no existe. Volvamos a los puzzles!",
    "notFound.back": "Volver a K-Dle",

    // Aria
    "aria.backHome": "Volver al inicio",
    "aria.statistics": "Estadisticas",
    "aria.help": "Ayuda",
  },

  ko: {
    // Homepage
    "home.hero": "K-드라마 & K-Pop 데일리 퍼즐",
    "home.subtitle": "매일 새로운 도전으로 당신의 지식을 시험해보세요.\n드라마, 아이돌, 가사, 명장면을 맞혀보세요.",
    "home.footer": "K-Dle은 비공식 팬 프로젝트입니다. 모든 지적재산권은 해당 소유자에게 있습니다.",
    "home.about": "소개",
    "home.privacy": "개인정보",
    "home.terms": "이용약관",

    // Mode descriptions
    "mode.drama.desc": "단서로 K-드라마를 맞혀보세요",
    "mode.idol.desc": "속성으로 K-Pop 아이돌을 맞혀보세요",
    "mode.lyric.desc": "번역된 가사로 노래를 맞혀보세요",
    "mode.scene.desc": "장면 묘사로 드라마를 맞혀보세요",

    // Game subtitles
    "game.subtitle.drama": "K-드라마 맞히기",
    "game.subtitle.idol": "K-Pop 아이돌 맞히기",
    "game.subtitle.lyric": "가사로 노래 맞히기",
    "game.subtitle.scene": "장면으로 드라마 맞히기",

    // Game common
    "game.loading": "로딩 중...",
    "game.guessIn": "{n}번 안에 K-드라마를 맞혀보세요",
    "game.idolGuessIn": "{n}번 안에 K-Pop 아이돌을 맞혀보세요",
    "game.lyricGuessIn": "번역된 가사로 노래를 맞혀보세요",
    "game.sceneGuessIn": "장면 묘사로 K-드라마를 맞혀보세요",
    "game.placeholder.drama": "K-드라마 제목을 입력하세요...",
    "game.placeholder.idol": "아이돌 이름을 입력하세요...",
    "game.placeholder.lyric": "노래 제목을 입력하세요...",
    "game.placeholder.scene": "K-드라마 제목을 입력하세요...",

    // Results
    "result.brilliant": "대단해요!",
    "result.gotIt": "정답!",
    "result.perfectEar": "완벽한 귀!",
    "result.sceneMaster": "장면 마스터!",
    "result.betterLuck": "내일 다시 도전하세요!",
    "result.guessedIn": "{title}을(를) {n}번 만에 맞혔습니다",
    "result.idolGuessedIn": "{name} ({group}) {n}번 만에 맞혔습니다",
    "result.lyricGuessedIn": "{artist}의 {title}을(를) {n}번 만에 맞혔습니다",
    "result.sceneGuessedIn": "{title}을(를) {n}번 만에 맞혔습니다",
    "result.answerWas": "정답은 {title} ({titleKo})이었습니다",
    "result.answerWasIdol": "정답은 {name} ({group})이었습니다",
    "result.answerWasLyric": "정답은 {artist}의 {title}이었습니다",
    "result.try": "번",
    "result.tries": "번",
    "result.shareResult": "결과 공유하기",
    "result.shareStats": "통계 공유하기",

    // Stats
    "stats.played": "플레이",
    "stats.winRate": "승률",
    "stats.winPct": "승률",
    "stats.streak": "연속",
    "stats.max": "최고",
    "stats.title": "통계",
    "stats.dayStreak": "{n}일 연속",
    "stats.guessDistribution": "추측 분포",
    "stats.streakRanks": "연속 랭크",

    // Daily Stats
    "daily.title": "오늘의 글로벌 통계",
    "daily.loading": "글로벌 통계 로딩 중...",
    "daily.players": "참여자",
    "daily.avgGuesses": "평균 횟수",

    // Countdown
    "countdown.nextPuzzle": "다음 퍼즐까지",

    // Next Game
    "next.tryAnother": "다른 모드 도전하기",

    // Compare
    "compare.title": "비교",
    "compare.friend": "친구",
    "compare.you": "나",

    // Streak
    "streak.title": "데일리 연속 기록",
    "streak.start": "아무 모드나 플레이해서 연속 기록을 시작하세요",
    "streak.rank": "랭크: {title}",
    "streak.keepGoing": "계속 도전하세요!",

    // Ranks
    "rank.newcomer": "신입",
    "rank.trainee": "연습생",
    "rank.debut": "데뷔",
    "rank.risingStar": "라이징 스타",
    "rank.allKill": "올킬",
    "rank.hallyuLegend": "한류 레전드",
    "rank.rising": "라이징",
    "rank.legend": "레전드",

    // How to Play
    "help.title": "게임 방법",
    "help.intro": "매일 새로운 K-드라마 & K-Pop 퍼즐에 도전하세요.",
    "help.rule1": "각 퍼즐마다 <strong>6번</strong>의 기회가 있습니다",
    "help.rule2": "매일 자정(UTC)에 새로운 퍼즐이 나옵니다",
    "help.rule3": "스포일러 없이 결과를 공유하세요",
    "help.rule4": "연속 기록을 쌓아 팬 랭크를 올리세요!",
    "help.gameModes": "게임 모드",
    "help.drama.desc": "텍스트 단서로 K-드라마를 맞혀보세요. 틀릴 때마다 장르부터 출연진까지 새로운 힌트가 공개됩니다.",
    "help.idol.desc": "K-Pop 아이돌을 맞혀보세요. 추측할 때마다 그룹, 포지션, 국적, 데뷔 연도 등의 속성이 비교됩니다.",
    "help.lyric.desc": "번역된 가사로 노래를 맞혀보세요. 추측할 때마다 새로운 가사 한 줄이 공개됩니다.",
    "help.scene.desc": "장면 묘사로 K-드라마를 맞혀보세요. 추측할 때마다 더 구체적인 설명이 공개됩니다.",
    "help.days": "일",

    // Toast
    "toast.copied": "클립보드에 복사했습니다!",

    // Idol attrs
    "idol.name": "이름",
    "idol.gender": "성별",
    "idol.group": "그룹",
    "idol.position": "포지션",
    "idol.nationality": "국적",
    "idol.debut": "데뷔",
    "idol.company": "소속사",
    "idol.generation": "세대",

    // Lyric
    "lyric.remaining": "남은 줄: {n}줄...",
    "lyric.ostHint": "힌트: K-드라마 OST입니다",

    // Scene
    "scene.theScene": "장면",

    // 404
    "notFound.title": "페이지를 찾을 수 없습니다",
    "notFound.desc": "찾으시는 페이지가 존재하지 않습니다. 퍼즐로 돌아가볼까요?",
    "notFound.back": "K-Dle로 돌아가기",

    // Aria
    "aria.backHome": "홈으로 돌아가기",
    "aria.statistics": "통계",
    "aria.help": "도움말",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TFunction = (key: TranslationKey, params?: Record<string, string | number>) => string;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "es" || saved === "ko")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let text: string = translations[locale]?.[key] ?? translations.en[key] ?? key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return text;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ko: "KO",
};
