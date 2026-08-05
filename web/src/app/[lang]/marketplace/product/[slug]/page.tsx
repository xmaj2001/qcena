import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/features/products";
import { ProductDetails } from "../_components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

// Domínio base da aplicação (configurar no .env.production)
const baseUrl = process.env.NEXT_PUBLIC_URL
  ? new URL(process.env.NEXT_PUBLIC_URL)
  : new URL("https://qcena.com");

// 1. GENERATE METADATA (Conforme especificação do Next.js App Router)
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

  const mainImage = product.banner || product.images[0] || "/og-image.jpg";

  return {
    // metadataBase garante resolução correta de URLs relativas/absolutas
    metadataBase: baseUrl,
    title: {
      default: title,
      template: `%s | Qcena`,
    },
    description,
    keywords: [
      product.name,
      product.category,
      ...(product.tags || []),
      "Qcena",
      "E-commerce",
    ],
    // Links Canónicos e Suporte Multi-idioma
    alternates: {
      canonical: `/${lang}/products/${slug}`,
      languages: {
        "pt-AO": `/pt/products/${slug}`,
        "en-US": `/en/products/${slug}`,
      },
    },
    // Open Graph (Facebook, WhatsApp, LinkedIn)
    openGraph: {
      title: `${title} | Qcena`,
      description,
      url: `/${lang}/products/${slug}`,
      siteName: "Qcena",
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: product.name,
          type: "image/jpeg",
        },
      ],
      locale: lang === "pt" ? "pt_AO" : "en_US",
      type: "website",
    },
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${title} | Qcena`,
      description,
      images: [mainImage],
    },
    // Meta tags de robôs (Garante indexação rápida do produto)
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

  // Schema.org Structured Data (JSON-LD para Google Rich Results)
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
      priceCurrency: "AOA", // Ajusta para a tua moeda padrão (ex: AOA, EUR, USD)
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${baseUrl.origin}/${lang}/products/${slug}`,
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
      {/* Script JSON-LD inserido de acordo com a recomendação da Vercel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DETALHES DO PRODUTO */}
      <ProductDetails p={product} related={relatedProducts} />
    </>
  );
}
