import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/features/products";
import { ProductDetails } from "../_components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

// 1. GENERATE METADATA (Corrigido para Open Graph / WhatsApp)
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, lang } = await params;

  let data;
  try {
    data = await productService.getProductBySlug(slug);
  } catch {
    return {
      title: "Produto não encontrado",
    };
  }

  const product = data?.product;
  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  const title = product.name;
  const description =
    product.description.length > 160
      ? `${product.description.slice(0, 157)}...`
      : product.description;

  // Garante a URL da imagem (sem forçar o atributo type rígido)
  const imageUrl = product.banner || product.images?.[0];

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      ...(product.tags || []),
      "Qcena",
      "E-commerce",
    ],
    // Open Graph otimizado para WhatsApp, Facebook e LinkedIn
    openGraph: {
      title: `${title} | Qcena`,
      description,
      type: "website",
      locale: lang === "pt" ? "pt_AO" : "en_US",
      siteName: "Qcena",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${title} | Qcena`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    // Meta tags para robôs de busca
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// 2. PAGE COMPONENT (Com Structured Data JSON-LD)
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, lang } = await params;

  let data;
  try {
    data = await productService.getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!data?.product) {
    notFound();
  }

  const { product, relatedProducts } = data;

  // Schema.org Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.length > 0 ? product.images : [product.banner],
    description: product.description,
    sku: product.id,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "AOA",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.reviews > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews,
      },
    }),
  };

  return (
    <>
      {/* Script JSON-LD para SEO e Rich Snippets do Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* COMPONENTE DE DETALHES DO PRODUTO */}
      <ProductDetails p={product} lang={lang} related={relatedProducts} />
    </>
  );
}
