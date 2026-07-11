import { Container, Section } from "./section";
import { HexButton } from "./hex-button";
import { Reveal } from "./reveal";
import { Highlight } from "./highlight";
import { AttackPathIllustration } from "./attack-path-illustration";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

export function CtaFinal({ t, lang }: { t: Dictionary["ctaFinal"]; lang: Locale }) {
  return (
    <Section id={sectionId(lang, "start")} className="overflow-hidden border-b border-line">
      <AttackPathIllustration />
      <Container className="relative z-10 flex flex-col items-start gap-10 py-24 md:py-36">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="section-coordinate__index text-xs tabular-nums">{t.index}</span>
            <span className="eyebrow">{t.eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay="80ms">
          <h2 className="max-w-3xl text-balance text-3xl leading-[1.1] font-medium md:text-5xl lg:text-6xl">
            {t.titlePre} <Highlight>{t.titleHighlight}</Highlight>{t.titlePost}
          </h2>
        </Reveal>
        <Reveal delay="160ms">
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">
            {t.text}
          </p>
        </Reveal>
        <Reveal delay="240ms">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href={`#${sectionId(lang, "start")}`} comingSoon lang={lang}>{t.ctaPrimary}</HexButton>
            <HexButton href={`#${sectionId(lang, "contact")}`} variant="ghost">
              {t.ctaSecondary}
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
