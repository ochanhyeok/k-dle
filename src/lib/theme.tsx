"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("k-dle-theme") as Theme | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.className = stored;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
        document.documentElement.className = "light";
      }
    } catch {
      // localStorage unavailable (private browsing)
    }
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.className = next;
    try { localStorage.setItem("k-dle-theme", next); } catch { /* quota exceeded */ }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
