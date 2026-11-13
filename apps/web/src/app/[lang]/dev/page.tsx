import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Package, Star, Tag } from "lucide-react";

interface DevDashboardPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DevDashboardPage({ params }: DevDashboardPageProps) {
  const { lang } = await params;

  const [productsCount, featuredCount, categoriesCount] = await Promise.all([
    prisma.product.count(),
    prisma.featuredProduct.count(),
    prisma.category.count(),
  ]);

  const cards = [
    {
      href: `/${lang}/dev/products`,
      label: "Produtos",
      count: productsCount,
      icon: Package,
      color: "text-blue-500",
      description: "Gerenciar produtos, estoque, preços e especificações",
    },
    {
      href: `/${lang}/dev/featured`,
      label: "Destaques",
      count: featuredCount,
      icon: Star,
      color: "text-amber-500",
      description: "Banners da homepage e produtos em destaque",
    },
    {
      href: `/${lang}/dev/categories`,
      label: "Categorias",
      count: categoriesCount,
      icon: Tag,
      color: "text-emerald-500",
      description: "Categorias para organizar os produtos",
    },
  ];

  return (
    <div className="py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Painel de Desenvolvimento</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Área restrita de desenvolvimento para gestão de catálogo (bloqueada em produção).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div className="text-3xl font-bold tracking-tight">{card.count}</div>
                <p className="text-xs text-muted-foreground mt-2">{card.description}</p>
              </div>
              <div className="text-xs font-medium text-primary mt-4 group-hover:underline">
                Acessar gerenciador →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
