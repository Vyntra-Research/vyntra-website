import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { Highlight } from "./highlight";

const PRINCIPLES = [
  {
    n: "I",
    title: "Sem playbook cego",
    desc: "Vamos além de checklists e scanners automáticos. Cada escopo é analisado no detalhe, manualmente.",
  },
  {
    n: "II",
    title: "Mentalidade de atacante",
    desc: "Pensamos de forma criativa, encadeando falhas como quem de fato tenta invadir o seu produto.",
  },
  {
    n: "III",
    title: "Pesquisa aplicada",
    desc: "Transformamos pesquisa ofensiva real — a mesma que encontrou CVEs — em análise para o seu escopo.",
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
              Pensamos como um <Highlight>atacante real</Highlight> — não como
              um checklist.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            A Vyntra nasce da pesquisa que encontrou falhas e{" "}
            <Highlight>CVEs</Highlight> em grandes empresas de tecnologia.
            Somos formados por pesquisadores que recusam o pentest mecânico:
            testamos pensando de forma criativa, como um atacante de verdade.
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={`${i * 80}ms`}>
                <div className="flex h-full flex-col gap-5 border border-transparent bg-base p-8">
                  <span className="text-xs text-ink-muted tabular-nums">{p.n}</span>
                  <h3 className="text-base font-medium text-ink">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-dim">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay="120ms">
            <div className="flex h-full flex-col justify-between gap-6 border border-line bg-surface p-8">
              <div className="flex flex-col gap-3">
                <span className="eyebrow">Pesquisador fundador</span>
                <span className="text-lg font-medium text-ink">@rafabd1</span>
                <p className="text-xs leading-relaxed text-ink-dim">
                  Perfil público no HackerOne, com histórico de relatórios e
                  pesquisas em grandes empresas.
                </p>
              </div>
              <a
                href="https://hackerone.com/rafabd1?type=user"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 border border-line-strong px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
              >
                Ver perfil →
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
