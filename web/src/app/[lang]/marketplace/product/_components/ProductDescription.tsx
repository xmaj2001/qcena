// app/marketplace/_components/ProductDescription.tsx
"use client";

import * as React from "react";
import { CheckCircle, Truck, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Componentes do Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductDescriptionProps {
  product: {
    id: string;
    name: string;
    price?: number; 
  };
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const productPrice = product.price || 45000; 
  const rating = 4.9;
  const totalReviews = 28;
  const estado = "Novo";
  const entrega = "24-48 horas";

  const waLink = `https://wa.me/244900000000?text=${encodeURIComponent(
    `Olá Qcena! Tenho interesse no produto: ${product.name}`
  )}`;

  return (
    <Card className="w-full border border-none bg-background backdrop-blur-md overflow-hidden sticky top-24 rounded-none">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground leading-tight">
            {product.name}
          </CardTitle>
        </div>
        
        {/* Avaliação e Reviews */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span className="text-xs font-bold ml-1 text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-muted-foreground text-xs font-mediumunderline cursor-pointer hover:text-[var(--brand)] transition-colors">
            {totalReviews} avaliações
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-4">
        {/* Bloco de Preço proeminente */}
        <div className="p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/40 border border-border/30">
          <span className="text-xs text-muted-foreground font-medium block mb-0.5">Preço</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">
              {productPrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </span>
            <span className="text-xs text-muted-foreground font-medium">/ unidade</span>
          </div>
        </div>

        {/* Metadados Rápidos de UX */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-border/20">
            <CheckCircle className="h-4 w-4 text-[var(--brand)] shrink-0" />
            <div>
              <span className="text-muted-foreground block text-[10px] font-medium uppercase">Estado</span>
              <span className="font-semibold text-foreground">{estado}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-border/20">
            <Truck className="h-4 w-4 text-[var(--brand)] shrink-0" />
            <div>
              <span className="text-muted-foreground block text-[10px] font-medium uppercase">Entrega</span>
              <span className="font-semibold text-foreground">{entrega}</span>
            </div>
          </div>
        </div>

        {/* Descrição Textual Texturizada */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          Este produto foi rigorosamente testado e avaliado pela nossa equipa de controlo de qualidade. Garantimos a autenticidade e o bom funcionamento. Entrega disponível em pontos seguros.
        </p>

        {/* Selo de Garantia e Confiança */}
        <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>Garantia de conformidade e suporte de 7 dias incluído.</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-2 bg-background border-t border-border/20">
        {/* Botão Principal de Conversão */}
        <a 
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center bg-[var(--brand)] hover:bg-[color-mix(in_oklab,var(--brand)_85%,black)] text-white font-bold rounded-xl h-11 shadow-md transition-all active:scale-[0.98]"
        >
          Tenho interesse
        </a>

        {/* Botão Secundário de Interação */}
        <Button 
          variant="outline" 
          className={cn(
            "w-full rounded-xl h-10 font-semibold border-border/60 text-xs transition-colors",
            isFavorite && "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 text-rose-500 hover:text-rose-600"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? "Remover dos Favoritos" : "Guardar na Lista de Desejos"}
        </Button>
      </CardFooter>
    </Card>
  );
}