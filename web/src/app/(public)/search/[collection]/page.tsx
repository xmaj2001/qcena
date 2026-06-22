import { InfiniteServicesGrid } from "@/components/search/infinite-services-grid";
import { defaultSort, sorting } from "@/lib/constants";
import { getServices } from "@/server/services/features/get-services.feat";

interface CategoryPageProps {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort, cursor } = (searchParams ?? {}) as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Realiza a chamada à API do BFF enviando a categoria, o cursor e o limite
  const response = await getServices({
    category: params.collection,
    cursor,
    limit: 9, // Lote inicial
  });

  if (!response.success) {
    return <p className="py-3 text-lg">Nenhum serviço encontrado</p>;
  }
  const services = response.data;

  return (
    <section>
      {services.items.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <InfiniteServicesGrid
          initialServices={services.items}
          initialNextCursor={services.nextCursor}
          category={params.collection}
          searchParams={searchParams ?? {}}
        />
      )}
    </section>
  );
}


