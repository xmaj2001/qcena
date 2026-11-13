import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { devCreateCategory } from "@/features/products/dev-interactions";

interface NewCategoryPageProps {
  params: Promise<{ lang: string }>;
}

export default async function NewCategoryPage({ params }: NewCategoryPageProps) {
  const { lang } = await params;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/${lang}/dev/categories`}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Voltar para categorias
        </Link>
        <h1 className="text-2xl font-bold mt-2">Nova Categoria</h1>
      </div>

      <form action={devCreateCategory} className="space-y-4">
        <input type="hidden" name="lang" value={lang} />

        <div className="space-y-1">
          <Label htmlFor="name">Nome da Categoria</Label>
          <Input id="name" name="name" required placeholder="Eletrônicos" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="slug">Slug (URL amigável)</Label>
          <Input id="slug" name="slug" required placeholder="eletronicos" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição (opcional)</Label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Breve descrição da categoria..."
          />
        </div>

        <Button type="submit" className="w-full">
          Criar Categoria
        </Button>
      </form>
    </div>
  );
}
