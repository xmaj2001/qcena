"use client";

import type { ApiService } from "@/modules/services/types/service.type";

interface ServiceCardProps {
  service: ApiService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-neutral-900 transition-all duration-300 hover:scale-[1.02] hover:border-[#f49500]/20 hover:shadow-lg hover:shadow-[#f49500]/5"
      id={`service-card-${service.id}`}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-neutral-800">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex items-center gap-3 p-4">
        <h4 className="truncate text-sm font-medium text-neutral-200 transition-colors group-hover:text-white">
          {service.name}
        </h4>
        <span className="shrink-0 rounded-full bg-[#f49500] px-3 py-1 text-xs font-semibold text-black">
          {service.price.toFixed(2)}€
        </span>
      </div>
    </article>
  );
}
