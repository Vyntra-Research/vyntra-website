import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";

const ASSETS = [
  {
    n: "01",
    name: "Web apps",
    desc: "Aplicações web, SPAs, dashboards e fluxos autenticados.",
  },
  {
    n: "02",
    name: "APIs",
    desc: "REST, GraphQL, gRPC e contratos de integração.",
  },
  {
    n: "03",
    name: "Servidores",
    desc: "Infraestrutura exposta, serviços e superfícies de rede.",
  },
  {
    n: "04",
    name: "Apps mobile Android",
    desc: "APKs, comunicação, armazenamento e fluxos do app.",
  },
  {
    n: "05",
    name: "Código fonte",
    desc: "Revisão de código, auditoria e análise estática orientada.",
  },
  {
    n: "06",
    name: "IAs / LLMs",
    desc: "Prompts, agents, integrations e vetores de abuso de modelo.",
  },
];

export function Assets() {
  return (
    <Section id="assets">
      <Container className="py-20 md:py-28">
        <SectionHeader
          index="01"
          eyebrow="Assets suportados"
          title={
            <>
              Análise sobre os tipos de asset que importam para o seu produto.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            A Vyntra atua sobre superfícies modernas, do frontend ao backend,
            do mobile à camada de inteligência artificial.
          </p>
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((a) => (
            <Reveal key={a.n} delay={`${Number(a.n) * 40}ms`}>
              <div className="group flex h-full min-h-[180px] flex-col justify-between border-b border-r border-line p-8 transition-colors hover:bg-surface">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-ink-muted tabular-nums">
                    {a.n}
                  </span>
                  <span className="h-1.5 w-1.5 bg-ink-muted transition-colors group-hover:bg-ink" />
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <h3 className="text-base font-medium text-ink">{a.name}</h3>
                  <p className="text-xs leading-relaxed text-ink-dim">
                    {a.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
