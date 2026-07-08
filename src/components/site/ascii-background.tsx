"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "01/\\|+-*><.,:=#%&";
const CELL = 9;
const FONT_PX = 8;
const FEATURE = 140;
const VOID_THRESHOLD = 0.46;

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function renderPattern(w: number, h: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.font = `${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";

  const cols = Math.ceil(w / FEATURE) + 2;
  const rows = Math.ceil(h / FEATURE) + 2;
  const seed = new Float32Array(cols * rows);
  for (let i = 0; i < seed.length; i++) seed[i] = Math.random();
  const noiseAt = (fx: number, fy: number) => {
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const sx = smooth(fx - x0);
    const sy = smooth(fy - y0);
    const a = seed[y0 * cols + x0];
    const b = seed[y0 * cols + x0 + 1];
    const c = seed[(y0 + 1) * cols + x0];
    const d = seed[(y0 + 1) * cols + x0 + 1];
    const top = a + (b - a) * sx;
    const bot = c + (d - c) * sx;
    return top + (bot - top) * sy;
  };

  for (let y = 0; y < h; y += CELL) {
    for (let x = 0; x < w; x += CELL) {
      const fx = x / FEATURE;
      const fy = y / FEATURE;
      const n = noiseAt(fx, fy) * 0.72 + noiseAt(fx * 2.3, fy * 2.3) * 0.28;
      if (n < VOID_THRESHOLD) continue;
      const fill = 0.55 + ((n - VOID_THRESHOLD) / (1 - VOID_THRESHOLD)) * 0.4;
      if (Math.random() > fill) continue;
      const ch = CHARS[(Math.random() * CHARS.length) | 0];
      ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.random() * 0.5})`;
      ctx.fillText(ch, x, y);
    }
  }
  return canvas.toDataURL();
}

export function AsciiBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const draw = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w && h) setBg(renderPattern(w, h));
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    ro.observe(el);
    if (document.fonts?.ready) document.fonts.ready.then(draw);
    draw();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          opacity: 0.13,
        }}
      />
      <div
        className="vyntra-wave absolute inset-0"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
