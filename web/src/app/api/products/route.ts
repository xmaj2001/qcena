import { NextRequest, NextResponse } from "next/server";
import type { ApiCursorEnvelope, ApiEnvelope } from "@/features/core/api.types";
import { mockProducts } from "@/features/products/mocks/products.mock";
import type { Product } from "@/features/products/types";

const MOCK_DATABASE: Product[] = [...mockProducts];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const category = searchParams.get("category")?.toLowerCase().trim() || "";
  const cursor = searchParams.get("cursor");
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const sortBy = searchParams.get("sortBy") || "latest";

  let filtered = MOCK_DATABASE.filter((product) =>
    (!search || product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)) &&
    (!category || product.category.toLowerCase() === category)
  );

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const startIndex = cursor ? Math.max(0, filtered.findIndex((item) => item.id === cursor) + 1) : 0;
  const items = filtered.slice(startIndex, startIndex + limit);
  const lastItem = items[items.length - 1];
  const nextCursor = startIndex + items.length < filtered.length && lastItem ? lastItem.id : "";

  const response: ApiEnvelope<ApiCursorEnvelope<Product>> = {
    success: true,
    data: { items, nextCursor },
    ts: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
