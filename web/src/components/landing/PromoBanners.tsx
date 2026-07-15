"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Package, ArrowRight } from "lucide-react";

function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState(targetMs);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(timeLeft / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

export function PromoBanners({ lang }: { lang: string }) {
  // Flash Sale termina em 2 horas a partir do carregamento
  const { h, m, s } = useCountdown(2 * 3600 * 1000);

  return (
    <section className="px-4 py-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Banner 1: Flash Sale */}
        <Link
          href={`/${lang}/marketplace?category=ofertas`}
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, oklch(0.94 0.04 60) 0%, oklch(0.90 0.07 55) 100%)" }}
        >
          <div className="flex flex-col gap-1 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Flash Sale</span>
            <p className="text-sm font-semibold text-foreground leading-snug">
              Ofertas por tempo<br />limitado
            </p>
            <div className="mt-2 flex items-center gap-1">
              {[h, m, s].map((unit, i) => (
                <span key={i} className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-extrabold tabular-nums text-white shadow-sm">
                    {unit}
                  </span>
                  {i < 2 && <span className="mx-0.5 text-orange-600 font-bold">:</span>}
                </span>
              ))}
            </div>
            <span
              className="mt-3 inline-flex items-center text-xs font-bold text-orange-700 group-hover:gap-1.5 transition-all gap-1"
            >
              Ver ofertas <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="absolute right-0 top-0 h-full w-32 opacity-20 bg-gradient-to-l from-orange-400 to-transparent" />
          <Package className="absolute right-4 h-20 w-20 rotate-6 text-orange-300 opacity-40" />
        </Link>

        {/* Banner 2: Envio via WhatsApp */}
        <Link
          href={`/${lang}/marketplace`}
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, oklch(0.94 0.05 145) 0%, oklch(0.90 0.08 148) 100%)" }}
        >
          <div className="flex flex-col gap-1 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">WhatsApp Direct</span>
            <p className="text-sm font-semibold text-foreground leading-snug">
              Contacto directo<br />e entrega segura
            </p>
            <p className="mt-1 text-xs text-emerald-800/70">Combina o teu ponto de entrega</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-1.5 transition-all">
              Falar connosco <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="absolute right-0 top-0 h-full w-32 opacity-20 bg-gradient-to-l from-emerald-400 to-transparent" />
          <MessageCircle className="absolute right-4 h-20 w-20 -rotate-6 text-emerald-300 opacity-40" />
        </Link>

        {/* Banner 3: Novidades */}
        <Link
          href={`/${lang}/marketplace?sort=new`}
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, oklch(0.93 0.03 270) 0%, oklch(0.88 0.06 265) 100%)" }}
        >
          <div className="flex flex-col gap-1 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Novidades</span>
            <p className="text-sm font-semibold text-foreground leading-snug">
              Descobre as últimas<br />tendências
            </p>
            <p className="mt-1 text-xs text-indigo-800/70">Produtos frescos todos os dias</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:gap-1.5 transition-all">
              Explorar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="absolute right-0 top-0 h-full w-32 opacity-20 bg-gradient-to-l from-indigo-400 to-transparent" />
          <Package className="absolute right-4 h-20 w-20 rotate-12 text-indigo-300 opacity-40" />
        </Link>
      </div>
    </section>
  );
}
