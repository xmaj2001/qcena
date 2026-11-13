import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { devGetCategoryById } from "@/features/products/dev-queries";
import { devUpdateCategory } from "@/features/products/dev-interactions";

interface EditCategoryPageProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id, lang } = await params;
  const category = await devGetCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/${lang}/dev/categories`}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Voltar para categorias
        </Link>
        <h1 className="text-2xl font-bold mt-2">Editar Categoria</h1>
      </div>

      <form action={devUpdateCategory.bind(null, id)} className="space-y-4">
        <input type="hidden" name="lang" value={lang} />

        <div className="space-y-1">
          <Label htmlFor="name">Nome da Categoria</Label>
          <Input id="name" name="name" required defaultValue={category.name} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={category.slug} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={category.description ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <Button type="submit" className="w-full">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
}
