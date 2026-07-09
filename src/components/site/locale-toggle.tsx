"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { localeLabel } from "@/i18n/config";

export function LocaleToggle({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";
  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
  const target: Locale = current === "pt" ? "en" : "pt";
  const href = `/${target}${rest === "/" ? "" : rest}`;

  return (
    <Link
      href={href}
      scroll={false}
      aria-label={target === "en" ? "Switch to English" : "Mudar para Português"}
      className="inline-flex items-center justify-center border border-line-strong px-2.5 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:border-ink hover:text-ink"
    >
      {localeLabel(target)}
    </Link>
  );
}
