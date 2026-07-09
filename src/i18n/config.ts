export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "pt-BR";
}

export function localeLabel(locale: Locale): string {
  return locale === "en" ? "EN" : "PT";
}
