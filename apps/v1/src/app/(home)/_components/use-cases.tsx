"use client";

import { motion } from "framer-motion";
import { Accessibility, Bot, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const useCases = [
  {
    icon: Bot,
    industry: "AI/ML",
    title: "RAG Pipeline Integration",
    description:
      "Official LangChain integration. Structured JSON output with bounding boxes ready for chunking, embedding, and citations.",
    badgeColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    icon: GraduationCap,
    industry: "Research",
    title: "Academic Paper Ingestion",
    description:
      "Build knowledge bases from two-column academic papers. XY-Cut++ handles multi-column layouts correctly.",
    badgeColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    icon: Accessibility,
    industry: "Compliance",
    title: "Tagged PDF / Accessibility",
    description:
      "EAA 2025 compliance ready. Extract semantic structure from tagged PDFs — headings, lists, tables preserved as authored.",
    badgeColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Built for Production RAG Pipelines
          </h2>
        </motion.div>

        {/* Use Case Cards - Horizontal Scroll on Mobile */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, delay: 0.03 * index }}
              className="min-w-[280px] flex-shrink-0 md:min-w-0"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      <useCase.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <Badge className={useCase.badgeColor}>
                      {useCase.industry}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
