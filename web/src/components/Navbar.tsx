// components/layout/Navbar.tsx
"use client";

import * as React from "react";
import { useEffect, useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, useParams, usePathname } from "next/navigation";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  Sparkles,
  Search,
  Bell,
  Heart,
  ShoppingBag,
  Globe,
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Moda",
    slug: "moda",
    description: "Roupas, calçados e acessórios de tendência.",
  },
  {
    title: "Beleza",
    slug: "beleza",
    description: "Cosméticos, perfumes e cuidados pessoais.",
  },
  {
    title: "Electrónicos",
    slug: "eletronicos",
    description: "Smartphones, headphones, smartwatches e gadgets.",
  },
  {
    title: "Casa & Vida",
    slug: "casa",
    description: "Utensílios, decoração e ferramentas para o lar.",
  },
  {
    title: "Desporto",
    slug: "desporto",
    description: "Equipamentos e vestuário desportivo.",
  },
  {
    title: "Acessórios",
    slug: "acessorios",
    description: "Relógios, óculos, malas e bijuteria.",
  },
];

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "pt";
  const [, startTransition] = useTransition();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState(searchParams.get("search") ?? "");

  // Estado booleano controlando se o usuário está logado
  const [isLoggedIn] = useState(true);

  // Captura o filtro atual da URL para estilizar os links se necessário
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sincroniza o input com a URL usando useTransition para não travar a UI
  const handleSearch = (term: string) => {
    setSearchVal(term);
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/${lang}/marketplace?${params.toString()}`);
    });
  };

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-500 ${
        isScrolled ? "top-4 px-4" : "top-0 px-0"
      }`}
    >
      <div
        className={`mx-auto flex h-16 items-center justify-between px-6 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl rounded-full border border-border shadow-lg max-w-6xl"
            : " max-w-7xl "
        }`}
      >
        {/* Lado Esquerdo: Logo e Barra de Busca */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          <Link
            href={`/${lang}`}
            className="text-2xl font-extrabold italic tracking-tight text-primary shrink-0"
          >
            <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
          </Link>

          {/* Input de Busca integrado na barra */}
          <div className="relative w-full hidden md:block max-w-xs lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar produtos, marcas…"
              className="h-9 w-full rounded-full border border-border bg-background/50 pl-9 pr-4 text-xs outline-none focus:border-foreground/40 focus:bg-background transition-all"
            />
          </div>
        </div>

        {/* Centro: Menu de Navegação */}
        <nav className="hidden lg:flex items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
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
                            "linear-gradient(160deg, var(--brand) 0%, #7a2e00 100%)",
                          color: "white",
                        }}
                      >
                        <Sparkles className="h-6 w-6" />
                        <div className="mt-4 mb-2 text-base font-semibold">
                          Loja Qcena
                        </div>
                        <p className="text-xs leading-tight opacity-90">
                          Descobre produtos selecionados com qualidade e bons preços.
                          Contacto directo via WhatsApp.
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
                    {categories.map((c) => {
                      const params = new URLSearchParams();
                      params.set("category", c.slug);
                      return (
                        <ListItem
                          key={c.title}
                          href={`/${lang}/marketplace?${params.toString()}`}
                          title={c.title}
                          className={
                            currentCategory === c.slug
                              ? "bg-accent/60 border-l-2"
                              : ""
                          }
                          style={
                            currentCategory === c.slug
                              ? { borderColor: "var(--brand)" }
                              : undefined
                          }
                        >
                          {c.description}
                        </ListItem>
                      );
                    })}
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

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={`${navigationMenuTriggerStyle()} text-xs font-medium`}
                >
                  Ofertas
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Lado Direito: Ações Contextuais baseado no Login */}
        <div className="flex items-center gap-4 justify-end flex-1">
          <ModeToggle />
          <LanguageToggle />
          {isLoggedIn ? (
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
          )}
        </div>
      </div>
    </header>
  );
}

// Wrapper com Suspense isolando a leitura de query params
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

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink
          href={href || "#"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-xs font-bold leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-xs mt-1 leading-snug text-muted-foreground">
            {children}
          </p>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

function LanguageToggle() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "pt";

  const changeLanguage = (newLang: string) => {
    if (newLang === lang) return;

    const segments = pathname.split("/");
    if (segments[1] === "pt" || segments[1] === "en") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }

    router.push(segments.join("/"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" />}>
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Mudar idioma / Change language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("pt")} className={lang === "pt" ? "font-bold text-[var(--brand)]" : ""}>
          Português (PT)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")} className={lang === "en" ? "font-bold text-[var(--brand)]" : ""}>
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
