import { NextRequest, NextResponse } from "next/server";
import {
    STATIC_MACBOOK_PRO,
    generateMockProduct,
    generateMockProducts,
} from "@/features/products/products.mock";
import type { ApiEnvelope, ApiResponseError, ErrorResponse } from "@/features/core/api.types";
import type { Product, ProductDetailResponse } from "@/features/products/types";

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    // Lógica de busca simulada
    let product: Product;

    if (id === STATIC_MACBOOK_PRO.id) {
        product = STATIC_MACBOOK_PRO;
    } else if (id === "not-found") {
        // Exemplo de resposta 404 simulada
        const errorBody: ApiResponseError<ErrorResponse> = {
            success: false,
            data: {
                code: 404,
                message: `Produto com o ID '${id}' não foi encontrado.`,
                fields: [],
            },
            ts: new Date().toISOString(),
            path: `/api/products/${id}`,
        };
        return NextResponse.json(errorBody, { status: 404 });
    } else {
        // Gera um produto com o ID requisitado
        product = generateMockProduct({ id });
    }

    // Gera 4 produtos relacionados na mesma categoria do produto
    const relatedProducts = generateMockProducts(4).map((item) => ({
        ...item,
        category: product.category,
    }));

    const response: ApiEnvelope<ProductDetailResponse> = {
        success: true,
        data: {
            product,
            relatedProducts,
        },
        ts: new Date().toISOString(),
    };

    return NextResponse.json(response);
}