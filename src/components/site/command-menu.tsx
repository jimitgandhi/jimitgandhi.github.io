"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  FileTextIcon,
  FolderGit2Icon,
  GraduationCapIcon,
  HashIcon,
  MoonIcon,
  SparklesIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommandMenu } from "@/components/site/command-menu-context";
import { JOURNEY_TAB_EVENT, type JourneyTab } from "@/components/site/journey-tab";
import { socialIcons } from "@/components/site/social-icons";
import { education, experience, navItems, projects, publications, site, skills, socials } from "@/content/site";

// Every search word must appear in the item's label or keywords (cmdk's default fuzzy match is too loose).
const filter = (value: string, search: string, keywords?: string[]) => {
  const haystack = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase();
  return search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
    ? 1
    : 0;
};

export function CommandMenu() {
  const { open, setOpen, toggle } = useCommandMenu();
  const { resolvedTheme, setTheme } = useTheme();
  const pending = useRef<(() => void) | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Defer actions until the dialog has fully closed, so its scroll lock and focus
  // restoration don't undo the scroll.
  const run = (fn: () => void) => {
    pending.current = fn;
    setOpen(false);
  };

  const goTo = (id: string, fallback?: string) =>
    run(() => {
      const el = document.getElementById(id) ?? (fallback ? document.getElementById(fallback) : null);
      el?.scrollIntoView({ block: "start" });
    });
  const goToJourney = (tab: JourneyTab) =>
    run(() => {
      window.dispatchEvent(new CustomEvent<JourneyTab>(JOURNEY_TAB_EVENT, { detail: tab }));
      document.getElementById("experience")?.scrollIntoView({ block: "start" });
    });
  const openUrl = (url: string) => {
    // Open synchronously so popup blockers treat it as a user action.
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => setOpen(next)}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen) return;
        const fn = pending.current;
        pending.current = null;
        fn?.();
      }}
      title="Search"
      description="Search projects, experience, skills and publications, or jump to a section."
    >
      <Command filter={filter}>
        <CommandInput placeholder="Search projects, skills, experience…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            <CommandItem value="Home top" onSelect={() => goTo("top")}>
              <HashIcon />
              Home
            </CommandItem>
            {navItems.map((item) => (
              <CommandItem key={item.id} value={`Section ${item.label}`} onSelect={() => goTo(item.id)}>
                <HashIcon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={`Project ${p.title}`}
                keywords={[...p.tags, ...p.categories]}
                onSelect={() => goTo(`project-${p.slug}`, "projects")}
              >
                <FolderGit2Icon />
                <span className="truncate">{p.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Experience">
            {experience.map((e) => (
              <CommandItem
                key={e.company + e.role}
                value={`Experience ${e.role} ${e.company}`}
                keywords={e.tags}
                onSelect={() => goToJourney("work")}
              >
                <BriefcaseIcon />
                <span className="truncate">{e.role}</span>
                <CommandShortcut>{e.company}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Education">
            {education.map((e) => (
              <CommandItem
                key={e.school + e.degree}
                value={`Education ${e.degree} ${e.school}`}
                keywords={[e.period]}
                onSelect={() => goToJourney("education")}
              >
                <GraduationCapIcon />
                <span className="truncate">{e.degree}</span>
                <CommandShortcut className="max-w-[45%] truncate">{e.school}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Skills">
            {skills.map((s) => (
              <CommandItem
                key={s.group}
                value={`Skills ${s.group}`}
                keywords={s.items}
                onSelect={() => goTo("skills")}
              >
                <SparklesIcon />
                <span className="truncate">
                  {s.group}
                  <span className="ml-2 text-muted-foreground">{s.items.slice(0, 3).join(", ")}…</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Publications">
            {publications.map((p) => (
              <CommandItem
                key={p.title}
                value={`Publication ${p.title}`}
                keywords={p.venue ? [p.venue] : undefined}
                onSelect={() => goTo("publications")}
              >
                <BookOpenIcon />
                <span className="truncate">{p.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="View résumé resume CV" onSelect={() => openUrl(site.resumeUrl)}>
              <FileTextIcon />
              View résumé
              <CommandShortcut>
                <ArrowUpRightIcon className="size-3.5" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              value="Toggle theme dark light mode"
              onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            >
              <MoonIcon />
              Toggle theme
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Profiles">
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <CommandItem key={s.key} value={`${s.label} ${s.handle}`} onSelect={() => openUrl(s.href)}>
                  <Icon />
                  {s.label}
                  <CommandShortcut>{s.handle}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
