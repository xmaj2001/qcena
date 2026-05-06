"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1 p-1 rounded-xl bg-surface">
        <div className="w-8 h-8 rounded-lg bg-default animate-pulse" />
        <div className="w-8 h-8 rounded-lg bg-default animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="flex gap-1 p-1 rounded-xl bg-surface border border-border"
      role="group"
      aria-label="Selecionar tema"
    >
      <Button
        id="theme-toggle-light"
        variant={theme === "light" ? "primary" : "ghost"}
        size="sm"
        isIconOnly
        onPress={() => setTheme("light")}
        aria-label="Tema claro"
        aria-pressed={theme === "light"}
        className="w-8 h-8 min-w-8"
      >
        <SunIcon />
      </Button>
      <Button
        id="theme-toggle-dark"
        variant={theme === "dark" ? "primary" : "ghost"}
        size="sm"
        isIconOnly
        onPress={() => setTheme("dark")}
        aria-label="Tema escuro"
        aria-pressed={theme === "dark"}
        className="w-8 h-8 min-w-8"
      >
        <MoonIcon />
      </Button>
    </div>
  );
}
