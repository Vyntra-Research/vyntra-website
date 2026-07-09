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
            O resto é <Highlight>conosco</Highlight>. Você só cadastra o escopo.
          </h2>
        </Reveal>
        <Reveal delay="160ms">
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">
            O cadastro de escopo e o orçamento automático chegam em breve.
            Enquanto isso, fale com a gente pelo contato para tirar dúvidas ou
            antecipar o seu espaço.
          </p>
        </Reveal>
        <Reveal delay="240ms">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href="#iniciar" comingSoon>Iniciar →</HexButton>
            <HexButton href="#contato" variant="ghost">
              Falar com a gente
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
