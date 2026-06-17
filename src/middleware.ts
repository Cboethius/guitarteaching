import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALE_COOKIE = "axe-school-locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const response = NextResponse.rewrite(url);
    response.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/de(?=\/|$)/, "") || "/";
    const response = NextResponse.rewrite(url);
    response.cookies.set(LOCALE_COOKIE, "de", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en", "/en/:path*", "/de", "/de/:path*"],
};
