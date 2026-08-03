import { NextRequest, NextResponse } from "next/server";
import { STATIC_MACBOOK_PRO, generateMockProducts } from "@/features/products/products.mock";
import type { ApiEnvelope, ApiCursorEnvelope } from "@/features/core/api.types";
import type { Product } from "@/features/products/types";

// Base de dados mockada com IDs sequenciais para garantir ordenação estável
const MOCK_DATABASE: Product[] = [
    STATIC_MACBOOK_PRO,
    ...generateMockProducts(49),
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const category = searchParams.get("category")?.toLowerCase().trim() || "";
    const cursor = searchParams.get("cursor");
    const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
    const sortBy = searchParams.get("sortBy") || "latest";

    // 1. Filtragem por busca e categoria
    let filtered = MOCK_DATABASE.filter((product) => {
        const matchesSearch =
            !search ||
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search);

        const matchesCategory =
            !category || product.category.toLowerCase() === category;

        return matchesSearch && matchesCategory;
    });

    // 2. Ordenação
    filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            case "latest":
            default:
                return 0;
        }
    });

    // 3. Aplicação do Cursor
    let startIndex = 0;
    if (cursor) {
        const foundIndex = filtered.findIndex((item) => item.id === cursor);
        if (foundIndex !== -1) {
            startIndex = foundIndex + 1; // Pega os itens AÇÕES do cursor
        }
    }

    // Slice dos itens para a página atual
    const items = filtered.slice(startIndex, startIndex + limit);

    // Define o próximo cursor (ID do último item da lista atual, se houver mais itens)
    const lastItem = items[items.length - 1];
    const hasMore = startIndex + items.length < filtered.length;
    const nextCursor = hasMore && lastItem ? lastItem.id : "";

    // Envelope padrão do seu BFF para Cursor
    const response: ApiEnvelope<ApiCursorEnvelope<Product>> = {
        success: true,
        data: {
            items,
            nextCursor,
        },
        ts: new Date().toISOString(),
    };

    return NextResponse.json(response);
}