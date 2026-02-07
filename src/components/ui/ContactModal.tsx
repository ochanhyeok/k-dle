"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function ContactModal({ show, onClose }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      setStatus("idle");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/pon07084@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: `K-Dle Feedback from ${name}` }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h3 className="font-semibold text-lg">{t("contact.title")}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--color-card)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {status === "sent" ? (
            <div className="text-center py-6">
              <p className="text-3xl mb-3">✉️</p>
              <p className="font-semibold text-lg mb-1">{t("contact.sent")}</p>
              <button onClick={onClose} className="mt-4 text-sm text-[var(--color-accent)] hover:underline">
                {t("aria.backHome")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium mb-1 text-[var(--color-muted)]">{t("contact.nameLabel")}</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium mb-1 text-[var(--color-muted)]">{t("contact.emailLabel")}</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus"
                />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium mb-1 text-[var(--color-muted)]">{t("contact.messageLabel")}</label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus resize-none"
                />
              </div>
              {status === "error" && (
                <p className="text-xs text-[var(--color-error)]">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-btn w-full rounded-lg bg-[var(--color-accent)] text-white font-semibold py-2.5 text-sm disabled:opacity-50"
              >
                {status === "sending" ? "..." : t("contact.send")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
