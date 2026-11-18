import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

// Pick the best language from the browser's Accept-Language header.
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (isLocale(lang)) return lang;
  }
  return defaultLocale;
}

// Any URL without a language prefix (e.g. "/") is redirected to /en, /fr or /ar.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, static files (anything with a dot) and metadata routes.
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};
