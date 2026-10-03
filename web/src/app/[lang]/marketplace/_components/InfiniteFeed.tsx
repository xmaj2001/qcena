"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { fetchProducts } from "@/features/products/queries";
import type { ApiCursorEnvelope } from "@/features/core/api.types";
import type { GetProductsQueryParams, Product } from "@/features/products/types";

interface InfiniteFeedProps {
  filters: Pick<GetProductsQueryParams, "category" | "search" | "sortBy">;
  initialData: ApiCursorEnvelope<Product>;
}

export function InfiniteFeed({ filters, initialData }: InfiniteFeedProps) {
  const [data, setData] = useState(initialData);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node || !data.nextCursor || isFetchingNextPage) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || isFetchingNextPage) return;
      setIsFetchingNextPage(true);
      try {
        const next = await fetchProducts({ ...filters, limit: 9, cursor: data.nextCursor });
        setData((current) => ({
          items: [...current.items, ...next.items],
          nextCursor: next.nextCursor,
        }));
      } finally {
        setIsFetchingNextPage(false);
      }
    }, { rootMargin: "300px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, [data.nextCursor, filters, isFetchingNextPage]);

  const products = data.items;

  if (products.length === 0) {
    return <div className="flex-1 py-12 text-center text-sm text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</div>;
  }

  return (
    <div className="flex-1 space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </section>

      {data.nextCursor ? (
        <div ref={triggerRef} className="flex w-full justify-center py-8">
          {isFetchingNextPage ? <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" /> : null}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">Você chegou ao fim do catálogo de produtos.</p>
      )}
    </div>
  );
}
