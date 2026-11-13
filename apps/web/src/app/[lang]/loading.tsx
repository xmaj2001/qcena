// app/[lang]/loading.tsx
import Image from "next/image";
import { AnimatedLogo } from "@/components/AnimatedLogo";

export default function Loading() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden px-4 bg-background">

      {/* 3. Conteúdo centralizado (z-20 fica acima do overlay) */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        
        {/* Contentor do Logo com o Círculo Segmentado à volta */}
        <div className="relative flex items-center justify-center p-8">
          {/* Círculo trincado/segmentado em SVG a envolver o logo perfeitamente */}
          <svg
            className="absolute inset-0 size-full animate-spin text-primary"
            style={{ animationDuration: "8s" }}
            viewBox="0 0 120 120"
            fill="none"
          >
            {/* Arco principal segmentado */}
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="18 12"
              strokeLinecap="round"
              className="opacity-90"
            />
            {/* Arco secundário com mais detalhes */}
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 35"
              strokeLinecap="round"
              className="opacity-40"
            />
          </svg>

          {/* Logótipo central */}
          <AnimatedLogo className="w-16 h-24 text-primary" />
        </div>

        <p className="text-primary/90 text-sm font-medium tracking-wide animate-pulse mt-2 uppercase">
          A carregar...
        </p>
      </div>
    </div>
  );
}