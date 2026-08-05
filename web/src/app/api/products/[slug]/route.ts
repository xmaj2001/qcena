import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";
import type {
  ApiEnvelope,
  ApiResponseError,
  ErrorResponse,
} from "@/features/core/api.types";
import type { Product, ProductDetailResponse } from "@/features/products/types";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
console.log("Slug:", slug);
  // Procura o produto por ID ou por Slug no mockData
  const product = mockProducts.find((item) => item.slug === slug);

  // Retorna erro 404 padronizado se não encontrar
  if (!product) {
    const errorBody: ApiResponseError<ErrorResponse> = {
      success: false,
      data: {
        code: 404,
        message: `Produto com o Slug '${slug}' não foi encontrado.`,
        fields: [],
      },
      ts: new Date().toISOString(),
      path: `/api/products/${slug}`,
    };
    return NextResponse.json(errorBody, { status: 404 });
  }

  // Filtra produtos relacionados pertencentes à mesma categoria (excluindo o próprio produto)
  let relatedProducts = mockProducts.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  // Se houver menos de 4 produtos na mesma categoria, completa com outros produtos do mock
  if (relatedProducts.length < 4) {
    const remainingProducts = mockProducts.filter(
      (item) => item.id !== product.id && !relatedProducts.includes(item),
    );
    relatedProducts = [...relatedProducts, ...remainingProducts].slice(0, 4);
  } else {
    relatedProducts = relatedProducts.slice(0, 4);
  }

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
