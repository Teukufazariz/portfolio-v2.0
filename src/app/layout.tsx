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
    "Teuku Fazariz Basya - iOS Developer specializing in Swift, SwiftUI, and UIKit. Apple Developer Academy 2025.",
  openGraph: {
    title: "Teuku Fazariz Basya",
    description:
      "Teuku Fazariz Basya - iOS Developer specializing in Swift, SwiftUI, and UIKit. Apple Developer Academy 2025.",
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
      <body className="antialiased">{children}</body>
      <Analytics />
      <SpeedInsights/>
    </html>
  );
}
