import { NextResponse } from "next/server";
import type { ApiEnvelope } from "@/features/core/api.types";
import { Category } from "@/features/categories/types";


const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Moda",
    slug: "moda",
    description: "Roupas, calçados e acessórios de tendência.",
    icon: "shirt",
    productCount: 198,
  },
  {
    id: "cat-2",
    name: "Beleza",
    slug: "beleza",
    description: "Cosméticos, perfumes e cuidados pessoais.",
    icon: "sparkles",
    productCount: 94,
  },
  {
    id: "cat-3",
    name: "Electrónicos",
    slug: "eletronicos",
    description: "Gadgets, periféricos de informática e áudio.",
    icon: "laptop",
    productCount: 405,
  },
  {
    id: "cat-4",
    name: "Acessórios",
    slug: "acessorios",
    description: "Relógios, joias e bijuterias.",
    icon: "watch",
    productCount: 207,
  },
];

export async function GET() {
  const response: ApiEnvelope<Category[]> = {
    success: true,
    data: mockCategories,
    ts: new Date().toISOString(),
  };

  return NextResponse.json(response);
}