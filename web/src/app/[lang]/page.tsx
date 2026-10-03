import { Hero } from "@/features/home/components/Hero";
import { ProductSection } from "@/features/products/components/ProductSection";

export default function Page() {
  return (
    <main>
      <Hero />

      <ProductSection
        kind="recommended"
        title="Produtos recomendados"
        description="Uma seleção de produtos que combinam com o que os clientes mais procuram."
      />

      <ProductSection
        kind="new"
        title="Novos produtos"
        description="As novidades que acabaram de chegar à Qcena."
      />

      <ProductSection
        kind="coming-soon"
        title="Brevemente disponíveis"
        description="Produtos em preparação que estarão disponíveis em breve."
        emptyLabel="Estamos a preparar novidades para si."
      />
    </main>
  );
}
