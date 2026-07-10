"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { HexButton } from "./hex-button";
import { LocaleToggle } from "./locale-toggle";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionHref, sectionId, type Locale } from "@/i18n/config";

export function Navbar({
  t,
  lang,
}: {
  t: Dictionary["nav"];
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const base = `/${lang}`;

  const LINKS = [
    { href: sectionHref(lang, "engagements"), label: t.modalidades },
    { href: sectionHref(lang, "about"), label: t.quemSomos },
    { href: sectionHref(lang, "pricing"), label: t.precificacao },
    { href: sectionHref(lang, "contact"), label: t.contato },
    { href: `${base}/research`, label: t.research },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 120) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-base/80 backdrop-blur-md transition-transform duration-300",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <Link
          href={base}
          className="flex items-center transition-opacity hover:opacity-70"
          aria-label="Vyntra Security"
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

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle current={lang} />
          <HexButton href={`#${sectionId(lang, "start")}`} className="px-5 py-2.5 text-[0.65rem]" comingSoon lang={lang}>
            {t.iniciar}
          </HexButton>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleToggle current={lang} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center border border-line-strong text-ink"
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
        </div>
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
              {t.iniciarSoon}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
