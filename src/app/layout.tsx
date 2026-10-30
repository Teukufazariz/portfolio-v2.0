import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Grain from "@/components/Grain";

export const metadata: Metadata = {
  metadataBase: new URL("https://teukufazariz.vercel.app"),
  title: {
    default: "Teuku Fazariz Basya - DevOps Engineer",
    template: "%s | Teuku Fazariz Basya",
  },
  description:
    "Teuku Fazariz Basya - DevOps engineer working with CI/CD, Kubernetes, and Terraform on AWS.",
  verification: {
    google: "TnxEcHE1XPeimczF5oVyymXNNpTZ4JK3W5i7gMOn2T4",
  },
  openGraph: {
    title: "Teuku Fazariz Basya",
    description:
      "Teuku Fazariz Basya - DevOps engineer working with CI/CD, Kubernetes, and Terraform on AWS.",
    url: "https://teukufazariz.vercel.app",
    siteName: "Teuku Fazariz Basya",
    locale: "en_US",
    type: "website",
    // The image comes from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Teuku Fazariz Basya",
    description:
      "Teuku Fazariz Basya - DevOps engineer working with CI/CD, Kubernetes, and Terraform on AWS.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  /** Parallel route: the case study sheet, see src/app/@modal */
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Before first paint: apply the saved theme so nothing flashes, and play the intro once per visit */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;var t=localStorage.getItem("theme");if(t)d.dataset.theme=t;if(sessionStorage.getItem("intro"))d.classList.add("seen");else sessionStorage.setItem("intro","1")}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip">
          Skip to main content
        </a>
        <div className="intro" aria-hidden="true">
          <p>
            Teuku Fazariz Basya <span>Portfolio</span>
          </p>
        </div>
        <Grain />
        <div className="frame" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://teukufazariz.vercel.app/#person",
              name: "Teuku Fazariz Basya",
              url: "https://teukufazariz.vercel.app",
              jobTitle: "DevOps Engineer",
              sameAs: [
                "https://www.linkedin.com/in/teukufazarizbasya/",
                "https://github.com/teukufazariz",
              ],
            }),
          }}
        />

        {children}
        {modal}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
