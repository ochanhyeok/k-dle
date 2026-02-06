"use client";

import { useState, useCallback } from "react";

export default function CopyText({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button onClick={handleClick} className={className}>
      {copied ? "Copied! ✓" : text}
    </button>
  );
}
