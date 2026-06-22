"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { ApiService } from "@/server/services/types/service.type";
import { Badge } from "@heroui/react";

type Props = {
  service: ApiService;

  onReserve?: (service: ApiService) => void;
};

export function HeroService({ service, onReserve }: Props) {
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const current = service;
  const images = (current?.images ?? []).slice(0, 4);

  useEffect(() => setImageIndex(0), [index]);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setIndex((i) => (i + 1) % services.length);
  //   }, autoPlayMs);
  //   return () => clearInterval(id);
  // }, [autoPlayMs, services.length]);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-auto lg:min-h-[560px]">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={current.name}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              i === imageIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Image thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-5 left-5 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={cn(
                  "h-14 w-14 overflow-hidden rounded-lg border-2 transition",
                  i === imageIndex
                    ? "border-primary scale-105"
                    : "border-white/60 opacity-80 hover:opacity-100",
                )}
                aria-label={`Imagem ${i + 1}`}
              >
                <img
                  src={img}
                  alt={current.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
