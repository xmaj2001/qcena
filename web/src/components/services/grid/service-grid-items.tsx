import Grid from ".";
import { GridTileImage } from "./tile";
import Link from "next/link";
import type { ApiService } from "@/modules/services/types/service.type";

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
              src={service.images[0]}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
