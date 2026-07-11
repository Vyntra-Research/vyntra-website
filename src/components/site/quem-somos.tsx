import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { Highlight } from "./highlight";
import { PixelNoiseField } from "./pixel-noise-field";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

export function QuemSomos({ t, lang }: { t: Dictionary["quemSomos"]; lang: Locale }) {
  return (
    <Section id={sectionId(lang, "about")} className="overflow-hidden">
      <PixelNoiseField />
      <Container className="relative z-10 py-20 md:py-28">
        <SectionHeader index={t.index} eyebrow={t.eyebrow} title={
          <>
            {t.titlePre} <Highlight>{t.titleHighlight}</Highlight> {t.titlePost}
          </>
        } protectMarkerFromNoise>
          <p
            className="max-w-xl text-sm leading-relaxed text-ink-dim"
            data-noise-protection
          >
            {t.subhead}
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {t.principles.map((p) => (
              <Reveal key={p.n}>
                <div className="signal-card flex h-full flex-col gap-5 border border-transparent bg-base/95 p-8">
                  <span className="text-xs text-ink-muted tabular-nums">{p.n}</span>
                  <h3 className="text-base font-medium text-ink">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-dim">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay="120ms">
            <div className="signal-card flex h-full flex-col justify-between gap-6 border border-line bg-surface/95 p-8">
              <div className="flex flex-col gap-3">
                <span className="eyebrow">{t.founder.eyebrow}</span>
                <span className="text-lg font-medium text-ink">
                  {t.founder.handle}
                </span>
                <p className="text-xs leading-relaxed text-ink-dim">
                  {t.founder.desc}
                </p>
              </div>
              <a
                href="https://hackerone.com/rafabd1?type=user"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 border border-line-strong px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
              >
                {t.founder.cta}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
