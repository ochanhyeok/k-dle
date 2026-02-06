"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold mb-2">{t("notFound.title")}</h1>
      <p className="text-sm text-[var(--color-muted)] mb-6 text-center max-w-sm">
        {t("notFound.desc")}
      </p>
      <Link
        href="/"
        className="cta-btn rounded-lg bg-[var(--color-accent)] text-white font-semibold px-6 py-3 text-sm"
      >
        {t("notFound.back")}
      </Link>
    </div>
  );
}
