"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">😵</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-[var(--color-accent)] text-white font-semibold py-2.5 px-6 text-sm hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <a
            href="/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
