import { getProductsPage } from "../actions";
import { ProductGrid } from "./ProductGrid";

interface ProductsContentProps {
  category?: string;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "rating" | "latest";
}

export async function ProductsContent({ category, search, sortBy }: ProductsContentProps) {
  const data = await getProductsPage({
    category,
    search,
    sortBy,
    limit: 100,
  });

  if (data.items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed px-6 py-16 text-center">
        <p className="font-semibold">Nenhum produto encontrado.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente remover alguns filtros ou fazer uma nova pesquisa.
        </p>
      </div>
    );
  }

  return <ProductGrid products={data.items} />;
}
