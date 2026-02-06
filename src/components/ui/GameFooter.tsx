"use client";

import { useTranslation } from "@/lib/i18n";

export default function GameFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-3">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] text-[var(--color-muted)]">
          {t("home.footer")}
        </p>
      </div>
    </footer>
  );
}
