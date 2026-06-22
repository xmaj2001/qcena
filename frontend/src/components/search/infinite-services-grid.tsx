"use client";

import { useEffect, useState, useRef } from "react";
import Grid from "../services/grid";
import ServiceGridItems from "../services/grid/service-grid-items";
import { getServices } from "@/server/services/features/get-services.feat";
import type { ApiService } from "@/server/services/types/service.type";
import { Loader2 } from "lucide-react";

interface InfiniteServicesGridProps {
  initialServices: ApiService[];
  initialNextCursor: string | null;
  category?: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function InfiniteServicesGrid({
  initialServices,
  initialNextCursor,
  category,
  searchParams,
}: InfiniteServicesGridProps) {
  const [items, setItems] = useState<ApiService[]>(initialServices);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Se os serviços iniciais mudarem (por causa de alteração de busca, ordenação ou categoria no server),
  // reinicia o estado local do cliente.
  useEffect(() => {
    setItems(initialServices);
    setNextCursor(initialNextCursor);
  }, [initialServices, initialNextCursor]);

  const loadMore = async () => {
    if (!nextCursor || loading) return;

    setLoading(true);
    try {
      // Extrair parâmetros atuais de busca e ordenação
      const searchValue = searchParams?.q as string | undefined;
      const sort = searchParams?.sort as string | undefined;

      // Chama a função utilitária getServices que bate no BFF
      const response = await getServices({
        cursor: nextCursor,
        limit: 9,
        category,
        search: searchValue,
      });

      if (response.success && response.data) {
        setItems((prev) => [...prev, ...response.data.items]);
        setNextCursor(response.data.nextCursor);
      }
    } catch (error) {
      console.error("Erro ao carregar mais serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configura o IntersectionObserver para detetar quando o utilizador faz scroll até ao fundo
  useEffect(() => {
    const currentObserver = observerRef.current;
    if (!nextCursor || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [nextCursor, loading, loadMore]);

  return (
    <div className="flex flex-col gap-6">
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceGridItems services={items} />
      </Grid>

      {/* Trigger de carregamento ou feedback visual */}
      {nextCursor && (
        <div
          ref={observerRef}
          className="flex w-full items-center justify-center py-10"
        >
          {loading ? (
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">A carregar mais serviços...</span>
            </div>
          ) : (
            <div className="h-1 w-full" />
          )}
        </div>
      )}

      {!nextCursor && items.length > 0 && (
        <div className="flex w-full items-center justify-center py-8 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
            Chegou ao fim dos resultados.
          </span>
        </div>
      )}
    </div>
  );
}
