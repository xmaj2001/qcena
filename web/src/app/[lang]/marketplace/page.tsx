import { GetProductsQueryParams, productService } from "@/features/products";
import { MarketplaceClient } from "./_components/MarketplaceClient";

export const metadata = {
  title: "Marketplace de produtos — Qcena.",
  description: "Encontre e compre os melhores produtos verificados.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sortBy?: GetProductsQueryParams["sortBy"];
  }>;
}
export default async function MarketplacePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  // Busca inicial no servidor com os filtros de URL
  const initialData = await productService.getProducts({
    category: resolvedParams.category,
    search: resolvedParams.search,
    sortBy: resolvedParams.sortBy as any,
    limit: 9,
  });

  return (
    <div className="relative min-h-screen px-4 pb-24 mt-24">
      {/* Título contextual */}
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-black tracking-tight">
          {resolvedParams.category
            ? `Produtos de ${resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)}`
            : "Explorar Produtos"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {resolvedParams.search
            ? `Mostrando resultados para "${resolvedParams.search}"`
            : "Produtos selecionados com garantia de qualidade."}
        </p>
      </div>

      <MarketplaceClient
        searchParams={resolvedParams}
        initialData={initialData}
      />
    </div>
  );
}