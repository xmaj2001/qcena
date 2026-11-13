import { devGetAllCategories } from "@/features/products/dev-queries";
import { devCreateProduct } from "@/features/products/dev-interactions";
import { ProductForm } from "../_components/product-form";

interface NewProductPageProps {
  params: Promise<{ lang: string }>;
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const { lang } = await params;
  const categories = await devGetAllCategories();

  return (
    <ProductForm
      lang={lang}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      action={devCreateProduct}
    />
  );
}
