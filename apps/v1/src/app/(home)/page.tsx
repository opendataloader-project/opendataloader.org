import type { Metadata } from "next";

import Collaboration from "./_components/collaboration";
import FinalCTA from "./_components/final-cta";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import OutputPreview from "./_components/output-preview";
import ProblemSection from "./_components/problem-section";
import QuickStart from "./_components/quick-start";
import SolutionSection from "./_components/solution-section";
import TaggedPdf from "./_components/tagged-pdf";
import UseCases from "./_components/use-cases";
import WhyOpenDataLoader from "./_components/why-opendataloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://opendataloader.org"),
  title: "OpenDataLoader PDF - Fast Local PDF Parser for RAG | No GPU Required",
  description:
    "Convert PDFs to LLM-ready Markdown and JSON. 91% reading order accuracy, bounding boxes for citations. 100% local, deterministic, open source (MPL-2.0).",
  keywords: [
    "PDF parser for RAG",
    "PDF to markdown",
    "LLM document parsing",
    "local PDF processing",
    "bounding box extraction",
    "no GPU PDF parser",
    "reading order extraction",
    "RAG pipeline",
    "document extraction",
  ],
  authors: [{ name: "OpenDataLoader" }],
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    type: "website",
    url: "https://opendataloader.org/",
    siteName: "OpenDataLoader PDF",
    title: "OpenDataLoader PDF - PDF Parsing for RAG",
    description:
      "Convert PDFs to LLM-ready Markdown and JSON. 91% reading order accuracy. 100% local, no GPU required.",
    images: [
      {
        url: "https://opendataloader.org/og-image.webp",
        alt: "OpenDataLoader PDF preview",
      },
      {
        url: "https://opendataloader.org/og-image.png",
        alt: "OpenDataLoader PDF preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenDataLoader PDF",
    description: "PDF Parsing for RAG — 100% Local, No GPU Required",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <QuickStart />
      <OutputPreview />
      <WhyOpenDataLoader />
      <UseCases />
      <TaggedPdf />
      <Collaboration />
      <FinalCTA />
      <Footer />
    </div>
  );
}
