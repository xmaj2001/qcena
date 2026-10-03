import { getProductsSection } from "../actions";
import { ProductSectionCarousel } from "./ProductSectionCarousel";

interface ProductSectionContentProps {
  kind: "recommended" | "new" | "coming-soon";
  emptyLabel?: string;
}

export async function ProductSectionContent({ kind, emptyLabel }: ProductSectionContentProps) {
  const products = await getProductsSection(kind);

  if (products.length === 0) {
    return <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">{emptyLabel ?? "Nenhum produto disponível."}</div>;
  }

  return <ProductSectionCarousel products={products} />;
}
