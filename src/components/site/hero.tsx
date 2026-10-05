"use client";

import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RotatingText } from "@/components/site/rotating-text";
import { socialIcons } from "@/components/site/social-icons";
import { site, socials } from "@/content/site";
import { cn } from "@/lib/utils";

// CSS-driven entrance so hero content paints before hydration (better LCP, visible without JS).
const item = (delay: number) => ({
  "data-enter": "",
  style: { "--enter-delay": `${delay}s` } as React.CSSProperties,
});

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-16"
    >
      {/* Backdrop: grid + soft glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <motion.div
          className="bg-glow absolute top-[8%] left-1/2 size-[42rem] -translate-x-1/2 rounded-full blur-2xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-20 text-center sm:px-8">
        <motion.div {...item(0)} className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary via-primary/30 to-transparent opacity-80 blur-[2px]" />
          <Image
            src={site.avatar}
            alt={`Portrait of ${site.name}`}
            width={132}
            height={132}
            preload
            className="relative size-28 rounded-full border-4 border-background object-cover sm:size-32"
          />
          {site.status.available && (
            <span
              aria-hidden
              className="absolute right-1.5 bottom-1.5 size-4 rounded-full border-[3px] border-background bg-success"
            />
          )}
        </motion.div>

        {site.status.available && (
          <motion.a
            {...item(0.08)}
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {site.status.text}
          </motion.a>
        )}

        <motion.p {...item(0.14)} className="eyebrow mt-8">
          Hey! I am
        </motion.p>
        <motion.h1
          {...item(0.2)}
          className="mt-3 text-5xl leading-[1.05] font-extrabold sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient">{site.name}</span>
        </motion.h1>

        <motion.p {...item(0.28)} className="mt-6 font-heading text-2xl font-semibold sm:text-3xl">
          <RotatingText words={site.rotatingRoles} />
        </motion.p>

        <motion.p
          {...item(0.34)}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {site.description}
        </motion.p>

        <motion.div {...item(0.42)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "h-11 gap-2 rounded-full px-6 text-sm shadow-lg shadow-primary/20")}
          >
            View résumé
            <ArrowUpRightIcon className="size-4" />
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full px-6 text-sm")}
          >
            Get in touch
          </a>
        </motion.div>

        <motion.ul {...item(0.5)} className="mt-8 flex items-center gap-1" aria-label="Profiles">
          {socials
            .filter((s) => s.primary)
            .map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <a
                          href={s.href}
                          target="_blank"
                          rel="me noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        />
                      }
                    >
                      <Icon className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent>{s.label}</TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
        </motion.ul>
      </div>

      {/* Scroll cue: a nod to the original mouse icon */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="no-print absolute bottom-8 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-muted-foreground/40 pt-2 sm:flex"
      >
        <motion.span
          className="block h-2 w-1 rounded-full bg-muted-foreground"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <ArrowDownIcon className="sr-only" />
      </motion.a>
    </section>
  );
}
