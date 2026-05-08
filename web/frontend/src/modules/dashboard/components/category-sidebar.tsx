"use client";

import type { ServiceCategory } from "../types/dashboard.types";

interface CategorySidebarProps {
  categories: ServiceCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <aside className="hidden w-44 shrink-0 lg:block" id="category-sidebar">
      <h3 className="mb-4 text-sm font-semibold text-neutral-400">
        Categorias
      </h3>
      <ul className="flex flex-col gap-1">
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <li key={category.slug}>
              <button
                type="button"
                id={`category-${category.slug}`}
                className={`w-full text-left text-sm transition-all duration-200 ${
                  isActive
                    ? "font-semibold text-[#f49500] underline underline-offset-4"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => onCategoryChange(category.slug)}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
