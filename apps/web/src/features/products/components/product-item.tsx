"use client";

import { Heart, ImageOff, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "../types";

export interface ProductItemLabels {
  like: string;
  unlike: string;
  addToCart: string;
  imageUnavailable: string;
}

interface ProductItemProps {
  product: Product;
  lang?: string;
  isLiked?: boolean;
  onToggleLike?: (slug: string) => void;
  onAddToCart?: (product: Product) => void;
  labels?: Partial<ProductItemLabels>;
}

const defaultLabels: ProductItemLabels = {
  like: "Favoritar produto",
  unlike: "Remover dos favoritos",
  addToCart: "Adicionar ao carrinho",
  imageUnavailable: "Imagem indisponível",
};

export const ProductItem = ({
  product,
  lang,
  isLiked = false,
  onToggleLike,
  onAddToCart,
  labels,
}: ProductItemProps) => {
  const p = product;
  const l = { ...defaultLabels, ...labels };
  const routeParams = useParams<{ lang?: string }>();
  const currentLang = lang ?? routeParams?.lang;
  const href = currentLang ? `/${currentLang}/products/${p.slug}` : `/products/${p.slug}`;

  return (
    <article
      className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card
        shadow-[0_0_0_0_rgb(0_0_0/0)] will-change-transform
        transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)]
        focus-within:border-primary/40
        motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="transform-gpu object-cover object-center
              transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.04]
              motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            role="img"
            aria-label={l.imageUnavailable}
            className="absolute inset-0 grid place-items-center text-muted-foreground"
          >
            <ImageOff className="h-8 w-8" />
          </div>
        )}

        {/* Favorito: fica acima do link esticado (z-10) */}
        <button
          type="button"
          aria-label={isLiked ? l.unlike : l.like}
          aria-pressed={isLiked}
          onClick={() => onToggleLike?.(p.slug)}
          className="absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-md
            transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:scale-110 active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${
              isLiked ? "fill-destructive text-destructive" : "text-foreground"
            }`}
          />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <h4 className="line-clamp-1 text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {/* Link esticado: cobre o card inteiro via ::after */}
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-primary"
            >
              {p.name}
            </Link>
          </h4>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {p.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-2">
          <span className="rounded-md border border-primary bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-sm">
            {p.price}
          </span>

          <button
            type="button"
            aria-label={l.addToCart}
            onClick={() => onAddToCart?.(p)}
            className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-muted text-foreground
              transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:bg-primary hover:text-primary-foreground active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProductItemSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />
        <Skeleton className="absolute right-2.5 top-2.5 h-9 w-9 rounded-full" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
        </div>
        <div className="flex items-center justify-between border-t border-border/40 pt-2">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/** @deprecated usa ProductItemSkeleton (nome antigo mantido para não partir imports) */
export const ProducttItemSkeleton = ProductItemSkeleton;
