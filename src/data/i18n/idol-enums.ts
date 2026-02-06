type Locale = "ko" | "es";

const genderMap: Record<Locale, Record<string, string>> = {
  ko: { Male: "남성", Female: "여성" },
  es: { Male: "Masculino", Female: "Femenino" },
};

const positionMap: Record<Locale, Record<string, string>> = {
  ko: {
    "Main Vocalist": "메인 보컬",
    "Lead Vocalist": "리드 보컬",
    "Sub Vocalist": "서브 보컬",
    "Main Dancer": "메인 댄서",
    "Lead Dancer": "리드 댄서",
    "Main Rapper": "메인 래퍼",
    "Lead Rapper": "리드 래퍼",
    Leader: "리더",
    Visual: "비주얼",
  },
  es: {
    "Main Vocalist": "Vocalista Principal",
    "Lead Vocalist": "Vocalista Líder",
    "Sub Vocalist": "Sub Vocalista",
    "Main Dancer": "Bailarín Principal",
    "Lead Dancer": "Bailarín Líder",
    "Main Rapper": "Rapero Principal",
    "Lead Rapper": "Rapero Líder",
    Leader: "Líder",
    Visual: "Visual",
  },
};

const nationalityMap: Record<Locale, Record<string, string>> = {
  ko: {
    Korean: "한국",
    Thai: "태국",
    Japanese: "일본",
    Australian: "호주",
    "Vietnamese-Australian": "베트남계 호주",
    "Korean-Australian": "한국계 호주",
    Canadian: "캐나다",
    Chinese: "중국",
    "Korean-American": "한국계 미국",
    American: "미국",
  },
  es: {
    Korean: "Coreano/a",
    Thai: "Tailandés/a",
    Japanese: "Japonés/a",
    Australian: "Australiano/a",
    "Vietnamese-Australian": "Vietnamita-Australiano/a",
    "Korean-Australian": "Coreano/a-Australiano/a",
    Canadian: "Canadiense",
    Chinese: "Chino/a",
    "Korean-American": "Coreano/a-Americano/a",
    American: "Americano/a",
  },
};

const generationMap: Record<Locale, Record<string, string>> = {
  ko: {
    "2nd Gen": "2세대",
    "3rd Gen": "3세대",
    "4th Gen": "4세대",
    "5th Gen": "5세대",
  },
  es: {
    "2nd Gen": "2ª Gen",
    "3rd Gen": "3ª Gen",
    "4th Gen": "4ª Gen",
    "5th Gen": "5ª Gen",
  },
};

export function translateIdolAttr(
  key: "gender" | "position" | "nationality" | "generation",
  value: string,
  locale: string,
): string {
  if (locale === "en") return value;
  const loc = locale as Locale;
  switch (key) {
    case "gender":
      return genderMap[loc]?.[value] ?? value;
    case "position":
      return positionMap[loc]?.[value] ?? value;
    case "nationality":
      return nationalityMap[loc]?.[value] ?? value;
    case "generation":
      return generationMap[loc]?.[value] ?? value;
    default:
      return value;
  }
}
