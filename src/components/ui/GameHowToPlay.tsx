"use client";

import { useTranslation, type TranslationKey } from "@/lib/i18n";

const MODE_SEO: Record<string, { titleSuffix: string; descKey: TranslationKey; hintsKey: TranslationKey; strategyKey: TranslationKey }> = {
  "drama-dle": { titleSuffix: "Drama-dle", descKey: "seo.drama", hintsKey: "seo.dramaHints", strategyKey: "seo.dramaStrategy" },
  "idol-dle": { titleSuffix: "Idol-dle", descKey: "seo.idol", hintsKey: "seo.idolHints", strategyKey: "seo.idolStrategy" },
  "lyric-dle": { titleSuffix: "Lyric-dle", descKey: "seo.lyric", hintsKey: "seo.lyricHints", strategyKey: "seo.lyricStrategy" },
  "scene-dle": { titleSuffix: "Scene-dle", descKey: "seo.scene", hintsKey: "seo.sceneHints", strategyKey: "seo.sceneStrategy" },
};

interface Props {
  mode: string;
}

export default function GameHowToPlay({ mode }: Props) {
  const { t } = useTranslation();
  const info = MODE_SEO[mode];
  if (!info) return null;

  return (
    <section className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold mb-3 text-center">
        {t("seo.howToPlay", { mode: info.titleSuffix })}
      </h2>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
        {t(info.descKey)}
      </p>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
        {t(info.hintsKey)}
      </p>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed">
        {t(info.strategyKey)}
      </p>
    </section>
  );
}
