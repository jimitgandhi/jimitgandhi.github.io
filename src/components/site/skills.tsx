import { BrainCircuitIcon, DatabaseZapIcon, GaugeIcon, SearchIcon, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { focusAreas, skills } from "@/content/site";

const focusIcons: LucideIcon[] = [SearchIcon, BrainCircuitIcon, DatabaseZapIcon, GaugeIcon];

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      ghost="Skills"
      eyebrow="Expertise"
      title="What I work with"
      intro="The problems I focus on and the tools I use to solve them."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area, i) => {
          const Icon = focusIcons[i % focusIcons.length];
          return (
            <Reveal
              key={area.title}
              delay={i * 0.05}
              className="card-surface group relative overflow-hidden p-6 transition-colors hover:border-primary/40"
            >
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-4 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-12">
        <dl className="divide-y rounded-2xl border">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-3 p-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center sm:gap-6 sm:px-6">
              <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{s.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border bg-card/60 px-3 py-1 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
