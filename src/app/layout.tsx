import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://teukufazariz.vercel.app"),
  title: {
    default: "Teuku Fazariz Basya - iOS Developer",
    template: "%s | Teuku Fazariz Basya",
  },
  description:
    "Teuku Fazariz Basya - Software Engineer specializing in iOS and Apple platform development.",
  verification: {
    google: "TnxEcHE1XPeimczF5oVyymXNNpTZ4JK3W5i7gMOn2T4",
  },
  openGraph: {
    title: "Teuku Fazariz Basya",
    description:
      "Teuku Fazariz Basya - Software Engineer specializing in iOS and Apple platform development.",
    url: "https://teukufazariz.vercel.app",
    siteName: "Teuku Fazariz Basya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Teuku Fazariz Basya Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teuku Fazariz Basya",
    description:
      "Teuku Fazariz Basya - Software Engineer specializing in iOS and Apple platform development.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main-content"
          className="absolute top-[-40px] left-0 bg-black text-white px-4 py-2 no-underline z-50 focus:top-0 focus:outline-none"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://teukufazariz.vercel.app/#person",
              name: "Teuku Fazariz Basya",
              url: "https://teukufazariz.vercel.app",
              jobTitle: "iOS Developer",
              sameAs: [
                "https://www.linkedin.com/in/teukufazarizbasya/",
                "https://github.com/teukufazariz",
              ],
            }),
          }}
        />

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
