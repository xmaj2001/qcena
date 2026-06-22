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
import { cn } from "@/lib/utils";
import type { ApiService } from "@/server/services/types/service.type";
import { Badge } from "@heroui/react";
import Image from "next/image";

type Props = {
  services: ApiService[];
  autoPlayMs?: number;
  onReserve?: (service: ApiService) => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

export function HeroServiceCarousel({
  services,
  autoPlayMs = 6000,
  onReserve,
}: Props) {
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const current = services[index];
  const images = (current?.images ?? []).slice(0, 4);

  useEffect(() => setImageIndex(0), [index]);

  useEffect(() => {
    if (!autoPlayMs || services.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % services.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, services.length]);

  if (!current) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + services.length) % services.length);
  const next = () => setIndex((i) => (i + 1) % services.length);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border bg-card shadow-xl">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Image side */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-auto lg:min-h-[560px]">
          {images.map((img, i) => (
            <Image
              key={i.toString()}
              src={img.src}
              alt={img.altText}
              width={500}
              height={500}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                i === imageIndex ? "opacity-100" : "opacity-0",
              )}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top-left category */}
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary">
              {current.category}
            </Badge>
            <Badge
              variant="secondary"
              className="backdrop-blur bg-white/80 text-foreground"
            >
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              {current.totalReservations} reservas
            </Badge>
          </div>

          {/* Top-right favorite */}
          <button
            type="button"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition hover:scale-105"
            aria-label="Favoritar"
          >
            <Heart className="h-5 w-5 text-primary" />
          </button>

          {/* Image thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-5 flex gap-2">
              {images.map((img, i) => (
                <Button
                  key={i.toString()}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "h-14 w-14 overflow-hidden rounded-lg border-2 transition",
                    i === imageIndex
                      ? "border-primary scale-105"
                      : "border-white/60 opacity-80 hover:opacity-100",
                  )}
                  aria-label={`Imagem ${i + 1}`}
                >
                  <Image
                    width={500}
                    height={500}
                    src={img.src}
                    alt={img.altText}
                    className="h-full w-full object-cover"
                  />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-between gap-6 p-8 lg:p-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {current.provider.image ? (
                <Image
                  src={current.provider.image}
                  alt={current.provider.name}
                  width={500}
                  height={500}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {current.provider.name.charAt(0)}
                </div>
              )}
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  {current.provider.name}
                </p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Prestador verificado
                </p>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
              {current.name}
            </h1>

            {current.description && (
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {current.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {current.tags.slice(0, 5).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-primary/30 text-primary"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-end justify-between border-t pt-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  A partir de
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(current.price)}
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className="flex items-center justify-end gap-1">
                  <Heart className="h-3 w-3" /> {current.totalFavorites}{" "}
                  favoritos
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-base"
              onClick={() => onReserve?.(current)}
            >
              <Calendar className="mr-2 h-5 w-5" /> Reservar agora
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      {services.length > 1 && (
        <>
          <Button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:scale-110 hover:bg-white lg:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={next}
            aria-label="Próximo"
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:scale-110 hover:bg-white lg:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {services.map((_, i) => (
              <Button
                key={i.toString()}
                onClick={() => setIndex(i)}
                aria-label={`Serviço ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
