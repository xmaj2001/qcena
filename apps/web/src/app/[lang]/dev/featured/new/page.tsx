import { prisma } from "@/lib/prisma";
import { devCreateFeatured } from "@/features/products/dev-interactions";
import { FeaturedForm } from "../_components/featured-form";

interface NewFeaturedPageProps {
  params: Promise<{ lang: string }>;
}

export default async function NewFeaturedPage({ params }: NewFeaturedPageProps) {
  const { lang } = await params;

  // Mostra apenas produtos que ainda não possuem destaque cadastrado
  const products = await prisma.product.findMany({
    where: { featured: null },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <FeaturedForm
      lang={lang}
      products={products}
      action={devCreateFeatured}
    />
  );
}
