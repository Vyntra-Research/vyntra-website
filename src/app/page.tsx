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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Proof />
        <Assets />
        <Modalidades />
        <QuemSomos />
        <Precificacao />
        <Contato />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
