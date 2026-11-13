"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { ApiCursorEnvelope } from "@/lib/api/types";
import { productKeys } from "../keys";
import { getProducts } from "../queries";
import type { GetProductsParams, Product } from "../types";

type PageParam = { cursor: string; cursorPublishedAt?: string } | undefined;

export function useProductsInfinite(
  params: GetProductsParams,
  initialPage?: ApiCursorEnvelope<Product>,
) {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: async ({ pageParam }) => {
      const res = await getProducts({ ...params, ...pageParam });
      return res.data;
    },
    initialPageParam: undefined as PageParam,
    getNextPageParam: (last): PageParam => {
      // página vazia ou sem cursor = acabou
      if (last.items.length === 0 || !last.nextCursor) return undefined;

      return {
        cursor: last.nextCursor,
        cursorPublishedAt: last.nextCursorPublishedAt ?? undefined,
      };
    },
    initialData: initialPage
      ? { pages: [initialPage], pageParams: [undefined as PageParam] }
      : undefined,
    staleTime: 60_000, // sem isto, o initialData conta como velho e refaz o pedido no mount
  });
}
