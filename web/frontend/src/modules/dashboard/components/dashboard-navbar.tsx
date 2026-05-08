"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface DashboardNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DashboardNavbar({
  searchQuery,
  onSearchChange,
}: DashboardNavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-6 py-3 backdrop-blur-xl"
      id="dashboard-navbar"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f49500] text-sm font-black text-black">
          Q
        </span>
        <span className="text-sm font-semibold tracking-widest text-white">
          QCENA
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden items-center gap-6 md:flex">
        <a
          href="#"
          className="text-sm font-medium text-white underline underline-offset-4 transition-colors"
        >
          Todos
        </a>
        <a
          href="#"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          Beleza
        </a>
        <a
          href="#"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          Fitness
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          id="dashboard-search"
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-4 pr-10 text-sm text-white placeholder-neutral-500 outline-none transition-all focus:border-[#f49500]/50 focus:ring-1 focus:ring-[#f49500]/30"
          placeholder="Pesquisar serviços..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </div>

      {/* Actions */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-colors hover:border-[#f49500]/40 hover:text-[#f49500]"
        id="dashboard-cart-btn"
        aria-label="Ver reservas"
      >
        <ShoppingCartIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
