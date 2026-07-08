import { Container, Section } from "./section";
import { HexButton } from "./hex-button";
import { Reveal } from "./reveal";
import { Highlight } from "./highlight";

export function CtaFinal() {
  return (
    <Section id="iniciar" className="border-b border-line">
      <Container className="flex flex-col items-start gap-10 py-24 md:py-36">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-muted tabular-nums">06</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="eyebrow">Iniciar</span>
          </div>
        </Reveal>
        <Reveal delay="80ms">
          <h2 className="max-w-3xl text-balance text-3xl leading-[1.1] font-medium md:text-5xl lg:text-6xl">
            Cadastre o escopo e receba o orçamento{" "}
            <Highlight>na hora</Highlight>.
          </h2>
        </Reveal>
        <Reveal delay="160ms">
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">
            Orçamento automático e transparente na hora. Nossa equipe confirma
            os detalhes e fica disponível do início ao fim — previsível e
            prático. Pentest de alto nível, acessível e com suporte direto.
          </p>
        </Reveal>
        <Reveal delay="240ms">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href="#contato">Iniciar →</HexButton>
            <HexButton href="#precificacao" variant="ghost">
              Ver planos
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
