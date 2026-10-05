"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRightIcon, FileTextIcon, GlobeIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/section";
import { projects, type Project, type ProjectCategory } from "@/content/site";
import { cn } from "@/lib/utils";

const linkIcons = { GitHub: FaGithub, Paper: FileTextIcon, Demo: GlobeIcon } as const;

function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  return (
    <motion.article
      id={`project-${project.slug}`}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "card-surface group flex scroll-mt-24 flex-col overflow-hidden transition-colors hover:border-primary/40",
        featured && "md:col-span-2 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b bg-muted",
          featured ? "aspect-video md:aspect-auto md:min-h-80 md:border-r md:border-b-0" : "aspect-video",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes={featured ? "(min-width: 1152px) 600px, (min-width: 768px) 55vw, 100vw" : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="bg-grid absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/15 via-transparent to-success/10">
            <div aria-hidden className="bg-glow absolute inset-0" />
            {project.icon ? (
              <Image
                src={project.icon}
                alt=""
                width={144}
                height={144}
                className="relative size-28 rounded-3xl shadow-2xl shadow-primary/30 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3 sm:size-36"
              />
            ) : (
              <span className="text-gradient relative font-heading text-5xl font-bold">{project.title.slice(0, 2)}</span>
            )}
          </div>
        )}
        {featured && (
          <Badge className="absolute top-3 left-3 shadow-sm">Featured</Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-muted-foreground">{project.categories.join(" · ")}</p>
        <h3 className={cn("mt-2 font-semibold", featured ? "text-2xl" : "text-lg")}>{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t}>
              <Badge variant="secondary" className="font-mono text-[11px]">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5">
            {project.links.map((l) => {
              const Icon = linkIcons[l.label];
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-h-10 items-center gap-1.5 text-sm font-medium hover:text-primary"
                  aria-label={`${l.label}: ${project.title}`}
                >
                  <Icon className="size-4" />
                  {l.label}
                  <ArrowUpRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories)))] as ("All" | ProjectCategory)[],
    [],
  );
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <Section
      id="projects"
      index="04"
      ghost="Work"
      eyebrow="Projects"
      title="Things I've built"
      intro="A selection of side projects and research, from ML pipelines to full-stack apps."
    >
      <div
        role="group"
        aria-label="Filter projects"
        className="-mx-5 mb-10 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <LayoutGroup id="project-filters">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "relative shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:py-1.5",
                active === c ? "border-transparent text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === c && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              {c}
            </button>
          ))}
        </LayoutGroup>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
    </Section>
  );
}
