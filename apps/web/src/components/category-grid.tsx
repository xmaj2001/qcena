// components/category-grid.tsx
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";

export interface Category {
  id: string;
  slug: string;
  image: string;
}

// Lista limpa com 4 ou 6 categorias em grade simétrica
const categories: Category[] = [
  {
    id: "1",
    slug: "outerwear",
    image: "/featured/rack.jpg",
  },
  {
    id: "2",
    slug: "new-arrivals",
    image: "/featured/arrival.jpg",
  },
  {
    id: "3",
    slug: "tops",
    image: "/featured/rack.jpg", // Substitua pela imagem correspondente se houver
  },
  {
    id: "4",
    slug: "bottoms",
    image: "/featured/arrival.jpg", // Substitua pela imagem correspondente se houver
  },
];

export function CategoryGrid({
  dictionary,
}: {
  dictionary: Dictionary["home"]["categories"];
}) {
  return (
    <section className="mt-12" id="categories">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          {dictionary.title}
        </h3>
        <span className="text-xs text-muted-foreground font-medium">
          {dictionary.subtitle}
        </span>
      </div>

      {/* Grid simétrico de 4 ou 6 elementos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, index) => {
          const item = dictionary.items[index];

          return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-surface p-3 border border-border/50 transition-all hover:shadow-lg hover:border-primary/40 flex flex-col justify-between"
          >
            {/* Imagem da Categoria */}
            <div className="relative overflow-hidden rounded-xl aspect-4/3 bg-muted">
              <Image
                src={cat.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
            </div>

            {/* Informações da Categoria */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                  <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.itemCount}
                </p>
              </div>

              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-background border border-border text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
