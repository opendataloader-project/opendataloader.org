import { Cloud, FileText, MapPin, Table2 } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LazyVideo } from "@/components/ui/lazy-video";

const problemCards = [
  {
    icon: FileText,
    title: "Scrambled Reading Order",
    description:
      "Multi-column layouts read left-to-right across the page, mixing content from different columns and destroying context. Your LLM receives jumbled text that makes no sense.",
  },
  {
    icon: Table2,
    title: "Lost Table Structure",
    description:
      "Tables become walls of unformatted text. Row and column relationships disappear, making financial data and specifications unusable.",
  },
  {
    icon: MapPin,
    title: "No Source Coordinates",
    description:
      "Can't cite where information came from. No way to highlight or reference the original PDF location. Users can't verify your AI's answers.",
  },
  {
    icon: Cloud,
    title: "Privacy & Cost Trade-offs",
    description:
      "Cloud APIs leak sensitive data (HIPAA/SOC2 violations). Commercial services charge $0.01-0.10 per page — costs add up fast at scale.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Building RAG Pipelines? PDFs Are Harder Than They Look.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Most PDF parsers weren&apos;t designed for LLMs. The parsing tool
            you choose determines 90% of your RAG pipeline&apos;s accuracy.
          </p>
        </AnimateOnScroll>

        {/* Key Message Callout */}
        <AnimateOnScroll className="mx-auto mb-12 mt-8 max-w-3xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-800 dark:bg-amber-900/20">
          <p className="text-amber-800 dark:text-amber-200">
            &quot;If the data isn&apos;t parsed properly, your RAG system will
            never retrieve accurate answers. No matter how powerful the LLM you
            use, garbage in = garbage out.&quot;
          </p>
        </AnimateOnScroll>

        {/* Problem Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {problemCards.map((card, index) => (
            <AnimateOnScroll key={card.title} delay={30 * index}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <card.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Problem/Solution Comparison Video */}
        <AnimateOnScroll className="mt-12">
          <LazyVideo
            src="/figures/problem-solution.mp4"
            poster="/figures/problem-solution-poster.webp"
            className="mx-auto w-full max-w-2xl rounded-xl shadow-lg"
          />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
