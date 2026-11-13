import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getProductBySlug } from "../../queries";
import { ProductDetailsGallery } from "./product-details-gallery";
import { ProductInfo } from "./product-info";


interface ProductDetailsProps {
  slug: string;
  lang: string;
  dictionary: Dictionary;
}

const THUMB_SKELETON_KEYS = ["t-1", "t-2", "t-3", "t-4"];

const layoutClass =
  "mt-8 grid gap-8 px-0 md:px-4 lg:grid-cols-2 lg:gap-12 lg:px-8";

export const ProductDetails = (props: ProductDetailsProps) => {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent {...props} />
    </Suspense>
  );
};

const ProductDetailsContent = async ({
  slug,
  lang,
  dictionary,
}: ProductDetailsProps) => {
  const res = await getProductBySlug(slug);
  const p = res.data;

  if (!p) notFound();

  return (
    <div className={layoutClass}>
      {/* Galeria: fica fixa enquanto se lê a informação (desktop) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductDetailsGallery
          gallery={p.images}
          productName={p.name}
          labels={{
            noImage: dictionary.products.details.noImage,
            thumbnail: dictionary.products.details.thumbnail,
          }}
        />
      </div>

      <ProductInfo p={p} lang={lang} dictionary={dictionary.products.details} />
    </div>
  );
};

export const ProductDetailsSkeleton = () => {
  return (
    <div aria-hidden="true" className={layoutClass}>
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex gap-2.5">
          {THUMB_SKELETON_KEYS.map((key) => (
            <Skeleton key={key} className="size-20 shrink-0 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-9 w-4/5 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      </div>
    </div>
  );
};
