"use client";

import { Globe, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Dictionary } from "@/i18n/get-dictionary";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  getSocialLinks,
  isNavActive,
  NAV_ITEMS,
  SocialLink,
} from "./nav-config";
import { socialIcons } from "./navbar-icons";
import { cn } from "cn";
import { NavbarMobile } from "./navbar-mobile";

interface NavbarProps {
  dictionary: Dictionary["navbar"];
  lang: string;
  search: ReactNode;
  siteName: string;
}

export function Navbar({ dictionary, lang, search, siteName }: NavbarProps) {
  const pathname = usePathname();
  const otherLanguage = lang === "pt" ? "en" : "pt";
  const localizedPath = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  const languageHref = `/${otherLanguage}${localizedPath}`;
  const items = NAV_ITEMS.filter((item) => item.enabled);
  const socials = getSocialLinks();
  const whatsapp: SocialLink = {
    key: "whatsapp",
    href: buildGeneralWhatsAppUrl(),
  };
  const WhatsAppIcon = socialIcons.whatsapp;

  return (
    <SidebarProvider className="min-h-0 w-full" defaultOpen={false}>
      <header className="sticky top-0 z-40 -mx-4 -mt-4 flex w-full min-w-0 flex-1 border-b border-border px-4 md:-mx-8 md:-mt-8 md:px-8">
        <div className="w-full">
          <div className="flex min-h-17 justify-between gap-2">
            <div className="flex items-center gap-2 justify-self-start">
              <Link
                aria-label={siteName}
                className="flex items-center justify-center gap-2 justify-self-center"
                href={`/${lang}`}
              >
                <Image
                  alt=""
                  className="size-8 object-contain"
                  height={32}
                  priority
                  src="/logo.png"
                  width={32}
                />
              </Link>
              <SidebarTrigger className="text-foreground" icon={<Menu />} />
              <div className="hidden items-center gap-3 lg:flex">
                <nav
                  aria-label={dictionary.mainNavigation}
                  className="hidden items-center gap-1 lg:flex"
                >
                  {items.map((item) => {
                    const active = isNavActive(pathname, lang, item.path);
                    return (
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-primary/10 hover:text-primary",
                        )}
                        href={`/${lang}${item.path}`}
                        key={item.key}
                      >
                        {dictionary.pages[item.key]}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            <nav className="flex items-center justify-self-end text-foreground">
              <div className="hidden items-center gap-0.5 sm:flex">
                {socials.map(({ key, href }) => {
                  const Icon = socialIcons[key];
                  return (
                    <Button
                      asChild
                      aria-label={dictionary[key]}
                      className="size-9"
                      key={key}
                      size="icon"
                      variant="ghost"
                    >
                      <a href={href} rel="noopener noreferrer" target="_blank">
                        <Icon />
                      </a>
                    </Button>
                  );
                })}
                <Button
                  asChild
                  aria-label={dictionary.whatsapp}
                  className="size-9 text-primary"
                  size="icon"
                  variant="ghost"
                >
                  <a
                    href={whatsapp.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={dictionary.whatsapp}
                  >
                    <WhatsAppIcon />
                  </a>
                </Button>
              </div>

              <Button
                asChild
                className="ml-1 px-2 text-xs"
                size="sm"
                variant="ghost"
              >
                <Link
                  aria-label={dictionary.language}
                  href={`/${otherLanguage}${localizedPath}`}
                  title={dictionary.language}
                >
                  <Globe className="mr-1 size-3.5" />
                  {otherLanguage.toUpperCase()}
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <NavbarMobile
        dictionary={dictionary}
        lang={lang}
        languageHref={languageHref}
        otherLanguage={otherLanguage}
        socials={[...socials, whatsapp]}
      />
    </SidebarProvider>
  );
}
