"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DollarSign, Layers, Star } from "lucide-react";
import { useState } from "react";
import { mockCategories } from "@/lib/categories";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sortBy") ?? "";
  const [range, setRange] = useState(3_000_000);

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 space-y-6 rounded-3xl border bg-card p-5">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Categorias
            </h2>
          </div>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => updateParams({ category: undefined })}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${!currentCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              Todos os produtos
            </button>

            {mockCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => updateParams({ category: category.slug })}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${currentCategory === category.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section className="border-t pt-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Preço máximo
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setRange(3_000_000)}
              className="text-[10px] font-semibold text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>

          <input
            type="range"
            min={50_000}
            max={3_000_000}
            step={50_000}
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
            className="w-full accent-primary"
          />

          <div className="mt-2 flex justify-between text-[10px] font-bold text-muted-foreground">
            <span>50.000 Kz</span>
            <span>{range.toLocaleString("pt-AO")} Kz</span>
          </div>
        </section>

        <section className="border-t pt-5">
          <div className="mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ordenar
            </h2>
          </div>

          <select
            value={currentSort}
            onChange={(event) => updateParams({ sortBy: event.target.value || undefined })}
            className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Mais recentes</option>
            <option value="rating">Melhor avaliação</option>
            <option value="price_asc">Preço: menor primeiro</option>
            <option value="price_desc">Preço: maior primeiro</option>
          </select>
        </section>
      </div>
    </aside>
  );
}
