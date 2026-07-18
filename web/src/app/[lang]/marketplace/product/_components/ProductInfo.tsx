"use client";

import { useState } from "react";
import { Star, BadgeCheck, MessageCircle, Heart, Truck, ShieldCheck, Package } from "lucide-react";

function fmt(price: number) {
  return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(price);
}

function waLink(text: string) {
  return `https://wa.me/244900000000?text=${encodeURIComponent(text)}`;
}

export function ProductInfo({ p }: { p: any }) {
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-primary">{p.category}</div>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight md:text-4xl">{p.name}</h1>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-bold">{p.rating}</span>
            <span className="text-muted-foreground">({p.reviews} avaliações)</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
            <BadgeCheck className="h-3 w-3" /> Verificado
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-extrabold text-primary">{fmt(p.price)}</span>
          {p.oldPrice && (
            <span className="text-base text-muted-foreground line-through">{fmt(p.oldPrice)}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Preço em Kwanzas. Pagamento na entrega.</p>

        <div className="mt-4 flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 text-lg font-bold hover:text-primary">−</button>
            <span className="w-8 text-center text-sm font-bold">{qty}</span>
            <button onClick={() => setQty(Math.min(p.stock, qty + 1))} className="h-9 w-9 text-lg font-bold hover:text-primary">+</button>
          </div>
          <span className="text-xs text-muted-foreground">{p.stock} em stock</span>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href={waLink(`Olá Qcena! Quero ${qty}x ${p.name} (${fmt(p.price * qty)}).`)}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" /> Encomendar no WhatsApp
          </a>
          <button
            onClick={() => setFav(!fav)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-bold hover:border-primary hover:text-primary"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-destructive text-destructive" : ""}`} />
            {fav ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-foreground/80">{p.description}</p>

      <div className="grid grid-cols-3 gap-3">
        {p.specs?.map((s: { label: string; value: string }) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-3 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-sm font-extrabold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {[
          { i: Truck, t: "Entrega em ponto seguro" },
          { i: ShieldCheck, t: "Produto testado" },
          { i: Package, t: "Devolução simples" },
        ].map(({ i: Icon, t }) => (
          <div key={t} className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs font-semibold">
            <Icon className="h-4 w-4 text-primary" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}
