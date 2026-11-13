import "server-only";

import { prisma } from "@/lib/prisma";

// All categories
export async function devGetAllCategories(): Promise<
  {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
  }[]
> {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// All products with category name
export async function devGetAllProducts(): Promise<
  {
    id: string;
    slug: string;
    name: string;
    price: string;
    stock: number;
    rating: number;
    createdAt: Date;
    category: { name: string };
  }[]
> {
  return prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      stock: true,
      rating: true,
      createdAt: true,
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// All featured products
export async function devGetAllFeatured(): Promise<
  {
    id: string;
    title: string;
    textColor: string;
    createdAt: Date;
    product: { name: string; slug: string };
  }[]
> {
  return prisma.featuredProduct.findMany({
    select: {
      id: true,
      title: true,
      textColor: true,
      createdAt: true,
      product: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// Single product by id (for edit form)
export async function devGetProductById(id: string): Promise<{
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
  specs: { id: string; label: string; value: string }[];
} | null> {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      price: true,
      rating: true,
      reviewsCount: true,
      stock: true,
      images: true,
      categoryId: true,
      specs: { select: { id: true, label: true, value: true } },
    },
  });
}

// Single featured by id (for edit form)
export async function devGetFeaturedById(id: string): Promise<{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  textColor: string;
  aspectRatio: number | null;
  bannerDesktop: string;
  bannerMobile: string;
  productId: string;
} | null> {
  return prisma.featuredProduct.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      subtitle: true,
      description: true,
      textColor: true,
      aspectRatio: true,
      bannerDesktop: true,
      bannerMobile: true,
      productId: true,
    },
  });
}

// Single category by id (for edit form)
export async function devGetCategoryById(id: string): Promise<{
  id: string;
  name: string;
  slug: string;
  description: string | null;
} | null> {
  return prisma.category.findUnique({
    where: { id },
    select: { id: true, name: true, slug: true, description: true },
  });
}
