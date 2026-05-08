"use client";

import type { ApiService } from "@/modules/services/types/service.type";
import { ServiceCard } from "./service-card";

interface ServiceGridProps {
  services: ApiService[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div
        className="flex min-h-[400px] items-center justify-center"
        id="service-grid-empty"
      >
        <p className="text-sm text-neutral-500">
          Nenhum serviço encontrado.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      id="service-grid"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
