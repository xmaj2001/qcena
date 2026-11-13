"use client";

import { LogoMark } from "./logo-mark";

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className="relative flex items-center justify-center p-6">
      {/* 2. Logótipo no centro */}
      <LogoMark />
    </div>
  );
}
