"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    CircleAlertIcon,
    CircleCheckIcon,
    CircleDashedIcon,
    Bell,
    Heart,
    ShoppingBag,
    Menu,
    Store,
} from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "../ModeToggle";
import { useMobileMenu } from "../contexts/MobileMenuContext";
import { useCategories } from "@/features/categories/hooks/useCategories";

import { SearchAutocomplete } from "./SearchAutocomplete";
import { LanguageToggle } from "./LanguageToggle";
import { ListItem } from "./ListItem";

function NavbarContent() {
    const params = useParams();
    const lang = (params?.lang as string) || "pt";

    const { toggleMenu } = useMobileMenu();
    const { categories, isLoading } = useCategories();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed z-50 w-full transition-all duration-500 ${isScrolled ? "md:top-4 md:px-4 top-0 px-0" : "top-0 px-0"
                }`}
        >
            <div
                className={`mx-auto flex h-16 items-center justify-between px-4 sm:px-6 transition-all duration-500 ${isScrolled
                    ? "bg-background/80 backdrop-blur-xl md:rounded-full md:border border-b border-border shadow-lg md:max-w-6xl w-full"
                    : " w-full md:max-w-7xl "
                    }`}
            >
                {/* Esquerda: Menu, Logo e Autocomplete */}
                <div className="flex items-center gap-2 sm:gap-6 flex-1 max-w-xl">
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 -ml-2 text-foreground hover:opacity-80 transition-opacity"
                        aria-label="Abrir Menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <Link
                        href={`/${lang}`}
                        className="text-2xl font-extrabold italic tracking-tight text-primary shrink-0"
                    >
                        <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
                    </Link>

                    <SearchAutocomplete lang={lang} />
                </div>

                {/* Centro: Menu Desktop */}
                <nav className="hidden lg:flex items-center justify-center">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href={`/${lang}/marketplace`}
                                    className={`${navigationMenuTriggerStyle()} text-xs font-medium`}
                                >
                                    <Store className="h-4 w-4 mr-1.5" />
                                    <span>Produtos</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-xs font-medium">
                                    Explorar
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[420px] lg:w-[520px] lg:grid-cols-[.9fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink
                                                href={`/${lang}/marketplace`}
                                                className="flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md transition-shadow select-none cursor-pointer"
                                                style={{
                                                    background:
                                                        "linear-gradient(160deg, var(--brand) 0%, #c95812ff 100%)",
                                                    color: "white",
                                                }}
                                            >
                                                <Image
                                                    src={"/logo-white.png"}
                                                    width={100}
                                                    height={100}
                                                    alt="Logo Qcena"
                                                />
                                                <div className="mt-4 mb-2 text-base font-semibold">
                                                    Loja Qcena
                                                </div>
                                                <p className="text-xs leading-tight opacity-90">
                                                    Descobre produtos selecionados com qualidade e bons preços.
                                                </p>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href={`/${lang}/marketplace`} title="Ver Produtos">
                                            Navega por centenas de produtos verificados.
                                        </ListItem>
                                        <ListItem href="#" title="Como Funciona">
                                            Escolhe, fala connosco e combina a entrega.
                                        </ListItem>
                                        <ListItem href="#" title="Pontos de Entrega">
                                            Entrega segura num ponto combinado perto de ti.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-xs font-medium">
                                    Categorias
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[520px] gap-3 p-4 md:grid-cols-2 lg:w-[620px]">
                                        {isLoading ? (
                                            <li className="col-span-2 p-4 text-center text-xs text-muted-foreground">
                                                A carregar categorias...
                                            </li>
                                        ) : (
                                            categories.map((c) => {
                                                const params = new URLSearchParams();
                                                params.set("category", c.slug);
                                                return (
                                                    <ListItem
                                                        key={c.id}
                                                        href={`/${lang}/marketplace?${params.toString()}`}
                                                        title={c.name}
                                                    >
                                                        {c.description}
                                                    </ListItem>
                                                );
                                            })
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {isLoggedIn && (
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-xs font-medium">
                                        Status
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[260px] gap-1 p-2">
                                            <ListItem
                                                href="#"
                                                title="Pedidos ativos"
                                                icon={
                                                    <CircleDashedIcon
                                                        className="h-3.5 w-3.5"
                                                        style={{ color: "var(--brand)" }}
                                                    />
                                                }
                                            >
                                                Entregas em andamento.
                                            </ListItem>
                                            <ListItem
                                                href="#"
                                                title="Concluídos"
                                                icon={
                                                    <CircleCheckIcon className="h-3.5 w-3.5 text-emerald-600" />
                                                }
                                            >
                                                Histórico finalizado.
                                            </ListItem>
                                            <ListItem
                                                href="#"
                                                title="Disputas"
                                                icon={
                                                    <CircleAlertIcon className="h-3.5 w-3.5 text-red-500" />
                                                }
                                            >
                                                Centro de resolução.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Direita */}
                <div className="flex items-center gap-4 justify-end flex-1">
                    <ModeToggle />
                    <LanguageToggle />
                    {/* {isLoggedIn ? (
                        <div className="flex items-center gap-4 text-foreground">
                            <button
                                className="relative p-1.5 hover:bg-muted rounded-full transition-colors hidden sm:block"
                                aria-label="Pedidos"
                            >
                                <ShoppingBag className="h-4 w-4" />
                            </button>
                            <button
                                className="relative p-1.5 hover:bg-muted rounded-full transition-colors hidden sm:block"
                                aria-label="Favoritos"
                            >
                                <Heart className="h-4 w-4" />
                            </button>
                            <button
                                className="relative p-1.5 hover:bg-muted rounded-full transition-colors"
                                aria-label="Notificações"
                            >
                                <Bell className="h-4 w-4" />
                                <span
                                    className="absolute right-0.5 top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                                    style={{ background: "var(--brand)" }}
                                >
                                    3
                                </span>
                            </button>

                            <div
                                className="h-8 w-8 rounded-full ring-2 ring-border/50 cursor-pointer hover:scale-105 transition-transform"
                                style={{
                                    background:
                                        "url(https://i.pravatar.cc/80?img=47) center/cover",
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <Link
                                href="#"
                                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                                style={{ background: "var(--brand)" }}
                            >
                                Encomendar
                            </Link>
                        </>
                    )} */}
                </div>
            </div>
        </header>
    );
}

export function Navbar() {
    return (
        <Suspense
            fallback={
                <div className="fixed top-0 left-0 h-16 w-full bg-background/20 backdrop-blur" />
            }
        >
            <NavbarContent />
        </Suspense>
    );
}