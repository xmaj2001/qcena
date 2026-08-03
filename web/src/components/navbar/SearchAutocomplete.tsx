"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useProducts } from "@/features/products/hooks/use-products";

interface SearchAutocompleteProps {
    lang: string;
}

export function SearchAutocomplete({ lang }: SearchAutocompleteProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce do valor digitado para disparar o useProducts
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Usamos o teu hook existente! Se debouncedQuery tiver valor, ele faz a busca.
    const { data, isLoading } = useProducts(
        debouncedQuery
            ? { search: debouncedQuery, limit: 5 }
            : undefined
    );

    const products = data?.items || [];

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Abre o dropdown se houver texto e a busca terminar
    useEffect(() => {
        if (debouncedQuery && products.length > 0) {
            setIsOpen(true);
        }
    }, [debouncedQuery, products]);

    const handleSelectSearch = (searchTerm: string) => {
        setIsOpen(false);
        if (!searchTerm.trim()) return;
        router.push(`/${lang}/marketplace?search=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSelectSearch(query);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full hidden md:block max-w-xs lg:max-w-sm">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => debouncedQuery && products.length > 0 && setIsOpen(true)}
                    placeholder="Buscar produtos, marcas…"
                    className="h-9 w-full rounded-full border border-border bg-background/50 pl-9 pr-8 text-xs outline-none focus:border-foreground/40 focus:bg-background transition-all"
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-border bg-popover/95 backdrop-blur-md text-popover-foreground shadow-2xl transition-all">
                    {products.length > 0 ? (
                        <ul className="max-h-64 overflow-y-auto p-1.5">
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    onClick={() => handleSelectSearch(product.name)}
                                    className="flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    <span className="font-medium truncate">{product.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !isLoading && debouncedQuery && (
                            <div className="p-3 text-center text-xs text-muted-foreground">
                                Nenhum produto encontrado
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}