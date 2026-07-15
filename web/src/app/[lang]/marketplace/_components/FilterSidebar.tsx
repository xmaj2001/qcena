// app/marketplace/_components/FilterSidebar.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Layers, Users2, DollarSign } from "lucide-react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

interface Provider {
  name: string;
  checked: boolean;
}

const filterCategories = [
  { title: "Todos Serviços", slug: "" },
  { title: "Design & Branding", slug: "design" },
  { title: "Desenvolvimento", slug: "dev" },
  { title: "Marketing digital", slug: "marketing" },
  { title: "Vídeo & Áudio", slug: "video" },
  { title: "Consultoria", slug: "consultoria" },
  { title: "Redação & Tradução", slug: "redacao" },
];

export function FilterSidebar({ providers: initialProviders }: { providers: Provider[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const anchor = useComboboxAnchor();
  
  const currentCategory = searchParams.get("category") || "";
  const [range, setRange] = useState(1130);
  const [rating, setRating] = useState<number | null>(null);
  const [delivery, setDelivery] = useState<"online" | "presencial">("online");

  // Mapeia a lista de fornecedores vindos do mock data para strings simples
  const providerNames = React.useMemo(() => {
    return initialProviders.map((p) => p.name);
  }, [initialProviders]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <aside className="sticky top-24 hidden h-fit w-72 shrink-0 space-y-5 rounded-3xl bg-white/85 p-5 shadow-xl backdrop-blur lg:block border border-neutral-100 dark:bg-neutral-900/85 dark:border-neutral-800">
      
      {/* 1. Categorias */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-neutral-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Categorias</h4>
        </div>
        <ul className="space-y-1">
          {filterCategories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  currentCategory === cat.slug
                    ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                    : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                }`}
              >
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Fornecedores (Filtro Inteligente via Combobox) */}
      <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2 mb-3">
          <Users2 className="h-4 w-4 text-neutral-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Fornecedores</h4>
        </div>
        
        <div className="w-full">
          <Combobox
            multiple
            autoHighlight
            items={providerNames}
          >
            <ComboboxChips ref={anchor} className="w-full bg-neutral-50 border-neutral-200 rounded-xl p-1.5 min-h-[42px] flex flex-wrap gap-1 transition-colors focus-within:border-neutral-400 dark:bg-neutral-800/50 dark:border-neutral-800">
              <ComboboxValue>
                {(values: string[]) => (
                  <React.Fragment>
                    {values.map((value: string) => (
                      <ComboboxChip 
                        key={value}
                        className="text-[11px] bg-white border border-neutral-200 rounded-lg px-2 py-0.5 shadow-xs text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                      >
                        {value}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput 
                      placeholder={values.length === 0 ? "Buscar empresa..." : ""}
                      className="text-xs bg-transparent outline-none flex-1 min-w-[60px] px-1 placeholder:text-neutral-400 text-neutral-900 dark:text-white"
                    />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            
            <ComboboxContent anchor={anchor} className="z-50 bg-white border border-neutral-200 rounded-xl shadow-xl mt-1 max-h-48 overflow-y-auto p-1 dark:bg-neutral-900 dark:border-neutral-800">
              <ComboboxEmpty className="text-xs text-muted-foreground p-3 text-center">Nenhum fornecedor encontrado.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem 
                    key={item} 
                    value={item}
                    className="text-xs px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between data-[highlighted]:bg-neutral-50 dark:hover:bg-neutral-800 dark:data-[highlighted]:bg-neutral-800"
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </section>

      {/* 3. Faixa de preço (Sem o gráfico ocupando espaço) */}
      <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-neutral-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Preço Máximo</h4>
          </div>
          <button 
            className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" 
            onClick={() => setRange(1130)}
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min={20}
            max={5000}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full accent-[var(--brand)] cursor-pointer h-1 bg-neutral-100 rounded-lg dark:bg-neutral-800"
          />
          <div className="flex justify-between text-[10px] font-bold">
            <span className="rounded-lg bg-neutral-100 border border-neutral-200/60 px-2 py-1 text-neutral-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
              R$ 20
            </span>
            <span 
              className="rounded-lg px-2 py-1 text-white shadow-xs" 
              style={{ background: "var(--brand)" }}
            >
              R$ {range}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Avaliação */}
      <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">Avaliação mínima</h4>
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

      {/* 5. Modalidade de Entrega */}
      <section className="border-t pt-4 border-neutral-100 dark:border-neutral-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">Entrega do Serviço</h4>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
          <button
            onClick={() => setDelivery("online")}
            className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
              delivery === "online" 
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-700 dark:text-white" 
                : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setDelivery("presencial")}
            className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
              delivery === "presencial" 
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-700 dark:text-white" 
                : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
          >
            Presencial
          </button>
        </div>
      </section>
    </aside>
  );
}