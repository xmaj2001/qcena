"use client";

import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductRelated } from "./ProductRelated";

interface ProductDetailsProps {
  p: any;
  related?: any[];
  lang: string;
}

export function ProductDetails({ p, related = [], lang }: ProductDetailsProps) {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6 space-y-12 mt-20 mb-24 md:mb-0">
      <section className="md:grid gap-8 lg:grid-cols-[1.1fr_1fr] w-full">
        <ProductGallery p={p} />
        <ProductInfo p={p} lang={lang} />
      </section>

      <ProductRelated related={related} category={p?.category} />
    </main>
  );
}
