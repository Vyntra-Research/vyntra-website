import Link from "next/link";
import { Container } from "./section";
import { Logo } from "./logo";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-line text-ink-dim transition-colors hover:border-ink hover:text-ink"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        {children}
      </svg>
    </a>
  );
}

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
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://github.com/Vyntra-Research"
                label="GitHub"
              >
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
              </SocialLink>
              <SocialLink href="https://x.com/vyntrasec" label="X">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </SocialLink>
            </div>
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
