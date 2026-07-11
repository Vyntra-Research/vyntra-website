"use client";

import { useEffect, useRef } from "react";

const CELL = 7;
const FEATURE = 118;
const OCTAVES = 4;

function smooth(value: number): number {
  return value * value * (3 - 2 * value);
}

function hash(x: number, y: number, seed: number): number {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function noise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const sx = smooth(x - x0);
  const sy = smooth(y - y0);
  const top = hash(x0, y0, seed) * (1 - sx) + hash(x0 + 1, y0, seed) * sx;
  const bottom = hash(x0, y0 + 1, seed) * (1 - sx) + hash(x0 + 1, y0 + 1, seed) * sx;
  return top * (1 - sy) + bottom * sy;
}

function fbm(x: number, y: number, seed: number): number {
  let amplitude = 1;
  let frequency = 1;
  let total = 0;
  let normalization = 0;

  for (let octave = 0; octave < OCTAVES; octave += 1) {
    total += noise(x * frequency, y * frequency, seed + octave * 0.17) * amplitude;
    normalization += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / normalization;
}

function renderField(width: number, height: number, seed: number): string {
  const canvas = document.createElement("canvas");
  const scale = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);

  const context = canvas.getContext("2d");
  if (!context) return "";

  context.scale(scale, scale);
  context.lineWidth = 0.75;

  for (let y = 0; y < height; y += CELL) {
    for (let x = 0; x < width; x += CELL) {
      const broad = fbm(x / FEATURE, y / FEATURE, seed);
      const detail = hash(x / CELL, y / CELL, seed + 9);
      const intensity = Math.max(0, Math.min(1, (broad - 0.3) / 0.42));
      if (intensity < 0.08 || detail > 0.58 + intensity * 0.34) continue;

      const alpha = 0.05 + intensity * 0.38;
      const centerX = x + CELL / 2;
      const centerY = y + CELL / 2;
      const radius = 0.55 + intensity * 1.8;
      context.strokeStyle = `rgba(242,242,242,${alpha.toFixed(3)})`;
      context.fillStyle = context.strokeStyle;

      if (intensity > 0.72 && detail < 0.28) {
        context.beginPath();
        context.moveTo(centerX - radius, centerY - radius);
        context.lineTo(centerX + radius, centerY + radius);
        context.moveTo(centerX + radius, centerY - radius);
        context.lineTo(centerX - radius, centerY + radius);
        context.stroke();
      } else if (intensity > 0.46) {
        context.beginPath();
        context.moveTo(centerX - radius, centerY);
        context.lineTo(centerX + radius, centerY);
        context.moveTo(centerX, centerY - radius);
        context.lineTo(centerX, centerY + radius);
        context.stroke();
      } else {
        context.fillRect(centerX, centerY, 0.8, 0.8);
      }
    }
  }

  return canvas.toDataURL();
}

export function PixelNoiseField() {
  const ref = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const draw = () => {
      const { clientWidth: width, clientHeight: height } = element;
      if (!width || !height) return;

      const base = renderField(width, height, 3.4);
      const wave = renderField(width, height, 8.1);
      if (baseRef.current) baseRef.current.style.backgroundImage = `url(${base})`;
      if (waveRef.current) waveRef.current.style.backgroundImage = `url(${wave})`;
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(element);
    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pricing-pixel-noise">
      <div ref={baseRef} className="pricing-pixel-noise__layer pricing-pixel-noise__base" />
      <div ref={waveRef} className="pricing-pixel-noise__layer pricing-pixel-noise__wave" />
    </div>
  );
}
