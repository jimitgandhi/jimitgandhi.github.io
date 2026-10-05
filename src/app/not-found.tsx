import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="bg-grid relative grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p aria-hidden className="ghost-title">404</p>
        <h1 className="-mt-10 text-3xl font-bold sm:-mt-16 sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className={cn(buttonVariants(), "mt-8 h-11 rounded-full px-6")}>
          Back home
        </Link>
      </div>
    </main>
  );
}
