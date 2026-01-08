import type { Metadata } from "next";
import "./globals.css";

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
    </html>
  );
}
