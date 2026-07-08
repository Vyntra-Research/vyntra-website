import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { HexButton } from "./hex-button";
import { Highlight } from "./highlight";

const PLANS = [
  {
    name: "Lite",
    for: "Escopo pequeno",
    desc: "Assets únicos de pequeno porte que precisam de análise recorrente.",
    points: ["1 asset pequeno", "Pentest a cada 30 dias", "Relatório por ciclo"],
  },
  {
    name: "Plus",
    for: "Escopo médio",
    desc: "Equilíbrio entre cobertura e custo para produtos em crescimento.",
    points: ["Até 3 assets pequenos", "ou 1 asset médio", "Pentest a cada 30 dias"],
    featured: true,
  },
  {
    name: "Harden",
    for: "Escopo grande",
    desc: "Cobertura ampliada para produtos com maior superfície de ataque.",
    points: ["Alvos maiores", "Cobertura ampliada", "Pentest a cada 30 dias"],
  },
];

export function Precificacao() {
  return (
    <Section id="precificacao">
      <Container className="py-20 md:py-28">
        <SectionHeader
          index="04"
          eyebrow="Precificação"
          title={
            <>
              Preço transparente. Você cadastra o escopo e recebe o orçamento{" "}
              <Highlight>na hora</Highlight>.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            O orçamento sai automaticamente a partir do porte do escopo —
            pequeno, médio ou grande. Depois nossa equipe confirma as
            informações e fica disponível ao longo de todo o processo. Prático
            do orçamento à execução, com previsibilidade e confiabilidade. O
            pentest contínuo tem valor mensal abaixo do equivalente dedicado.
          </p>
        </SectionHeader>

        {/* Dedicated */}
        <Reveal>
          <div className="mt-14 flex flex-col gap-8 border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  Síncrono
                </span>
                <span className="h-px w-6 bg-line-strong" />
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  Dedicado
                </span>
              </div>
              <h3 className="text-2xl font-medium text-ink md:text-3xl">
                Pentest dedicado / síncrono
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-dim">
                Execução focada sobre um escopo definido, com entrega de
                relatório. Garantia de retorno: dinheiro de volta ou desconto.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="text-sm text-ink-dim">
                Preço por porte do escopo
              </span>
              <HexButton href="#iniciar">Cadastrar escopo</HexButton>
            </div>
          </div>
        </Reveal>

        {/* Continuous plans */}
        <Reveal>
          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  Assíncrono
                </span>
                <span className="h-px w-6 bg-line-strong" />
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                  Contínuo
                </span>
              </div>
              <h3 className="text-xl font-medium text-ink md:text-2xl">
                Pentest contínuo / assíncrono
              </h3>
              <p className="max-w-md text-xs leading-relaxed text-ink-dim">
                Assinatura mensal com um pentest a cada 30 dias. Escolha o plano
                pelo porte do escopo.
              </p>
            </div>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-muted">
              Planos
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-px bg-line lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={`${i * 80}ms`}>
              <div
                className={`flex h-full flex-col gap-6 border border-transparent p-8 md:p-9 ${
                  p.featured ? "bg-surface-2" : "bg-base"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-medium tracking-tight text-ink">
                    {p.name}
                  </h4>
                  {p.featured && (
                    <span className="border border-line-strong px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ink-dim">
                      Popular
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
                <span className="text-xs text-ink-muted">Mensal · contínuo</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-3 border border-line bg-base p-6 text-xs leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <span>
              Valor calculado na hora pelos critérios do escopo. Confirmamos as
              informações e acompanhamos cada etapa com você.
            </span>
            <HexButton href="#iniciar" variant="ghost" className="px-5 py-2.5 text-[0.6rem]">
              Ver meu orçamento →
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
