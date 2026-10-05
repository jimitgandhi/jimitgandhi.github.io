"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, BriefcaseIcon, ChevronDownIcon, GraduationCapIcon, MapPinIcon } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { JOURNEY_TAB_EVENT, type JourneyTab } from "@/components/site/journey-tab";
import { education, experience, type Education, type Experience } from "@/content/site";

const logoFrame = "grid shrink-0 place-items-center overflow-hidden rounded-xl border bg-white p-1.5 shadow-sm";

function TimelineItem({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <li className="relative pb-6 last:pb-0 sm:pb-10 sm:pl-20">
      <span aria-hidden className="absolute top-16 bottom-0 left-7 hidden w-px bg-gradient-to-b from-border to-transparent sm:block" />
      <div className={`${logoFrame} absolute top-0 left-0 hidden size-14 sm:grid`}>{icon}</div>
      {children}
    </li>
  );
}

/** On phones the timeline rail is hidden and the logo sits in the card header instead. */
function MobileLogo({ icon }: { icon: React.ReactNode }) {
  return <div className={`${logoFrame} size-11 sm:hidden`}>{icon}</div>;
}

function ExperienceCard({ item }: { item: Experience }) {
  const icon = item.logo ? (
    <Image src={item.logo} alt={`${item.company} logo`} width={56} height={56} className="size-full object-contain" />
  ) : item.company === "LinkedIn" ? (
    <FaLinkedin role="img" aria-label="LinkedIn logo" className="size-full text-[#0A66C2]" />
  ) : (
    <span className="font-heading text-xl font-bold text-zinc-800">{item.company[0]}</span>
  );

  return (
    <TimelineItem icon={icon}>
      <Reveal className="card-surface p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-4 sm:gap-y-1">
          <div className="flex items-start gap-3">
            <MobileLogo icon={icon} />
            <div>
              <h3 className="text-lg leading-snug font-semibold">{item.role}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-medium text-primary"
                >
                  {item.company}
                  <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <p className="font-medium text-primary">{item.company}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-muted-foreground sm:block sm:text-right">
            {item.period && <p>{item.period}</p>}
            {item.location && (
              <p className="inline-flex items-center gap-1 sm:mt-0.5">
                <MapPinIcon className="size-3" />
                {item.location}
              </p>
            )}
          </div>
        </div>
        <p className="mt-3 text-muted-foreground">{item.summary}</p>
        {item.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        )}
        {item.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {item.tags.map((t) => (
              <li key={t}>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </TimelineItem>
  );
}

function EducationCard({ item }: { item: Education }) {
  const icon = item.logo ? (
    <Image src={item.logo} alt={`${item.school} logo`} width={56} height={56} className="size-full object-contain" />
  ) : (
    <GraduationCapIcon className="size-6 text-zinc-800" />
  );
  return (
    <TimelineItem icon={icon}>
      <Reveal className="card-surface p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-4 sm:gap-y-1">
          <div className="flex items-start gap-3">
            <MobileLogo icon={icon} />
            <div>
              <h3 className="text-lg leading-snug font-semibold">{item.degree}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-medium text-primary"
                >
                  {item.school}
                  <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <p className="font-medium text-primary">{item.school}</p>
              )}
            </div>
          </div>
          <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
        </div>
        <p className="mt-3 text-muted-foreground">{item.detail}</p>
      </Reveal>
    </TimelineItem>
  );
}

function Earlier({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group mt-10">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <ol className="mt-8">{children}</ol>
    </details>
  );
}

export function Journey() {
  const [tab, setTab] = useState<JourneyTab>("work");
  useEffect(() => {
    const onTab = (e: Event) => setTab((e as CustomEvent<JourneyTab>).detail);
    window.addEventListener(JOURNEY_TAB_EVENT, onTab);
    return () => window.removeEventListener(JOURNEY_TAB_EVENT, onTab);
  }, []);
  const work = experience.filter((e) => !e.earlier);
  const earlierWork = experience.filter((e) => e.earlier);
  const school = education.filter((e) => !e.earlier);
  const earlierSchool = education.filter((e) => e.earlier);

  return (
    <Section
      id="experience"
      index="02"
      ghost="Journey"
      eyebrow="Experience"
      title="Where I've worked & studied"
    >
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as JourneyTab)}
        className="gap-10 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12"
      >
        <div className="lg:sticky lg:top-24 lg:self-start">
          <TabsList
            variant="line"
            className="h-auto! w-full justify-start gap-2 border-b pb-2 lg:flex-col lg:items-stretch lg:border-b-0 lg:border-l lg:pb-0 lg:pl-0"
          >
            <TabsTrigger value="work" className="h-10 justify-start gap-2 px-4 text-base lg:w-full">
              <BriefcaseIcon /> Work
              <span className="ml-auto font-mono text-xs text-muted-foreground">{experience.length}</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="h-10 justify-start gap-2 px-4 text-base lg:w-full">
              <GraduationCapIcon /> Education
              <span className="ml-auto font-mono text-xs text-muted-foreground">{education.length}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div>
          <TabsContent value="work" keepMounted>
            <ol>
              {work.map((item) => (
                <ExperienceCard key={item.company + item.role} item={item} />
              ))}
            </ol>
            {earlierWork.length > 0 && (
              <Earlier label="Earlier experience">
                {earlierWork.map((item) => (
                  <ExperienceCard key={item.company + item.role} item={item} />
                ))}
              </Earlier>
            )}
          </TabsContent>
          <TabsContent value="education" keepMounted>
            <ol>
              {school.map((item) => (
                <EducationCard key={item.school} item={item} />
              ))}
            </ol>
            {earlierSchool.length > 0 && (
              <Earlier label="Earlier education">
                {earlierSchool.map((item) => (
                  <EducationCard key={item.school} item={item} />
                ))}
              </Earlier>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </Section>
  );
}
