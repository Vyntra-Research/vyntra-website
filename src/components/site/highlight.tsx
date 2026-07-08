export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="underline decoration-white/40 decoration-1 underline-offset-[5px]">
      {children}
    </span>
  );
}
