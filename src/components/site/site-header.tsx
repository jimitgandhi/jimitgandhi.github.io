"use client";

import { useState } from "react";
import { CommandIcon, MenuIcon, SearchIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brand } from "@/components/site/brand";
import { useCommandMenu } from "@/components/site/command-menu-context";
import { socialIcons } from "@/components/site/social-icons";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { navItems, site, socials } from "@/content/site";
import { useActiveSection, useScrolled } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((n) => n.id);

export function SiteHeader() {
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled();
  const { setOpen: setCommandOpen } = useCommandMenu();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="rounded-md" aria-label={`${site.name}, back to top`}>
          <Brand />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary ring-1 ring-border"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="hidden h-9 gap-2 rounded-full px-3 text-muted-foreground lg:inline-flex"
            aria-label="Open command menu"
          >
            <SearchIcon className="size-4" />
            <span className="text-xs">Search</span>
            <kbd className="pointer-events-none ml-1 inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px]">
              <CommandIcon className="size-2.5" />K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full lg:hidden"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command menu"
          >
            <SearchIcon className="size-[18px]" />
          </Button>
          <ThemeToggle />

          <Sheet open={menuOpen} onOpenChange={(o) => setMenuOpen(o)}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="size-9 rounded-full md:hidden" aria-label="Open menu" />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <SheetHeader className="border-b p-5">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-3">
                <ul className="flex flex-col">
                  {navItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-baseline gap-3 rounded-lg px-3 py-3 font-heading text-2xl font-semibold transition-colors hover:bg-secondary",
                          active === item.id ? "text-primary" : "text-foreground",
                        )}
                      >
                        <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex gap-1 border-t p-4">
                {socials
                  .filter((s) => s.primary)
                  .map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <a
                        key={s.key}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
