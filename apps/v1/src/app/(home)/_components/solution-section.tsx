"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  MapPin,
  Shield,
  Table2,
  Target,
  Zap,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "No GPU Required",
    description:
      "Rule-based extraction runs on any CPU. Process 100+ pages per second. Deploy anywhere.",
    link: "/docs/benchmark/speed",
    linkText: "View speed benchmarks",
  },
  {
    icon: Target,
    title: "XY-Cut++ Reading Order",
    description:
      "Correctly reads multi-column layouts like academic papers and newspapers. Text flows in the order humans would read it.",
    link: "/docs/reading-order",
    linkText: "How reading order works",
  },
  {
    icon: MapPin,
    title: "Bounding Boxes",
    description:
      "Every element includes [x1, y1, x2, y2] coordinates. Enable precise citations back to the source PDF.",
    link: "/docs/json-schema",
    linkText: "View JSON schema",
  },
  {
    icon: Shield,
    title: "AI Safety Built-in",
    description:
      "Automatically filters hidden text, off-page content, and prompt injection attempts.",
    link: "/docs/ai-safety",
    linkText: "AI safety documentation",
  },
  {
    icon: Table2,
    title: "Table Extraction",
    description:
      "Detects table borders and clusters text into rows/columns. Handles merged cells and complex structures.",
    link: "/docs/json-schema#table",
    linkText: "Table schema details",
  },
  {
    icon: Lock,
    title: "100% Local Processing",
    description:
      "No network calls. Documents never leave your machine. Perfect for healthcare, legal, and financial documents.",
    link: null,
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Built for RAG, Not Just PDF Reading
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  {feature.link && feature.linkText && (
                    <Link
                      href={feature.link}
                      className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {feature.linkText}
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
