"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { ApiService } from "@/server/services/types/service.type";
import { Badge } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  services: ApiService[];
  autoPlayMs?: number;
  onReserve?: (service: ApiService) => void;
};

export function HeroFullCarousel({
  services,
  autoPlayMs = 7000,
  onReserve,
}: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const current = services[index];
  const images = (current?.images ?? []).slice(0, 4);

  useEffect(() => setImageIndex(0), [index]);

  useEffect(() => {
    if (!autoPlayMs || services.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % services.length),
      autoPlayMs,
    );
    return () => clearInterval(id);
  }, [autoPlayMs, services.length]);

  if (!current) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + services.length) % services.length);
  const next = () => setIndex((i) => (i + 1) % services.length);

  const handleViewService = () => {
    router.push(`/service/${current.id}`);
  };
  return (
    <section className="relative h-screen pt-20 min-h-[640px] w-full overflow-hidden bg-background">
      {/* Background images */}
      {images.map((img, i) => (
        <div
          key={i.toString()}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === imageIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={img}
            alt={current.name}
            className="h-full w-full object-cover"
            height={500}
            width={500}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-10 lg:px-12 lg:py-16">
        {/* Main copy */}
        <div className="max-w-3xl space-y-6 text-white">
          <div className="flex items-center gap-3">
            {current.provider.image ? (
              <Image
                src={current.provider.image}
                alt={current.provider.name}
                width={500}
                height={500}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-primary"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                {current.provider.name.charAt(0)}
              </div>
            )}
            <div className="text-sm">
              <p className="font-semibold">{current.provider.name}</p>
              <p className="flex items-center gap-1 text-white/70">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {current.totalReservations} reservas · {current.totalFavorites}{" "}
                favoritos
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {current.name}
          </h1>

          {current.description && (
            <p className="max-w-2xl text-base text-white/85 md:text-lg">
              {current.description}
            </p>
          )}

          {/* <div className="flex flex-wrap gap-2">
            {current.tags.slice(0, 5).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-white/30 bg-white/5 text-white backdrop-blur"
              >
                #{tag}
              </Badge>
            ))}
          </div> */}

          <div className="flex flex-col items-start gap-5 pt-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/60">
                A partir de
              </p>
              <p className="text-3xl font-bold text-white md:text-4xl">
                {formatPrice(current.price)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 px-7 text-base"
                onClick={() => onReserve?.(current)}
              >
                <Calendar className="mr-2 h-5 w-5" /> Reservar agora
              </Button>
              <Button
                onClick={handleViewService}
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white hover:text-foreground"
              >
                Saber mais <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom: thumbs + controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Image thumbs */}
          {images.length > 1 ? (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <Button
                  variant={"ghost"}
                  key={i.toString()}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "h-16 w-24 overflow-hidden rounded-lg border-2 transition md:h-20 md:w-28 p-0",
                    i === imageIndex
                      ? "border-primary scale-105 shadow-lg shadow-primary/30"
                      : "border-white/30 opacity-70 hover:opacity-100",
                  )}
                  aria-label={`Imagem ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={current.name}
                    className="h-full w-full object-cover"
                    width={500}
                    height={500}
                  />
                </Button>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Service nav */}
          <div className="flex items-center gap-4">
            <div className="hidden flex-col items-end text-right text-white/80 md:flex">
              <p className="text-xs uppercase tracking-widest text-white/50">
                Próximo
              </p>
              <p className="line-clamp-1 max-w-[260px] text-sm font-semibold text-white">
                {services[(index + 1) % services.length].name}
              </p>
            </div>
            <Button
              onClick={prev}
              aria-label="Anterior"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={next}
              aria-label="Próximo"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {services.map((_, i) => (
          <Button
            key={i.toString()}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={cn(
              "h-1 rounded-full transition-all",
              i === index
                ? "w-10 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
