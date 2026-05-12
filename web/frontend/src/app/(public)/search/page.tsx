import Grid from "@/components/services/grid";
import ServiceGridItems from "@/components/services/grid/service-grid-items";
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
  const { sort, q: searchValue } = params as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  // TODO: Implementar filtro de serviços por busca.
  // const services = await getServices({ sortKey, reverse, query: searchValue });
  const services = await getServices();
  const resultsText = services.length > 1 ? "resultados" : "resultado";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {services.length === 0
            ? "Não há resultados para a sua busca:"
            : `Os ${resultsText} encontrados para a sua busca foram:`}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {services.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceGridItems services={services} />
        </Grid>
      ) : null}
    </>
  );
}
