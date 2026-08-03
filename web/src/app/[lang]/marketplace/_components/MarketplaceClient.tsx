"use client";

import { useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { InfiniteFeed } from "./InfiniteFeed";
import { Filter } from "lucide-react";
import type { ApiCursorEnvelope } from "@/features/core/api.types";
import type { Product, GetProductsQueryParams } from "@/features/products";

interface MarketplaceClientProps {
  searchParams: { category?: string; search?: string; sortBy?: string };
  initialData: ApiCursorEnvelope<Product>;
}

export function MarketplaceClient({ searchParams, initialData }: MarketplaceClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cast seguro do parâmetro sortBy
  const validSortBy = ["price_asc", "price_desc", "rating", "latest"].includes(
    searchParams.sortBy || ""
  )
    ? (searchParams.sortBy as GetProductsQueryParams["sortBy"])
    : undefined;

  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    sortBy: validSortBy,
  };

  return (
    <>
      <div className="flex items-start gap-6">
        <FilterSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <InfiniteFeed
          filters={filters}
          initialData={initialData}
        />
      </div>

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-24 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 lg:hidden"
        aria-label="Filtros"
      >
        <Filter className="h-6 w-6" />
      </button>
    </>
  );
}