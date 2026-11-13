"use client";

import { InfiniteScrollTrigger } from "@/components/infinite-scroll-trigger";
import { Button } from "@/components/ui/button";
import type { ApiCursorEnvelope } from "@/lib/api/types";
import { useProductsInfinite } from "../../hooks/use-products-infinite";
import type { GetProductsParams, Product } from "../../types";
import { ProductItem, ProducttItemSkeleton } from "../product-item";

const FETCH_SKELETON_KEYS = [
  "fetch-s-1",
  "fetch-s-2",
  "fetch-s-3",
  "fetch-s-4",
  "fetch-s-5",
  "fetch-s-6",
  "fetch-s-7",
  "fetch-s-8",
  "fetch-s-9",
  "fetch-s-10",
  "fetch-s-11",
  "fetch-s-12",
];

export function ProductListInfinite({
  params = {},
  initialPage,
}: {
  params?: GetProductsParams;
  initialPage: ApiCursorEnvelope<Product>;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useProductsInfinite(params, initialPage);

  const products = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="flex flex-col gap-4 w-full pb-20">
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {isFetchingNextPage &&
          FETCH_SKELETON_KEYS.map((id) => <ProducttItemSkeleton key={id} />)}
        <InfiniteScrollTrigger
          enabled={hasNextPage && !isFetchingNextPage && !isFetchNextPageError}
          onIntersect={fetchNextPage}
        />
      </div>

      {products.length === 0 && !isFetchingNextPage && (
        <div className="py-16 text-center">
          <p className="text-base font-medium text-foreground">
            Nenhum produto encontrado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tenta ajustar a tua pesquisa ou filtros para encontrar o que
            procuras.
          </p>
        </div>
      )}

      {isFetchNextPageError && (
        <div className="text-center">
          <p>{"Ocorreu um erro ao carregar mais produtos."}</p>
          <Button onClick={() => fetchNextPage()}>{"Tentar novamente"}</Button>
        </div>
      )}
      {!hasNextPage && (
        <p className="text-muted-foreground text-center">
          {"Você chegou ao final da lista."}
        </p>
      )}
    </div>
  );
}
