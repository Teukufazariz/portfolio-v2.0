import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Chrome from "@/components/Chrome";
import Field from "@/components/Field";
import Motion from "@/components/Motion";
import { site } from "@/content";
import { openGraphBase } from "./share";

// The fallback faces are defined in globals.css, one per weight and style, so text wraps the same before and after Fraunces arrives.
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz", "WONK"], variable: "--font-serif", display: "swap", adjustFontFallback: false, fallback: ["Fraunces Fallback"] });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${site.name}, ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  verification: { google: "TnxEcHE1XPeimczF5oVyymXNNpTZ4JK3W5i7gMOn2T4" },
  openGraph: { ...openGraphBase, title, description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0b0a09", colorScheme: "dark light" };

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: site.short,
  url: site.url,
  jobTitle: "DevOps Engineer",
  description: site.description,
  knowsAbout: ["DevOps", "CI/CD", "Kubernetes", "GitOps", "Terraform", "Amazon Web Services", "Argo CD", "Backstage"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Multimedia Nusantara University" },
  address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
  sameAs: [site.linkedin, site.github],
};

// Runs before first paint: the saved theme, and whether this session has already seen the load sequence.
const boot = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t)d.dataset.theme=t;if(sessionStorage.getItem("intro"))d.classList.add("skip-intro")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        {/* Without JavaScript nothing scrubs, so the pinned scenes fall back to normal flow. */}
        <noscript>
          <style>{`.scene{height:auto;padding-top:110px}.pin{position:static;height:auto;padding-top:0;padding-bottom:0}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Field />
        <Chrome />
        {children}
        <footer>
          <span className="label">© 2026 {site.name}</span>
          <span className="label">{site.place} (GMT+7)</span>
          <a className="label" href="#main">Back to top ↑</a>
        </footer>
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
