import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/Navbar";
import { CategoryList } from "@/components/landing/CategoryList";
import { PromoBanners } from "@/components/landing/PromoBanners";
import { ProductGrid } from "@/components/products/ProductGrid";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { getDictionary, Locale } from "./dictionaries";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      <main>
        <Hero />
        {/* 1. Category icons row */}
        <CategoryList dict={dict} lang={lang} />
        {/* 3. Best Deals + Recommended grids */}
        <ProductGrid lang={lang} />
      </main>
      <Footer dict={dict} />
      <WhatsAppButton />
    </div>
  );
}

