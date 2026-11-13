import type { ApiCursorEnvelope, ApiEnvelope } from "@/lib/api/types";
import type { ProductFilters, ProductsPageParams } from "./schemas";

export type { ProductFilters, ProductsPageParams };

// ─── Modelos de domínio ───────────────────────────────────────────────────────

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

/** Banner responsivo do produto em destaque (URLs das imagens). */
export type ProductBanner = {
  desktop: string; // ~2000x940
  mobile: string; // ~800x2000
};

export type FeaturedProductSpec = {
  key: string;
  value: string;
};

export type FeaturedProductVariant = {
  id: string;
  label: string;
  image?: string;
  color?: string;
  backgroundColor?: string;
};

export type FeaturedProduct = {
  id: string; // chave única para mapeamento
  title: string;
  subtitle: string;
  description: string;
  banner: ProductBanner;
  textColor: "dark" | "light";
  variants?: FeaturedProductVariant[];
  aspectRatio?: number;
  specifications: FeaturedProductSpec[];
  product: Product;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type APIProductDetails = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  category: string;
  specs: ProductSpec[];
};

// ─── Params dos endpoints ─────────────────────────────────────────────────────

export interface GetProductsParams {
  cursor?: string;
  cursorPublishedAt?: string;
  limit?: string;
  categoryId?: string;
  q?: string;
}

// ─── Aliases de resposta (response shapes prontas a usar nos componentes) ─────

/** GET /v1/products/new */
export type NewProductsResponse = ApiEnvelope<Product[]>;

/** GET /v1/products?... (paginação por cursor) */
export type ProductsPageResponse = ApiEnvelope<ApiCursorEnvelope<Product>>;

/** GET /v1/products/featured */
export type FeaturedProductsResponse = ApiEnvelope<FeaturedProduct[]>;

/** GET /v1/products/search?q=... */
export type ProductSearchResponse = ApiEnvelope<Product[]>;

/** GET /v1/products/:slug */
export type ProductDetailsResponse = ApiEnvelope<APIProductDetails>;
