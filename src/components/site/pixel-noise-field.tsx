"use client";

import { useEffect, useRef } from "react";

const CELL = 7;
const FEATURE = 124;
const OCTAVES = 4;
const FRAME_INTERVAL = 1000 / 12;

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

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

type ProtectedArea = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

function protectionAt(x: number, y: number, areas: ProtectedArea[]): number {
  let protection = 0;

  for (const area of areas) {
    const outsideX = Math.max(area.left - x, 0, x - area.right);
    const outsideY = Math.max(area.top - y, 0, y - area.bottom);
    const distance = Math.hypot(outsideX, outsideY);
    protection = Math.max(protection, 1 - smooth(clamp(distance / 72)));
  }

  return protection;
}

function drawGlyph(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  luminance: number,
  grain: number,
) {
  const centerX = x + CELL / 2;
  const centerY = y + CELL / 2;
  const radius = 0.45 + luminance * 2.05;
  const alpha = 0.035 + luminance * 0.44;
  const color = `rgba(242,242,242,${alpha.toFixed(3)})`;
  context.fillStyle = color;
  context.strokeStyle = color;

  if (luminance > 0.7 && grain < 0.42) {
    context.beginPath();
    context.moveTo(centerX - radius, centerY - radius);
    context.lineTo(centerX + radius, centerY + radius);
    context.moveTo(centerX + radius, centerY - radius);
    context.lineTo(centerX - radius, centerY + radius);
    context.stroke();
  } else if (luminance > 0.38) {
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

export function PixelNoiseField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const visibleContext = canvas?.getContext("2d");
    const buffer = document.createElement("canvas");
    const context = buffer.getContext("2d");
    if (!container || !canvas || !visibleContext || !context) return;

    let width = 0;
    let height = 0;
    let scale = 1;
    let animationFrame = 0;
    let lastFrame = -FRAME_INTERVAL;
    let protectedAreas: ProtectedArea[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.ceil(width * scale);
      canvas.height = Math.ceil(height * scale);
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.lineWidth = 0.72;

      const containerBounds = container.getBoundingClientRect();
      protectedAreas = Array.from(
        container.parentElement?.querySelectorAll<HTMLElement>("[data-noise-protection]") ?? [],
      ).map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          left: bounds.left - containerBounds.left - 12,
          top: bounds.top - containerBounds.top - 10,
          right: bounds.right - containerBounds.left + 12,
          bottom: bounds.bottom - containerBounds.top + 10,
        };
      });
    };

    const render = (timestamp: number) => {
      if (timestamp - lastFrame < FRAME_INTERVAL) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);

      const time = reducedMotion ? 0 : timestamp / 1000;
      const imageX = ((time * 82) % (width * 1.55)) - width * 0.28;
      const imageY = height * (0.36 + Math.sin(time * 0.24) * 0.06);

      for (let y = 0; y < height; y += CELL) {
        for (let x = 0; x < width; x += CELL) {
          const movingNoise = fbm(
            x / FEATURE - time * 0.07,
            y / FEATURE + Math.sin(time * 0.18) * 0.2,
            3.4,
          );
          const dx = (x - imageX) / (width * 0.2);
          const dy = (y - imageY) / (height * 0.3);
          const silhouette = Math.exp(-(dx * dx + dy * dy) * 1.2);
          const contour = clamp(1 - Math.abs(Math.hypot(dx, dy) - 0.62) * 4.5);
          const shading = clamp((movingNoise - 0.28) / 0.46);
          const protection = protectionAt(x, y, protectedAreas);
          const luminance =
            clamp(shading * 0.38 + silhouette * shading * 0.72 + contour * 0.18) *
            (1 - protection * 0.94);
          const grain = hash(x / CELL, y / CELL, 8.1);

          if (luminance < 0.07 || grain > 0.54 + luminance * 0.4) continue;
          drawGlyph(context, x, y, luminance, grain);
        }
      }

      visibleContext.setTransform(1, 0, 0, 1, 0, 0);
      visibleContext.clearRect(0, 0, canvas.width, canvas.height);
      visibleContext.drawImage(buffer, 0, 0);

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) render(0);
    });
    observer.observe(container);
    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="pixel-noise-field">
      <canvas ref={canvasRef} className="pixel-noise-field__canvas" />
    </div>
  );
}
