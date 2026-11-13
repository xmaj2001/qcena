"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "../../types";

interface ProductSearchItemsProps {
  dictionary: Dictionary["navbar"];
  lang: string;
  onPopularSearch: (term: string) => void;
  products: Product[];
  query: string;
  isPending: boolean;
  hasSearched: boolean;
}

export function ProductSearchItems({
  dictionary,
  lang,
  onPopularSearch,
  products,
  query,
  isPending,
  hasSearched,
}: ProductSearchItemsProps) {
  if (query.trim().length < 2) {
    return (
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
          {dictionary.popularSearches}
        </h3>
        <div className="flex flex-wrap gap-2">
          {dictionary.popularSearchItems.map((item: string) => (
            <button
              className="rounded-full bg-muted px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              key={item}
              onClick={() => onPopularSearch(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {dictionary.searchMinChars}
        </p>
      </section>
    );
  }

  if (isPending) {
    return (
      <output className="block py-4 text-sm text-muted-foreground">
        {dictionary.searchLoading}
      </output>
    );
  }

  if (hasSearched && products.length === 0) {
    return (
      <output className="block py-4 text-sm text-muted-foreground">
        {dictionary.searchNoResults}
      </output>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            className="flex items-center gap-3 py-3 transition-colors hover:bg-muted/50"
            href={`/${lang}/products/${product.slug}`}
          >
            <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
              {product.image && (
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="48px"
                  src={product.image}
                />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {product.name}
              </span>
              <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground">
                {product.description}
              </span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-foreground">
              {product.price}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
