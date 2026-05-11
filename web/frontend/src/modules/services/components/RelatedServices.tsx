import Link from "next/link";
import { getRelatedServices } from "../features/get-related-services.feat";
import { GridTileImage } from "./grid/tile";
import { ServiceCard } from "./service-card";
import Grid from "./grid";
import ServiceGridItems from "./grid/service-grid-items";

export async function RelatedServices({ id }: { id: string }) {
  const relatedServices = await getRelatedServices(id);

  if (!relatedServices.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Services</h2>
      <Grid className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        <ServiceGridItems services={relatedServices} />
      </Grid>
    </div>
  );
}
