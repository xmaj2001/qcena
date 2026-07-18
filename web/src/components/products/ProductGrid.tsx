"use client";

import Link from "next/link";
import { ProductCard, Product } from "@/components/products/ProductCard";
import { generateMockServices } from "@/lib/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductGridProps {
  lang: string;
}

export function ProductGrid({ lang }: ProductGridProps) {
  const recommended = generateMockServices(9);
  const bestDeals = generateMockServices(9);
  return (
    <>
      {/* Best Deals */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Melhores Ofertas para Si
          </h2>
          <Link
            href={`/${lang}/marketplace?sort=discount`}
            className="text-xs font-bold transition-colors hover:text-[var(--brand)]"
            style={{ color: "var(--brand)" }}
          >
            Ver Tudo
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {bestDeals.map((product) => (
              <CarouselItem key={product.id} className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Recommended */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Recomendados para Si
          </h2>
          <Link
            href={`/${lang}/marketplace`}
            className="text-xs font-bold transition-colors hover:text-[var(--brand)]"
            style={{ color: "var(--brand)" }}
          >
            Ver Tudo
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {recommended.map((product) => (
              <CarouselItem key={product.id} className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
    </>
  );
}
