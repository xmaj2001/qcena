"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductSectionCarouselProps {
  products: Product[];
}

export function ProductSectionCarousel({ products }: ProductSectionCarouselProps) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="w-full">
      <CarouselContent className="-ml-3 sm:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-[82%] pl-3 sm:basis-1/3 sm:pl-4 lg:basis-1/4">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
