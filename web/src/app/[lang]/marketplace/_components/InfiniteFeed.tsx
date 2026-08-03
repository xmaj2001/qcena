"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { useInView } from "framer-motion";
import { useInfiniteProducts } from "@/features/products/hooks/use-infinite-products";
import type { ApiCursorEnvelope } from "@/features/core/api.types";
import type { Product, GetProductsQueryParams } from "@/features/products";

interface InfiniteFeedProps {
  filters: Pick<GetProductsQueryParams, "category" | "search" | "sortBy">;
  initialData: ApiCursorEnvelope<Product>;
}

export function InfiniteFeed({ filters, initialData }: InfiniteFeedProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteProducts({
    ...filters,
    limit: 9,
    initialData, // <--- Importante: evita o refetch inicial
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(triggerRef, { amount: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Se o data existir, junta todas as páginas
  const products = data
    ? data.pages.flatMap((page) => page.items)
    : initialData.items;

  if (status === "success" && products.length === 0) {
    return (
      <div className="flex-1 text-center py-12">
        <p className="text-muted-foreground text-sm">
          Nenhum produto encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {/* Sentinel para acionar o scroll infinito */}
      {hasNextPage && (
        <div ref={triggerRef} className="flex w-full justify-center py-8">
          <Loader2
            className="h-7 w-7 animate-spin text-muted-foreground"
            style={{ color: "var(--brand)" }}
          />
        </div>
      )}

      {!hasNextPage && products.length > 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Você chegou ao fim do catálogo de produtos.
        </p>
      )}
    </div>
  );
}