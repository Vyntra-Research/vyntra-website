import Image from "next/image";
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
      <Image
        src="/assets/vyntra/vyntra-cicada-mark.png"
        alt=""
        width={598}
        height={894}
        style={{ height: `${height}px`, width: "auto" }}
        className="shrink-0"
      />
      {showWordmark && (
        <span className="text-[0.8rem] tracking-[0.32em] font-medium">
          VYNTRA
        </span>
      )}
    </span>
  );
}
