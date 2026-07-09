import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Proof } from "@/components/site/proof";
import { Assets } from "@/components/site/assets";
import { Modalidades } from "@/components/site/modalidades";
import { QuemSomos } from "@/components/site/quem-somos";
import { Precificacao } from "@/components/site/precificacao";
import { Contato } from "@/components/site/contato";
import { CtaFinal } from "@/components/site/cta-final";
import { Footer } from "@/components/site/footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = getDictionary(locale);

  return (
    <>
      <Navbar t={t.nav} lang={locale} />
      <main className="relative z-10">
        <Hero t={t.hero} />
        <Proof t={t.proof} />
        <Assets t={t.assets} />
        <Modalidades t={t.modalidades} />
        <QuemSomos t={t.quemSomos} />
        <Precificacao t={t.precificacao} />
        <Contato t={t.contato} />
        <CtaFinal t={t.ctaFinal} />
      </main>
      <Footer t={t.footer} lang={locale} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}
