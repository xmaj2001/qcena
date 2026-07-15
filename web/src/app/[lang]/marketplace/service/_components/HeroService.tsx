"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  service: { name: string; images: string[] };
};

export function HeroService({ service }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = service?.images ?? [];

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-border/40 group shadow-lg">
      <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${service.name} vista ${i + 1}`}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
              i === imageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
          />
        ))}

        {/* Gradiente de Contraste Premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Setas de Navegação flutuantes discretas (Apenas aparecem no hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 border border-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 border border-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Miniaturas Internas flutuantes de Alta Fidelidade */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex gap-2 p-1.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "h-12 w-12 overflow-hidden rounded-xl border-2 transition-all",
                    i === imageIndex
                      ? "border-[var(--brand)] scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Indicador Numérico de Imagens */}
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/50 text-white border border-white/10 tracking-wider">
              {imageIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}