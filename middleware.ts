import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.montrealweddingdecorations.com";
const REDIRECT_HOSTS = new Set(["jm-decor-website.vercel.app", "montrealweddingdecorations.com"]);

function withLocale(request: NextRequest, locale: "en" | "fr", rewritePath?: string) {
  const headers = new Headers(request.headers);
  headers.set("x-jm-locale", locale);
  const response = rewritePath
    ? NextResponse.rewrite(
        (() => {
          const url = request.nextUrl.clone();
          url.pathname = rewritePath;
          return url;
        })(),
        { request: { headers } },
      )
    : NextResponse.next({ request: { headers } });
  response.cookies.set("jm-decor-lang", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response;
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const { pathname, search } = request.nextUrl;
  const staff =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api" ||
    pathname.startsWith("/api/");
  if (!staff && REDIRECT_HOSTS.has(host)) {
    return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 301);
  }
  if (staff) return NextResponse.next();

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const stripped = pathname.replace(/^\/fr\/?/, "");
    const url = request.nextUrl.clone();
    url.pathname = stripped ? `/${stripped}` : "/";
    return NextResponse.redirect(url, 301);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname.replace(/^\/en\/?/, "");
    return withLocale(request, "en", stripped ? `/${stripped}` : "/");
  }

  return withLocale(request, "fr");
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"],
};
