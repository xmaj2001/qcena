"use client";

import { useTheme } from "next-themes";

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return {
    theme,
    resolvedTheme, // "light" | "dark" (resolve o "system")
    isDark: resolvedTheme === "dark",
    setLight: () => setTheme("light"),
    setDark: () => setTheme("dark"),
    setSystem: () => setTheme("system"),
    toggle: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
  };
}
