"use client";

import { Flame, Sparkles, Star, Package, MapPin, ShieldCheck, X, MessageCircle } from "lucide-react";

const NAV = [
  { icon: Flame, label: "Novidades" },
  { icon: Sparkles, label: "Ofertas do Dia", hot: true },
  { icon: Star, label: "Mais Vendidos" },
  { icon: Package, label: "Como Encomendar" },
  { icon: MapPin, label: "Pontos de Entrega" },
  { icon: ShieldCheck, label: "Garantia Qcena" },
];

function waLink(msg: string) {
  return `https://wa.me/244900000000?text=${encodeURIComponent(msg)}`;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  /** Optional nav items override (e.g. localized labels from dict) */
  nav?: { icon: React.ComponentType<{ className?: string }>; label: string; hot?: boolean }[];
}

export function Sidebar({ open, onClose, nav = NAV }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto
          border-r border-border bg-background p-4 shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-[76px] lg:z-0 lg:h-[calc(100vh-92px)]
          lg:w-64 lg:translate-x-0 lg:rounded-2xl lg:border lg:shadow-card
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close header */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-bold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-0.5">
          {nav.map((item) => (
            <button
              key={item.label}
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:bg-[var(--brand)]/10 hover:text-[var(--brand)] active:scale-[0.98]"
            >
              <item.icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.hot && (
                <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
                  HOT
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* WhatsApp promo card */}
        <div
          className="mt-6 rounded-2xl p-5 text-primary-foreground shadow-lg"
          style={{ background: "linear-gradient(135deg, var(--brand) 0%, #7a2e00 100%)" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Oferta
          </div>
          <h3 className="mt-3 text-lg font-extrabold leading-tight">
            Encomenda direto no WhatsApp
          </h3>
          <p className="mt-1 text-sm text-white/90">
            Sem cadastros. Fala connosco e combina a entrega num ponto seguro.
          </p>
          <a
            href={waLink("Olá! Quero encomendar.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--brand)] transition hover:bg-white/90 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" /> Falar Agora
          </a>
        </div>

        {/* Trust badge */}
        <div className="mt-4 space-y-2 rounded-2xl border border-border p-4 bg-muted/30">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-[var(--brand)]" /> Compra Segura
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Produtos testados e divulgados pela nossa equipa. Entrega em ponto combinado.
          </p>
        </div>
      </aside>
    </>
  );
}

export { NAV };
