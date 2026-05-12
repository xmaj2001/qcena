import { Button } from "@heroui/react";
import type { ApiService } from "@/server/services/types/service.type";
import Price from "./details/price";
import Prose from "./details/prose";
export function ServiceDescription({ service }: { service: ApiService }) {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{service.name}</h1>
        <div className="flex items-center justify-between">
          <Button>Solicitar Reserva</Button>
          <div className="rounded-full p-2 text-sm text-white">
            <Price
              className="text-lg"
              amount={service.price.toString()}
              currencyCode={"AOA"}
            />
          </div>
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}
      {service.description ? <Prose service={service} /> : null}
      {/* <AddToCart product={product} /> */}
    </>
  );
}
