"use client";

import Image from "next/image";
import type { ApiService } from "@/modules/services/types/service.type";
import { Button, Card } from "@heroui/react";

interface ServiceCardProps {
  service: ApiService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="group cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      id={`service-card-${service.id}`}
    >
      <Card className="relative col-span-12 h-[250px] border-2 hover:border-[#A35700] bg-black/50 sm:h-[300px] md:col-span-8 md:h-[300px] rounded-md">
        {/* Background image */}
        <Image
          alt={service.name}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src={service.image}
          width={200}
          height={200}
        />
        {/* Header */}
        <Card.Header className="z-10 text-white">
          <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
            {service.name}
          </Card.Title>
        </Card.Header>
        {/* Footer */}
        <Card.Footer className="z-10 mt-auto flex items-center justify-between bg-primary">
          <div>
            {/* <div className="text-sm font-medium text-black">{service.name}</div> */}
            <div className="text-xs text-black/60">{service.price}</div>
          </div>
          <Button size="sm" variant="outline">
            Reserve Agora
          </Button>
        </Card.Footer>
      </Card>
    </article>
  );
}
