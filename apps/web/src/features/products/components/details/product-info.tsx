import { Star } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import type { APIProductDetails } from "../../types";

interface ProductInfoProps {
  p: APIProductDetails;
  lang: string;
  dictionary: Dictionary["products"]["details"];
}

export function ProductInfo({ p, lang, dictionary }: ProductInfoProps) {
  const inStock = p.stock > 0;
  const hasReviews = p.reviews > 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <header className="space-y-3">
        <span className="inline-flex rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          {p.category}
        </span>

        <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-4xl">
          {p.name}
        </h1>

        {hasReviews && (
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">
              {p.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({dictionary.reviewsCount.replace("{count}", String(p.reviews))})
            </span>
          </div>
        )}
      </header>

      {/* Preço, disponibilidade e ação */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {dictionary.priceLabel}
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {p.price}
            </p>
          </div>

          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              inStock
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {inStock
              ? dictionary.inStock.replace("{count}", String(p.stock))
              : dictionary.outOfStock}
          </span>
        </div>

        {inStock ? (
          <div className="space-y-2">
            <WhatsAppButton
              product={p}
              lang={lang}
              label={dictionary.orderOnWhatsApp}
            />
            <p className="text-xs text-muted-foreground">
              {dictionary.whatsappHint}
            </p>
          </div>
        ) : (
          <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            {dictionary.unavailableHint}
          </p>
        )}
      </section>

      {/* Descrição */}
      <section className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          {dictionary.about}
        </h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>
      </section>

      {/* Especificações */}
      {p.specs.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {dictionary.specifications}
          </h2>
          <dl className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-card">
            {p.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
              >
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="text-right font-medium text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
