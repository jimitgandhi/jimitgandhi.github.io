import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { about, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <Section id="about" index="01" ghost="About" eyebrow="About" title="About me">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="group relative mx-auto w-full max-w-sm lg:sticky lg:top-24">
          <div aria-hidden className="bg-glow absolute -inset-10 -z-10 rounded-full blur-2xl" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl border border-primary/30 bg-primary/5 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div className="card-surface overflow-hidden bg-card p-2 shadow-2xl shadow-black/30">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <Image
                src={site.portrait}
                alt={site.portraitAlt}
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover saturate-[.85] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-black/10 ring-1 ring-white/10 ring-inset"
              />
              <div aria-hidden className="pointer-events-none absolute inset-3">
                <span className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-white/60" />
                <span className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-white/60" />
                <span className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-white/60" />
                <span className="absolute right-0 bottom-0 size-4 border-r-2 border-b-2 border-white/60" />
              </div>
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md">
                <MapPinIcon className="size-3 text-primary" />
                {site.portraitCaption}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-10">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.05}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label} className="bg-card/80 p-5">
                  <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{fact.label}</dt>
                  <dd className="mt-1.5 font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="card-surface p-6">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <h3 className="text-sm font-semibold tracking-wide uppercase">Now</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {about.now.map((n) => (
                <li key={n} className="flex gap-3 text-muted-foreground">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-11 gap-2 rounded-full px-6")}
            >
              View full résumé
              <ArrowUpRightIcon className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
