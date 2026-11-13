import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { devGetAllCategories } from "@/features/products/dev-queries";
import { devDeleteCategory } from "@/features/products/dev-interactions";

interface DevCategoriesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DevCategoriesPage({ params }: DevCategoriesPageProps) {
  const { lang } = await params;
  const categories = await devGetAllCategories();

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground">Gerencie as categorias de produtos.</p>
        </div>
        <Button asChild>
          <Link href={`/${lang}/dev/categories/new`}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhuma categoria cadastrada.
                </TableCell>
              </TableRow>
            )}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="font-mono text-xs">{category.slug}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {category.description ?? "—"}
                </TableCell>
                <TableCell>{category.createdAt.toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${lang}/dev/categories/${category.id}/edit`}>Editar</Link>
                    </Button>
                    <form action={devDeleteCategory.bind(null, category.id, lang)}>
                      <Button type="submit" variant="destructive" size="sm">
                        Deletar
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
