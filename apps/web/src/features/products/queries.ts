import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

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
import { mapFeaturedProduct, mapPrismaProduct } from "./mappers";

// ─── Produtos novos ───────────────────────────────────────────────────────────

export const getNewProducts = cache(
  unstable_cache(
    async (): Promise<NewProductsResponse> => {
      if (env.USE_MOCKS) {
        return getMockNewProducts();
      }

      const products = await prisma.product.findMany({
        take: 16,
        orderBy: { createdAt: "desc" },
      });

      return {
        success: true,
        data: products.map(mapPrismaProduct),
        ts: new Date().toISOString(),
      };
    },
    ["new-products"],
    { revalidate: 3600, tags: ["products"] },
  ),
);

// ─── Produtos recomendados ────────────────────────────────────────────────────

export const getRecommendedProducts = cache(
  unstable_cache(
    async (): Promise<NewProductsResponse> => {
      if (env.USE_MOCKS) {
        return getMockNewProducts();
      }

      const products = await prisma.product.findMany({
        take: 16,
        orderBy: { rating: "desc" },
      });

      return {
        success: true,
        data: products.map(mapPrismaProduct),
        ts: new Date().toISOString(),
      };
    },
    ["recommended-products"],
    { revalidate: 3600, tags: ["products"] },
  ),
);

// ─── Listagem paginada por cursor ─────────────────────────────────────────────

export const getProducts = cache(
  async (params: GetProductsParams = {}): Promise<ProductsPageResponse> => {
    if (env.USE_MOCKS) {
      return getMockPaginatedProducts(params);
    }

    const limit = params.limit ? Math.max(1, Number(params.limit)) : 8;
    const cursorId = params.cursor;
    const categoryId = params.categoryId;
    const searchQuery = params.q?.trim();

    const whereClause: any = {};
    if (categoryId) whereClause.categoryId = categoryId;
    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      take: limit + 1,
      ...(cursorId && {
        skip: 1,
        cursor: { id: cursorId },
      }),
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    let nextCursor: string | null = null;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id ?? null;
    }

    return {
      success: true,
      data: {
        items: products.map(mapPrismaProduct),
        nextCursor,
        nextCursorPublishedAt: null,
      },
      ts: new Date().toISOString(),
    };
  },
);

// ─── Produtos em destaque ─────────────────────────────────────────────────────

export const getFeaturedProducts = cache(
  unstable_cache(
    async (): Promise<FeaturedProductsResponse> => {
      if (env.USE_MOCKS) {
        return getMockFeaturedProducts();
      }

      const featuredRecords = await prisma.featuredProduct.findMany({
        take: 4,
        include: {
          product: {
            include: {
              specs: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        success: true,
        data: featuredRecords.map(mapFeaturedProduct),
        ts: new Date().toISOString(),
      };
    },
    ["featured-products"],
    { revalidate: 3600, tags: ["products", "featured"] },
  ),
);

// ─── Pesquisa ─────────────────────────────────────────────────────────────────

export const searchProducts = cache(
  async (query: string, limit?: number): Promise<ProductSearchResponse> => {
    if (env.USE_MOCKS) {
      return getMockSearchProducts(query, limit ?? 8);
    }

    if (!query || query.trim() === "") {
      return { success: true, data: [], ts: new Date().toISOString() };
    }

    const products = await prisma.product.findMany({
      take: limit ?? 8,
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: products.map(mapPrismaProduct),
      ts: new Date().toISOString(),
    };
  },
);

// ─── Detalhe por slug ─────────────────────────────────────────────────────────

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetailsResponse> => {
    if (env.USE_MOCKS) {
      return getMockProductBySlug(slug);
    }

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        specs: true,
      },
    });

    if (!product) {
      throw new Error(`Produto com slug "${slug}" não foi encontrado.`);
    }

    const productDetails = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      reviews: product.reviewsCount,
      stock: product.stock,
      images: product.images,
      category: product.category?.name ?? "",
      specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
    };

    return {
      success: true,
      data: productDetails,
      ts: new Date().toISOString(),
    };
  },
);
