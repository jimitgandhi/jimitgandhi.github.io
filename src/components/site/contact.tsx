import { ArrowUpRightIcon, FileTextIcon, MapPinIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { LinkedInMark } from "@/components/site/linkedin-mark";
import { Section } from "@/components/site/section";
import { socialIcons } from "@/components/site/social-icons";
import { site, socials } from "@/content/site";
import { cn } from "@/lib/utils";

export function Contact() {
  const linkedin = socials.find((s) => s.key === "linkedin");
  const profiles = socials.filter((s) => s.primary);

  return (
    <Section id="contact" index="06" ghost="Hello" eyebrow="Contact" title="Let's work together" align="center">
      <Reveal className="card-surface relative mx-auto max-w-3xl overflow-hidden px-6 py-14 text-center sm:px-12">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden className="bg-glow absolute inset-x-0 -top-1/2 -z-10 h-full" />

        {site.status.available && (
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm backdrop-blur">
            <span className="size-2 rounded-full bg-success" />
            {site.status.text}
          </span>
        )}
        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-balance text-muted-foreground">
          Have a role, project or idea in mind? The best way to reach me is on LinkedIn. I&apos;m always happy to chat.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-12 gap-2 rounded-full px-7 text-base")}
            >
              Message me on
              <LinkedInMark inverted className="text-[1.05em]" />
              <ArrowUpRightIcon className="size-4" />
            </a>
          )}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 gap-2 rounded-full px-7 text-base")}
          >
            <FileTextIcon className="size-4" />
            Résumé
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-4" />
            {site.location}
          </span>
          {profiles.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Icon className="size-4" />
                {s.handle}
              </a>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
