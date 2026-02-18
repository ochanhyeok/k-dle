"use client";

import { useTranslation } from "@/lib/i18n";

interface GameSeoContentProps {
  mode: "drama-dle" | "idol-dle" | "lyric-dle" | "scene-dle";
}

const seoKeys = {
  "drama-dle": {
    title: "seo.drama.title",
    p1: "seo.drama.p1",
    p2: "seo.drama.p2",
    sections: [
      { title: "seo.drama.genresTitle", paragraphs: ["seo.drama.genresText", "seo.drama.genresText2"] },
      { title: "seo.drama.globalTitle", paragraphs: ["seo.drama.globalP1", "seo.drama.globalP2"] },
      { title: "seo.drama.whyTitle", paragraphs: ["seo.drama.whyP1", "seo.drama.whyP2"] },
    ],
  },
  "idol-dle": {
    title: "seo.idol.title",
    p1: "seo.idol.p1",
    p2: "seo.idol.p2",
    sections: [
      { title: "seo.idol.traineeTitle", paragraphs: ["seo.idol.traineeP1", "seo.idol.traineeP2"] },
      { title: "seo.idol.genTitle", paragraphs: ["seo.idol.genP1", "seo.idol.genP2"] },
      { title: "seo.idol.fandomTitle", paragraphs: ["seo.idol.fandomP1", "seo.idol.fandomP2"] },
      { title: "seo.idol.whyTitle", paragraphs: ["seo.idol.whyText"] },
    ],
  },
  "lyric-dle": {
    title: "seo.lyric.title",
    p1: "seo.lyric.p1",
    p2: "seo.lyric.p2",
    sections: [
      { title: "seo.lyric.lyricsTitle", paragraphs: ["seo.lyric.lyricsP1", "seo.lyric.lyricsP2"] },
      { title: "seo.lyric.ostTitle", paragraphs: ["seo.lyric.ostP1", "seo.lyric.ostP2"] },
      { title: "seo.lyric.hallyuTitle", paragraphs: ["seo.lyric.hallyuP1", "seo.lyric.hallyuP2"] },
      { title: "seo.lyric.whyTitle", paragraphs: ["seo.lyric.whyText"] },
    ],
  },
  "scene-dle": {
    title: "seo.scene.title",
    p1: "seo.scene.p1",
    p2: "seo.scene.p2",
    sections: [
      { title: "seo.scene.confessionTitle", paragraphs: ["seo.scene.confessionP1", "seo.scene.confessionP2"] },
      { title: "seo.scene.locationTitle", paragraphs: ["seo.scene.locationP1", "seo.scene.locationP2"] },
      { title: "seo.scene.viralTitle", paragraphs: ["seo.scene.viralP1", "seo.scene.viralP2"] },
      { title: "seo.scene.whyTitle", paragraphs: ["seo.scene.whyText"] },
    ],
  },
} as const;

type SeoKey = keyof typeof seoKeys;

export default function GameSeoContent({ mode }: GameSeoContentProps) {
  const { t } = useTranslation();
  const config = seoKeys[mode as SeoKey];
  if (!config) return null;

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        {t(config.title as any)}
      </h2>
      <p className="mb-4">{t(config.p1 as any)}</p>
      <p className="mb-4">{t(config.p2 as any)}</p>

      {config.sections.map((section, i) => (
        <div key={i}>
          <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">
            {t(section.title as any)}
          </h3>
          {section.paragraphs.map((pKey, j) => (
            <p key={j} className="mb-4">{t(pKey as any)}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
