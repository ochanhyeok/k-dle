"use client";

import { useTranslation, type TranslationKey } from "@/lib/i18n";

const MODE_SEO: Record<string, { titleSuffix: string; descKey: TranslationKey }> = {
  "drama-dle": { titleSuffix: "Drama-dle", descKey: "seo.drama" },
  "idol-dle": { titleSuffix: "Idol-dle", descKey: "seo.idol" },
  "lyric-dle": { titleSuffix: "Lyric-dle", descKey: "seo.lyric" },
  "scene-dle": { titleSuffix: "Scene-dle", descKey: "seo.scene" },
};

interface Props {
  mode: string;
}

export default function GameHowToPlay({ mode }: Props) {
  const { t } = useTranslation();
  const info = MODE_SEO[mode];
  if (!info) return null;

  return (
    <section className="max-w-lg mx-auto px-4 py-8 text-center">
      <h2 className="text-lg font-semibold mb-2">
        {t("seo.howToPlay", { mode: info.titleSuffix })}
      </h2>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-md mx-auto">
        {t(info.descKey)}
      </p>
    </section>
  );
}
