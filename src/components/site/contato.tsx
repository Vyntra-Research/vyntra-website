import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";
import { Highlight } from "./highlight";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionId, type Locale } from "@/i18n/config";

export function Contato({ t, lang }: { t: Dictionary["contato"]; lang: Locale }) {
  return (
    <Section id={sectionId(lang, "contact")}>
      <Container className="py-20 md:py-28">
        <SectionHeader index={t.index} eyebrow={t.eyebrow} title={
          <>
            {t.titlePre} <Highlight>{t.titleHighlight}</Highlight> {t.titlePost}
          </>
        }>
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            {t.subhead}
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm t={t.form} />
          </Reveal>
          <Reveal delay="120ms">
            <div className="flex h-full flex-col justify-between gap-8 border border-line bg-surface p-8">
              <div className="flex flex-col gap-6">
                <Channel label={t.channels.email.label} value={t.channels.email.value} />
                <Channel label={t.channels.response.label} value={t.channels.response.value} />
                <Channel label={t.channels.pgp.label} value={t.channels.pgp.value} />
              </div>
              <div className="border-t border-line pt-6">
                <p className="text-xs leading-relaxed text-ink-muted">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Channel({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-dim">
        {label}
      </span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}
