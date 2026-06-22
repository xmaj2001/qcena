import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_ROUTES = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldProtect = PROTECTED_ROUTES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!shouldProtect) return NextResponse.next();

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
