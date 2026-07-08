"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const HEX_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='20.78' height='36'><path d='M0-12L-10.39-6L-10.39 6L0 12L10.39 6L10.39-6Z M10.39 6L0 12L0 24L10.39 24L20.78 24L20.78 12Z' fill='none' stroke='%23000' stroke-width='1'/></svg>`;
const HEX_BG = `url("data:image/svg+xml,${encodeURIComponent(HEX_SVG)}")`;

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function HexButton({
  href,
  children,
  variant = "primary",
  className,
  external,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  const mask =
    "radial-gradient(circle 95px at var(--hx, -999px) var(--hy, -999px), #000 0%, transparent 62%)";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden border px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-200",
        variant === "primary"
          ? "border-ink bg-ink text-black hover:border-ink"
          : "border-line-strong text-ink hover:border-ink hover:text-ink",
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage: HEX_BG,
            backgroundSize: "20.78px 36px",
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
