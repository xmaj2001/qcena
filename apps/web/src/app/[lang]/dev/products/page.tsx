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
import { devGetAllProducts } from "@/features/products/dev-queries";
import { devDeleteProduct } from "@/features/products/dev-interactions";

interface DevProductsPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DevProductsPage({ params }: DevProductsPageProps) {
  const { lang } = await params;
  const products = await devGetAllProducts();

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">Cadastre e gerencie os produtos do catálogo.</p>
        </div>
        <Button asChild>
          <Link href={`/${lang}/dev/products/new`}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Nenhum produto cadastrado no banco de dados.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div>
                    <span>{product.name}</span>
                    <span className="block text-xs text-muted-foreground font-mono">{product.slug}</span>
                  </div>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>★ {product.rating.toFixed(1)}</TableCell>
                <TableCell>{product.category?.name ?? "—"}</TableCell>
                <TableCell>{product.createdAt.toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${lang}/dev/products/${product.id}/edit`}>Editar</Link>
                    </Button>
                    <form action={devDeleteProduct.bind(null, product.id, lang)}>
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
