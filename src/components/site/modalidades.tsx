import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { HexButton } from "./hex-button";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

type Mode = {
  tag: string;
  title: string;
  desc: string;
  items: readonly string[];
  cta: string;
};

function ModeCard({
  mode,
  featured,
  featuredLabel,
  lang,
}: {
  mode: Mode;
  featured?: boolean;
  featuredLabel?: string;
  lang: Locale;
}) {
  return (
    <div
      className={`signal-card flex h-full flex-col gap-8 border p-8 md:p-10 ${
        featured ? "border-line-strong bg-surface" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line pb-5">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
          {mode.tag}
        </span>
        {featured && featuredLabel && (
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink">
            {featuredLabel}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium text-ink md:text-3xl">{mode.title}</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-dim">{mode.desc}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-4">
        {mode.items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-sm text-ink-dim">
            <span className="mt-2 h-px w-3 shrink-0 bg-ink" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <HexButton href={`#${sectionId(lang, "start")}`} variant={featured ? "primary" : "ghost"} comingSoon lang={lang}>
          {mode.cta}
        </HexButton>
      </div>
    </div>
  );
}

export function Modalidades({ t, lang }: { t: Dictionary["modalidades"]; lang: Locale }) {
  return (
    <Section id={sectionId(lang, "engagements")}>
      <Container className="py-20 md:py-28">
        <SectionHeader index={t.index} eyebrow={t.eyebrow} title={t.title}>
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            {t.subhead}
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-2">
          <Reveal>
            <ModeCard mode={t.dedicado} featuredLabel={t.featured} lang={lang} />
          </Reveal>
          <Reveal delay="120ms">
            <ModeCard mode={t.continuo} featuredLabel={t.featured} featured lang={lang} />
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 text-xs leading-relaxed text-ink-muted">{t.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
