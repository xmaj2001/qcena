"use client";

import Link from "next/link";
import { ProductCard, Product } from "@/components/products/ProductCard";

const bestDeals: Product[] = [
  {
    id: "prod-1",
    name: "Air Jordan React Feminino",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    price: 12500,
    oldPrice: 16800,
    discount: 26,
    rating: 4.8,
    reviews: 124,
    colors: ["#f5f5f5", "#1a1a1a", "#ff4d4d"],
    whatsapp: "244900000000",
  },
  {
    id: "prod-2",
    name: "Smartwatch Series 9 45mm",
    category: "Electrónicos",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    price: 35900,
    oldPrice: 44500,
    discount: 19,
    rating: 4.9,
    reviews: 98,
    colors: ["#1a1a1a", "#c0c0c0"],
    whatsapp: "244900000000",
  },
  {
    id: "prod-3",
    name: "Perfume Chance Eau Tendre 100ml",
    category: "Beleza",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=600&q=80",
    price: 8900,
    oldPrice: 10900,
    discount: 18,
    rating: 4.7,
    reviews: 86,
    colors: ["#ffd6e0"],
    whatsapp: "244900000000",
  },
  {
    id: "prod-4",
    name: "Headphones WH-1000XM5 Wireless",
    category: "Áudio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    price: 29900,
    oldPrice: undefined,
    discount: undefined,
    rating: 4.9,
    reviews: 176,
    colors: ["#e8e8e8", "#1a1a1a"],
    whatsapp: "244900000000",
  },
];

const recommended: Product[] = [
  {
    id: "rec-1",
    name: "Camisa de Linho Oversize Bege",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
    price: 2900,
    oldPrice: 3500,
    discount: 17,
    rating: 4.6,
    reviews: 43,
    colors: ["#c4a882", "#f5f5f5", "#1a1a1a"],
    whatsapp: "244900000000",
  },
  {
    id: "rec-2",
    name: "Mala Minimalista Ombro Verde",
    category: "Bolsas",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    price: 3900,
    oldPrice: 4900,
    discount: 20,
    rating: 4.7,
    reviews: 62,
    colors: ["#5a6e4a", "#8b6c42"],
    whatsapp: "244900000000",
  },
  {
    id: "rec-3",
    name: "Sérum Niacinamida 10% + Zinc 1%",
    category: "Beleza",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    price: 675,
    oldPrice: 900,
    discount: 25,
    rating: 4.8,
    reviews: 210,
    colors: [],
    whatsapp: "244900000000",
  },
  {
    id: "rec-4",
    name: "Smartwatch Gen 6 Preto",
    category: "Electrónicos",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    price: 21500,
    oldPrice: 32000,
    discount: 33,
    rating: 4.5,
    reviews: 88,
    colors: ["#1a1a1a", "#c0c0c0", "#b8860b"],
    whatsapp: "244900000000",
  },
];

interface ProductGridProps {
  lang: string;
}

export function ProductGrid({ lang }: ProductGridProps) {
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

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {bestDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
