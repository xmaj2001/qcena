import { NextResponse } from "next/server";
import { generateMockProducts, generateMockProduct } from "@/features/products/products.mock";
import type { ApiEnvelope } from "@/features/core/api.types";
import type { ProductsHomeResponse } from "@/features/products/types";

export async function GET() {
  // Exemplo de produto estático (como o teu mockProduct) injetado junto com dinâmicos
  const staticMacbook = generateMockProduct({
    id: "prod-101",
    name: "MacBook Pro M3 Max 36GB RAM 1TB SSD",
    price: 2500000,
    oldPrice: 2800000,
    badge: "Destaque",
    category: "Electrónicos",
    specs: [
      { label: "Processador", value: "M3 Max" },
      { label: "RAM", value: "36GB" },
      { label: "Armazenamento", value: "1TB SSD" },
      { label: "Ecrã", value: '16.2" Liquid Retina XDR' },
      { label: "Bateria", value: "Até 22 horas" },
      { label: "Sistema", value: "macOS Sonoma" },
    ],
  });

  const data: ProductsHomeResponse = {
    recommended: [staticMacbook, ...generateMockProducts(5)],
    bestDeals: generateMockProducts(6),
  };

  const response: ApiEnvelope<ProductsHomeResponse> = {
    success: true,
    data,
    ts: new Date().toISOString(),
  };

  return NextResponse.json(response);
}