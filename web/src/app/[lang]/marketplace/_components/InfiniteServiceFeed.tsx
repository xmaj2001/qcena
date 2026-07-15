// app/marketplace/_components/InfiniteServiceFeed.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { generateMockServices, Service } from "@/lib/mockData";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useInView } from "framer-motion";

interface InfiniteServiceFeedProps {
  initialServices: Service[];
}

export function InfiniteServiceFeed({
  initialServices,
}: InfiniteServiceFeedProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 1. Criamos a referência mutável manualmente
  const triggerRef = useRef<HTMLDivElement>(null);

  // 2. Passamos a ref para o hook do Framer Motion. 
  // O 'amount: 0.1' equivale ao antigo 'threshold: 0.1' (10% visível)
  const inView = useInView(triggerRef, {
    amount: 0.1,
  });

  useEffect(() => {
    // Se o elemento de trigger estiver visível e houver mais itens para carregar
    if (inView && hasMore) {
      // Simulando um delay de rede de 800ms
      const timer = setTimeout(() => {
        const newServices = generateMockServices(6);

        // Simula o fim dos dados após carregar 5 páginas
        if (page >= 5) {
          setHasMore(false);
        }

        setServices((prev) => [...prev, ...newServices]);
        setPage((prev) => prev + 1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [inView, hasMore, page]);

  return (
    <div className="flex-1 space-y-6">
      {/* Grid de Serviços */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      {/* Elemento de Gatilho / Loading ao final da página */}
      {hasMore && (
        // 3. Atribuímos a triggerRef à div aqui embaixo
        <div ref={triggerRef} className="flex w-full justify-center py-8">
          <Loader2
            className="h-7 w-7 animate-spin text-muted-foreground"
            style={{ color: "var(--brand)" }}
          />
        </div>
      )}

      {!hasMore && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Você chegou ao fim do catálogo de serviços.
        </p>
      )}
    </div>
  );
}