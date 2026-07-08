"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "01/\\|+-*><.,:=#%&";
const CELL = 15;

function renderPattern(): string {
  if (typeof window === "undefined") return "";
  const w = window.innerWidth;
  const h = window.innerHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.font = `11px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";
  for (let y = 0; y < h; y += CELL) {
    for (let x = 0; x < w; x += CELL) {
      if (Math.random() > 0.42) continue;
      const ch = CHARS[(Math.random() * CHARS.length) | 0];
      ctx.fillStyle = `rgba(255,255,255,${0.55 + Math.random() * 0.45})`;
      ctx.fillText(ch, x, y + 1);
    }
  }
  return canvas.toDataURL();
}

export function AsciiBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState("");

  useEffect(() => {
    let raf = 0;
    const draw = () => setBg(renderPattern());
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(draw);
    }
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const mask =
    "radial-gradient(circle 240px at var(--mx, -300%) var(--my, -300%), #000 0%, transparent 68%)";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: bg ? `url(${bg})` : undefined, opacity: 0.05 }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          opacity: 0.32,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}
