"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Lightbulb } from "lucide-react";

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
    <section id="output-preview" className="bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Structured Output with Bounding Boxes
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left Column - JSON Example */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              JSON Output Example
            </h3>
            <DynamicCodeBlock lang="json" code={jsonExample} />

            {/* Field Descriptions Table */}
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                      Field
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {fieldDescriptions.map((item) => (
                    <tr key={item.field}>
                      <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">
                        {item.field}
                      </td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Bounding Box Visualization
            </h3>
            <Link
              href="/demo/samples/01030000000000?view1=annot&view2=json"
              className="group block overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-500"
            >
              <Image
                src="/figures/example_annotated_pdf.webp"
                alt="PDF with bounding box overlays showing detected elements"
                width={600}
                height={800}
                className="w-full cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          </motion.div>
        </div>

        {/* Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Why Bounding Boxes Matter for RAG
              </h4>
              <p className="mt-1 text-blue-700 dark:text-blue-300">
                When your LLM answers a question, bounding boxes let you:
              </p>
              <ul className="mt-2 list-inside list-disc text-blue-700 dark:text-blue-300">
                <li>Highlight the exact source location in the PDF</li>
                <li>
                  Build citation links: &quot;Source: document.pdf, Page 3,
                  Position (72, 450)&quot;
                </li>
                <li>Verify extraction accuracy by visual comparison</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Link to Schema */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Link
            href="/docs/json-schema"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Full JSON Schema
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
