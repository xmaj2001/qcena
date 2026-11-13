// components/featured-grid.tsx
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

export function FeaturedGrid() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-[1.3fr_1fr]">
      {/* Card da Esquerda - Discover */}
      <div className="rounded-2xl bg-surface p-4">
        <Image
          src={"/featured/rack.jpg"}
          alt="Shirts and bags on rack"
          width={1024}
          height={720}
          className="h-56 w-full rounded-xl object-cover md:h-64"
        />
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl uppercase">Discover the unlimitless</h3>
            <p className="text-sm">-imagining new fashion trends -</p>
            <p className="mt-2 max-w-sm text-xs text-muted-foreground">
              A curation of timeless essentials designed to define. From
              understated basics to bold statements, discover styles that
              resonate.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-background">
              <Heart className="h-4 w-4" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Card da Direita - New Arrival */}
      <div className="flex flex-col rounded-2xl bg-surface p-6">
        <h3 className="text-2xl italic leading-tight md:text-3xl">
          Hold on, new product
          <br />
          is coming!
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          -Bringing you a new era of simple clothes.
        </p>
        <div className="relative mt-auto pt-10">
          <div className="absolute inset-x-6 top-4 h-10 rounded-2xl bg-background/60" />
          <div className="absolute inset-x-3 top-7 h-10 rounded-2xl bg-background/80" />
          <div className="relative flex gap-4 rounded-2xl bg-background p-3">
            <Image
              src={"/featured/arrival.jpg"}
              alt="Striped shirts"
              width={816}
              height={816}
              className="h-36 w-1/2 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-between py-2">
              <span className="text-lg">2024</span>
              <span className="text-xs">
                New Arrival
                <br />
                Clesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
