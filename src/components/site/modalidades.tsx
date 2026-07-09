import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { HexButton } from "./hex-button";

const DEDICADO = {
  tag: "Síncrono",
  title: "Pentest dedicado",
  desc: "Execução focada sobre um escopo definido, com janela de trabalho acordada e entrega de relatório.",
  items: [
    "Análise focada e profunda sobre o escopo",
    "Janela de execução dedicada",
    "Relatório técnico com classificação e reprodução",
    "Garantia de retorno: dinheiro de volta ou desconto",
  ],
};

const CONTINUO = {
  tag: "Assíncrono",
  title: "Pentest contínuo",
  desc: "Assinatura mensal com execução recorrente de um pentest a cada 30 dias. Feito para produtos que mudam com frequência.",
  items: [
    "Pentest a cada 30 dias",
    "Preço mensal abaixo do equivalente dedicado",
    "Monitoramento recorrente do produto",
    "Contratação prática e recorrente",
  ],
};

function ModeCard({
  mode,
  featured,
}: {
  mode: typeof DEDICADO;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col gap-8 border p-8 md:p-10 ${
        featured
          ? "border-line-strong bg-surface"
          : "border-line"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line pb-5">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
          {mode.tag}
        </span>
        {featured && (
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink">
            Recomendado
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium text-ink md:text-3xl">{mode.title}</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-dim">
          {mode.desc}
        </p>
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
        <HexButton href="#iniciar" variant={featured ? "primary" : "ghost"} comingSoon>
          Iniciar com esta modalidade
        </HexButton>
      </div>
    </div>
  );
}

export function Modalidades() {
  return (
    <Section id="modalidades">
      <Container className="py-20 md:py-28">
        <SectionHeader
          index="02"
          eyebrow="Modalidades"
          title={
            <>
              Duas formas de contratar: um pentest dedicado ou uma assinatura
              recorrente.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            A diferença prática entre contratar um pentest dedicado e manter uma
            assinatura com análise a cada 30 dias.
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-2">
          <Reveal>
            <ModeCard mode={DEDICADO} />
          </Reveal>
          <Reveal delay="120ms">
            <ModeCard mode={CONTINUO} featured />
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 text-xs leading-relaxed text-ink-muted">
            Na dúvida: a dedicada é pontual, ideal para uma análise profunda
            única; a contínua acompanha produtos que mudam todo mês.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
