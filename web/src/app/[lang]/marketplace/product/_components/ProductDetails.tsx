"use client";

import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductRelated } from "./ProductRelated";

export function ProductDetails({ p, related = [] }: { p: any; related?: any[] }) {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6 space-y-12 mt-24">
      <section className="md:grid gap-8 lg:grid-cols-[1.1fr_1fr] w-full">
        <ProductGallery p={p} />
        <ProductInfo p={p} />
      </section>

      <ProductRelated related={related} category={p?.category} />
    </main>
  );
}
