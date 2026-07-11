"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
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
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (delta > 0 && y > 120) setHidden(true);
      else if (delta < 0 || y <= 120) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-300 md:top-4 md:px-5",
        hidden && !open
          ? "nav-dock-hidden"
          : "translate-y-0",
      )}
    >
      <div className="nav-dock-shell mx-auto w-full max-w-[1180px] overflow-hidden rounded-lg border bg-base/92 backdrop-blur-md">
        <nav className="flex h-14 w-full items-center justify-between px-4 md:px-5">
          <Link
            href={base}
            className="flex items-center transition-opacity hover:opacity-70"
            aria-label="Vyntra Security"
          >
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
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
            <Link
              href={`#${sectionId(lang, "start")}`}
              className="group inline-flex items-center gap-2 px-2 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink transition-[text-shadow] duration-200 hover:[text-shadow:0_0_14px_rgba(255,255,255,0.72)]"
            >
              {t.iniciar}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
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
            <div className="flex flex-col px-5 py-4">
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
      </div>
    </header>
  );
}
