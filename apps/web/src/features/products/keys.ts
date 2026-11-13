import type { GetProductsParams } from "./types";

export const productKeys = {
  all: ["products"] as const,
  list: (params?: GetProductsParams) =>
    [...productKeys.all, "list", params] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
};
