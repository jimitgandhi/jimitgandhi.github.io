import { cn } from "@/lib/utils";

/** The signature "<J>imit" wordmark from the original site. */
export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading text-xl font-bold tracking-tight", className)}>
      <span className="text-primary">J</span>imit
      <span className="text-primary">.</span>
    </span>
  );
}
