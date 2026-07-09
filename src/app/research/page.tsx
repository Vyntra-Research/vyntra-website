import Link from "next/link";
import { Container } from "@/components/site/section";
import { Logo } from "@/components/site/logo";

export const metadata = {
  title: "Vyntra Research — em breve",
  description:
    "Vyntra Research: blog técnico, CVEs, advisories e writeups de pesquisa ofensiva.",
};

export default function ResearchPage() {
  return (
    <main className="relative z-10 min-h-dvh">
      <header className="border-b border-line bg-base/80 backdrop-blur-md">
        <Container className="flex h-16 items-center">
          <Link href="/" className="transition-opacity hover:opacity-70">
            <Logo />
          </Link>
        </Container>
      </header>

      <Container className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-line-strong" />
            <span className="eyebrow">Vyntra Research</span>
          </div>
          <h1 className="max-w-2xl text-balance text-4xl leading-[1.1] font-medium md:text-5xl">
            Pesquisa, CVEs e writeups — em breve.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            Aqui vai ficar o blog técnico da Vyntra: advisories, análise de
            vulnerabilidades e detalhes das pesquisas por trás do nosso
            pentest.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-line-strong px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
