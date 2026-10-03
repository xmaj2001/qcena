import { Suspense } from "react";
import { ProductSectionContent } from "./ProductSectionContent";
import { ProductSectionSkeleton } from "./ProductSectionSkeleton";
import type { ProductSectionKind } from "../types";

interface ProductSectionProps {
  title: string;
  description?: string;
  kind: ProductSectionKind;
  emptyLabel?: string;
}

export function ProductSection({ title, description, kind, emptyLabel }: ProductSectionProps) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">Qcena</p>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
        </header>
        <Suspense fallback={<ProductSectionSkeleton />}>
          <ProductSectionContent kind={kind} emptyLabel={emptyLabel} />
        </Suspense>
      </div>
    </section>
  );
}
