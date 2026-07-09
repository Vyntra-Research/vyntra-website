import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookie)) return cookie;
  const header = request.headers.get("accept-language") ?? "";
  const langs = header.split(",").map((l) => l.split(";")[0].trim().toLowerCase());
  for (const l of langs) {
    if (l.startsWith("en")) return "en";
    if (l.startsWith("pt")) return "pt";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (hasLocale) {
    const current = request.cookies.get("NEXT_LOCALE")?.value;
    const segLocale = pathname.split("/")[1];
    if (isLocale(segLocale) && current !== segLocale) {
      const res = NextResponse.next();
      res.cookies.set("NEXT_LOCALE", segLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return res;
    }
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon|robots.txt|sitemap.xml|assets|.*\\..*).*)",
  ],
};
