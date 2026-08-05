import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { CategoryList } from "@/components/landing/CategoryList";
import { PromoBanners } from "@/components/landing/PromoBanners";
import { ProductGrid } from "@/components/products/ProductGrid";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { getDictionary, Locale } from "./dictionaries";
import { productService } from "@/features/products";
import { Navbar } from "@/components/navbar";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const data = await productService.getHomeProducts();

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      <main className="max-w-7xl mx-auto mt-20 mb-20 md:mb-0">
        <Hero />
        {/* 1. Category icons row */}
        <CategoryList dict={dict} lang={lang} />
        {/* 3. Best Deals + Recommended grids */}
        <ProductGrid bestDeals={data.bestDeals} recommended={data.recommended} lang={lang} />
      </main>
      <Footer dict={dict} />
      <WhatsAppButton />
    </div>
  );
}

