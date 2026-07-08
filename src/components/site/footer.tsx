import Link from "next/link";
import { Container } from "./section";
import { Logo } from "./logo";

const NAV = [
  { href: "#modalidades", label: "Modalidades" },
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#precificacao", label: "Precificação" },
  { href: "#contato", label: "Contato" },
];

const DIVISIONS = [
  { name: "Vyntra Research", desc: "Blog técnico, CVEs e advisories" },
  { name: "Vyntra Pentest", desc: "Pentest dedicado" },
  { name: "Vyntra Continuous", desc: "Pentest contínuo" },
];

export function Footer() {
  return (
    <footer className="relative">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-xs leading-relaxed text-ink-dim">
              Segurança ofensiva orientada por pesquisa. Pentest de nível de
              pesquisa, acessível e com garantia de retorno.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow">Navegação</span>
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow">Divisões</span>
            {DIVISIONS.map((d) => (
              <div key={d.name} className="flex flex-col gap-1">
                <span className="text-sm text-ink">{d.name}</span>
                <span className="text-xs text-ink-muted">{d.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Vyntra Security</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-ink" />
              Operação segura
            </span>
            <span>Brasil · Remoto</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
