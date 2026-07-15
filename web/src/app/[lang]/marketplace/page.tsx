import { FilterSidebar } from "./_components/FilterSidebar";
import { InfiniteServiceFeed } from "./_components/InfiniteServiceFeed";
import { AiSearchBar } from "./_components/AiSearchBar";
import { generateMockProviders, generateMockServices } from "@/lib/mockData";

export const metadata = {
  title: "Marketplace de serviços — servi.",
  description: "Encontre e contrate serviços de profissionais verificados.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialServices = generateMockServices(9);
  const providers = generateMockProviders();

  return (
    <div className="relative min-h-screen pb-24">
      {/* Título contextual da página para dar norte ao usuário */}
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-black tracking-tight">
          {resolvedParams.category 
            ? `Serviços de ${resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)}`
            : "Explorar Serviços"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {resolvedParams.search 
            ? `Mostrando resultados para "${resolvedParams.search}"`
            : "Profissionais verificados prontos para atender seu projeto."}
        </p>
      </div>

      <div className="flex items-start gap-6">
        {/* Sidebar Otimizada com Categorias Inclusas */}
        <FilterSidebar providers={providers} />

        {/* Feed de Serviços */}
        <InfiniteServiceFeed initialServices={initialServices} />
      </div>

      {/* Busca Inteligente por Linguagem Natural Flutuante */}
      <AiSearchBar />
    </div>
  );
}