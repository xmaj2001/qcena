"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Heart, Mouse, ShoppingCart } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import type { Product } from "@/features/products/types";

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const currentProduct = products[currentIndex] ?? products[0];
  if (!currentProduct) return null;

  return (
    <section className="min-h-screen p-2 transition-colors duration-300 sm:h-screen sm:max-h-screen">
      <div className="relative flex min-h-[calc(100vh-1rem)] w-full flex-col justify-between overflow-hidden rounded-[2rem] sm:h-full">
        <header className="z-20 flex w-full shrink-0 flex-row items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-6 md:px-12 md:py-8">
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Image src="/logo-transparent.png" alt="Logo" width={40} height={40} className="object-contain" />
            <span className="text-base font-bold uppercase tracking-[0.16em] text-primary sm:text-xl sm:tracking-[0.2em] dark:text-white">Cena</span>
          </div>
          <nav className="hidden items-center gap-1 rounded-full bg-black/5 p-1 dark:bg-white/5 lg:flex">
            {["PRODUTOS", "SOBRE NÓS", "DESTAQUES", "CONTACTOS"].map((item, index) => (
              <Link
                key={item}
                href="#"
                className={index === 2
                  ? "rounded-full bg-primary px-6 py-2.5 text-xs font-bold tracking-wider text-white dark:bg-white dark:text-black"
                  : "px-6 py-2.5 text-xs font-bold tracking-wider text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <ModeToggle />
            <button type="button" aria-label="Carrinho" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:scale-105 md:h-12 md:w-12 dark:border dark:border-white/20 dark:bg-transparent">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Favoritos" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:scale-105 md:h-12 md:w-12 dark:border dark:border-white/20 dark:bg-transparent">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </header>

        <Carousel setApi={setApi} plugins={[autoplay.current]} className="flex min-h-0 w-full flex-1 flex-col justify-center">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative flex w-full flex-col items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-8 sm:py-6 md:px-12 lg:flex-row lg:gap-0 lg:px-24 lg:py-0">
                  <div className="z-20 flex w-full flex-col items-start space-y-3 text-center sm:space-y-5 lg:w-[45%] lg:space-y-6 lg:text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Destaque</span>
                    <h1 className="w-full text-[2rem] font-extrabold leading-[1.05] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] dark:text-white">{product.name}</h1>
                    <p className="mx-auto max-w-[420px] text-xs leading-relaxed text-black/70 sm:text-sm md:text-base lg:mx-0 dark:text-white/70">{product.description}</p>
                  </div>

                  <div className="pointer-events-none z-10 my-1 flex w-full items-center justify-center sm:my-3 lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <div className="relative h-[min(62vw,230px)] w-[min(62vw,230px)] sm:h-[min(52vw,360px)] sm:w-[min(52vw,360px)] lg:h-[min(550px,42vh)] lg:w-[min(550px,42vh)]">
                      <Image src={product.banner} alt={product.name} fill className="object-contain drop-shadow-2xl" priority />
                    </div>
                  </div>

                  <div className="z-20 my-1 flex w-full flex-row items-center justify-center gap-2 overflow-x-auto px-1 sm:my-3 sm:gap-3 lg:my-0 lg:w-auto lg:flex-col lg:items-end lg:overflow-visible">
                    {products.map((item, index) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Ver ${item.name}`}
                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 p-1.5 transition-all sm:h-16 sm:w-16 sm:rounded-2xl sm:p-2 lg:h-20 lg:w-20 ${currentIndex === index ? "scale-105 border-primary dark:border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                      >
                        <Image src={item.banner} alt="" width={60} height={60} className="object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <footer className="z-20 mt-auto flex w-full shrink-0 flex-col items-center justify-between gap-4 px-4 pb-4 sm:flex-row sm:gap-5 sm:px-6 sm:pb-5 md:px-12 md:pb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white/70">
            Qcena <span className="font-normal text-black/40 dark:text-white/40">Marketplace</span>
          </div>
          <div className="order-first flex flex-col items-center gap-0.5 text-center sm:order-none sm:gap-1">
            <span className="text-2xl font-extrabold text-black sm:text-3xl md:text-4xl dark:text-white">{currentProduct.price.toLocaleString("pt-AO")} Kz</span>
            <span className="text-base font-bold text-black/40 line-through decoration-4 sm:text-lg md:text-xl dark:text-white/40">{currentProduct.oldPrice.toLocaleString("pt-AO")} Kz</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black dark:text-white">VEJA MAIS</span>
            <Mouse className="h-5 w-5 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Produto anterior" onClick={() => api?.scrollPrev()} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/75 text-primary dark:border-white/20 dark:text-white"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Próximo produto" onClick={() => api?.scrollNext()} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/75 text-primary dark:border-white/20 dark:text-white"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <button type="button" className="flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:opacity-90 sm:px-7 sm:py-3 sm:text-sm dark:bg-white dark:text-black">Encomendar Agora <ChevronRight className="h-4 w-4" /></button>
          </div>
        </footer>
      </div>
    </section>
  );
}
