import { type NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n/config";
import { createClient as updateSupabaseSession } from "@/utils/supabase/middleware";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return updateSupabaseSession(request);
  }

  // Detect preferred language from Accept-Language header
  const acceptLanguage =
    request.headers.get("accept-language")?.toLowerCase() ?? "";
  let matchedLocale: string = i18n.defaultLocale;

  for (const locale of i18n.locales) {
    if (acceptLanguage.includes(locale)) {
      matchedLocale = locale;
      break;
    }
  }

  const redirectUrl = new URL(
    `/${matchedLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
    request.url,
  );
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
