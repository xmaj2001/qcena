import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getFeaturedProducts } from "../../queries";
import { FeaturedCarousel } from "./featured-carousel";

export const FeaturedProducts = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary["products"];
  lang: string;
}) => {
  return (
    <section className="w-full">
      <Suspense fallback={<SkeletonFeaturedCarousel />}>
        <FeaturedProductsContent dictionary={dictionary} lang={lang} />
      </Suspense>
    </section>
  );
};

const FeaturedProductsContent = async ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary["products"];
  lang: string;
}) => {
  const response = await getFeaturedProducts();
  const data = response.data;

  if (!data || data.length === 0) return null;

  return <FeaturedCarousel dictionary={dictionary} items={data} lang={lang} />;
};

const SkeletonFeaturedCarousel = () => {
  return (
    <Skeleton className="my-6 h-[920px] w-full rounded-2xl md:h-[560px]" />
  );
};
