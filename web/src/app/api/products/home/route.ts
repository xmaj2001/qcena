import { NextResponse } from "next/server";
import type { ApiEnvelope } from "@/features/core/api.types";
import type { Product, ProductsHomeResponse } from "@/features/products/types";
import { mockProducts } from "@/lib/mockData";


export async function GET() {


  const data: ProductsHomeResponse = {
    recommended: [...mockProducts],
    bestDeals: [...mockProducts],
  };

  const response: ApiEnvelope<ProductsHomeResponse> = {
    success: true,
    data,
    ts: new Date().toISOString(),
  };

  return NextResponse.json(response);
}