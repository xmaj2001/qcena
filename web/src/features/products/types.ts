export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  banner: string;
  video: string;
  images: string[];
  price: number;
  oldPrice: number;
  stock: number;
  badge: string;
  category: string;
  rating: number;
  reviews: number;
  tags: string[];
  description: string;
  specs: ProductSpec[];
}

export interface ProductsHomeResponse {
  recommended: Product[];
  newProducts: Product[];
  comingSoon: Product[];
}

export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
}

export type ProductSectionKind = "recommended" | "new" | "coming-soon";

export interface GetProductsQueryParams {
  search?: string;
  category?: string;
  cursor?: string;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "latest";
}
