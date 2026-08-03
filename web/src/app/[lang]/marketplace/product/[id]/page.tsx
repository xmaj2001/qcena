import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/features/products";
import { ProductDetails } from "../_components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string; lang: string }>;
}

// 1. GERADOR DE METADADOS DINÂMICOS PARA SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id, lang } = await params;

  try {
    const data = await productService.getProductById(id);
    const product = data?.product;

    if (!product) {
      return {
        title: "Produto não encontrado | Qcena",
      };
    }

    const title = `${product.name} | Qcena`;
    const description =
      product.description.length > 160
        ? `${product.description.slice(0, 157)}...`
        : product.description;

    const mainImage = product.banner || product.images[0] || "/og-image.jpg";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qcena.com";
    const canonicalUrl = `${siteUrl}/${lang}/products/${id}`;

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category,
        ...(product.tags || []),
        "Qcena",
        "Marketplace",
        "Comprar online",
      ],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Qcena",
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        type: "article",
        locale: lang === "pt" ? "pt_AO" : lang,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [mainImage],
      },
      other: {
        "product:price:amount": product.price.toString(),
        "product:price:currency": "EUR", // Altera para a tua moeda padrão se necessário
      },
    };
  } catch (error) {
    return {
      title: "Produto | Qcena",
    };
  }
}

// 2. COMPONENTE DA PÁGINA COM DADOS ESTRUTURADOS (JSON-LD)
export default async function ProductPage({ params }: ProductPageProps) {
  const { id, lang } = await params;

  let data;
  try {
    data = await productService.getProductById(id);
  } catch (error) {
    notFound();
  }

  if (!data?.product) {
    notFound();
  }

  const { product, relatedProducts } = data;

  // Schema.org Product para Rich Snippets no Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://qcena.com"}/${lang}/products/${id}`,
    },
    aggregateRating:
      product.reviews > 0
        ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        }
        : undefined,
  };

  return (
    <div
      className="min-h-screen text-foreground relative bg-background"
      id="place"
    >
      {/* Script de Dados Estruturados para o Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DETALHES DO PRODUTO */}
      <ProductDetails p={product} related={relatedProducts} />
    </div>
  );
}