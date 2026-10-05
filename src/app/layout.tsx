import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Poppins } from "next/font/google";
import { Providers } from "@/components/site/providers";
import { education, experience, publications, site, skills, socials } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const { title, description, keywords } = site.seo;
const pageUrl = `${site.url}/`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  keywords: [...keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: pageUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "profile",
    url: pageUrl,
    siteName: site.name,
    locale: "en_US",
    title,
    description,
    firstName: site.firstName,
    lastName: site.name.split(" ").slice(1).join(" "),
    username: "jimitgandhi",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f16" },
  ],
  colorScheme: "dark light",
};

const personId = `${pageUrl}#person`;
const websiteId = `${pageUrl}#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      givenName: site.firstName,
      familyName: site.name.split(" ").slice(1).join(" "),
      url: pageUrl,
      image: [`${site.url}${site.avatar}`, `${site.url}/opengraph-image.png`],
      jobTitle: "Senior Software Engineer",
      description,
      worksFor: { "@type": "Organization", name: site.employer.name, url: site.employer.url },
      alumniOf: education
        .filter((e) => !e.program)
        .map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      award: education.filter((e) => e.program).map((e) => `${e.degree}, ${e.school} (${e.period}): ${e.detail}`),
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      knowsAbout: [...new Set([...skills.flatMap((s) => s.items), ...experience[0].tags])],
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: pageUrl,
      name: site.name,
      description,
      inLanguage: "en-US",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl}#profile`,
      url: pageUrl,
      name: title,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      inLanguage: "en-US",
    },
    ...publications.map((p) => ({
      "@type": "ScholarlyArticle",
      headline: p.title,
      ...(p.href && { url: p.href }),
      ...(p.year && { datePublished: p.year }),
      ...(p.venue && { publisher: p.venue }),
      author: { "@id": personId },
    })),
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Without JavaScript, show content that would otherwise wait for scroll-reveal animations. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
