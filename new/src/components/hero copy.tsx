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

// Ícone personalizado do Pinterest
const PinterestIcon = () => (
  <svg
    className="w-5 h-5 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

// Dados de exemplo dos produtos do carrossel
const products = [
  {
    id: 1,
    title: "Meu pc quando vou ter muito dinheiro",
    description:
      "It's not just about staying warm. It's about stepping outside and instantly feeling confident, comfortable, and completely yourself. Designed to elevate even the simplest outfit, this jacket wraps you in lightweight warmth.",
    price: "400.000kz",
    oldPrice: "600.000kz",
    image: "/pc-gamer.png", // Substitua pelo caminho correto da sua imagem
  },
  {
    id: 2,
    title: "PC Gamer Extreme RTX 4090",
    description:
      "Desempenho extremo para os jogos mais exigentes e tarefas de renderização intensas. Construído com os melhores componentes do mercado.",
    price: "850.000kz",
    oldPrice: "950.000kz",
    image: "/pc-gamer.png",
  },
  {
    id: 3,
    title: "Setup Modding Custom RGB",
    description:
      "Estilo único com refrigeração líquida personalizada e acabamento premium para os verdadeiros entusiastas de tecnologia.",
    price: "520.000kz",
    oldPrice: "680.000kz",
    image: "/pc-gamer.png",
  },
  {
    id: 4,
    title: "Workstation Pro NitroPC",
    description:
      "Potência de processamento incomparável para criadores de conteúdo, arquitetos e desenvolvedores de software.",
    price: "390.000kz",
    oldPrice: "480.000kz",
    image: "/pc-gamer.png",
  },
];

export default function HeroSection() {
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
    <div className="w-full max-w-7xl bg-[#EBEBEB] rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[85vh]">
      {/* HEADER / NAVBAR */}
      <header className="flex items-center justify-between gap-4 w-full mb-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-[#F14D00] font-black text-2xl tracking-wider flex items-center gap-1">
            <span className="w-6 h-6 rounded-full border-4 border-[#F14D00] inline-block"></span>
            CENA
          </div>
        </div>

        {/* Navegação Central Pills */}
        <nav className="hidden md:flex items-center bg-[#DEDEDE] p-1.5 rounded-full text-xs font-semibold tracking-wide text-neutral-700 shadow-inner">
          <button className="bg-[#F14D00] text-white px-5 py-2 rounded-full uppercase tracking-wider transition-all">
            DESTAQUES
          </button>
          <button className="px-5 py-2 uppercase hover:text-black transition-colors">
            PRODUTOS
          </button>
          <button className="px-5 py-2 uppercase hover:text-black transition-colors">
            SOBRE NÓS
          </button>
          <button className="px-5 py-2 uppercase hover:text-black transition-colors">
            CONTACTOS
          </button>
        </nav>

        {/* Ações / Carrinho e Favoritos */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#F14D00] text-white rounded-full flex items-center justify-center hover:bg-[#d64400] transition-colors shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-[#F14D00] text-white rounded-full flex items-center justify-center hover:bg-[#d64400] transition-colors shadow-md">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* CARROSSEL PRINCIPAL DA HERO SECTION */}
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

      {/* FOOTER / CONTROLES E PREÇO */}
      <footer className="pt-6 border-t border-neutral-300/40 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Redes Sociais */}
        <div className="flex items-center gap-4 text-[#F14D00]">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Network className="w-5 h-5" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Network className="w-5 h-5" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Network className="w-5 h-5" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Network className="w-5 h-5" />
          </a>
        </div>

        {/* Preço e Botão VEJA MAIS */}
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl font-black text-neutral-900">
            {products[currentIndex]?.price}
          </span>
          <span className="text-sm text-neutral-400 line-through font-medium">
            {products[currentIndex]?.oldPrice}
          </span>
          <button className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-800 mt-2 hover:text-[#F14D00] transition-colors">
            VEJA MAIS
          </button>
          {/* Ícone Indicador de Scroll */}
          <div className="w-4 h-7 border-2 border-neutral-400 rounded-full flex justify-center p-1 mt-1">
            <div className="w-1 h-1.5 bg-neutral-600 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Ações de Navegação e Encomenda */}
        <div className="flex items-center gap-4">
          {/* Botões do Carrossel (Anterior / Próximo) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="rounded-full w-9 h-9 border-neutral-400 text-neutral-700 bg-transparent hover:bg-neutral-300/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="rounded-full w-9 h-9 border-neutral-400 text-neutral-700 bg-transparent hover:bg-neutral-300/50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Botão Principal de Compra */}
          <Button className="bg-[#F14D00] hover:bg-[#d64400] text-white rounded-full px-6 py-6 text-sm font-semibold tracking-wide shadow-lg flex items-center gap-2">
            Encomendar Agora
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
