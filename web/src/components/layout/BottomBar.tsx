"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User } from "lucide-react";

export function BottomBar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Início", icon: Home, href: `/${lang}` },
    { label: "Procurar", icon: Search, href: `/${lang}/marketplace` },
    { label: "Favoritos", icon: Heart, href: `/${lang}/favorites` },
    { label: "Perfil", icon: User, href: `/${lang}/profile` },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background/90 backdrop-blur-lg lg:hidden pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-[var(--brand)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
