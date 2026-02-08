"use client";

import { useTranslation } from "@/lib/i18n";
import Modal from "./Modal";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODES = [
  {
    emoji: "🎬",
    title: "Drama-dle",
    descKey: "help.drama.desc" as const,
    example: "📌 Genre: Romance, Fantasy • Year: 2016\n🔑 Keywords: immortal, bride, goblin's sword",
  },
  {
    emoji: "🎤",
    title: "Idol-dle",
    descKey: "help.idol.desc" as const,
    example: "🟩 Gender: Female  🟨 Company: Close  🟥 Group: Wrong",
  },
  {
    emoji: "📝",
    title: "Lyric-dle",
    descKey: "help.lyric.desc" as const,
    example: "♪ \"I'm looking for the light in the dark...\"",
  },
  {
    emoji: "🎭",
    title: "Scene-dle",
    descKey: "help.scene.desc" as const,
    example: "\"Two people stand in the rain\" → \"A woman hands an umbrella to a man wearing a military uniform\"",
  },
];

export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("help.title")}>
      <div className="space-y-2 mb-5">
        <p className="text-sm text-[var(--color-muted)]">
          {t("help.intro")}
        </p>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>{t("help.rule1_pre")}<strong>{t("help.rule1_bold")}</strong>{t("help.rule1_post")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>{t("help.rule2")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>{t("help.rule3")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>{t("help.rule4")}</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          {t("help.gameModes")}
        </p>
        {MODES.map((mode) => (
          <div
            key={mode.title}
            className="rounded-xl border border-[var(--color-border)] bg-zinc-900/50 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{mode.emoji}</span>
              <h3 className="font-semibold text-sm">{mode.title}</h3>
            </div>
            <p className="text-xs text-[var(--color-muted)] mb-2">
              {t(mode.descKey)}
            </p>
            <div className="rounded-lg bg-zinc-800/80 px-3 py-2">
              <p className="text-[10px] text-[var(--color-muted)] whitespace-pre-line font-mono">
                {mode.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Streak Ranks */}
      <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          {t("stats.streakRanks")}
        </p>
        <div className="space-y-1.5 text-xs">
          {[
            { d: "7", t: "🎓", rankKey: "rank.trainee" as const },
            { d: "30", t: "🎤", rankKey: "rank.debut" as const },
            { d: "100", t: "⭐", rankKey: "rank.risingStar" as const },
            { d: "200", t: "💥", rankKey: "rank.allKill" as const },
            { d: "365", t: "👑", rankKey: "rank.hallyuLegend" as const },
          ].map((r) => (
            <div
              key={r.d}
              className="flex justify-between text-[var(--color-muted)]"
            >
              <span>{r.t} {t(r.rankKey)}</span>
              <span>{r.d} {t("help.days")}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
