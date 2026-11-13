"use client";

import { Globe, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import {
  isNavActive,
  NAV_ITEMS,
  type NavKey,
  type SocialLink,
} from "./nav-config";
import { socialIcons } from "./navbar-icons";

interface NavbarMobileProps {
  dictionary: Dictionary["navbar"];
  lang: string;
  languageHref: string;
  otherLanguage: string;
  socials: SocialLink[];
}

// Páginas que ficam na barra; as restantes (comunidade, parceiros...) vão para "Mais".
const BAR_KEYS: readonly NavKey[] = ["home", "products", "about", "contact"];

export function NavbarMobile({
  dictionary,
  lang,
  languageHref,
  otherLanguage,
  socials,
}: NavbarMobileProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = NAV_ITEMS.filter((item) => item.enabled);
  const barItems = items.filter((item) => BAR_KEYS.includes(item.key));
  const moreItems = items.filter((item) => !BAR_KEYS.includes(item.key));

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Barra de navegação */}
      <nav
        aria-label={dictionary.mainNavigation}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg">
          {barItems.map(({ key, path, icon: Icon }) => {
            const active = isNavActive(pathname, lang, path);
            return (
              <li className="flex-1" key={key}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium"
                  href={`/${lang}${path}`}
                >
                  <span
                    className={cn(
                      "grid h-7 w-12 place-items-center rounded-full transition-colors duration-300",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={
                      active ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {dictionary.pages[key]}
                  </span>
                </Link>
              </li>
            );
          })}

          <li className="flex-1">
            <button
              aria-expanded={open}
              aria-haspopup="dialog"
              className="flex w-full flex-col items-center gap-1 py-2 text-[11px] font-medium"
              onClick={() => setOpen(true)}
              type="button"
            >
              <span className="grid h-7 w-12 place-items-center rounded-full text-muted-foreground">
                <MoreHorizontal className="size-5" />
              </span>
              <span className="text-muted-foreground">{dictionary.more}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Folha "Mais" */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          !open && "pointer-events-none",
        )}
        inert={!open}
      >
        <button
          aria-label={dictionary.close}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300 motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={close}
          tabIndex={-1}
          type="button"
        />

        <div
          aria-label={dictionary.more}
          aria-modal="true"
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[85svh] space-y-5 overflow-y-auto rounded-t-2xl border-t border-border bg-background px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "translate-y-0" : "translate-y-full",
          )}
          role="dialog"
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-border" />

          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              {dictionary.more}
            </h2>
            <button
              aria-label={dictionary.close}
              className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
              onClick={close}
              ref={closeRef}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Páginas secundárias (só aparecem quando existirem) */}
          {moreItems.length > 0 && (
            <ul className="space-y-1">
              {moreItems.map(({ key, path, icon: Icon }) => (
                <li key={key}>
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    href={`/${lang}${path}`}
                    onClick={close}
                  >
                    <Icon className="size-5 text-primary" />
                    {dictionary.pages[key]}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Redes sociais */}
          {socials.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {dictionary.socials}
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {socials.map(({ key, href }) => {
                  const Icon = socialIcons[key];
                  return (
                    <li key={key}>
                      <a
                        className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                        href={href}
                        onClick={close}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Icon className="size-5 text-primary" />
                        {dictionary[key]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Idioma */}
          <Link
            className="flex items-center justify-between rounded-xl border border-border px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
            href={languageHref}
            onClick={close}
          >
            <span className="flex items-center gap-2.5">
              <Globe className="size-5 text-primary" />
              {dictionary.language}
            </span>
            <span className="text-xs font-bold text-primary">
              {otherLanguage.toUpperCase()}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
