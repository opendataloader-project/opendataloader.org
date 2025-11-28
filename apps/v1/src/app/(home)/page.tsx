import type { Metadata } from "next";

import HomeAbout from "@/components/sections/home-about";
import HomeAiSafety from "@/components/sections/home-ai-safety";
import HomeBenchmark from "@/components/sections/home-benchmark";
import HomeContact from "@/components/sections/home-contact";
import HomeFooter from "@/components/sections/home-footer";
import HomeHero from "@/components/sections/home-hero";
import HomeTaggedPdf from "@/components/sections/home-tagged-pdf";

const siteDescription =
  "PDF Data loader for AI/ML datasets. Easily load, explore, and utilize various datasets.";

export const metadata: Metadata = {
  metadataBase: new URL("https://opendataloader.org"),
  title: "OpenDataLoader",
  description: siteDescription,
  keywords: [
    "pdf",
    "opendataloader",
    "data",
    "dataset",
    "AI",
    "machine learning",
    "data management",
  ],
  authors: [{ name: "OpenDataLoader" }],
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    type: "website",
    url: "https://opendataloader.org/",
    siteName: "OpenDataLoader",
    title: "OpenDataLoader",
    description: siteDescription,
    images: [
      {
        url: "https://opendataloader.org/og-image.webp",
        alt: "OpenDataLoader preview",
      },
      {
        url: "https://opendataloader.org/og-image.png",
        alt: "OpenDataLoader preview",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <HomeAbout />
      <HomeBenchmark />
      <HomeAiSafety />
      <HomeTaggedPdf />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
