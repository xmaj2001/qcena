import { PlaceView } from "@/modules/places/components/place-view";
import Grid from "@/modules/services/components/grid";
import ServiceGridItems from "@/modules/services/components/grid/service-grid-items";
import { getServices } from "@/modules/services/features/get-services.feat";
import { defaultSort, sorting } from "@/shared/lib/constants";

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
