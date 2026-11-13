import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { devGetAllFeatured } from "@/features/products/dev-queries";
import { devDeleteFeatured } from "@/features/products/dev-interactions";

interface DevFeaturedPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DevFeaturedPage({ params }: DevFeaturedPageProps) {
  const { lang } = await params;
  const featured = await devGetAllFeatured();

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produtos em Destaque</h1>
          <p className="text-sm text-muted-foreground">Gerencie os banners e produtos da vitrine principal.</p>
        </div>
        <Button asChild>
          <Link href={`/${lang}/dev/featured/new`}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Destaque
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Cor do Texto</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featured.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhum produto em destaque cadastrado.
                </TableCell>
              </TableRow>
            )}
            {featured.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.product?.name ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={item.textColor === "dark" ? "default" : "secondary"}>
                    {item.textColor}
                  </Badge>
                </TableCell>
                <TableCell>{item.createdAt.toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${lang}/dev/featured/${item.id}/edit`}>Editar</Link>
                    </Button>
                    <form action={devDeleteFeatured.bind(null, item.id, lang)}>
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
