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

const services = [
  {
    tag: "Design",
    title: "Identidade visual e branding",
    provider: "Estúdio Lumi",
    rating: 4.9,
    price: "Kz 24.000",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Desenvolvimento",
    title: "Loja virtual completa em 14 dias",
    provider: "Nova Code",
    rating: 5.0,
    price: "Kz 89.000",
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Marketing",
    title: "Gestão de tráfego e performance",
    provider: "Ana Ribeiro",
    rating: 4.8,
    price: "Kz 12.000/mês",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Hero() {
  const plugin = useRef(Autoplay({ delay: 3800, stopOnInteraction: false }));
  return (
    <section className="px-4 pb-8 md:px-8 mt-20 max-w-7xl mx-auto ">
      {/* Container Fundo Personalizado com Gradiente Deco Adaptado */}
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] rounded-3xl bg-kente shadow-card">
        <div className="relative z-10 flex flex-col justify-center gap-4 p-8 lg:p-12">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BadgeCheck className="h-3.5 w-3.5" /> Nova Coleção
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-foreground lg:text-5xl">
            Qualquer Cena, <br />
            <span className="text-gradient-brand">Qualquer Necessidade.</span>
          </h1>
          <p className="max-w-md text-sm text-muted-foreground lg:text-base">
            Trazemos-te bons produtos a bons preços. Escolhemos, testamos e divulgamos —
            tu escolhes no WhatsApp e combinas a entrega num ponto seguro perto de ti.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              // href={waLink("Olá Qcena! Quero ver os produtos.")}
              href={'#'}
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

        <div className="relative h-64 md:h-auto">
          {/* <img
            src={'./logo-transparent.png'}
            alt="Produtos Qcena"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={900}
          /> */}
          <Image
            src={'./logo-transparent.png'}
            alt="Produtos Qcena"
            className="absolute inset-0 h-4/6 w-full object-contain m-auto"
            width={1600}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent " />
        </div>
      </div>
    </section>
  );
}
