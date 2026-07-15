"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Service {
  title: string;
  provider: string;
  price: string;
  image: string;
  oldPrice?: string;
  top?: boolean;
  featured?: boolean;
}

export function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();
  const handleCardClick = () => {
    // Redireciona para a página de detalhes do serviço
    router.push(`/marketplace/service/${encodeURIComponent(service.title)}`);
  }
  return (
    <article
      onClick={handleCardClick}
      className="group relative border border/10 overflow-hidden rounded-3xl bg-background p-4 shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
      style={
        service.featured
          ? {
              background: "linear-gradient(160deg, var(--brand) 0%, #7a2e00 100%)",
              color: "white",
            }
          : undefined
      }
    >
      <button
        className="absolute right-6 top-6 z-10 grid h-9 w-9 place-items-center rounded-full bg-muted shadow active:scale-95 transition-transform"
        aria-label="Favoritar"
        onClick={(e) => {
          e.preventDefault();
          // Lógica de favoritar aqui
        }}
      >
        <Heart
          className="h-4 w-4"
          style={{
            color: service.featured ? "var(--brand)" : "hsl(var(--muted-foreground))",
            fill: service.featured ? "var(--brand)" : "transparent",
          }}
        />
      </button>

      <div className="relative h-44 overflow-hidden rounded-2xl bg-muted/40">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {service.featured && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-foreground">
            <Star className="h-3 w-3" style={{ color: "var(--brand)", fill: "var(--brand)" }} />
            4.9/5
          </div>
        )}
      </div>

      <div className="mt-4">
        {service.top && (
          <span
            className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-foreground"
            style={{ background: "color-mix(in oklab, var(--brand) 30%, white)" }}
          >
            Top serviço
          </span>
        )}
        <h3 className={`text-base font-bold ${service.featured ? "text-white" : "text-foreground"}`}>
          {service.title}
        </h3>
        <p className={`text-xs ${service.featured ? "text-white/80" : "text-muted-foreground"}`}>
          por {service.provider}
        </p>
        <div className="mt-3 flex items-center gap-2">
          {service.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {service.oldPrice}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-bold"
            style={{
              borderColor: service.featured ? "white" : "var(--brand)",
              color: service.featured ? "white" : "var(--brand)",
            }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {service.price}
          </span>
        </div>
      </div>
    </article>
  );
}