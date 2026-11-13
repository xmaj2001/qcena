"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  dictionary?: {
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
}

export function ModeToggle({
  dictionary = {
    toggle: "Alternar tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
}: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={dictionary.toggle}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">{dictionary.toggle}</span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md border border-border bg-popover p-1 shadow-md focus:outline-none"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme("light");
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                mounted && theme === "light" ? "bg-accent/50 font-semibold" : ""
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>{dictionary.light}</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme("dark");
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                mounted && theme === "dark" ? "bg-accent/50 font-semibold" : ""
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>{dictionary.dark}</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme("system");
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                mounted && theme === "system"
                  ? "bg-accent/50 font-semibold"
                  : ""
              }`}
            >
              <Laptop className="h-4 w-4" />
              <span>{dictionary.system}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
