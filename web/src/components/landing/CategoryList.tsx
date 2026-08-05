"use client";

import Link from "next/link";
import { getCategoryIcon } from "@/features/categories/category-icons";
import { useCategories } from "@/features/categories/hooks/useCategories";

interface CategoryListProps {
  dict: any;
  lang: string;
}

export function CategoryList({ lang }: CategoryListProps) {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="px-4 pt-6 pb-2 md:px-8">
        <div className="flex items-center gap-3 overflow-x-auto py-2 sm:justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-20 animate-pulse rounded-2xl bg-muted/50 shrink-0"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pt-6 pb-2 md:px-8">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2 sm:justify-center sm:flex-wrap">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);

          return (
            <Link
              key={category.id}
              href={`/${lang}/marketplace?category=${category.slug}`}
              className="group flex min-w-[72px] flex-col items-center gap-2 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-muted active:scale-95 shrink-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/70 text-foreground/70 transition-all duration-200 group-hover:bg-[var(--brand)]/10 group-hover:text-[var(--brand)]">
                <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
              </div>
              <span className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {category.name}
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