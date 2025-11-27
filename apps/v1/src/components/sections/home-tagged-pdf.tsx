"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/section";

const scenarios = [
  "Research papers: identify authors, affiliations, and headings for precise citations.",
  "Financial reports: keep balance-sheet titles tied to the right table cells.",
  "Legal contracts: surface clauses, dates, and parties for faster review.",
];

export default function HomeTaggedPdf() {
  return (
    <Section
      id="tagged-pdf"
      title="Tagged PDF"
      subtitle="A semantic, accessible PDF structure that makes documents AI-ready and easier to validate."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-neutral-200/60 bg-white/50 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
          <CardHeader>
            <CardTitle>Why it matters</CardTitle>
            <CardDescription>
              Tagged PDFs map headings, paragraphs, and tables so AI can
              understand hierarchy and context without guesswork.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
            <p>
              Growing accessibility requirements (like the European
              Accessibility Act) are accelerating adoption. Proper tags also
              turn unstructured documents into reliable, machine-readable data
              for AI workflows.
            </p>
            <p>
              OpenDataLoader-PDF is building an engine that uses these tags to
              produce richer, safer extractions.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200/60 bg-white/50 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
          <CardHeader>
            <CardTitle>Real-world scenarios</CardTitle>
            <CardDescription>
              Where high-quality tags remove ambiguity and speed up downstream
              work.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
            <ul className="list-disc space-y-2 pl-4">
              {scenarios.map((scenario) => (
                <li key={scenario}>{scenario}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="rounded-2xl">
          <Link href="/docs/tagged-pdf">Learn More</Link>
        </Button>
      </div>
    </Section>
  );
}
