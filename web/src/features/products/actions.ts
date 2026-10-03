"use server";

import { mockHomeProducts, mockProducts } from "./mocks/products.mock";
import type { GetProductsQueryParams, Product, ProductSectionKind, ProductsHomeResponse, ProductDetailResponse } from "./types";
import type { ApiCursorEnvelope } from "@/features/core/api.types";

export async function getHomeProducts(): Promise<ProductsHomeResponse> {
  return mockHomeProducts;
}

export async function getHeroProducts(): Promise<Product[]> {
  return mockHomeProducts.recommended.slice(0, 4);
}

export async function getProductsSection(kind: ProductSectionKind): Promise<Product[]> {
  if (kind === "recommended") return mockHomeProducts.recommended;
  if (kind === "new") return mockHomeProducts.newProducts;
  return mockHomeProducts.comingSoon;
}

export async function getProductsPage(params: GetProductsQueryParams = {}): Promise<ApiCursorEnvelope<Product>> {
  const search = params.search?.toLowerCase().trim() ?? "";
  const category = params.category?.toLowerCase().trim() ?? "";
  const limit = params.limit ?? 9;
  let filtered = mockProducts.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search);
    const matchesCategory = !category || product.category.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  if (params.sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (params.sortBy === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (params.sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const start = params.cursor ? Math.max(0, filtered.findIndex((item) => item.id === params.cursor) + 1) : 0;
  const items = filtered.slice(start, start + limit);
  const last = items[items.length - 1];
  return { items, nextCursor: start + items.length < filtered.length && last ? last.id : "" };
}

export async function getProductDetail(slug: string): Promise<ProductDetailResponse | null> {
  const product = mockProducts.find((item) => item.slug === slug);
  if (!product) return null;
  return { product, relatedProducts: mockProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4) };
}

export async function queryProducts(params: GetProductsQueryParams = {}) {
  const result = await getProductsPage(params);
  return result.items;
}
