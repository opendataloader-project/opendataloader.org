import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Footer from "./_components/footer";
import Hero from "./_components/hero";
import ProblemSection from "./_components/problem-section";
import SolutionSection from "./_components/solution-section";

// Below-the-fold components loaded dynamically
const HowItWorks = dynamic(() => import("./_components/how-it-works"));
const QuickStart = dynamic(() => import("./_components/quick-start"));
const OutputPreview = dynamic(() => import("./_components/output-preview"));
const WhyOpenDataLoader = dynamic(
  () => import("./_components/why-opendataloader")
);
const UseCases = dynamic(() => import("./_components/use-cases"));
const TaggedPdf = dynamic(() => import("./_components/tagged-pdf"));
const Collaboration = dynamic(() => import("./_components/collaboration"));
const FinalCTA = dynamic(() => import("./_components/final-cta"));

export const metadata: Metadata = {
  metadataBase: new URL("https://opendataloader.org"),
  title:
    "OpenDataLoader PDF - Fast Local PDF Parser for RAG | Hybrid Mode Available",
  description:
    "Convert PDFs to LLM-ready Markdown and JSON. 91% accuracy local, 93% with hybrid mode. Bounding boxes for citations. 100% local by default, open source (MPL-2.0).",
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
    "hybrid mode",
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
      "Convert PDFs to LLM-ready Markdown and JSON. Local: 91% accuracy at 0.05s/page. Hybrid: 93% accuracy. 100% local by default.",
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
    description: "PDF Parsing for RAG — 91% Local, 93% Hybrid, No GPU Required",
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
