import type { Metadata } from "next";

import About from "./_components/about";
import AiSafety from "./_components/ai-safety";
import Benchmark from "./_components/benchmark";
import Contact from "./_components/contact";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import TaggedPdf from "./_components/tagged-pdf";

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
      <Hero />
      <About />
      <Benchmark />
      <AiSafety />
      <TaggedPdf />
      <Contact />
      <Footer />
    </div>
  );
}
