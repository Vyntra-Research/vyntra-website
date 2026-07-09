import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Container } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/research";

export const metadata: Metadata = {
  title: "Vyntra Research — Pesquisa ofensiva, CVEs e writeups",
  description:
    "Blog técnico da Vyntra: advisories, análise de vulnerabilidades e writeups da pesquisa por trás do nosso pentest.",
  openGraph: {
    title: "Vyntra Research — Pesquisa ofensiva, CVEs e writeups",
    description:
      "Advisories, análise de vulnerabilidades e writeups da pesquisa Vyntra.",
    type: "website",
    locale: "pt_BR",
  },
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ResearchPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Container className="py-28 md:py-36">
          <Reveal>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-line-strong" />
                <span className="eyebrow">Vyntra Research</span>
              </div>
              <h1 className="max-w-3xl text-balance text-3xl leading-[1.1] font-medium md:text-5xl">
                Pesquisa ofensiva, CVEs e writeups.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
                O trabalho de pesquisa que sustenta o pentest da Vyntra —
                advisories, análise de vulnerabilidades e detalhes técnicos das
                falhas que encontramos.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-col">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={`${i * 60}ms`}>
                <Link
                  href={`/research/${p.slug}`}
                  className="group flex flex-col gap-4 border-t border-line py-8 transition-colors last:border-b hover:bg-surface/40 md:flex-row md:items-start md:justify-between md:py-10"
                >
                  <div className="flex max-w-2xl flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      {p.date && <time dateTime={p.date}>{formatDate(p.date)}</time>}
                      <span className="h-px w-4 bg-line-strong" />
                      <span>{p.readingTime} min de leitura</span>
                      {p.author && (
                        <>
                          <span className="h-px w-4 bg-line-strong" />
                          <span>@{p.author}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-balance text-xl font-medium text-ink md:text-2xl">
                      {p.title}
                    </h2>
                    {p.subtitle && (
                      <p className="text-sm leading-relaxed text-ink-dim">
                        {p.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex w-fit items-center text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-ink md:pt-1">
                    Ler →
                  </span>
                </Link>
              </Reveal>
            ))}

            {posts.length === 0 && (
              <p className="border-t border-line py-16 text-sm text-ink-muted">
                Nenhum artigo publicado ainda.
              </p>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
