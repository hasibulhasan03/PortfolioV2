import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import NoiseOverlay from "@/components/shared/NoiseOverlay";
import ScrollProgress from "@/components/shared/ScrollProgress";
import InteractiveBackground from "@/components/shared/InteractiveBackground";
import ScrollVelocityCSS from "@/components/shared/ScrollVelocityCSS";

export const metadata: Metadata = {
  title: "MD. Hasibul Hasan — Software Engineer & Network Architect",
  description:
    "Software engineer, network infrastructure specialist, and AI/ML researcher building systems that outlast trends.",
  metadataBase: new URL("https://hasibul.dev"),
  openGraph: {
    title: "MD. Hasibul Hasan — Portfolio 2025",
    description:
      "Software engineer, network infrastructure specialist, and AI/ML researcher.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <InteractiveBackground />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <ScrollVelocityCSS />
        <ScrollProgress />
        <NoiseOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
