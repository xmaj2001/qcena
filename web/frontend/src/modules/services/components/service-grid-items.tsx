import type { ApiService } from "@/modules/services/types/service.type";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import Grid from "./grid";

export default function ServiceGridItems({
  services,
}: {
  services: ApiService[];
}) {
  return (
    <>
      {services.map((service) => (
        <Grid.Item key={service.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/service/${service.id}`}
            prefetch={true}
          >
            <GridTileImage
              alt={service.name}
              label={{
                title: service.name,
                amount: service.price.toLocaleString(),
                currencyCode: "AOA",
              }}
              src={service.image}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
