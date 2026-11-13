import type { Dictionary } from "@/i18n/get-dictionary";
import {
//   getComingSoonProducts,
  getNewProducts,
  getRecommendedProducts,
} from "../../queries";
import { ProductSection } from "./product-section";

interface SectionProps {
  dictionary: Dictionary;
  lang: string;
}

export const SectionNewProducts = ({ dictionary, lang }: SectionProps) => (
  <ProductSection
    id="new"
    lang={lang}
    copy={dictionary.home.newProducts}
    href={`/${lang}/products?sort=new`}
    fetcher={getNewProducts}
    labels={dictionary.products.item}
  />
);

export const SectionRecommendedProducts = ({
  dictionary,
  lang,
}: SectionProps) => (
  <ProductSection
    id="recommended"
    lang={lang}
    copy={dictionary.home.recommendedProducts}
    href={`/${lang}/products?filter=recommended`}
    fetcher={getRecommendedProducts}
    labels={dictionary.products.item}
  />
);

// Assumi estes nomes: ajusta a query e a chave do dicionário aos teus.
// export const SectionComingSoonProducts = ({
//   dictionary,
//   lang,
// }: SectionProps) => (
//   <ProductSection
//     id="coming-soon"
//     lang={lang}
//     copy={dictionary.home.comingSoonProducts}
//     href={`/${lang}/products?filter=coming-soon`}
//     fetcher={getComingSoonProducts}
//     labels={dictionary.products.item}
//   />
// );
