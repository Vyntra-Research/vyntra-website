import { Container } from "./section";
import { HexButton } from "./hex-button";
import { Highlight } from "./highlight";
import { Reveal } from "./reveal";
import { AsciiBackground } from "./ascii-background";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <AsciiBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_72%_at_30%_50%,rgba(0,0,0,0.6),transparent_72%)]"
      />
      <Container className="relative flex min-h-[92svh] flex-col justify-center pt-28 pb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="h-px w-10 bg-line-strong" />
            <span className="eyebrow">Vyntra Security</span>
            <span className="text-ink-muted text-xs">/</span>
            <span className="eyebrow">Pentest e pesquisa de segurança</span>
          </div>
        </Reveal>

        <Reveal delay="80ms">
          <h1 className="mt-8 max-w-4xl text-balance text-4xl leading-[1.08] font-medium md:text-6xl lg:text-[4.25rem]">
            Pentest de alto nível, <Highlight>acessível</Highlight> e prático.
          </h1>
        </Reveal>

        <Reveal delay="160ms">
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
            A mesma pesquisa que descobre <Highlight>CVEs</Highlight> em grandes
            empresas, aplicada ao seu produto — com preço transparente e
            contratação prática.
          </p>
        </Reveal>

        <Reveal delay="240ms">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HexButton href="#iniciar" comingSoon>Iniciar →</HexButton>
            <HexButton href="#modalidades" variant="ghost">
              Ver modalidades
            </HexButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
