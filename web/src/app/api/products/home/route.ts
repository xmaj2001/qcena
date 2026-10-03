import { NextResponse } from "next/server";
import type { ApiEnvelope } from "@/features/core/api.types";
import { mockHomeProducts } from "@/features/products/mocks/products.mock";
import type { ProductsHomeResponse } from "@/features/products/types";

export async function GET() {
  const data: ProductsHomeResponse = mockHomeProducts;
  const response: ApiEnvelope<ProductsHomeResponse> = { success: true, data, ts: new Date().toISOString() };
  return NextResponse.json(response);
}
