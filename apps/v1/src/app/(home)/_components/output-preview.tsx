import Image from "next/image";
import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Braces, Lightbulb } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const jsonExample = `{
  "type": "heading",
  "id": 42,
  "level": "Title",
  "page number": 1,
  "bounding box": [72.0, 700.0, 540.0, 730.0],
  "heading level": 1,
  "font": "Helvetica-Bold",
  "font size": 24.0,
  "content": "Introduction"
}`;

const fieldDescriptions = [
  {
    field: "type",
    description:
      "Element type: heading, paragraph, table, list, image, caption",
  },
  {
    field: "id",
    description: "Unique identifier for cross-referencing",
  },
  {
    field: "page number",
    description: "1-indexed page reference",
  },
  {
    field: "bounding box",
    description: "[left, bottom, right, top] in PDF points",
  },
  {
    field: "heading level",
    description: "Heading depth (1+)",
  },
  {
    field: "font, font size",
    description: "Typography info",
  },
  {
    field: "content",
    description: "Extracted text",
  },
];

export default function OutputPreview() {
  return (
    <section
      id="output-preview"
      className="relative bg-slate-50 py-20 dark:bg-slate-900"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/50 dark:text-violet-300">
            <Braces className="h-3.5 w-3.5" />
            Output Format
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Structured Output with Bounding Boxes
          </h2>
        </AnimateOnScroll>

        {/* Two Column Layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left Column - JSON Example */}
          <AnimateOnScroll animation="fade-left" className="min-w-0">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              JSON Output Example
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <DynamicCodeBlock lang="json" code={jsonExample} />
            </div>

            {/* Field Descriptions Table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                      Field
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {fieldDescriptions.map((item) => (
                    <tr
                      key={item.field}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <td className="px-4 py-2.5 font-mono text-sm text-cyan-600 dark:text-cyan-400">
                        {item.field}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>

          {/* Right Column - Visual */}
          <AnimateOnScroll animation="fade-right">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Bounding Box Visualization
            </h3>
            <Link
              href="/demo/samples/01030000000000?view1=annot&view2=json"
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-500"
            >
              <Image
                src="/figures/example_annotated_pdf.webp"
                alt="PDF with bounding box overlays showing detected elements"
                width={600}
                height={800}
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </Link>
          </AnimateOnScroll>
        </div>

        {/* Callout Box - Enhanced */}
        <AnimateOnScroll className="mt-14">
          <div className="relative rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-50 to-cyan-50/50 p-6 dark:border-sky-800/30 dark:from-sky-950/30 dark:to-cyan-950/20">
            <div className="absolute -left-3 top-6 h-12 w-1 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500" />
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <Lightbulb className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sky-900 dark:text-sky-100">
                  Why Bounding Boxes Matter for RAG
                </h4>
                <p className="mt-1 text-sky-700 dark:text-sky-300">
                  When your LLM answers a question, bounding boxes let you:
                </p>
                <ul className="mt-3 space-y-1.5 text-sky-700 dark:text-sky-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    Highlight the exact source location in the PDF
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    Build citation links with page and position references
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    Verify extraction accuracy by visual comparison
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Links - Enhanced */}
        <AnimateOnScroll
          animation="fade-in"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/docs/json-schema"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            View Full JSON Schema
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo/samples"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            Browse Sample Extractions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
