"use client";

import { ArrowRight, Heart, ImageOff, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "../types";
import { formatKz } from "@/lib/utils";

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
  const href = currentLang
    ? `/${currentLang}/products/${p.slug}`
    : `/products/${p.slug}`;

  return (
    <article className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden ">
      {/* Imagem */}
      <Link href={href}>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_0_0_0_rgb(0_0_0/0)] will-change-transform transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)] focus-within:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
          {p.image ? (
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="transform-gpu object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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

          <div className="absolute backdrop-blur-3xl bottom-0 w-full flex flex-1 flex-col justify-between p-3.5">
            <h4 className="line-clamp-1 text-sm md:text-base font-semibold tracking-tight text-white transition-colors duration-300">
              {p.name}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-border/40 pt-2 px-2">
          <div className="hidden md:grid h-8 w-8 shrink-0 place-items-center text-foreground transition-all">
            Preço
          </div>
          <span className="text-base font-bold text-foreground group-hover:text-primary group-hover:text-lg transition-all duration-200 ">
            {formatKz(p.price)}
          </span>
        </div>
      </Link>
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
