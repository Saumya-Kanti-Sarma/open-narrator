/**
 * Purpose: Initialises theme on mount and listens for OS preference changes
 */

import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    function handleChange(e: MediaQueryListEvent) {
      const stored = localStorage.getItem("open-narrator-theme");
      if (!stored) setTheme(e.matches ? "light" : "dark");
    }
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [setTheme]);

  return <>{children}</>;
}
