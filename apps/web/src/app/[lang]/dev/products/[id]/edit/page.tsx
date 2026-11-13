import { notFound } from "next/navigation";
import { devGetProductById, devGetAllCategories } from "@/features/products/dev-queries";
import { devUpdateProduct } from "@/features/products/dev-interactions";
import { ProductForm } from "../../_components/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id, lang } = await params;
  const [product, categories] = await Promise.all([
    devGetProductById(id),
    devGetAllCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      lang={lang}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      product={product}
      action={devUpdateProduct.bind(null, id)}
    />
  );
}
