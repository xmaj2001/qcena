"use server";

import { mockHomeProducts } from "@/features/products/mocks/products.mock";
import type { Product } from "@/features/products/types";

export async function getHeroProducts(): Promise<Product[]> {
  return mockHomeProducts.recommended.slice(0, 4);
}
