"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowDownRight } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FeaturedProduct } from "../../types";

interface FeaturedCarouselProps {
  items: FeaturedProduct[];
  lang: string;
  dictionary: Dictionary["products"];
}

// Em desenvolvimento os banners vêm de um serviço externo lento (picsum):
// evitamos passar pelo otimizador do Next para não dar timeout.
const SKIP_OPTIMIZATION = process.env.NODE_ENV === "development";

function FeaturedProductSlide({
  feature,
  index,
  lang,
  dictionary,
}: {
  feature: FeaturedProduct;
  index: number;
  lang: string;
  dictionary: Dictionary["products"];
}) {
  const isLight = feature.textColor === "light";
  const textColor = isLight ? "text-white" : "text-foreground";
  const mutedTextColor = isLight ? "text-white/70" : "text-foreground/65";

  // Degradê para garantir legibilidade do texto por cima do banner
  const overlay = isLight
    ? "bg-gradient-to-t from-black/80 via-black/35 to-transparent"
    : "bg-gradient-to-t from-white/85 via-white/40 to-transparent";

  // Art direction: desktop (>= md) usa o banner desktop, abaixo usa o mobile
  const common = {
    alt: "",
    fill: true,
    sizes: "(min-width: 1280px) 1280px, 100vw",
    priority: index === 0,
    className: "object-cover",
    unoptimized: SKIP_OPTIMIZATION,
  };
  const { props: desktop } = getImageProps({
    ...common,
    src: feature.banner.desktop,
  });
  const {
    props: { srcSet: _ignored, ...mobileImgProps },
  } = getImageProps({ ...common, src: feature.banner.mobile });

  return (
    <article
      className={`relative isolate aspect-[2/4] w-full overflow-hidden rounded-2xl md:aspect-[2000/940] ${textColor}`}
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={desktop.srcSet ?? desktop.src}
        />
        {/* biome-ignore lint/performance/noImgElement: art direction via getImageProps */}
        <img {...mobileImgProps} />
      </picture>

      <div aria-hidden className={`absolute inset-0 z-0 ${overlay}`} />

      <div className="absolute inset-0 z-10 flex flex-col justify-end gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10 lg:p-14">
        <div className="max-w-xl space-y-4">
          <p className={`text-xs font-semibold uppercase ${mutedTextColor}`}>
            {feature.title}
          </p>
          {index === 0 ? (
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              {feature.product.name}
            </h1>
          ) : (
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              {feature.product.name}
            </h2>
          )}
          <p className={`text-sm leading-relaxed ${mutedTextColor}`}>
            {feature.description || feature.product.description}
          </p>
          <div className="space-y-1">
            <p className={`text-xs ${mutedTextColor}`}>
              {dictionary.priceLabel}
            </p>
            <p className="text-xl font-semibold">{feature.product.price}</p>
          </div>
          <Button asChild className="mt-2 rounded-full" size="lg">
            <Link href={`/${lang}/products/${feature.product.slug}`}>
              {dictionary.viewDetails}
              <ArrowDownRight />
            </Link>
          </Button>
        </div>

        <div className="w-full md:w-72">
          <p className={`text-xs font-semibold uppercase ${mutedTextColor}`}>
            {feature.subtitle || dictionary.featuredLabel}
          </p>
          <h2 className="mt-2 text-sm font-semibold">
            {dictionary.specifications}
          </h2>
          <dl className="mt-3 space-y-2">
            {feature.product.specs.map((spec) => (
              <div
                className="flex items-start justify-between gap-3 border-b border-current/15 pb-2 text-xs"
                key={`${spec.label}-${spec.value}`}
              >
                <dt className={mutedTextColor}>{spec.label}</dt>
                <dd className="text-right font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}

export function FeaturedCarousel({
  items,
  lang,
  dictionary,
}: FeaturedCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  if (items.length === 0) return null;

  return (
    <section
      aria-label={dictionary.featuredLabel}
      className="mx-auto w-full max-w-7xl pt-6"
    >
      <Carousel
        className="relative w-full"
        opts={{ align: "start", loop: items.length > 1 }}
        plugins={items.length > 1 ? [autoplay.current] : []}
      >
        <CarouselContent className="ml-0">
          {items.map((feature, index) => (
            <CarouselItem className="basis-full pl-0 sm:pl-3" key={feature.id}>
              <FeaturedProductSlide
                dictionary={dictionary}
                feature={feature}
                index={index}
                lang={lang}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {items.length > 1 && (
          <div className="absolute right-5 top-4 z-20 flex gap-2 md:right-8 md:top-6">
            <CarouselPrevious
              aria-label={dictionary.previous}
              className="static size-9 translate-y-0 rounded-full border-current/20 bg-background/70 text-foreground hover:bg-background"
              variant="outline"
            />
            <CarouselNext
              aria-label={dictionary.next}
              className="static size-9 translate-y-0 rounded-full border-current/20 bg-background/70 text-foreground hover:bg-background"
              variant="outline"
            />
          </div>
        )}
      </Carousel>
    </section>
  );
}
