import { apiFetch } from "@/features/core/api-fetch";
import { apiFetchServer } from "@/features/core/api-fetch.server";
import type { ApiEnvelope, ApiCursorEnvelope } from "@/features/core/api.types";
import type {
  GetProductsQueryParams,
  Product,
  ProductDetailResponse,
  ProductsHomeResponse,
} from "./types";

function buildQueryString(params?: GetProductsQueryParams): string {
  if (!params) return "";
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.category) query.append("category", params.category);
  if (params.cursor) query.append("cursor", params.cursor);
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.sortBy) query.append("sortBy", params.sortBy);

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export const productService = {
  // Listagem Principal (Scroll Infinito com Cursor)
  async getProductsServer(
    params?: GetProductsQueryParams,
  ): Promise<ApiCursorEnvelope<Product>> {
    const query = buildQueryString(params);
    const res = await apiFetchServer<ApiEnvelope<ApiCursorEnvelope<Product>>>(
      `products${query}`,
    );
    return res.data;
  },

  async getProducts(
    params?: GetProductsQueryParams,
  ): Promise<ApiCursorEnvelope<Product>> {
    const query = buildQueryString(params);
    const res = await apiFetch<ApiEnvelope<ApiCursorEnvelope<Product>>>(
      `products${query}`,
    );
    return res.data;
  },

  // Home e Detalhes mantêm-se iguais
  async getHomeProductsServer(): Promise<ProductsHomeResponse> {
    const res = await apiFetchServer<ApiEnvelope<ProductsHomeResponse>>("products/home");
    return res.data;
  },

  async getHomeProducts(): Promise<ProductsHomeResponse> {
    const res = await apiFetch<ApiEnvelope<ProductsHomeResponse>>("products/home");
    return res.data;
  },

  async getProductBySlugServer(slug: string): Promise<ProductDetailResponse> {
    const res = await apiFetchServer<ApiEnvelope<ProductDetailResponse>>(`products/${slug}`);
    return res.data;
  },

  async getProductBySlug(slug: string): Promise<ProductDetailResponse> {
    const res = await apiFetch<ApiEnvelope<ProductDetailResponse>>(`products/${slug}`);
    return res.data;
  },
};