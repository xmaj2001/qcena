"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Layers, DollarSign, X } from "lucide-react";
import { useCategories } from "@/features/categories/hooks/useCategories";

export function FilterSidebar({
  open = false,
  onClose = () => { }
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories, isLoading } = useCategories(); // <--- Hook Integrado

  const currentCategory = searchParams.get("category") || "";
  const [range, setRange] = useState(50000);
  const [rating, setRating] = useState<number | null>(null);

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/marketplace?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    updateParam("category", slug);
    onClose();
  };

  return (
    <>
      {/* Backdrop Mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto space-y-5 p-5
          border-r border-border bg-background shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-24 lg:z-0 lg:h-fit lg:block
          lg:w-72 lg:translate-x-0 lg:rounded-3xl lg:border lg:bg-white/85 lg:backdrop-blur lg:dark:bg-neutral-900/85
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header de Fecho (Mobile) */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-bold text-foreground">Filtros</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition-colors text-foreground"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1. Categorias */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-neutral-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Categorias
            </h4>
          </div>

          <ul className="space-y-1">
            {/* Opção Padrão: Todos os Produtos */}
            <li>
              <button
                onClick={() => handleCategoryChange("")}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${currentCategory === ""
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                  : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                  }`}
              >
                Todos Produtos
              </button>
            </li>

            {/* Categorias Dinâmicas */}
            {isLoading ? (
              <li className="p-2 text-xs text-muted-foreground animate-pulse">
                A carregar categorias...
              </li>
            ) : (
              categories.map((cat) => {
                const isActive = currentCategory.toLowerCase() === cat.slug.toLowerCase();
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${isActive
                        ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                        : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                        }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </section>

        {/* 2. Faixa de preço */}
        <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-neutral-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Preço Máximo
              </h4>
            </div>
            <button
              className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              onClick={() => setRange(3000000)}
            >
              Reset
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="range"
              min={50000}
              max={3000000}
              step={50000}
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="w-full accent-[var(--brand)] cursor-pointer h-1 bg-neutral-100 rounded-lg dark:bg-neutral-800"
            />
            <div className="flex justify-between text-[10px] font-bold">
              <span className="rounded-lg bg-neutral-100 border border-neutral-200/60 px-2 py-1 text-neutral-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                50.000 Kz
              </span>
              <span
                className="rounded-lg px-2 py-1 text-white shadow-xs"
                style={{ background: "var(--brand)" }}
              >
                {range.toLocaleString("pt-AO")} Kz
              </span>
            </div>
          </div>
        </section>

        {/* 3. Avaliação */}
        <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            Avaliação mínima
          </h4>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)} className="focus:outline-none transition-transform active:scale-90">
                <Star
                  className="h-4 w-4"
                  style={{
                    color: n <= (rating || 4) ? "var(--brand)" : "hsl(var(--border))",
                    fill: n <= (rating || 4) ? "var(--brand)" : "transparent",
                  }}
                />
              </button>
            ))}
            <span className="ml-auto text-[10px] text-neutral-400 font-bold">
              {rating ? `${rating} estrelas` : "4 estrelas ou mais"}
            </span>
          </div>
        </section>
      </aside>
    </>
  );
}