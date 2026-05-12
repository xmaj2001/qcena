import Grid from "@/components/services/grid";
import ServiceGridItems from "@/components/services/grid/service-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getServices } from "@/server/services/features/get-services.feat";

interface CategoryPageProps {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // TODO: Implement filtering by collection await getServices({ category: params.collection });
  const services = await getServices();

  return (
    <section>
      {services.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceGridItems services={services} />
        </Grid>
      )}
    </section>
  );
}
