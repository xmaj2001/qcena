import { NextResponse } from "next/server";
import type { ApiEnvelope } from "@/features/core/api.types";
import { mockCategories } from "@/lib/categories";

export async function GET() {
  const response: ApiEnvelope<typeof mockCategories> = {
    success: true,
    data: mockCategories,
    ts: new Date().toISOString(),
  };
  return NextResponse.json(response);
}
