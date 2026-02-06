import koData from "./scene-i18n-ko";
import esData from "./scene-i18n-es";

type Locale = "ko" | "es";

const data: Record<Locale, Record<string, string[]>> = { ko: koData, es: esData };

export function getLocalizedDescriptions(id: string, locale: string): string[] | null {
  if (locale === "en") return null;
  return data[locale as Locale]?.[id] ?? null;
}
