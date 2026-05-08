"use client";

import type { SortOption } from "../types/place.types";

interface SortSidebarProps {
  options: SortOption[];
  activeSort: string;
  onSortChange: (value: string) => void;
}

export function SortSidebar({
  options,
  activeSort,
  onSortChange,
}: SortSidebarProps) {
  return (
    <aside className="hidden w-44 shrink-0 lg:block" id="sort-sidebar">
      <h3 className="mb-4 text-sm font-semibold text-neutral-400">
        Ordenar por
      </h3>
      <ul className="flex flex-col gap-1">
        {options.map((option) => {
          const isActive = activeSort === option.value;
          return (
            <li key={option.value}>
              <button
                type="button"
                id={`sort-${option.value}`}
                className={`w-full text-left text-sm transition-all duration-200 ${
                  isActive
                    ? "font-semibold text-white underline underline-offset-4"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => onSortChange(option.value)}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
