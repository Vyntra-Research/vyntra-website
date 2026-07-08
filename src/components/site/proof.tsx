import Image from "next/image";
import { Container, Section } from "./section";
import { Reveal } from "./reveal";

const COMPANIES = [
  { key: "github", name: "GitHub" },
  { key: "gitlab", name: "GitLab" },
  { key: "att", name: "AT&T" },
  { key: "mozilla", name: "Mozilla" },
  { key: "vercel", name: "Vercel" },
];

function CaseItem({ c }: { c: { key: string; name: string } }) {
  return (
    <div className="mx-2 flex shrink-0 items-center gap-4 border border-line bg-base px-8 py-5">
      <Image
        src={`/assets/companies/${c.key}.svg`}
        alt=""
        width={24}
        height={24}
        unoptimized
        className="h-6 w-6 opacity-80"
      />
      <span className="text-sm tracking-[0.14em] text-ink">{c.name}</span>
    </div>
  );
}

export function Proof() {
  const loop = [...COMPANIES, ...COMPANIES];
  return (
    <Section id="proof">
      <Container className="py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Empresas onde encontramos vulnerabilidades</span>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-dim">
              Grandes empresas de tecnologia onde nossos pesquisadores já
              encontraram falhas e reportaram <span className="text-ink">CVEs</span>{" "}
              e vulnerabilidades. É essa mesma pesquisa que aplicamos ao seu
              escopo.
            </p>
          </div>
        </Reveal>

        <div className="marquee-edges relative mt-10 overflow-hidden border-y border-line py-6">
          <div className="marquee-track flex w-max">
            {loop.map((c, i) => (
              <CaseItem key={`${c.key}-${i}`} c={c} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
