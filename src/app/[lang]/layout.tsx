import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { locales, defaultLocale, htmlLang, isLocale } from "@/i18n/config";
import { HashScroll } from "@/components/site/hash-scroll";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyntra.sh"),
  title: "Vyntra Security — Pentest de alto nível, acessível e prático",
  description:
    "Pentest com a profundidade de quem descobre falhas e CVEs em grandes empresas, aplicado ao seu escopo. Acessível, transparente e com preço previsível.",
  keywords: [
    "pentest",
    "teste de invasão",
    "pesquisa de segurança",
    "vulnerabilidade",
    "CVE",
    "pentest contínuo",
    "pentest dedicado",
  ],
  openGraph: {
    title: "Vyntra Security — Pentest de alto nível, acessível e prático",
    description:
      "Pentest de alto nível, acessível e com preço previsível. Cadastre o escopo e receba o orçamento na hora.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vyntra Security",
  },
  alternates: {
    languages: {
      "pt-BR": "/pt",
      en: "/en",
    },
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  return (
    <html
      lang={htmlLang(locale)}
      className={`${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh bg-base text-ink selection:bg-ink selection:text-black">
        <HashScroll />
        {children}
      </body>
    </html>
  );
}
