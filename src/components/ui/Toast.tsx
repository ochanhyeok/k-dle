"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, show, onClose, duration = 2000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show && !visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`rounded-lg bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
