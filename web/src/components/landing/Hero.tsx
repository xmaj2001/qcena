"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, BadgeCheck, ChevronRight, MapPin, MessageCircle, Package, ShieldCheck, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    badge: "Nova Coleção",
    title1: "Qualquer Cena,",
    title2: "Qualquer Necessidade.",
    description: "Trazemos-te bons produtos a bons preços. Escolhemos, testamos e divulgamos — tu escolhes no WhatsApp e combinas a entrega num ponto seguro perto de ti.",
    image: "./logo-transparent.png",
  },
  // {
  //   badge: "Ofertas Especiais",
  //   title1: "Descontos de até",
  //   title2: "50% em Eletrônicos.",
  //   description: "Aproveita a nossa semana de tecnologia com os melhores gadgets aos preços mais baixos de Angola.",
  //   image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
  // },
  // {
  //   badge: "Estilo & Moda",
  //   title1: "Renova o teu",
  //   title2: "Guarda-roupa.",
  //   description: "As últimas tendências de moda para te destacares. Pede já o teu outfit preferido com entrega garantida.",
  //   image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80",
  // }
];

export function Hero() {
  const plugin = useRef(Autoplay({ delay: 3800, stopOnInteraction: false }));
  return (
    <section className="px-4 pb-8 md:px-8 mt-20 max-w-7xl mx-auto">
      <Carousel
        plugins={[plugin.current as any]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              {/* Container Fundo Personalizado com Gradiente Deco Adaptado */}
              <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] rounded-3xl bg-kente shadow-card overflow-hidden">
                <div className="relative z-10 flex flex-col justify-center gap-4 p-8 lg:p-12 bg-background/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> {slide.badge}
                  </span>
                  <h1 className="text-4xl font-extrabold leading-[1.05] text-foreground lg:text-5xl">
                    {slide.title1} <br />
                    <span className="text-gradient-brand">{slide.title2}</span>
                  </h1>
                  <p className="max-w-md text-sm text-muted-foreground lg:text-base">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={'https://wa.me/244944083160'}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                    >
                      <MessageCircle className="h-4 w-4" /> Comprar via WhatsApp
                    </Link>
                    <a
                      href="#produtos"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
                    >
                      Ver Catálogo <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-4 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4 text-primary" /> Produtos testados
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" /> Entrega em ponto seguro
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Contacto direto
                    </div>
                  </div>
                </div>

                <div className="relative h-64 md:h-auto min-h-[300px] md:min-h-full -order-1 md:order-1">
                  {slide.image.startsWith('./') ? (
                    <Image
                      src={slide.image}
                      alt="Hero Image"
                      className="absolute inset-0 h-4/6 w-full object-contain m-auto"
                      width={1600}
                      height={500}
                    />
                  ) : (
                    <img
                      src={slide.image}
                      alt="Hero Image"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
