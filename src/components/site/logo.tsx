import { cn } from "@/lib/utils";

const LOGO_MARK_SRC = "/assets/vyntra/vyntra-cicada-logo-sharp.svg";

export function Logo({
  className,
  showWordmark = true,
  height = 38,
}: {
  className?: string;
  showWordmark?: boolean;
  height?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="block shrink-0 bg-current"
        style={{
          width: height,
          height,
          WebkitMaskImage: `url(${LOGO_MARK_SRC})`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskImage: `url(${LOGO_MARK_SRC})`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "contain",
        }}
      />
      {showWordmark && (
        <span className="text-[0.8rem] tracking-[0.32em] font-medium">
          VYNTRA
        </span>
      )}
    </span>
  );
}
