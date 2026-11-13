import { CategoryGrid } from "@/components/category-grid";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTitle } from "@/components/page-title";
import {
  FeaturedProducts,
  ProductSearch,
  SectionNewProducts,
  SectionRecommendedProducts,
} from "@/features/products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    siteName: dict.seo.siteName,
    lang: lang as Locale,
    image: "/featured/hero.jpg",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-4 md:p-8 relative">
        <Navbar
          dictionary={dict.navbar}
          lang={lang}
          search={<ProductSearch dictionary={dict.navbar} lang={lang} />}
          siteName={dict.seo.siteName}
        />
        <FeaturedProducts dictionary={dict.products} lang={lang} />
        <PageTitle
          eyebrow={dict.home.eyebrow}
          title={dict.home.title}
          subtitle={dict.home.description}
        />
        <CategoryGrid dictionary={dict.home.categories} />
        {/* Sessão de Novos Produtos */}
        <SectionNewProducts dictionary={dict} lang={lang} />
        {/* Sessão de Produtos Recomendados */}
        <SectionRecommendedProducts dictionary={dict} lang={lang} />
        <Footer dictionary={dict.footer} lang={lang} />
      </div>
    </div>
  );
}
