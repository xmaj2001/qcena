"use client";

import { ThemeProvider } from "@/shared/contexts/themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
