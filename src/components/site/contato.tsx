import { Container, Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";
import { Highlight } from "./highlight";

export function Contato() {
  return (
    <Section id="contato">
      <Container className="py-20 md:py-28">
        <SectionHeader
          index="05"
          eyebrow="Contato"
          title={
            <>
              Tire dúvidas <Highlight>técnicas</Highlight> antes de iniciar.
            </>
          }
        >
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            Fale com a gente para tirar dúvidas técnicas, entender qual
            modalidade faz sentido e alinhar o escopo antes de começar.
          </p>
        </SectionHeader>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay="120ms">
            <div className="flex h-full flex-col justify-between gap-8 border border-line bg-surface p-8">
              <div className="flex flex-col gap-6">
                <Channel label="E-mail" value="contact@vyntra.sh" />
                <Channel label="Resposta" value="Até 1 dia útil" />
                <Channel
                  label="PGP"
                  value="Disponível sob solicitação"
                />
              </div>
              <div className="border-t border-line pt-6">
                <p className="text-xs leading-relaxed text-ink-muted">
                  Tratamos informações de escopo com sigilo. Dados sensíveis
                  podem ser enviados por canal seguro após o primeiro contato.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Channel({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}
