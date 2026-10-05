"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

type SectionProps = {
  id: string;
  index: string;
  ghost: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
};

/**
 * Section shell with the signature oversized ghost title drifting gently on scroll.
 */
export function Section({
  id,
  index,
  ghost,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], align === "center" ? ["-4%", "4%"] : ["0%", "-8%"]);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-title`}
      className={cn("relative overflow-hidden py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className={cn("relative mb-14 sm:mb-16", align === "center" && "text-center")}>
          <motion.div
            aria-hidden
            style={{ x }}
            className={cn(
              "ghost-title absolute -top-6 sm:-top-12",
              align === "center" ? "inset-x-0 flex justify-center" : "-left-1",
            )}
          >
            {ghost}
          </motion.div>
          <Reveal className="relative">
            <p className="eyebrow">
              <span className="text-muted-foreground">{index} /</span> {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="mt-3 text-4xl font-bold sm:text-5xl">
              {title}
            </h2>
            {intro && (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground",
                  align === "center" && "mx-auto",
                )}
              >
                {intro}
              </p>
            )}
          </Reveal>
        </header>
        {children}
      </div>
    </section>
  );
}
