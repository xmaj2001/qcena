import { Suspense } from "react";
import { ProductsContent } from "@/features/products/components/ProductsContent";
import { ProductsSkeleton } from "@/features/products/components/ProductsSkeleton";
import type { GetProductsQueryParams } from "@/features/products/types";
import { FilterSidebar } from "./_components/FilterSidebar";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sortBy?: string;
  }>;
}

function getSort(value?: string): GetProductsQueryParams["sortBy"] {
  if (value === "price_asc" || value === "price_desc" || value === "rating" || value === "latest") {
    return value;
  }
  return undefined;
}

function getPageTitle(category?: string, search?: string) {
  if (search) return `Resultados para "${search}"`;
  if (category) {
    return `Produtos de ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
  return "Todos os produtos";
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortBy = getSort(params.sortBy);

  return (
    <div className="px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          Marketplace
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {getPageTitle(params.category, params.search)}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Explore todos os produtos disponíveis na Qcena e encontre o que procura.
        </p>
      </header>

      <div className="flex items-start gap-6">
        <FilterSidebar />

        <section className="min-w-0 flex-1">
          <Suspense
            key={JSON.stringify({ category: params.category, search: params.search, sortBy })}
            fallback={<ProductsSkeleton />}
          >
            <ProductsContent
              category={params.category}
              search={params.search}
              sortBy={sortBy}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
