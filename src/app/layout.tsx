import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Teuku Fazariz B.",
  description:
    "Teuku Fazariz Basya - iOS Developer specializing in Swift, SwiftUI, and UIKit. Apple Developer Academy 2025.",
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
