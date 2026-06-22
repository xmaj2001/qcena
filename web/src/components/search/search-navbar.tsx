"use client";

import { Button, CloseButton, Menu } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell, User } from "lucide-react";
import Search, { SearchSkeleton } from "./search";
import { authClient } from "@/lib/auth/auth-client";

export function SearchNavbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Buscar Serviços", href: "/search" },
    { name: "Sobre", href: "/about" },
    { name: "Baixe o App", href: "/app" },
    { name: "Contacto", href: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSearchPage = pathname?.startsWith("/search");

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/images/logo.png" alt="Qcena" width={25} height={25} />
            <span
              className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`}
            >
              cena
            </span>
          </Link>

          {/* Center Area: Search on search page, Nav Links elsewhere */}
          {isSearchPage ? (
            <div className="relative w-full max-w-md mx-4">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-300 relative group ${isScrolled ? "text-foreground/75 hover:text-foreground" : "text-white/75 hover:text-white"}`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-white"}`}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-full transition-all duration-500 ${isScrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"}`}
                aria-label="Alterar tema"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/bookings"
                  className={`text-xs font-semibold hover:underline transition-all duration-500 ${isScrolled ? "text-foreground" : "text-white"}`}
                >
                  Minhas Reservas
                </Link>

                {/* Notifications Bell */}
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className={`rounded-full transition-all duration-500 ${isScrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"}`}
                  aria-label="Notificações"
                >
                  <Bell className="h-4 w-4" />
                </Button>

                {/* Profile Widget */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 px-3 py-1 rounded-full border border-foreground/10 transition-all duration-300"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  ) : (
                    <div className={`p-1 rounded-full bg-neutral-200 dark:bg-neutral-800 ${isScrolled ? "text-foreground" : "text-neutral-400"}`}>
                      <User className="h-3 w-3" />
                    </div>
                  )}
                  <span
                    className={`font-semibold text-xs transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
                  >
                    {session.user.name}
                  </span>
                </Link>
              </div>
            ) : (
              <Link href="/sign-in">
                <Button
                  size="sm"
                  className={`rounded-full transition-all duration-500 ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : "bg-primary hover:bg-primary/90 text-black px-6"}`}
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Actions and Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-full transition-all duration-500 ${isScrolled ? "text-foreground" : "text-white"}`}
                aria-label="Alterar tema"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {session?.user && (
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                className={`rounded-full transition-all duration-500 ${isScrolled ? "text-foreground" : "text-white"}`}
                aria-label="Notificações"
              >
                <Bell className="h-4 w-4" />
              </Button>
            )}

            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseButton className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              variant="outline"
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Github
            </Button>
            {session?.user ? (
              <Link href="/bookings" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-foreground text-background rounded-full h-14 text-base"
                >
                  Minhas Reservas
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-foreground text-background rounded-full h-14 text-base"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
