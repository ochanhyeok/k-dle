"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

function getTimeUntilMidnightUTC(): { h: number; m: number; s: number } {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const diff = tomorrow.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeUntilMidnightUTC);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilMidnightUTC());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 text-center">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">
        {t("countdown.nextPuzzle")}
      </p>
      <p className="text-lg font-mono font-bold tabular-nums">
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </p>
    </div>
  );
}
