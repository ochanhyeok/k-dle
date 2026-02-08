"use client";

import { useState, useEffect } from "react";
import { FANDOMS, getSelectedFandom, setSelectedFandom, type FandomId } from "@/lib/fandom";
import { useTranslation } from "@/lib/i18n";

interface Props {
  onSelect?: (fandomId: FandomId) => void;
}

export default function FandomSelector({ onSelect }: Props) {
  const [selected, setSelected] = useState<FandomId | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSelected(getSelectedFandom());
  }, []);

  const handleSelect = (fandomId: FandomId) => {
    setSelectedFandom(fandomId);
    setSelected(fandomId);
    setIsOpen(false);
    onSelect?.(fandomId);
  };

  const selectedFandom = FANDOMS.find((f) => f.id === selected);

  if (!isOpen && selected) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-sm text-left hover:border-[var(--color-accent)]/50 transition-colors"
      >
        <span className="text-[var(--color-muted)] text-xs">{t("fandom.yourFandom")}: </span>
        <span className="font-medium">{selectedFandom?.label}</span>
        {selectedFandom?.group && (
          <span className="text-[var(--color-muted)] text-xs ml-1">({selectedFandom.group})</span>
        )}
        <span className="text-[var(--color-muted)] text-xs float-right">{t("fandom.change")}</span>
      </button>
    );
  }

  if (!isOpen && !selected) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 w-full rounded-lg border border-dashed border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5 px-4 py-3 text-sm text-center text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
      >
        {t("fandom.selectPrompt")}
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2 text-center">
        {t("fandom.selectTitle")}
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {FANDOMS.map((fandom) => (
          <button
            key={fandom.id}
            onClick={() => handleSelect(fandom.id)}
            className={`rounded-md px-3 py-2 text-xs font-medium text-left transition-colors ${
              selected === fandom.id
                ? "bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 text-[var(--color-accent)]"
                : "border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)]"
            }`}
          >
            <span className="font-semibold">{fandom.label}</span>
            {fandom.group && (
              <span className="text-[var(--color-muted)] ml-1 text-[10px]">{fandom.group}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
