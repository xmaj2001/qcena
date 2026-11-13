import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "../types";
import {
  ProductItem,
  type ProductItemLabels,
  ProductItemSkeleton,
} from "./product-item";

interface ProductCarouselProps {
  items: Product[];
  lang: string;
  labels?: Partial<ProductItemLabels>;
  isLoading?: boolean;
}

const CAROUSEL_SKELETON_KEYS = [
  "c-skeleton-1",
  "c-skeleton-2",
  "c-skeleton-3",
  "c-skeleton-4",
];

export const ProductCarousel = ({
  items,
  lang,
  labels,
  isLoading,
}: ProductCarouselProps) => {
  return (
    <div className="relative mt-8 ">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full pl-0">
                <ProductItem product={product} lang={lang} labels={labels} />
              </div>
            </CarouselItem>
          ))}

          {/* Renderiza skeletons adicionais se estiver a carregar */}
          {isLoading &&
            CAROUSEL_SKELETON_KEYS.map((id) => (
              <CarouselItem
                key={id}
                className="basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full pl-0">
                  <ProductItemSkeleton />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Botões de navegação (aparecem nas laterais em ecrãs maiores) */}
        <CarouselPrevious variant="hero" className="-left-6" />
        <CarouselNext variant="hero" className="-right-6" />
      </Carousel>
    </div>
  );
};

export const SkeletonProductCarousel = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="relative mt-8 px-4 sm:px-0">
      <Carousel className="w-full">
        <CarouselContent className="-ml-3">
          {CAROUSEL_SKELETON_KEYS.slice(0, count).map((id) => (
            <CarouselItem
              key={id}
              className="basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full">
                <ProductItemSkeleton />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
