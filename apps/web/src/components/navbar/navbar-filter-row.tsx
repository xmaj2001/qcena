"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductCategoryFiltersProps {
  categories: { id: string; name: string }[];
  labels: { all: string; ariaLabel: string };
}

export function ProductCategoryFilters({
  categories,
  labels,
}: ProductCategoryFiltersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("categoryId");

  const hrefFor = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    // Mudar de categoria reinicia a paginação
    params.delete("cursor");
    params.delete("cursorPublishedAt");

    if (categoryId) params.set("categoryId", categoryId);
    else params.delete("categoryId");

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const chips = [{ id: null, name: labels.all }, ...categories];

  return (
    <nav
      aria-label={labels.ariaLabel}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {chips.map(({ id, name }) => {
        const active = id === activeId;
        return (
          <Link
            aria-current={active ? "true" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground/80 hover:border-primary/50 hover:text-primary",
            )}
            href={hrefFor(id)}
            key={id ?? "all"}
            scroll={false}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
