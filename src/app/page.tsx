import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Journey } from "@/components/site/journey";
import { Projects } from "@/components/site/projects";
import { Publications } from "@/components/site/publications";
import { SiteHeader } from "@/components/site/site-header";
import { Skills } from "@/components/site/skills";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
