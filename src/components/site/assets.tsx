import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { SignalField } from "./signal-field";
import type { Dictionary } from "@/i18n/dictionaries";

export function Assets({ t }: { t: Dictionary["assets"] }) {
  return (
    <Section id="assets" className="overflow-hidden">
      <SignalField variant="plus" className="signal-field--section" />
      <Container className="relative z-10 py-20 md:py-28">
        <SectionHeader index={t.index} eyebrow={t.eyebrow} title={t.title} layout="stacked">
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            {t.intro}
          </p>
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((a) => (
            <Reveal key={a.n}>
              <div className="signal-card group flex h-full min-h-[180px] flex-col justify-between border-b border-r border-line bg-base/90 p-8 transition-colors hover:bg-surface">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-ink-muted tabular-nums">{a.n}</span>
                  <span className="signal-node text-ink-muted transition-colors group-hover:text-ink" />
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <h3 className="text-base font-medium text-ink">{a.name}</h3>
                  <p className="text-xs leading-relaxed text-ink-dim">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
