import { ArrowUpIcon } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { socialIcons } from "@/components/site/social-icons";
import { navItems, site, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Brand />
          <p className="mt-2 text-sm text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {socials.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <ArrowUpIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
