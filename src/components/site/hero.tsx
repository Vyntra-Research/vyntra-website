import { Container } from "./section";
import { HexButton } from "./hex-button";
import { Highlight } from "./highlight";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle technical grid only in hero */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative flex min-h-[92svh] flex-col justify-center pt-28 pb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="h-px w-10 bg-line-strong" />
            <span className="eyebrow">Vyntra Security</span>
            <span className="text-ink-muted text-xs">/</span>
            <span className="eyebrow">Segurança ofensiva orientada por pesquisa</span>
          </div>
        </Reveal>

        <Reveal delay="80ms">
          <h1 className="mt-8 max-w-4xl text-balance text-4xl leading-[1.08] font-medium md:text-6xl lg:text-[4.25rem]">
            Pentest de nível de <Highlight>pesquisa ofensiva</Highlight>.
            Acessível e sem burocracia.
          </h1>
        </Reveal>

        <Reveal delay="160ms">
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
            A mesma profundidade que descobriu <Highlight>CVEs</Highlight> e
            vulnerabilidades em grandes empresas, aplicada ao seu{" "}
            <Highlight>escopo</Highlight> — com preço transparente e
            previsível. Você cadastra o escopo e recebe o orçamento na hora.
            Nós confirmamos os detalhes e ficamos disponíveis: sem burocracia,
            com previsibilidade e suporte direto.
          </p>
        </Reveal>

        <Reveal delay="240ms">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href="#iniciar">Iniciar →</HexButton>
            <HexButton href="#modalidades" variant="ghost">
              Ver modalidades
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
