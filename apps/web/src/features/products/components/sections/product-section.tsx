import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "../../types";
import { ProductCarousel, SkeletonProductCarousel } from "../product-carousel";

export interface ProductSectionCopy {
  title: string;
  description: string;
  viewMore: string;
}

interface ProductSectionProps {
  id: string;
  lang: string;
  copy: ProductSectionCopy;
  href: string;
  fetcher: () => Promise<{ data: Product[] }>;
  labels: Dictionary["products"]["item"];
}

export const ProductSection = ({
  id,
  lang,
  copy,
  href,
  fetcher,
  labels,
}: ProductSectionProps) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24"
    >
      {/* Cabeçalho com Título e Botão "Ver mais" */}
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={`${id}-title`}
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {copy.viewMore}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Suspense fallback={<SkeletonProductCarousel />}>
        <ProductSectionCarousel fetcher={fetcher} lang={lang} labels={labels} />
      </Suspense>
    </section>
  );
};

const ProductSectionCarousel = async ({
  fetcher,
  lang,
  labels,
}: Pick<ProductSectionProps, "fetcher" | "lang" | "labels">) => {
  const { data } = await fetcher();

  return <ProductCarousel items={data} lang={lang} labels={labels} />;
};
