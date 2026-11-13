import { cache } from "react";
import { env } from "@/env";
import { apiFetch } from "@/lib/api/api-fetch";
import {
  getMockFeaturedProducts,
  getMockNewProducts,
  getMockPaginatedProducts,
  getMockProductBySlug,
  getMockSearchProducts,
} from "./mocks/products.mock";
import type {
  FeaturedProductsResponse,
  GetProductsParams,
  NewProductsResponse,
  ProductDetailsResponse,
  ProductSearchResponse,
  ProductsPageResponse,
} from "./types";

// ─── Produtos novos ───────────────────────────────────────────────────────────

export const getNewProducts = cache(async (): Promise<NewProductsResponse> => {
  if (env.USE_MOCKS) {
    return getMockNewProducts();
  }
  return apiFetch("/products/new");
});

// ─── Produtos recomendados ────────────────────────────────────────────────────

export const getRecommendedProducts = cache(
  async (): Promise<NewProductsResponse> => {
    if (env.USE_MOCKS) {
      return getMockNewProducts();
    }
    return apiFetch("/products/recommended");
  },
);

// ─── Listagem paginada por cursor ─────────────────────────────────────────────

export const getProducts = cache(
  async (params: GetProductsParams = {}): Promise<ProductsPageResponse> => {
    if (env.USE_MOCKS) {
      return getMockPaginatedProducts(params);
    }

    const qs = new URLSearchParams();
    if (params.cursor) qs.set("cursor", params.cursor);
    if (params.cursorPublishedAt)
      qs.set("cursorPublishedAt", params.cursorPublishedAt);
    if (params.limit) qs.set("limit", params.limit);
    if (params.categoryId) qs.set("categoryId", params.categoryId);
    if (params.q) qs.set("q", params.q);
    const query = qs.toString();
    return apiFetch(`/products${query ? `?${query}` : ""}`);
  },
);

// ─── Produtos em destaque ─────────────────────────────────────────────────────

export const getFeaturedProducts = cache(
  async (): Promise<FeaturedProductsResponse> => {
    if (env.USE_MOCKS) {
      return getMockFeaturedProducts();
    }
    return apiFetch("/products/featured");
  },
);

// ─── Pesquisa ─────────────────────────────────────────────────────────────────

export const searchProducts = cache(
  async (query: string, limit?: number): Promise<ProductSearchResponse> => {
    if (env.USE_MOCKS) {
      return getMockSearchProducts(query, limit);
    }

    const qs = new URLSearchParams({ q: query });
    if (limit) qs.set("limit", String(limit));
    return apiFetch(`/products/search?${qs.toString()}`);
  },
);

// ─── Detalhe por slug ─────────────────────────────────────────────────────────

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetailsResponse> => {
    if (env.USE_MOCKS) {
      return getMockProductBySlug(slug);
    }
    return apiFetch(`/products/${slug}`);
  },
);
