// app/marketplace/_components/TopActionsBar.tsx
"use client";

import { Bell, Heart, Search, ShoppingBag } from "lucide-react";

export function TopActionsBar() {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white/80 p-4 shadow-lg backdrop-blur">
      <div className="flex items-center gap-6">
        <span className="text-2xl font-black tracking-tight text-foreground">
          servi<span style={{ color: "var(--brand)" }}>.</span>
        </span>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar serviços, fornecedores…"
            className="h-10 w-[320px] rounded-full border border-border bg-muted/40 pl-9 pr-4 text-sm outline-none focus:border-foreground/40"
          />
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm font-medium text-foreground">
        <button className="hidden items-center gap-1.5 sm:flex hover:opacity-80">
          <ShoppingBag className="h-4 w-4" /> Pedidos
        </button>
        <button className="hidden items-center gap-1.5 sm:flex hover:opacity-80">
          <Heart className="h-4 w-4" /> Favoritos
        </button>
        <button className="relative flex items-center gap-1.5 hover:opacity-80">
          <Bell className="h-4 w-4" />
          <span
            className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
            style={{ background: "var(--brand)" }}
          >
            3
          </span>
          Alertas
        </button>
        <div
          className="h-9 w-9 rounded-full ring-2 ring-white cursor-pointer"
          style={{
            background: "url(https://i.pravatar.cc/80?img=47) center/cover",
          }}
        />
      </div>
    </div>
  );
}