"use client";

import { ProductCard } from "@/components/products/ProductCard";

export function ProductRelated({ related, category }: { related: any[]; category?: string }) {
  if (!related || related.length === 0) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold">Produtos relacionados</h2>
        {category && <p className="text-sm text-muted-foreground">Outros de {category}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((rp) => (
          <ProductCard key={rp.id} product={rp} />
        ))}
      </div>
    </section>
  );
}
