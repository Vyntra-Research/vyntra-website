"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "01/\\|+-*><.,:=#%&";
const CELL = 9;
const FONT_PX = 8;
const FEATURE = 150;
const OCTAVES = 4;
const VOID_THRESHOLD = 0.47;

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function renderPattern(w: number, h: number, boost = 1): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.font = `${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";

  const hash = (ix: number, iy: number) => {
    const s = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const noiseAt = (fx: number, fy: number) => {
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const sx = smooth(fx - x0);
    const sy = smooth(fy - y0);
    const a = hash(x0, y0);
    const b = hash(x0 + 1, y0);
    const c = hash(x0, y0 + 1);
    const d = hash(x0 + 1, y0 + 1);
    const top = a + (b - a) * sx;
    const bot = c + (d - c) * sx;
    return top + (bot - top) * sy;
  };
  const fbm = (x: number, y: number) => {
    let total = 0;
    let amp = 1;
    let freq = 1;
    let norm = 0;
    for (let o = 0; o < OCTAVES; o++) {
      total += noiseAt(x * freq, y * freq) * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2;
    }
    return total / norm;
  };
  const span = 1 - VOID_THRESHOLD;

  for (let y = 0; y < h; y += CELL) {
    for (let x = 0; x < w; x += CELL) {
      const n = fbm(x / FEATURE, y / FEATURE);
      if (n < VOID_THRESHOLD) continue;
      const t = (n - VOID_THRESHOLD) / span;
      const alpha = Math.min(1, (0.08 + t * 0.62) * boost);
      const ch = CHARS[(Math.random() * CHARS.length) | 0];
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fillText(ch, x, y);
    }
  }
  return canvas.toDataURL();
}

export function AsciiBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [bgBase, setBgBase] = useState("");
  const [bgWave, setBgWave] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const draw = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w && h) {
        setBgBase(renderPattern(w, h, 1));
        setBgWave(renderPattern(w, h, 1.35));
      }
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
          backgroundImage: bgBase ? `url(${bgBase})` : undefined,
          opacity: 0.4,
        }}
      />
      <div
        className="vyntra-wave absolute inset-0"
        style={{
          backgroundImage: bgWave ? `url(${bgWave})` : undefined,
          opacity: 1,
        }}
      />
    </div>
  );
}
