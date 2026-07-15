"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  colors?: string[];
  whatsapp?: string;
}

export function formatPrice(kz: number) {
  return `Kz ${kz.toLocaleString("pt-AO")}`;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  // default to something if whatsapp is undefined, e.g. a general number
  const whatsappNumber = product.whatsapp || "244900000000";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá Qcena! Quero saber mais sobre: ${product.name}`
  )}`;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((p) => !p);
        }}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-sm transition-all hover:bg-background"
        aria-label="Adicionar aos favoritos"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <p className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
          {product.name}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-border/60 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[var(--brand)] transition-all"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-foreground">{product.rating || "4.9"}</span>
          <span className="text-xs text-muted-foreground">({product.reviews || "0"})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-extrabold text-foreground">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95"
          style={{ background: "var(--brand)" }}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Encomendar
        </a>
      </div>
    </div>
  );
}
