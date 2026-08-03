"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
    X,
    Search,
    ShoppingBag,
    Heart,
    Bell,
    Layers,
    Sparkles,
    HelpCircle,
    MapPin,
    ChevronRight,
    LogOut,
    Loader2,
} from "lucide-react";
import { useMobileMenu } from "../contexts/MobileMenuContext";
import { ModeToggle } from "../ModeToggle";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { getCategoryIcon } from "@/features/categories/category-icons";

export function MobileSidebar({ lang }: { lang: string }) {
    const { isOpen, closeMenu } = useMobileMenu();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { categories, isLoading } = useCategories();

    const [searchVal, setSearchVal] = useState(searchParams.get("search") ?? "");
    const [isLoggedIn] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchVal.trim()) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("search", searchVal);
        router.push(`/${lang}/marketplace?${params.toString()}`);
        closeMenu();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop com Blur */}
            <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Drawer Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col bg-background p-5 shadow-2xl transition-transform duration-300 md:hidden border-r border-border">
                {/* Header da Sidebar */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                    <Link href={`/${lang}`} onClick={closeMenu} className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Logo Qcena" width={28} height={28} />
                        <span className="font-extrabold italic text-lg text-primary">Qcena</span>
                    </Link>
                    <button
                        onClick={closeMenu}
                        className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Fechar menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Input de Busca Mobile */}
                <form onSubmit={handleSearchSubmit} className="mt-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Buscar no marketplace..."
                            className="h-10 w-full rounded-xl border border-border bg-muted/50 pl-9 pr-4 text-xs outline-none focus:border-foreground/40 focus:bg-background transition-all"
                        />
                    </div>
                </form>

                {/* Conteúdo Rolável */}
                <div className="flex-1 overflow-y-auto py-4 space-y-6">
                    {/* Ações do Utilizador se estiver Logado */}
                    {isLoggedIn && (
                        <div className="rounded-2xl bg-muted/40 p-3 space-y-2 border border-border/50">
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-10 w-10 rounded-full ring-2 ring-primary/20"
                                    style={{
                                        background: "url(https://i.pravatar.cc/80?img=47) center/cover",
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate">Utilizador Qcena</p>
                                    <p className="text-[10px] text-muted-foreground truncate">user@email.com</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center">
                                <Link
                                    href="#"
                                    onClick={closeMenu}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background transition-colors"
                                >
                                    <ShoppingBag className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-medium">Pedidos</span>
                                </Link>
                                <Link
                                    href="#"
                                    onClick={closeMenu}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background transition-colors"
                                >
                                    <Heart className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-medium">Favoritos</span>
                                </Link>
                                <Link
                                    href="#"
                                    onClick={closeMenu}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background transition-colors"
                                >
                                    <Bell className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-medium">Alertas</span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Categorias Dinâmicas */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 px-1">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Categorias
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="space-y-2 py-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-9 w-full animate-pulse rounded-xl bg-muted/50"
                                    />
                                ))}
                            </div>
                        ) : (
                            <ul className="space-y-1">
                                {categories.map((c) => {
                                    const Icon = getCategoryIcon(c.icon);
                                    const params = new URLSearchParams();
                                    params.set("category", c.slug);

                                    return (
                                        <li key={c.id}>
                                            <Link
                                                href={`/${lang}/marketplace?${params.toString()}`}
                                                onClick={closeMenu}
                                                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{c.name}</span>
                                                </div>
                                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Links Principais */}
                    <div className="border-t border-border pt-4 space-y-1">
                        <Link
                            href={`/${lang}/marketplace`}
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium hover:bg-muted transition-colors"
                        >
                            <Sparkles className="h-4 w-4 text-[var(--brand)]" />
                            <span>Ver Todos os Produtos</span>
                        </Link>
                        <Link
                            href="#"
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium hover:bg-muted transition-colors text-muted-foreground"
                        >
                            <HelpCircle className="h-4 w-4" />
                            <span>Como Funciona</span>
                        </Link>
                        <Link
                            href="#"
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium hover:bg-muted transition-colors text-muted-foreground"
                        >
                            <MapPin className="h-4 w-4" />
                            <span>Pontos de Entrega</span>
                        </Link>
                    </div>
                </div>

                {/* Footer da Sidebar */}
                <div className="pt-4 border-t border-border space-y-3">
                    {!isLoggedIn ? (
                        <div className="flex flex-col gap-2">
                            <Link
                                href="#"
                                onClick={closeMenu}
                                className="w-full text-center py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-sm"
                                style={{ background: "var(--brand)" }}
                            >
                                Encomendar Agora
                            </Link>
                            <Link
                                href="#"
                                onClick={closeMenu}
                                className="w-full text-center py-2 rounded-full text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                            >
                                Entrar na Conta
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Terminar Sessão</span>
                        </button>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] text-muted-foreground">Tema da Aplicação</span>
                        <ModeToggle />
                    </div>
                </div>
            </aside>
        </>
    );
}