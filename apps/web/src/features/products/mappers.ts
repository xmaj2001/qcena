import type { Product, FeaturedProduct, APIProductDetails } from "./types";

export function mapPrismaProduct(p: {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.images[0] ?? "",
  };
}

export function mapFeaturedProduct(feat: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  textColor: string;
  aspectRatio: number | null;
  bannerDesktop: string;
  bannerMobile: string;
  product: {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: string;
    rating: number;
    reviewsCount: number;
    stock: number;
    images: string[];
    categoryId: string;
    specs: { label: string; value: string }[];
  };
}): FeaturedProduct {
  const prod = feat.product;

  const apiDetails: APIProductDetails = {
    id: prod.id,
    slug: prod.slug,
    name: prod.name,
    description: prod.description,
    price: prod.price,
    rating: prod.rating,
    reviews: prod.reviewsCount,
    stock: prod.stock,
    images: prod.images,
    category: prod.categoryId,
    specs: prod.specs.map((s) => ({ label: s.label, value: s.value })),
  };

  return {
    id: feat.id,
    title: feat.title,
    subtitle: feat.subtitle,
    description: feat.description,
    banner: {
      desktop: feat.bannerDesktop,
      mobile: feat.bannerMobile,
    },
    textColor: feat.textColor as "dark" | "light",
    aspectRatio: feat.aspectRatio ?? undefined,
    product: apiDetails,
  };
}
