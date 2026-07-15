import { MarketplaceClient } from "./_components/MarketplaceClient";
import { generateMockServices } from "@/lib/mockData";

export const metadata = {
  title: "Marketplace de produtos — Qcena.",
  description: "Encontre e compre os melhores produtos verificados.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialProducts = generateMockServices(9);

  return (
    <div className="relative min-h-screen pb-24">
      {/* Título contextual da página para dar norte ao usuário */}
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-black tracking-tight">
          {resolvedParams.category 
            ? `Produtos de ${resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)}`
            : "Explorar Produtos"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {resolvedParams.search 
            ? `Mostrando resultados para "${resolvedParams.search}"`
            : "Produtos selecionados com garantia de qualidade."}
        </p>
      </div>

      <MarketplaceClient initialProducts={initialProducts} />
    </div>
  );
}