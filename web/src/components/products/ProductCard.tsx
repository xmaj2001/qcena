"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import Link from "next/link";
import { Product } from "@/features/products";



export function formatPrice(kz: number) {
  return `${kz.toLocaleString("pt-AO")} Kz`;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);


  const productLink = `/marketplace/product/${product.slug}`;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Discount Badge */}
      {/* {product.discount && (
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-white shadow">
          -{product.discount}%
        </span>
      )} */}

      {/* Wishlist button */}
      {/* <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((p) => !p);
        }}
        className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-sm transition-all hover:bg-background"
        aria-label="Adicionar aos favoritos"
      >
        <Heart
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
        />
      </button> */}

      {/* Image */}
      <Link href={productLink} className="relative aspect-square overflow-hidden bg-muted/30 block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3">
        <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <Link href={productLink} className="hover:underline">
          <p className="line-clamp-2 text-xs sm:text-sm font-semibold text-foreground leading-snug">
            {product.name}
          </p>
        </Link>

        {/* Colors */}
        {/* {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.map((color) => (
              <span
                key={color}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border border-border/60 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[var(--brand)] transition-all"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )} */}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-[10px] sm:text-xs font-bold text-foreground">{product.rating || "4.9"}</span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews || "0"})</span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mt-auto">
          <span className="text-sm sm:text-base font-extrabold text-foreground">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* WhatsApp CTA */}
        <Link
          href={productLink}
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex items-center justify-center gap-1.5 rounded-xl py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95 z-10 relative"
          style={{ background: "var(--brand)" }}
        >
          <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          Encomendar
        </Link>
      </div>
    </div>
  );
}
