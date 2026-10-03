import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/features/products/actions";
import { ProductDetails } from "../_components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const data = await getProductDetail(slug);
  if (!data?.product) return { title: "Produto não encontrado" };

  const product = data.product;
  const title = product.name;
  const description = product.description.length > 160 ? `${product.description.slice(0, 157)}...` : product.description;
  const imageUrl = product.banner || product.images?.[0];

  return {
    title,
    description,
    keywords: [product.name, product.category, ...(product.tags || []), "Qcena", "E-commerce"],
    openGraph: {
      title: `${title} | Qcena`,
      description,
      type: "website",
      locale: lang === "pt" ? "pt_AO" : "en_US",
      siteName: "Qcena",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: { card: "summary_large_image", title: `${title} | Qcena`, description, images: imageUrl ? [imageUrl] : [] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, lang } = await params;
  const data = await getProductDetail(slug);
  if (!data?.product) notFound();

  const { product, relatedProducts } = data;
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
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.reviews > 0 ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetails p={product} lang={lang} related={relatedProducts} />
    </>
  );
}
