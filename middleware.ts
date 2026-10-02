import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGES = new Set(["", "shop", "gallery", "quote", "wedding-decor-montreal"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const stripped = pathname.replace(/^\/fr\/?/, "") ;
    const segment = stripped.split("/").filter(Boolean)[0] ?? "";
    if (stripped !== "" && !PAGES.has(segment)) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = stripped ? `/${stripped}` : "/";
    const headers = new Headers(request.headers);
    headers.set("x-jm-locale", "fr");
    const response = NextResponse.rewrite(url, { request: { headers } });
    response.cookies.set("jm-decor-lang", "fr", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }
  const headers = new Headers(request.headers);
  headers.set("x-jm-locale", "en");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"],
};
