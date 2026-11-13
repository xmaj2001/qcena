import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductSearch } from "@/features/products";
import { ProductDetails } from "@/features/products/components/details/products-details";
import { getProductBySlug, getProducts } from "@/features/products/queries";
import { i18n, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  constructMetadata,
  formatImageUrl,
} from "@/lib/seo";

type Props = {
  params: Promise<{ lang: Locale; slug: string }>;
};

/**
 * Pre-renderiza os principais produtos em cada idioma durante o build,
 * permitindo carregamento instantâneo e indexação imediata pelos crawlers.
 */
export async function generateStaticParams() {
  try {
    const { data } = await getProducts({ limit: "24" });
    const items = data?.items ?? [];
    return i18n.locales.flatMap((lang) =>
      items.map((product) => ({
        lang,
        slug: product.slug,
      })),
    );
  } catch {
    return [];
  }
}

/**
 * Gera metadata dinâmica (título, descrição, OpenGraph, Twitter, canonical e hreflang)
 * para a página de detalhes do produto.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const res = await getProductBySlug(slug);
  const product = res.data;

  if (!product) {
    return constructMetadata({
      title: dict.notFound.title,
      description: dict.notFound.description,
      siteName: dict.seo.siteName,
      lang,
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const validImages = product.images.filter((img) => !img.startsWith("data:"));

  return constructMetadata({
    title: product.name,
    description: product.description,
    siteName: dict.seo.siteName,
    lang,
    path: `/products/${slug}`,
    image: validImages[0],
    images: validImages,
    type: "article",
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const res = await getProductBySlug(slug);
  const product = res.data;

  if (!product) {
    notFound();
  }

  // Dados estruturados JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: dict.navbar.pages.home, path: "/" },
      { name: dict.navbar.pages.products, path: "/products" },
      { name: product.name, path: `/products/${product.slug}` },
    ],
    lang,
  );

  const productJsonLd = buildProductJsonLd({
    product,
    lang,
    siteName: dict.seo.siteName,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Dados Estruturados Schema.org (Product + BreadcrumbList) */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />

      <div className="mx-auto max-w-7xl p-4 md:p-8 relative">
        <Navbar
          dictionary={dict.navbar}
          lang={lang}
          search={<ProductSearch dictionary={dict.navbar} lang={lang} />}
          siteName={dict.seo.siteName}
        />

        {/* Navegação Semântica Breadcrumb */}
        <div className="pt-4 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/${lang}`} />}>
                  {dict.navbar.pages.home}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/${lang}/products`} />}>
                  {dict.navbar.pages.products}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-none">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ProductDetails slug={slug} lang={lang} dictionary={dict} />

        <Footer dictionary={dict.footer} lang={lang} />
      </div>
    </div>
  );
}
