import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { devGetFeaturedById } from "@/features/products/dev-queries";
import { devUpdateFeatured } from "@/features/products/dev-interactions";
import { FeaturedForm } from "../../_components/featured-form";

interface EditFeaturedPageProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function EditFeaturedPage({ params }: EditFeaturedPageProps) {
  const { id, lang } = await params;
  const featured = await devGetFeaturedById(id);

  if (!featured) {
    notFound();
  }

  // Lista todos os produtos que não têm destaque, além do produto atualmente vinculado
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { featured: null },
        { id: featured.productId },
      ],
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <FeaturedForm
      lang={lang}
      products={products}
      featured={featured}
      action={devUpdateFeatured.bind(null, id)}
    />
  );
}
