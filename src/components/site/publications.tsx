import { ArrowUpRightIcon, BookOpenIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { publications } from "@/content/site";

export function Publications() {
  return (
    <Section id="publications" index="05" ghost="Papers" eyebrow="Publications" title="Research & writing">
      <ol className="divide-y border-y">
        {publications.map((pub, i) => {
          const body = (
            <>
              <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold transition-colors group-hover:text-primary sm:text-xl">
                  {pub.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{pub.note}</p>
                {(pub.venue || pub.year) && (
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <BookOpenIcon className="size-3.5" />
                    {[pub.venue, pub.year].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              {pub.href && (
                <ArrowUpRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
              )}
            </>
          );
          const cls = "group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-4 py-8 sm:gap-6";
          return (
            <Reveal as="li" key={pub.title} delay={i * 0.05}>
              {pub.href ? (
                <a href={pub.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
