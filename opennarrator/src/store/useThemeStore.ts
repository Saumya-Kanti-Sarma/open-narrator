/**
 * Purpose: Zustand store for light/dark theme
 * - Reads system preference on first load
 * - Persists user's manual choice to localStorage
 * - Applies data-theme attribute to <html>
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Default to system preference — overridden by persisted value if present
      theme: getSystemTheme(),

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: "open-narrator-theme", // localStorage key
      onRehydrateStorage: () => (state) => {
        // After hydration from localStorage, re-apply the saved theme to <html>
        if (state) applyTheme(state.theme);
      },
    }
  )
);
