"use client";

import Link from "next/link";
import { Shirt, Sparkles, Tv, Home, Dumbbell, MoreHorizontal, ShoppingBag, Headphones, Watch } from "lucide-react";

interface Category {
  slug: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categoriesData: Category[] = [
  { slug: "moda", label: "Moda", icon: Shirt },
  { slug: "beleza", label: "Beleza", icon: Sparkles },
  { slug: "eletronicos", label: "Electrónicos", icon: Tv },
  { slug: "casa", label: "Casa & Vida", icon: Home },
  { slug: "desporto", label: "Desporto", icon: Dumbbell },
  { slug: "acessorios", label: "Acessórios", icon: Watch },
  { slug: "audio", label: "Áudio", icon: Headphones },
  { slug: "bolsas", label: "Bolsas", icon: ShoppingBag },
  { slug: "mais", label: "Mais", icon: MoreHorizontal },
];

interface CategoryListProps {
  dict: any;
  lang: string;
}

export function CategoryList({ dict, lang }: CategoryListProps) {
  return (
    <section className="px-4 pt-6 pb-2 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2 sm:justify-center sm:flex-wrap">
        {categoriesData.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              href={`/${lang}/marketplace?category=${category.slug}`}
              className="group flex min-w-[72px] flex-col items-center gap-2 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-muted active:scale-95 shrink-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/70 text-foreground/70 transition-all duration-200 group-hover:bg-[var(--brand)]/10 group-hover:text-[var(--brand)]">
                <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
              </div>
              <span className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {category.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Separador */}
      <div className="mt-4 h-px bg-border/50" />
    </section>
  );
}
