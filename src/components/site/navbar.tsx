"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { HexButton } from "./hex-button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#modalidades", label: "Modalidades" },
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#precificacao", label: "Precificação" },
  { href: "#contato", label: "Contato" },
  { href: "/research", label: "Research" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <Link
          href="#top"
          className="flex items-center transition-opacity hover:opacity-70"
          aria-label="Vyntra Security — início"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.18em] text-ink-dim transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <HexButton href="#iniciar" className="px-5 py-2.5 text-[0.65rem]" comingSoon>
            Iniciar
          </HexButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center border border-line-strong text-ink md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-200",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-200",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-base/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm uppercase tracking-[0.18em] text-ink-dim"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              disabled
              className="mt-4 inline-flex cursor-not-allowed items-center justify-center border border-line-strong bg-surface px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted"
            >
              Iniciar — em breve
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
