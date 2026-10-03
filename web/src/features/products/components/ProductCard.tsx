import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types";

export function formatPrice(kz: number) {
  return `${kz.toLocaleString("pt-AO")} Kz`;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productLink = `/marketplace/product/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={productLink} className="relative block aspect-square overflow-hidden bg-muted/30 p-5">
        <Image src={product.banner || product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{product.badge}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1 text-xs font-medium text-muted-foreground">{product.category}</span>
        <Link href={productLink} className="hover:underline"><h3 className="line-clamp-2 min-h-12 font-bold">{product.name}</h3></Link>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-foreground">{product.rating.toFixed(1)}</span><span>({product.reviews})</span>
        </div>
        <div className="mt-4"><span className="text-lg font-extrabold">{formatPrice(product.price)}</span><span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span></div>
        <Link href={productLink} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:brightness-110">
          <ShoppingCart className="h-3.5 w-3.5" />Encomendar
        </Link>
      </div>
    </article>
  );
}
