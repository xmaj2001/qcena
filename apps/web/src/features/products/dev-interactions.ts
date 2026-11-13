"use server";

import { updateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function getLang(formData: FormData, fallback = "pt"): string {
  const lang = formData.get("lang") as string | null;
  return lang?.trim() || fallback;
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export async function devCreateCategory(formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;

  await prisma.category.create({
    data: { name, slug, description },
  });

  updateTag("categories");
  updateTag("products");
  revalidatePath(`/${lang}/dev/categories`);
  redirect(`/${lang}/dev/categories`);
}

export async function devUpdateCategory(id: string, formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;

  await prisma.category.update({
    where: { id },
    data: { name, slug, description },
  });

  updateTag("categories");
  updateTag("products");
  revalidatePath(`/${lang}/dev/categories`);
  redirect(`/${lang}/dev/categories`);
}

export async function devDeleteCategory(id: string, lang = "pt"): Promise<void> {
  await prisma.category.delete({ where: { id } });

  updateTag("categories");
  updateTag("products");
  revalidatePath(`/${lang}/dev/categories`);
  redirect(`/${lang}/dev/categories`);
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export async function devCreateProduct(formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const slug = (formData.get("slug") as string).trim();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const price = (formData.get("price") as string).trim();
  const categoryId = (formData.get("categoryId") as string).trim();
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const rating = parseFloat(formData.get("rating") as string) || 0;
  const reviewsCount = parseInt(formData.get("reviewsCount") as string, 10) || 0;
  const rawImages = (formData.get("images") as string) || "";
  const images = rawImages
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const specsLabels = formData.getAll("specs_label") as string[];
  const specsValues = formData.getAll("specs_value") as string[];
  const specs = specsLabels
    .map((label, i) => ({ label, value: specsValues[i] ?? "" }))
    .filter((s) => s.label.trim());

  await prisma.product.create({
    data: {
      slug,
      name,
      description,
      price,
      categoryId,
      stock,
      rating,
      reviewsCount,
      images,
      specs: { createMany: { data: specs } },
    },
  });

  updateTag("products");
  revalidatePath(`/${lang}/dev/products`);
  revalidatePath(`/${lang}/products`);
  redirect(`/${lang}/dev/products`);
}

export async function devUpdateProduct(id: string, formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const slug = (formData.get("slug") as string).trim();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const price = (formData.get("price") as string).trim();
  const categoryId = (formData.get("categoryId") as string).trim();
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const rating = parseFloat(formData.get("rating") as string) || 0;
  const reviewsCount = parseInt(formData.get("reviewsCount") as string, 10) || 0;
  const rawImages = (formData.get("images") as string) || "";
  const images = rawImages
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const specsLabels = formData.getAll("specs_label") as string[];
  const specsValues = formData.getAll("specs_value") as string[];
  const specs = specsLabels
    .map((label, i) => ({ label, value: specsValues[i] ?? "" }))
    .filter((s) => s.label.trim());

  await prisma.product.update({
    where: { id },
    data: {
      slug,
      name,
      description,
      price,
      categoryId,
      stock,
      rating,
      reviewsCount,
      images,
      specs: {
        deleteMany: {},
        createMany: { data: specs },
      },
    },
  });

  updateTag("products");
  revalidatePath(`/${lang}/dev/products`);
  revalidatePath(`/${lang}/products`);
  revalidatePath(`/${lang}/products/${slug}`);
  redirect(`/${lang}/dev/products`);
}

export async function devDeleteProduct(id: string, lang = "pt"): Promise<void> {
  await prisma.product.delete({ where: { id } });

  updateTag("products");
  updateTag("featured");
  revalidatePath(`/${lang}/dev/products`);
  revalidatePath(`/${lang}/products`);
  redirect(`/${lang}/dev/products`);
}

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────

export async function devCreateFeatured(formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const productId = (formData.get("productId") as string).trim();
  const title = (formData.get("title") as string).trim();
  const subtitle = (formData.get("subtitle") as string).trim();
  const description = (formData.get("description") as string).trim();
  const textColor = (formData.get("textColor") as string).trim() || "light";
  const aspectRatioRaw = formData.get("aspectRatio") as string;
  const aspectRatio = aspectRatioRaw ? parseFloat(aspectRatioRaw) : null;
  const bannerDesktop = (formData.get("bannerDesktop") as string).trim();
  const bannerMobile = (formData.get("bannerMobile") as string).trim();

  await prisma.featuredProduct.create({
    data: {
      productId,
      title,
      subtitle,
      description,
      textColor,
      aspectRatio,
      bannerDesktop,
      bannerMobile,
    },
  });

  updateTag("featured");
  updateTag("products");
  revalidatePath(`/${lang}/dev/featured`);
  revalidatePath(`/${lang}`);
  redirect(`/${lang}/dev/featured`);
}

export async function devUpdateFeatured(id: string, formData: FormData): Promise<void> {
  const lang = getLang(formData);
  const productId = (formData.get("productId") as string).trim();
  const title = (formData.get("title") as string).trim();
  const subtitle = (formData.get("subtitle") as string).trim();
  const description = (formData.get("description") as string).trim();
  const textColor = (formData.get("textColor") as string).trim() || "light";
  const aspectRatioRaw = formData.get("aspectRatio") as string;
  const aspectRatio = aspectRatioRaw ? parseFloat(aspectRatioRaw) : null;
  const bannerDesktop = (formData.get("bannerDesktop") as string).trim();
  const bannerMobile = (formData.get("bannerMobile") as string).trim();

  await prisma.featuredProduct.update({
    where: { id },
    data: {
      productId,
      title,
      subtitle,
      description,
      textColor,
      aspectRatio,
      bannerDesktop,
      bannerMobile,
    },
  });

  updateTag("featured");
  updateTag("products");
  revalidatePath(`/${lang}/dev/featured`);
  revalidatePath(`/${lang}`);
  redirect(`/${lang}/dev/featured`);
}

export async function devDeleteFeatured(id: string, lang = "pt"): Promise<void> {
  await prisma.featuredProduct.delete({ where: { id } });

  updateTag("featured");
  updateTag("products");
  revalidatePath(`/${lang}/dev/featured`);
  revalidatePath(`/${lang}`);
  redirect(`/${lang}/dev/featured`);
}
