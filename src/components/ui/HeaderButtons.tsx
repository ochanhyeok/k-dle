"use client";

import { useState } from "react";
import StatsModal from "./StatsModal";
import HowToPlayModal from "./HowToPlayModal";

export default function HeaderButtons() {
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowStats(true)}
          className="p-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
          aria-label="Statistics"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
          aria-label="Help"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
        </button>
      </div>
      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
      <HowToPlayModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}
