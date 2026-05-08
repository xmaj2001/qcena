"use client";

import { useState, useMemo } from "react";
import type { ApiService } from "@/modules/services/types/service.type";
import { SERVICE_CATEGORIES, SORT_OPTIONS } from "../types/dashboard.types";
import { generateDashboardServices } from "../mocks/dashboard.mock";
import { DashboardNavbar } from "./dashboard-navbar";
import { CategorySidebar } from "./category-sidebar";
import { SortSidebar } from "./sort-sidebar";
import { ServiceGrid } from "./service-grid";

// Generate mock data once on the client
const MOCK_SERVICES = generateDashboardServices(24);

export function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedServices = useMemo(() => {
    let result: ApiService[] = [...MOCK_SERVICES];

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
  }, [activeCategory, activeSort, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white" id="dashboard">
      <DashboardNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <CategorySidebar
          categories={SERVICE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <main className="min-w-0 flex-1">
          <ServiceGrid services={filteredAndSortedServices} />
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
