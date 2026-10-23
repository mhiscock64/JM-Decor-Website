export function barePath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  for (const prefix of ["/en", "/fr"]) {
    if (path === prefix) return "/";
    if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length) || "/";
  }
  return path;
}

export function localizedHref(href: string, locale: "en" | "fr") {
  const path = href.startsWith("/") ? href : `/${href}`;
  const bare = barePath(path);
  if (locale === "fr") return bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}
