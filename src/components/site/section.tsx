import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative border-t border-line scroll-mt-16", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  children,
  layout = "split",
  protectMarkerFromNoise = false,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  layout?: "split" | "stacked";
  protectMarkerFromNoise?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-8",
        layout === "split"
          ? "md:grid-cols-[0.8fr_1.2fr] md:gap-12"
          : "max-w-3xl",
      )}
    >
      <div className="flex flex-col gap-3">
        <div
          className="section-coordinate flex items-center gap-3"
          data-noise-protection={protectMarkerFromNoise ? "" : undefined}
        >
          <span className="section-coordinate__index text-xs tabular-nums">{index}</span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="max-w-2xl text-balance text-2xl leading-[1.15] font-medium md:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
