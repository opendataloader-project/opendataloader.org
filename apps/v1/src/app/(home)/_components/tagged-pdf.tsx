"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Accessibility, ArrowRight, FileCheck, Shield } from "lucide-react";

const codeExample = `import opendataloader_pdf

opendataloader_pdf.convert(
    input_path=["accessible_document.pdf"],
    output_dir="output/",
    use_struct_tree=True  # Use native PDF structure tags
)`;

const benefits = [
  {
    icon: FileCheck,
    title: "Pixel-Perfect Extraction",
    description:
      "Extract the exact layout the author intended — no guessing, no heuristics",
  },
  {
    icon: Accessibility,
    title: "EAA 2025 Ready",
    description:
      "European Accessibility Act compliance means more tagged PDFs are coming",
  },
  {
    icon: Shield,
    title: "Semantic Preservation",
    description:
      "Headings, lists, tables, reading order — all preserved from the source",
  },
];

export default function TaggedPdf() {
  return (
    <section id="tagged-pdf" className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Tagged PDF Support
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Most PDF parsers ignore structure tags entirely.
            <br />
            We&apos;re one of the few that fully support them.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, delay: 0.03 * index }}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <benefit.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <DynamicCodeBlock lang="python" code={codeExample} />
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href="/docs/tagged-pdf"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Tagged PDF documentation
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="/docs/tagged-pdf-collaboration"
            className="inline-flex items-center text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Collaboration Guide
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
