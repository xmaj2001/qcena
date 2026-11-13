"use client";

import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface StoreOption {
  id: string;
  name: string;
}

export interface ProductSearchFiltersProps {
  categories?: CategoryOption[];
  stores?: StoreOption[];
  dictionary?: {
    placeholder: string;
    clear: string;
    category: string;
    allCategories: string;
    store: string;
    allStores: string;
  };
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { id: "all", name: "Todas" },
  { id: "cat-1", name: "Eletrónicos" },
  { id: "cat-2", name: "Moda & Acessórios" },
  { id: "cat-3", name: "Beleza & Saúde" },
  { id: "cat-4", name: "Casa & Cozinha" },
];

const DEFAULT_STORES: StoreOption[] = [
  { id: "all", name: "Todas as lojas" },
  { id: "store-1", name: "Loja Oficial Bisno" },
  { id: "store-2", name: "TechAngola" },
  { id: "store-3", name: "Boutique Luanda" },
];

export function ProductSearchFilters({
  categories = DEFAULT_CATEGORIES,
  stores = DEFAULT_STORES,
  dictionary = {
    placeholder: "Pesquisar produtos pelo nome...",
    clear: "Limpar",
    category: "Categoria",
    allCategories: "Todas as categorias",
    store: "Loja",
    allStores: "Todas as lojas",
  },
}: ProductSearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("categoryId") ?? "all";
  const currentStore = searchParams.get("storeId") ?? "all";

  const [searchTerm, setSearchTerm] = React.useState(currentSearch);
  const [isPending, startTransition] = React.useTransition();

  // Sync state if URL changes externally
  React.useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateFilters = React.useCallback(
    (updates: { q?: string; categoryId?: string; storeId?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.q !== undefined) {
        if (updates.q.trim()) {
          params.set("q", updates.q.trim());
        } else {
          params.delete("q");
        }
      }

      if (updates.categoryId !== undefined) {
        if (updates.categoryId && updates.categoryId !== "all") {
          params.set("categoryId", updates.categoryId);
        } else {
          params.delete("categoryId");
        }
      }

      if (updates.storeId !== undefined) {
        if (updates.storeId && updates.storeId !== "all") {
          params.set("storeId", updates.storeId);
        } else {
          params.delete("storeId");
        }
      }

      // Reset cursor pagination on filter change
      params.delete("cursor");
      params.delete("cursorPublishedAt");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Debounced search
  React.useEffect(() => {
    if (searchTerm === currentSearch) return;

    const timer = setTimeout(() => {
      updateFilters({ q: searchTerm });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, updateFilters]);

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentCategory !== "all" ||
    currentStore !== "all";

  const clearAllFilters = () => {
    setSearchTerm("");
    updateFilters({ q: "", categoryId: "all", storeId: "all" });
  };

  return (
    <div className="w-full space-y-4">
      {/* Barra de pesquisa e seleção de loja */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          {isPending ? (
            <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary animate-spin pointer-events-none" />
          ) : (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          )}
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={dictionary.placeholder}
            className="h-10 pl-9 pr-9 text-sm rounded-xl border-border/70 bg-card shadow-xs focus-visible:ring-primary/40"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                updateFilters({ q: "" });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={dictionary.clear}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtro por Loja */}
        <div className="flex items-center gap-2">
          <select
            value={currentStore}
            onChange={(e) => updateFilters({ storeId: e.target.value })}
            className="h-10 rounded-xl border border-border/70 bg-card px-3 text-sm text-foreground shadow-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            aria-label={dictionary.store}
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-10 text-xs text-muted-foreground hover:text-foreground rounded-xl"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              {dictionary.clear}
            </Button>
          )}
        </div>
      </div>

      {/* Categorias em pills roláveis horizontalmente */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="mr-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          {dictionary.category}:
        </span>
        {categories.map((c) => {
          const isActive = currentCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => updateFilters({ categoryId: c.id })}
              className={cn(
                "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
