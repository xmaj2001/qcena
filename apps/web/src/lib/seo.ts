import type { Metadata } from "next";
import { env } from "@/env";
import { i18n, type Locale } from "@/i18n/config";
import type { APIProductDetails, Product } from "@/features/products/types";

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  siteName: string;
  lang: Locale;
  path?: string;
  image?: string;
  images?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Valida e formata URLs de imagens para Open Graph e Twitter.
 * Ignora data URIs (placeholders em SVG/mock) que não são URLs válidas para crawlers.
 */
export function formatImageUrl(
  img: string | undefined,
  baseUrl: string,
): string | undefined {
  if (!img || img.startsWith("data:")) return undefined;
  try {
    return new URL(img, baseUrl).toString();
  } catch {
    return undefined;
  }
}

export function constructMetadata({
  title,
  description,
  siteName,
  lang,
  path = "",
  image,
  images,
  noIndex = false,
  type = "website",
}: ConstructMetadataProps): Metadata {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;

  const languagesRecord: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languagesRecord[locale] =
      `${baseUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  }

  const finalTitle = title ? `${title} | ${siteName}` : siteName;

  // Processar imagens para Open Graph e Twitter
  const candidateImages = images && images.length > 0 ? images : image ? [image] : [];
  const ogImages = candidateImages
    .map((img) => formatImageUrl(img, baseUrl))
    .filter((url): url is string => Boolean(url))
    .map((url) => ({ url, width: 1200, height: 630, alt: title || siteName }));

  const twitterImages = ogImages.map((img) => img.url);

  const alternateLocales = i18n.locales
    .filter((locale) => locale !== lang)
    .map((locale) => (locale === "pt" ? "pt_AO" : "en_AO"));

  return {
    title: finalTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: languagesRecord,
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName,
      locale: lang === "pt" ? "pt_AO" : "en_AO",
      alternateLocale: alternateLocales,
      type,
      ...(ogImages.length > 0 ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      ...(twitterImages.length > 0 ? { images: twitterImages } : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

// ─── Helpers para Dados Estruturados (JSON-LD) ────────────────────────────────

export interface BreadcrumbItemData {
  name: string;
  path: string;
}

/**
 * Constrói o schema BreadcrumbList (JSON-LD)
 */
export function buildBreadcrumbJsonLd(
  items: BreadcrumbItemData[],
  lang: Locale,
) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const normalized = item.path.startsWith("/") ? item.path : `/${item.path}`;
      const itemUrl =
        normalized === "/"
          ? `${baseUrl}/${lang}`
          : `${baseUrl}/${lang}${normalized}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Constrói o schema Product com Offer e AggregateRating (JSON-LD)
 */
export function buildProductJsonLd({
  product,
  lang,
  siteName,
}: {
  product: APIProductDetails;
  lang: Locale;
  siteName: string;
}) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const productUrl = `${baseUrl}/${lang}/products/${product.slug}`;

  // Extrair valor numérico do preço (ex.: "240 Kz" -> 240)
  const numericPrice =
    Number.parseFloat(
      product.price.replace(/[^0-9.,]/g, "").replace(",", "."),
    ) || 0;

  const validImages = product.images
    .map((img) => formatImageUrl(img, baseUrl))
    .filter((url): url is string => Boolean(url));

  const hasReviews = product.reviews > 0;
  const inStock = product.stock > 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: validImages.length > 0 ? validImages : undefined,
    category: product.category,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "AOA",
      price: numericPrice,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteName,
      },
    },
    ...(hasReviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/**
 * Constrói o schema CollectionPage + ItemList para a listagem de produtos
 */
export function buildProductListJsonLd({
  title,
  description,
  products,
  lang,
}: {
  title: string;
  description: string;
  products: Product[];
  lang: Locale;
}) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const listUrl = `${baseUrl}/${lang}/products`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: listUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${baseUrl}/${lang}/products/${item.slug}`,
      })),
    },
  };
}
