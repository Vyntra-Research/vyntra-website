import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Container } from "@/components/site/section";
import { Markdown } from "@/components/site/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/research";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado — Vyntra Research" };

  const url = `https://vyntra.security/research/${post.slug}`;
  return {
    title: `${post.title} — Vyntra Research`,
    description: post.subtitle || post.title,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.subtitle || post.title,
      type: "article",
      url,
      locale: "pt_BR",
      siteName: "Vyntra Research",
      publishedTime: post.date ?? undefined,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.subtitle || post.title,
    },
    alternates: { canonical: url },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle || undefined,
    datePublished: post.date ?? undefined,
    dateModified: post.date ?? undefined,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Vyntra Security",
    },
    mainEntityOfPage: `https://vyntra.security/research/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative z-10">
        <Container className="py-28 md:py-32">
          <article className="mx-auto max-w-[760px]">
            <Link
              href="/research"
              className="inline-flex items-center text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
            >
              ← Research
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span className="h-px w-4 bg-line-strong" />
              <span>{post.readingTime} min de leitura</span>
              {post.author && (
                <>
                  <span className="h-px w-4 bg-line-strong" />
                  <span>@{post.author}</span>
                </>
              )}
            </div>

            <h1 className="mt-5 text-balance text-3xl leading-[1.12] font-medium md:text-[2.75rem]">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="mt-5 text-base leading-relaxed text-ink-dim md:text-lg">
                {post.subtitle}
              </p>
            )}

            <hr className="mt-10 border-line" />

            <div className="mt-10">
              <Markdown>{post.body}</Markdown>
            </div>

            {post.author && (
              <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8">
                <span className="eyebrow">Autor</span>
                <a
                  href="https://hackerone.com/rafabd1?type=user"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm text-ink transition-colors hover:opacity-70"
                >
                  @{post.author} — perfil no HackerOne →
                </a>
              </div>
            )}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
