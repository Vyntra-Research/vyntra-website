import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { HexButton } from "./hex-button";
import { Highlight } from "./highlight";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

export function Precificacao({ t, lang }: { t: Dictionary["precificacao"]; lang: Locale }) {
  return (
    <Section id={sectionId(lang, "pricing")} className="overflow-hidden">
      <div aria-hidden className="scope-watermark">
        <span className="scope-watermark__frame scope-watermark__frame--outer" />
        <span className="scope-watermark__frame scope-watermark__frame--middle" />
        <span className="scope-watermark__frame scope-watermark__frame--inner" />
        <span className="scope-watermark__axis scope-watermark__axis--x" />
        <span className="scope-watermark__axis scope-watermark__axis--y" />
        <span className="scope-watermark__origin signal-node" />
      </div>
      <Container className="relative z-10 py-20 md:py-28">
        <SectionHeader index={t.index} eyebrow={t.eyebrow} title={
          <>
            {t.titlePre} <Highlight>{t.titleHighlight}</Highlight> {t.titlePost}
          </>
        }>
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            {t.subhead}
          </p>
        </SectionHeader>

        <Reveal>
          <div className="mt-14 flex flex-col gap-8 border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  {t.dedicated.tag1}
                </span>
                <span className="h-px w-6 bg-line-strong" />
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  {t.dedicated.tag2}
                </span>
              </div>
              <h3 className="text-2xl font-medium text-ink md:text-3xl">
                {t.dedicated.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-dim">
                {t.dedicated.desc}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="text-sm text-ink-dim">{t.dedicated.price}</span>
              <HexButton href={`#${sectionId(lang, "start")}`} comingSoon lang={lang}>{t.dedicated.cta}</HexButton>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  {t.continuous.tag1}
                </span>
                <span className="h-px w-6 bg-line-strong" />
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  {t.continuous.tag2}
                </span>
              </div>
              <h3 className="text-xl font-medium text-ink md:text-2xl">
                {t.continuous.title}
              </h3>
              <p className="max-w-md text-xs leading-relaxed text-ink-dim">
                {t.continuous.desc}
              </p>
            </div>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-muted">
              {t.plansLabel}
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-px bg-line lg:grid-cols-3">
          {t.plans.map((p, i) => (
            <Reveal key={p.name} delay={`${i * 80}ms`}>
              <div
                className={`signal-card flex h-full flex-col gap-6 border border-transparent p-8 md:p-9 ${
                  p.name === "Plus" ? "bg-surface-2" : "bg-base"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-medium tracking-tight text-ink">
                    {p.name}
                  </h4>
                  {p.name === "Plus" && (
                    <span className="border border-line-strong px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ink-dim">
                      {t.popular}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-y border-line py-5">
                  <span className="text-sm text-ink">{p.for}</span>
                  <span className="text-xs leading-relaxed text-ink-dim">
                    {p.desc}
                  </span>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-xs text-ink-dim"
                    >
                      <span className="mt-1.5 h-px w-2.5 shrink-0 bg-ink-muted" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-xs text-ink-muted">{t.planFooter}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-3 border border-line bg-base p-6 text-xs leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <span>{t.note}</span>
            <HexButton href={`#${sectionId(lang, "start")}`} variant="ghost" className="px-5 py-2.5 text-[0.6rem]" comingSoon lang={lang}>
              {t.noteCta}
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
