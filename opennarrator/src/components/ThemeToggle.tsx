/**
 * Purpose: Button that toggles between light and dark mode
 */

import { useThemeStore } from "../store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--bg-border)",
        background: "var(--bg-surface)",
        color: "var(--text)",
        cursor: "pointer",
        fontSize: 18,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
