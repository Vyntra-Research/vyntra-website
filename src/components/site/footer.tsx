import Link from "next/link";
import { Container } from "./section";
import { Logo } from "./logo";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function Footer({ t, lang }: { t: Dictionary["footer"]; lang: Locale }) {
  const base = `/${lang}`;
  const NAV = [
    { href: `${base}#modalidades`, label: t.navModalidades },
    { href: `${base}#quem-somos`, label: t.navQuemSomos },
    { href: `${base}#precificacao`, label: t.navPrecificacao },
    { href: `${base}#contato`, label: t.navContato },
  ];

  return (
    <footer className="relative">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-xs leading-relaxed text-ink-dim">{t.desc}</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow">{t.navLabel}</span>
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow">{t.divisionsLabel}</span>
            {t.divisions.map((d) => (
              <div key={d.name} className="flex flex-col gap-1">
                <span className="text-sm text-ink">{d.name}</span>
                <span className="text-xs text-ink-muted">{d.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>{t.copyright}</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-ink" />
              {t.status}
            </span>
            <span>{t.location}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
