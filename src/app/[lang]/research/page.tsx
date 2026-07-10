import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Container } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/research";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const t = getDictionary(locale).research;
  return {
    title: "Vyntra Research — Pesquisa ofensiva, CVEs e writeups",
    description: t.text,
    openGraph: {
      title: "Vyntra Research",
      description: t.text,
      type: "website",
      locale: locale === "en" ? "en_US" : "pt_BR",
    },
    alternates: {
      languages: { "pt-BR": "/pt/research", en: "/en/research" },
    },
  };
}

function formatDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  return new Date(`${iso}T12:00:00`).toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const t = getDictionary(locale);
  const posts = getAllPosts(locale);

  return (
    <>
      <Navbar t={t.nav} lang={locale} />
      <main className="relative z-10">
        <Container className="py-28 md:py-36">
          <Reveal>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-line-strong" />
                <span className="eyebrow">{t.research.eyebrow}</span>
              </div>
              <h1 className="max-w-3xl text-balance text-3xl leading-[1.1] font-medium md:text-5xl">
                {t.research.title}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
                {t.research.text}
              </p>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-col">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={`${i * 60}ms`}>
                <Link
                  href={`/${locale}/research/${p.slug}`}
                  className="group flex flex-col gap-4 border-t border-line py-8 transition-colors last:border-b hover:bg-surface/40 md:flex-row md:items-start md:justify-between md:py-10"
                >
                  <div className="flex max-w-2xl flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      {p.date && <time dateTime={p.date}>{formatDate(p.date, locale)}</time>}
                      <span className="h-px w-4 bg-line-strong" />
                      <span>
                        {p.readingTime} {t.research.readingTime}
                      </span>
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
                      <p className="text-sm leading-relaxed text-ink-dim">{p.subtitle}</p>
                    )}
                  </div>
                  <span className="inline-flex w-fit items-center text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-ink md:pt-1">
                    {t.research.read}
                  </span>
                </Link>
              </Reveal>
            ))}

            {posts.length === 0 && (
              <p className="border-t border-line py-16 text-sm text-ink-muted">
                {t.research.empty}
              </p>
            )}
          </div>
        </Container>
      </main>
      <Footer t={t.footer} lang={locale} />
    </>
  );
}
