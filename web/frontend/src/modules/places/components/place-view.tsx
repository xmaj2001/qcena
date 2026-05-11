"use client";

import { useState, useMemo } from "react";
import type { ApiService } from "@/modules/services/types/service.type";
import { SERVICE_CATEGORIES, SORT_OPTIONS } from "../types/place.types";
import { PlaceNavbar } from "./place-navbar";
import { CategorySidebar } from "./category-sidebar";
import { SortSidebar } from "./sort-sidebar";
import { ServiceGrid } from "@/modules/services/components/grid/service-grid";
import ServiceGridItems from "@/modules/services/components/grid/service-grid-items";
import Grid from "@/modules/services/components/grid";

interface PlaceViewProps {
  services: ApiService[];
}

export function PlaceView({ services }: PlaceViewProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedServices = useMemo(() => {
    let result = services;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((service) => service.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description?.toLowerCase().includes(query),
      );
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "trending":
        result.sort((a, b) => b.totalReservations - a.totalReservations);
        break;
      case "latest":
        result.sort((a, b) => b.totalFavorites - a.totalFavorites);
        break;
      case "relevance":
      default:
        break;
    }

    return result;
  }, [services, activeCategory, activeSort, searchQuery]);

  return (
    <div className="min-h-screen text-white relative" id="place">
      <PlaceNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="mx-auto flex max-w-7xl gap-4 py-8 pt-20">
        <CategorySidebar
          categories={SERVICE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <main className="min-w-0 flex-1">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceGridItems services={filteredAndSortedServices} />
          </Grid>
        </main>

        <SortSidebar
          options={SORT_OPTIONS}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />
      </div>
    </div>
  );
}
