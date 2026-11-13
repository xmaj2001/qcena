"use server";

import { z } from "zod";
import { getProducts, searchProducts } from "./queries";
import { env } from "process";
import { GetProductsParams, ProductsPageResponse } from "./types";
import { getMockPaginatedProducts } from "./mocks/products.mock";
import { apiFetch } from "@/lib/api/api-fetch";

const productSearchQuerySchema = z.string().trim().min(2).max(100);

export async function searchProductsAction(query: string) {
  const parsedQuery = productSearchQuerySchema.safeParse(query);
  if (!parsedQuery.success) return null;

  try {
    return await searchProducts(parsedQuery.data, 6);
  } catch {
    return null;
  }
}

// ─── Listagem paginada por cursor ─────────────────────────────────────────────

export async function getCursoredProducts(
  params: GetProductsParams = {},
): Promise<ProductsPageResponse> {
  const res = await getProducts(params);
  return res;
}
