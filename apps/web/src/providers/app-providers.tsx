"use client";

import type * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { NetworkProvider } from "./network-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
  networkDictionary?: {
    offline: string;
    backOnline: string;
  };
}

export function AppProviders({
  children,
  networkDictionary,
}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NetworkProvider dictionary={networkDictionary}>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </NetworkProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
