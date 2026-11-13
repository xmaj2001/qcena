import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageTitle } from "@/components/page-title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductList, ProductSearch } from "@/features/products";
import { getProducts } from "@/features/products/queries";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  buildBreadcrumbJsonLd,
  buildProductListJsonLd,
  constructMetadata,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    storeId?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  const resolvedSearchParams = await searchParams;
  const isFiltered = Boolean(
    resolvedSearchParams.q ||
      resolvedSearchParams.categoryId ||
      resolvedSearchParams.storeId,
  );

  const title = resolvedSearchParams.q
    ? `${dict.search.showingResults} "${resolvedSearchParams.q}" - ${dict.productsPage.title}`
    : dict.productsPage.title;

  return constructMetadata({
    title,
    description: dict.productsPage.description,
    siteName: dict.seo.siteName,
    lang: lang as Locale,
    path: "/products",
    // Evita indexar URLs com parâmetros de busca para não canibalizar nem inflar o índice
    noIndex: isFiltered,
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const resolvedSearchParams = await searchParams;

  // Carrega produtos iniciais para o schema estruturado (deduplicado com o cache do React)
  const { data: initialData } = await getProducts(resolvedSearchParams);
  const products = initialData?.items ?? [];

  // Dados estruturados JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: dict.navbar.pages.home, path: "/" },
      { name: dict.navbar.pages.products, path: "/products" },
    ],
    lang as Locale,
  );

  const listJsonLd = buildProductListJsonLd({
    title: dict.productsPage.title,
    description: dict.productsPage.description,
    products,
    lang: lang as Locale,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Dados Estruturados (JSON-LD) para Crawlers */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={listJsonLd} />

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
                <BreadcrumbPage>{dict.navbar.pages.products}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Título Principal Semântico (h1) */}
        <PageTitle
          as="h1"
          title={dict.products.title}
          subtitle={dict.products.description}
        />

        {/* Feedback visual de pesquisa */}
        {resolvedSearchParams.q && (
          <p className="mb-4 text-sm text-muted-foreground">
            {dict.search.showingResults} &ldquo;{resolvedSearchParams.q}&rdquo;
          </p>
        )}

        {/* Listagem com Infinite Scroll */}
        <ProductList params={resolvedSearchParams} />

        <Footer dictionary={dict.footer} lang={lang} />
      </div>
    </div>
  );
}
