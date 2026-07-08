import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
  height = 30,
}: {
  className?: string;
  showWordmark?: boolean;
  height?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={height}
        height={height}
        viewBox="0 0 512 512"
        aria-hidden
        className="shrink-0"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M204 154 178 82 154 62 172 132 220 198" />
          <path d="M308 154 334 82 358 62 340 132 292 198" />
          <path d="M214 154 238 126h36l24 28-12 42-30 24-30-24z" />
          <path d="M226 194 256 238 286 194" />
          <path d="M188 198 138 176 96 196 118 216z" />
          <path d="M324 198 374 176 416 196 394 216z" />
          <path d="M188 198 152 266 136 360 168 456 206 400 206 308z" />
          <path d="M324 198 360 266 376 360 344 456 306 400 306 308z" />
          <path d="M152 266 220 214 256 262 292 214 360 266" />
          <path d="M136 360 198 420" />
          <path d="M376 360 314 420" />
          <path d="M160 438 206 308" />
          <path d="M352 438 306 308" />
          <path d="M222 286h68v110l-34 48-34-48z" />
          <path d="M222 318h68" />
          <path d="M222 350h68" />
          <path d="M222 382h68" />
          <path d="M222 414h68" />
          <path d="M206 308 256 262 306 308" />
        </g>
      </svg>
      {showWordmark && (
        <span className="text-[0.8rem] tracking-[0.32em] font-medium">
          VYNTRA
        </span>
      )}
    </span>
  );
}
