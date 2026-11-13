"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Dictionary } from "@/i18n/get-dictionary";
import { searchProductsAction } from "../../interactions";
import type { Product } from "../../types";
import { ProductSearchItems } from "./product-search-items";

interface ProductSearchProps {
  dictionary: Dictionary["navbar"];
  lang: string;
}

export function ProductSearch({ dictionary, lang }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    const normalizedQuery = query.trim();
    const currentRequestId = ++requestId.current;

    if (!isOpen || normalizedQuery.length < 2) {
      setProducts([]);
      setHasSearched(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      startTransition(async () => {
        const response = await searchProductsAction(normalizedQuery);
        if (requestId.current !== currentRequestId) return;
        setProducts(response?.data ?? []);
        setHasSearched(true);
      });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [isOpen, query]);

  return (
    <>
      <Button
        aria-label={dictionary.search}
        className="h-9 w-10 rounded-full border border-border bg-background p-0 text-foreground hover:bg-muted sm:w-64 sm:justify-between sm:px-4"
        onClick={() => setIsOpen(true)}
        type="button"
        variant="outline"
      >
        <span className="hidden truncate text-xs font-normal text-muted-foreground sm:block">
          {dictionary.searchPlaceholder}
        </span>
        <Search className="size-4 shrink-0 text-primary" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className="h-auto max-h-[76svh] w-[calc(100vw-2rem)] max-w-xl gap-0 overflow-y-auto rounded-xl border border-border bg-card p-0 shadow-xl"
          closeLabel={dictionary.close}
          side="center"
        >
          <SheetHeader className="border-b border-border/70 px-5 py-4 text-left">
            <SheetTitle>{dictionary.search}</SheetTitle>
            <SheetDescription>{dictionary.menuDescription}</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 p-5">
            <search>
              <form
                action={`/${lang}/products`}
                onSubmit={() => setIsOpen(false)}
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label={dictionary.search}
                    autoFocus
                    className="h-11 rounded-lg pl-10 pr-16"
                    name="q"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={dictionary.searchPlaceholder}
                    type="search"
                    value={query}
                  />
                  <Button
                    aria-label={dictionary.searchAction}
                    className="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-md"
                    size="icon"
                    type="submit"
                  >
                    <Search />
                  </Button>
                </div>
              </form>
            </search>

            <ProductSearchItems
              dictionary={dictionary}
              hasSearched={hasSearched}
              isPending={isPending}
              lang={lang}
              onPopularSearch={setQuery}
              products={products}
              query={query}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}