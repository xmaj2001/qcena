import { NextResponse } from "next/server";
import { mockProducts } from "@/features/products/mocks/products.mock";
import type { ProductDetailResponse } from "@/features/products/types";
import type { ApiEnvelope } from "@/features/core/api.types";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) {
    return NextResponse.json({ success: false, data: null, ts: new Date().toISOString() }, { status: 404 });
  }

  const data: ProductDetailResponse = {
    product,
    relatedProducts: mockProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4),
  };

  const response: ApiEnvelope<ProductDetailResponse> = { success: true, data, ts: new Date().toISOString() };
  return NextResponse.json(response);
}
