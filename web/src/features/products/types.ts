export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
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
  bestDeals: Product[];
}

// Resposta para os detalhes do produto
export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
}

export interface GetProductsQueryParams {
  search?: string;
  category?: string;
  cursor?: string;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "latest";
}