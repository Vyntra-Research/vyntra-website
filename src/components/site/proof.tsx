import { Container, Section } from "./section";
import { Reveal } from "./reveal";

type Case = { company: string; tag: string };

const CASES: Case[] = [
  { company: "GitHub", tag: "Vulnerability" },
  { company: "GitLab", tag: "CVE" },
  { company: "AT&T", tag: "Vulnerability" },
  { company: "Mozilla", tag: "Disclosure" },
  { company: "Vercel", tag: "Advisory" },
  { company: "GitHub", tag: "Report" },
  { company: "GitLab", tag: "Vulnerability" },
  { company: "Mozilla", tag: "Report" },
];

function CaseItem({ c }: { c: Case }) {
  return (
    <div className="mx-2 flex shrink-0 items-center gap-5 border border-line bg-base px-7 py-5">
      {/* Slot para a logo da empresa — trocar por <Image /> quando disponível */}
      <span className="grid h-7 w-7 shrink-0 place-items-center border border-line text-[0.6rem] text-ink-muted">
        {c.company.slice(0, 1)}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm tracking-[0.12em] text-ink">{c.company}</span>
        <span className="text-[0.58rem] uppercase tracking-[0.22em] text-ink-muted">
          {c.tag}
        </span>
      </div>
    </div>
  );
}

export function Proof() {
  const loop = [...CASES, ...CASES];
  return (
    <Section id="proof">
      <Container className="py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Pesquisa com histórico em</span>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
              Vulnerabilidades e CVEs encontrados pela pesquisa por trás da
              Vyntra em grandes empresas de tecnologia.
            </p>
          </div>
        </Reveal>
      </Container>

      <div className="marquee-edges relative overflow-hidden border-y border-line py-6">
        <div className="marquee-track flex w-max">
          {loop.map((c, i) => (
            <CaseItem key={`${c.company}-${c.tag}-${i}`} c={c} />
          ))}
        </div>
      </div>
    </Section>
  );
}
