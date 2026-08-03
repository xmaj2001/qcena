import type { GetProductsQueryParams } from "./types";

export const productCacheKeys = {
  all: ["products"] as const,
  home: () => [...productCacheKeys.all, "home"] as const,
  list: (params?: GetProductsQueryParams) => [...productCacheKeys.all, "list", params ?? {}] as const,
  detail: (id: string) => [...productCacheKeys.all, "detail", id] as const,
};