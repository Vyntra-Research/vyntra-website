import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { Highlight } from "./highlight";

const PILLARS = [
  {
    n: "I",
    title: "Orientada por pesquisa",
    desc: "Metodologia de pesquisa ofensiva aplicada a escopos reais de produto.",
  },
  {
    n: "II",
    title: "Histórico verificável",
    desc: "Histórico em CVEs e vulnerabilidades reportadas a grandes empresas.",
  },
  {
    n: "III",
    title: "Acessível e previsível",
    desc: "Contratação direta, preço transparente e foco em resultado prático.",
  },
];

const PROOF = [
  { k: "CVEs", v: "publicados a partir da pesquisa" },
  {
    k: "5+",
    v: "grandes empresas notificadas",
  },
  {
    k: "30d",
    v: "ciclo do pentest contínuo",
  },
];

export function QuemSomos() {
  return (
    <Section id="quem-somos">
      <Container className="py-20 md:py-28">
        <SectionHeader
          index="03"
          eyebrow="Quem somos"
          title={
            <>
              Segurança ofensiva orientada por{" "}
              <Highlight>pesquisa</Highlight>.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            A Vyntra nasce da pesquisa ofensiva que encontrou{" "}
            <Highlight>CVEs</Highlight> e vulnerabilidades em empresas como
            GitHub, GitLab, AT&T, Mozilla e Vercel. O objetivo é tornar o
            pentest mais <Highlight>acessível</Highlight>, prático e
            previsível para devs, startups e times técnicos.
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={`${i * 80}ms`}>
              <div className="flex h-full flex-col gap-5 border border-transparent bg-base p-8 md:p-10">
                <span className="text-xs text-ink-muted tabular-nums">{p.n}</span>
                <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-dim">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 grid grid-cols-1 divide-y divide-line border border-line sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {PROOF.map((s) => (
              <div key={s.v} className="flex flex-col gap-2 p-8">
                <span className="text-3xl font-medium tracking-tight md:text-4xl">
                  {s.k}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
