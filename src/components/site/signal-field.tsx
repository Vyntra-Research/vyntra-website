"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SignalFieldProps = {
  variant: "plus" | "pixel";
  className?: string;
};

export function SignalField({ variant, className }: SignalFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      element.style.setProperty("--signal-active", inside ? "1" : "0");
      if (!inside) return;

      element.style.setProperty("--signal-x", `${event.clientX - bounds.left}px`);
      element.style.setProperty("--signal-y", `${event.clientY - bounds.top}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("signal-field", `signal-field--${variant}`, className)}
    >
      <div className="signal-field__layer signal-field__base" />
      <div className="signal-field__layer signal-field__scan" />
      <div className="signal-field__layer signal-field__hot" />
    </div>
  );
}
