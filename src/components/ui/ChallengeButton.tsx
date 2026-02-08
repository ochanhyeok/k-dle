"use client";

import { useState } from "react";
import { encodeCompareData } from "@/lib/compare";
import { useTranslation } from "@/lib/i18n";

interface Props {
  mode: string;
  puzzleNumber: number;
  guessCount: number;
  won: boolean;
}

export default function ChallengeButton({ mode, puzzleNumber, guessCount, won }: Props) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleChallenge = async () => {
    const encoded = encodeCompareData({ puzzleNum: puzzleNumber, guessCount, won });
    const url = `https://k-dle.vercel.app/${mode}?r=${encoded}`;
    const text = t("challenge.message", { mode: mode.replace("-dle", "").charAt(0).toUpperCase() + mode.replace("-dle", "").slice(1) + "-dle", n: puzzleNumber });
    const shareText = `${text}\n${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // fall through
      }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleChallenge}
      className="mt-2 w-full rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold py-3 text-sm hover:bg-[var(--color-accent)]/20 transition-colors"
    >
      {copied ? t("toast.linkCopied") : t("challenge.button")}
    </button>
  );
}
