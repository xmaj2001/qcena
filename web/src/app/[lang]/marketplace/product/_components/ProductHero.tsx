"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";

type Props = {
  product: { 
    name: string; 
    images: string[];
    banner?: string;
    videoUgc?: string;
  };
};

export function ProductHero({ product }: Props) {
  // Combinar banner e imagens, dando prioridade ao banner para a imagem principal
  const allMedia = [];
  if (product.banner) allMedia.push({ type: 'banner', src: product.banner });
  if (product.videoUgc) allMedia.push({ type: 'video', src: product.videoUgc });
  if (product.images) {
    product.images.forEach(img => allMedia.push({ type: 'image', src: img }));
  }

  // Se não houver nada, usar placeholders
  if (allMedia.length === 0) {
    allMedia.push({ type: 'image', src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = allMedia[activeIndex] || allMedia[0];

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Área Principal */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-3xl bg-muted border border-border/40 shadow-lg group">
        {activeMedia.type === 'video' ? (
          <video
            src={activeMedia.src}
            controls
            className="absolute inset-0 h-full w-full object-cover"
            poster={product.images && product.images[0] ? product.images[0] : ""}
          />
        ) : (
          <img
            src={activeMedia.src}
            alt={`${product.name} visualização`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Galeria de Miniaturas */}
      <div className="grid grid-cols-5 md:grid-cols-6 gap-2 md:gap-3">
        {allMedia.map((media, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 transition-all",
              i === activeIndex
                ? "border-[var(--brand)] scale-105 shadow-md z-10"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            {media.type === 'video' ? (
              <>
                <img src={(product.images && product.images[0]) || product.banner || ""} alt="Video thumbnail" className="h-full w-full object-cover blur-[2px]" />
                <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white h-6 w-6 drop-shadow-md" />
              </>
            ) : (
              <img src={media.src} alt="Thumbnail" className="h-full w-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}