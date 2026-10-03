import type { ApiCursorEnvelope } from "@/features/core/api.types";
import type { GetProductsQueryParams, Product } from "./types";

export async function fetchProducts(params: GetProductsQueryParams = {}): Promise<ApiCursorEnvelope<Product>> {
  const search = new URLSearchParams();
  if (params.search) search.set("search", params.search);
  if (params.category) search.set("category", params.category);
  if (params.cursor) search.set("cursor", params.cursor);
  if (params.limit) search.set("limit", String(params.limit));
  if (params.sortBy) search.set("sortBy", params.sortBy);

  const response = await fetch(`/api/products?${search.toString()}`);
  if (!response.ok) throw new Error("Não foi possível obter os produtos.");
  const body = await response.json() as { success: boolean; data?: ApiCursorEnvelope<Product> };
  if (!body.success || !body.data) throw new Error("Não foi possível obter os produtos.");
  return body.data;
}
