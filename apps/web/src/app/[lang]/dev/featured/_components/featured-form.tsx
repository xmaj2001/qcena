"use client";

import { useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface FeaturedFormData {
  productId: string;
  title: string;
  subtitle: string;
  description: string;
  textColor: string;
  aspectRatio: number | null;
  bannerDesktop: string;
  bannerMobile: string;
}

interface FeaturedFormProps {
  lang: string;
  products: { id: string; name: string }[];
  featured?: FeaturedFormData;
  action: (formData: FormData) => Promise<void>;
}

export function FeaturedForm({ lang, products, featured, action }: FeaturedFormProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    formData.set("lang", lang);

    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/${lang}/dev/featured`}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Voltar para destaques
        </Link>
        <h1 className="text-2xl font-bold mt-2">
          {featured ? "Editar Destaque" : "Novo Destaque"}
        </h1>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="lang" value={lang} />

        <div className="space-y-1">
          <Label htmlFor="productId">Produto Vinculado</Label>
          <select
            id="productId"
            name="productId"
            defaultValue={featured?.productId}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione um produto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Título do Banner</Label>
          <Input
            id="title"
            name="title"
            defaultValue={featured?.title}
            required
            placeholder="Ex: Nova Coleção de Verão"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            name="subtitle"
            defaultValue={featured?.subtitle}
            required
            placeholder="Ex: Até 50% de desconto"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            name="description"
            defaultValue={featured?.description}
            required
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Descrição resumida do destaque para o banner..."
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="textColor">Cor do Texto no Banner</Label>
          <select
            id="textColor"
            name="textColor"
            defaultValue={featured?.textColor ?? "light"}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="light">Claro (Light - para fundos escuros)</option>
            <option value="dark">Escuro (Dark - para fundos claros)</option>
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="aspectRatio">Aspect Ratio (opcional)</Label>
          <Input
            id="aspectRatio"
            name="aspectRatio"
            type="number"
            step="0.01"
            defaultValue={featured?.aspectRatio ?? ""}
            placeholder="Ex: 2.13 ou deixe em branco"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="bannerDesktop">URL da Imagem Desktop (~2000x940)</Label>
          <Input
            id="bannerDesktop"
            name="bannerDesktop"
            defaultValue={featured?.bannerDesktop}
            required
            placeholder="https://exemplo.com/banner-desktop.jpg"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="bannerMobile">URL da Imagem Mobile (~800x2000)</Label>
          <Input
            id="bannerMobile"
            name="bannerMobile"
            defaultValue={featured?.bannerMobile}
            required
            placeholder="https://exemplo.com/banner-mobile.jpg"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Salvando..." : "Salvar Destaque"}
        </Button>
      </form>
    </div>
  );
}
