"use client";

import { useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { InfiniteServiceFeed } from "./InfiniteServiceFeed";
import { AiSearchBar } from "./AiSearchBar";
import { Filter, X } from "lucide-react";
import { Product } from "@/components/products/ProductCard";

interface Provider {
  name: string;
  checked: boolean;
}

interface MarketplaceClientProps {
  initialProducts: Product[];
}

export function MarketplaceClient({ initialProducts }: MarketplaceClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex items-start gap-6">
        <FilterSidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        <InfiniteServiceFeed initialServices={initialProducts} />
      </div>

      {/* <AiSearchBar /> */}

      {/* Floating Filter Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-[90px] left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 lg:hidden"
        aria-label="Filtros"
      >
        <Filter className="h-6 w-6" />
      </button>
    </>
  );
}
