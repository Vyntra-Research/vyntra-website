export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

const sectionIds = {
  pt: {
    engagements: "modalidades",
    about: "quem-somos",
    pricing: "precificacao",
    contact: "contato",
    start: "iniciar",
  },
  en: {
    engagements: "engagements",
    about: "about",
    pricing: "pricing",
    contact: "contact",
    start: "start",
  },
} as const;

export type SectionKey = keyof typeof sectionIds.pt;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "pt-BR";
}

export function localeLabel(locale: Locale): string {
  return locale === "en" ? "EN" : "PT";
}

export function sectionId(locale: Locale, section: SectionKey): string {
  return sectionIds[locale][section];
}

export function sectionHref(locale: Locale, section: SectionKey): string {
  return `/${locale}#${sectionId(locale, section)}`;
}

export function comingSoonLabel(locale: Locale): string {
  return locale === "en" ? "Coming soon" : "Em breve";
}
