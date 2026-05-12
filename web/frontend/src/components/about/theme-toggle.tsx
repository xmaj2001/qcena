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

const LeafIcon = () => (
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
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
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
        id="theme-toggle-dark"
        variant={theme === "dark" ? "primary" : "ghost"}
        size="sm"
        isIconOnly
        onPress={() => setTheme("dark")}
        aria-label="Tema escuro (Dourado)"
        aria-pressed={theme === "dark"}
        className="w-8 h-8 min-w-8"
      >
        <SunIcon />
      </Button>
      <Button
        id="theme-toggle-lime"
        variant={theme === "lime" ? "primary" : "ghost"}
        size="sm"
        isIconOnly
        onPress={() => setTheme("lime")}
        aria-label="Tema lima (Verde)"
        aria-pressed={theme === "lime"}
        className="w-8 h-8 min-w-8"
      >
        <LeafIcon />
      </Button>
    </div>
  );
}
