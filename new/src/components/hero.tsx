"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Network,
} from "lucide-react";

// Dados de exemplo dos produtos do carrossel
const products = [
  {
    id: 1,
    title: "Meu pc quando vou ter muito dinheiro",
    description:
      "It's not just about staying warm. It's about stepping outside and instantly feeling confident, comfortable, and completely yourself. Designed to elevate even the simplest outfit, this jacket wraps you in lightweight warmth.",
    price: "400.000kz",
    oldPrice: "600.000kz",
    image: "/products/item-demo.png", // Substitua pelo caminho correto da sua imagem
  },
  {
    id: 2,
    title: "PC Gamer Extreme RTX 4090",
    description:
      "Desempenho extremo para os jogos mais exigentes e tarefas de renderização intensas. Construído com os melhores componentes do mercado.",
    price: "850.000kz",
    oldPrice: "950.000kz",
    image: "/products/item-demo.png",
  },
  {
    id: 3,
    title: "Setup Modding Custom RGB",
    description:
      "Estilo único com refrigeração líquida personalizada e acabamento premium para os verdadeiros entusiastas de tecnologia.",
    price: "520.000kz",
    oldPrice: "680.000kz",
    image: "/products/item-demo.png",
  },
  {
    id: 4,
    title: "Workstation Pro NitroPC",
    description:
      "Potência de processamento incomparável para criadores de conteúdo, arquitetos e desenvolvedores de software.",
    price: "390.000kz",
    oldPrice: "480.000kz",
    image: "/products/item-demo.png",
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sincroniza o estado quando o slide do carrossel muda
  React.useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full my-auto">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
              {/* COLUNA ESQUERDA: Texto e Informações */}
              <div className="lg:col-span-5 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.05] tracking-tight">
                  {product.title}
                </h1>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-md">
                  {product.description}
                </p>
              </div>

              {/* COLUNA CENTRAL: Imagem do Produto em Destaque */}
              <div className="lg:col-span-5 flex justify-center relative my-6 lg:my-0">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* COLUNA DIREITA: Thumbnails de Navegação do Carrossel */}
              <div className="lg:col-span-2 flex lg:flex-col justify-center items-center gap-3">
                {products.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-[#E0E0E0] border-2 transition-all relative overflow-hidden flex items-center justify-center ${
                      currentIndex === index
                        ? "border-[#F14D00] shadow-md scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={`Thumbnail ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
