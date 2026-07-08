import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AsciiBackground } from "@/components/site/ascii-background";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyntra.security"),
  title: "Vyntra Security — Pentest de nível de pesquisa ofensiva",
  description:
    "Pentest de nível de pesquisa ofensiva: a mesma profundidade que descobriu CVEs e vulnerabilidades em grandes empresas, aplicada ao seu escopo. Acessível, transparente e com preço previsível.",
  keywords: [
    "pentest",
    "segurança ofensiva",
    "pesquisa ofensiva",
    "CVE",
    "pentest contínuo",
    "pentest dedicado",
  ],
  openGraph: {
    title: "Vyntra Security — Pentest de nível de pesquisa ofensiva",
    description:
      "Pentest de nível de pesquisa ofensiva, acessível e com preço previsível. Cadastre o escopo e receba o orçamento na hora.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vyntra Security",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${jetbrains.variable} antialiased`}>
      <body className="min-h-dvh bg-base text-ink selection:bg-ink selection:text-black">
        <AsciiBackground />
        {children}
      </body>
    </html>
  );
}
