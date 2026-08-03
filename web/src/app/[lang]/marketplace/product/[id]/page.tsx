import { productService } from "@/features/products";
import { ProductDetails } from "../_components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string, lang: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {

  const data = await productService.getProductById((await params).id);
  return (
    <div
      className="min-h-screen text-foreground relative bg-background"
      id="place"
    >

      {/* DETALHES DO PRODUTO */}
      <ProductDetails p={data.product} related={data.relatedProducts} />
    </div>
  );
}
