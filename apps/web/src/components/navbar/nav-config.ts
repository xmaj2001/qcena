import { env } from "@/env";
import {
  Handshake,
  Home,
  Info,
  type LucideIcon,
  Mail,
  ShoppingBag,
  Users,
} from "lucide-react";

export type NavKey =
  | "home"
  | "products"
  | "about"
  | "contact"
  | "community"
  | "partners";

export type SocialKey = "instagram" | "facebook" | "tiktok" | "whatsapp";

export interface NavItem {
  key: NavKey;
  path: string; // relativo ao idioma: "" = home
  icon: LucideIcon;
  enabled: boolean;
}

export interface SocialLink {
  key: SocialKey;
  href: string;
}

// Para ativar uma página futura, muda `enabled` para true.
export const NAV_ITEMS: NavItem[] = [
  { key: "home", path: "", icon: Home, enabled: true },
  { key: "products", path: "/products", icon: ShoppingBag, enabled: true },
  { key: "about", path: "/about", icon: Info, enabled: true },
  { key: "contact", path: "/contact", icon: Mail, enabled: true },
  { key: "community", path: "/community", icon: Users, enabled: false },
  { key: "partners", path: "/partners", icon: Handshake, enabled: false },
];

// Só aparecem as redes que tiverem URL no .env.
// Para ativar o TikTok: define NEXT_PUBLIC_TIKTOK_URL.
export function getSocialLinks(): SocialLink[] {
  const candidates: { key: SocialKey; href?: string }[] = [
    { key: "instagram", href: env.NEXT_PUBLIC_INSTAGRAM_URL },
    { key: "facebook", href: env.NEXT_PUBLIC_FACEBOOK_URL },
    { key: "tiktok", href: env.NEXT_PUBLIC_TIKTOK_URL },
  ];

  return candidates.flatMap(({ key, href }) => (href ? [{ key, href }] : []));
}

export function isNavActive(pathname: string, lang: string, path: string) {
  const href = `/${lang}${path}`;
  return path === ""
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}
