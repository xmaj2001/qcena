import { InfiniteServicesGrid } from "@/components/search/infinite-services-grid";
import { defaultSort, sorting } from "@/lib/constants";
import { getServices } from "@/server/services/features/get-services.feat";

export const metadata = {
  title: "Qcena - Pesquisar",
  description: "Pesquise por serviços na Qcena.",
};

interface SearchPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { sort, q: searchValue, cursor } = (params ?? {}) as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Realiza a chamada à API do BFF para buscar o primeiro lote de serviços
  const servicesResponse = await getServices({
    search: searchValue,
    cursor,
    limit: 9, // Lote inicial
  });

  if (!servicesResponse.success) {
    return <p className="py-3 text-lg">Nenhum serviço encontrado</p>;
  }

  const services = servicesResponse.data;
  const resultsText = services.items.length > 1 ? "resultados" : "resultado";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {services.items.length === 0
            ? "Não há resultados para a sua busca:"
            : `Os ${resultsText} encontrados para a sua busca foram:`}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {services.items.length > 0 ? (
        <InfiniteServicesGrid
          initialServices={services.items}
          initialNextCursor={services.nextCursor}
          searchParams={params ?? {}}
        />
      ) : null}
    </>
  );
}


