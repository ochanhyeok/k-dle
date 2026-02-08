"use client";

import { useTranslation } from "@/lib/i18n";
import GameHeader from "@/components/ui/GameHeader";
import BadgeCollection from "@/components/ui/BadgeCollection";

export default function BadgesContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <GameHeader emoji="🏆" title="Badges" subtitle={t("badge.subtitle")} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Hero */}
          <div className="text-center mb-6 animate-stagger-in">
            <p className="text-4xl mb-2">🏆</p>
            <h2 className="text-xl font-bold mb-1">{t("badge.pageTitle")}</h2>
            <p className="text-sm text-[var(--color-muted)]">{t("badge.pageDesc")}</p>
          </div>

          <div className="animate-stagger-in" style={{ animationDelay: "0.1s" }}>
            <BadgeCollection />
          </div>
        </div>
      </main>
    </div>
  );
}
