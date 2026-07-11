import { Container } from "./section";
import { HexButton } from "./hex-button";
import { Highlight } from "./highlight";
import { Reveal } from "./reveal";
import { AsciiBackground } from "./ascii-background";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

export function Hero({ t, lang }: { t: Dictionary["hero"]; lang: Locale }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <AsciiBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_72%_at_30%_50%,rgba(0,0,0,0.6),transparent_72%)]"
      />
      <Container className="relative flex min-h-[92svh] flex-col justify-center pt-28 pb-16">
        <Reveal>
          <div className="relative flex w-fit max-w-full flex-wrap items-center gap-3">
            <span aria-hidden className="hero-kicker-protection" />
            <span className="relative z-10 eyebrow">{t.eyebrow1}</span>
            <span className="relative z-10 text-ink-muted text-xs">/</span>
            <span className="relative z-10 eyebrow">{t.eyebrow2}</span>
          </div>
        </Reveal>

        <Reveal delay="80ms">
          <h1 className="mt-8 max-w-4xl text-balance text-4xl leading-[1.08] font-medium md:text-6xl lg:text-[4.25rem]">
            {t.titlePre} <Highlight>{t.titleHighlight}</Highlight> {t.titlePost}
          </h1>
        </Reveal>

        <Reveal delay="160ms">
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
            {t.subhead}
          </p>
        </Reveal>

        <Reveal delay="240ms">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href={`#${sectionId(lang, "start")}`} comingSoon lang={lang}>{t.ctaPrimary}</HexButton>
            <HexButton href={`#${sectionId(lang, "engagements")}`} variant="ghost">
              {t.ctaSecondary}
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
