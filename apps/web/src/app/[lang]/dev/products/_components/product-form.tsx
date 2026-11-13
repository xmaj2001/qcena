"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface SpecRow {
  id: number;
  label: string;
  value: string;
}

interface ProductFormData {
  slug: string;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: { id: string; label: string; value: string }[];
}

interface ProductFormProps {
  lang: string;
  categories: { id: string; name: string }[];
  product?: ProductFormData;
  action: (formData: FormData) => Promise<void>;
}

export function ProductForm({ lang, categories, product, action }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const initialSpecs: SpecRow[] =
    product?.specs?.length
      ? product.specs.map((s, i) => ({ id: i, label: s.label, value: s.value }))
      : [{ id: 0, label: "", value: "" }];

  const [specs, setSpecs] = useState<SpecRow[]>(initialSpecs);
  const [nextId, setNextId] = useState(initialSpecs.length);

  function addSpec() {
    setSpecs((prev) => [...prev, { id: nextId, label: "", value: "" }]);
    setNextId((n) => n + 1);
  }

  function removeSpec(id: number) {
    setSpecs((prev) => prev.filter((s) => s.id !== id));
  }

  function updateSpec(id: number, field: "label" | "value", val: string) {
    setSpecs((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.set("lang", lang);

    // Remove direct specs from form inputs and append all current controlled state
    formData.delete("specs_label");
    formData.delete("specs_value");
    specs.forEach((spec) => {
      if (spec.label.trim()) {
        formData.append("specs_label", spec.label.trim());
        formData.append("specs_value", spec.value.trim());
      }
    });

    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/${lang}/dev/products`}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Voltar para lista de produtos
        </Link>
        <h1 className="text-2xl font-bold mt-2">
          {product ? "Editar Produto" : "Novo Produto"}
        </h1>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="lang" value={lang} />

        <div className="space-y-1">
          <Label htmlFor="slug">Slug (URL amigável)</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={product?.slug}
            required
            placeholder="iphone-15-pro-max"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name}
            required
            placeholder="iPhone 15 Pro Max 256GB"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            name="description"
            defaultValue={product?.description}
            required
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Descrição detalhada do produto..."
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            name="price"
            defaultValue={product?.price}
            required
            placeholder="150.000 Kz"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="categoryId">Categoria</Label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={product?.categoryId}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="stock">Estoque</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              defaultValue={product?.stock ?? 10}
              min={0}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="rating">Avaliação (Rating 0 a 5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min={0}
              max={5}
              defaultValue={product?.rating ?? 5.0}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="reviewsCount">Número de Avaliações</Label>
          <Input
            id="reviewsCount"
            name="reviewsCount"
            type="number"
            defaultValue={product?.reviewsCount ?? 0}
            min={0}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="images">Imagens (URLs separadas por vírgula)</Label>
          <textarea
            id="images"
            name="images"
            defaultValue={product?.images?.join(", ")}
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="https://exemplo.com/foto1.jpg, https://exemplo.com/foto2.jpg"
          />
        </div>

        {/* Especificações técnicas */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <Label>Especificações Técnicas</Label>
              <p className="text-xs text-muted-foreground">Ex: Memória: 256GB, Cor: Titânio Natural</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addSpec}>
              <Plus className="h-3 w-3 mr-1" />
              Adicionar Linha
            </Button>
          </div>
          <div className="space-y-2">
            {specs.map((spec) => (
              <div key={spec.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Nome (ex: Cor)"
                  value={spec.label}
                  onChange={(e) => updateSpec(spec.id, "label", e.target.value)}
                />
                <Input
                  placeholder="Valor (ex: Preto)"
                  value={spec.value}
                  onChange={(e) => updateSpec(spec.id, "value", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpec(spec.id)}
                  title="Remover especificação"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full mt-4">
          {isPending ? "Salvando alterações..." : "Salvar Produto"}
        </Button>
      </form>
    </div>
  );
}
