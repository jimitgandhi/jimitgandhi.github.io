import { cn } from "@/lib/utils";

/** The LinkedIn "in" badge, sized to the surrounding text. `inverted` suits colored backgrounds. */
export function LinkedInMark({
  inverted,
  label = "LinkedIn",
  className,
}: {
  inverted?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-flex h-[1.1em] items-center rounded-[0.18em] px-[0.18em] align-[-0.12em] text-[0.95em] leading-none font-bold tracking-tight",
        inverted ? "bg-white text-[#0A66C2]" : "bg-[#0A66C2] text-white",
        className,
      )}
    >
      <span aria-hidden>in</span>
    </span>
  );
}
