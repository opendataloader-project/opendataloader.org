"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const jsonExample = `{
  "type": "heading",
  "id": 42,
  "page number": 1,
  "bounding box": [72.0, 700.0, 540.0, 730.0],
  "heading level": 1,
  "content": "Introduction"
}`;

const markdownExample = `# Introduction

This paper presents a novel approach to document parsing...

## Methods

| Parameter | Value |
| --------- | ----- |
| Accuracy  | 91%   |`;

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("json");

  return (
    <section id="how-it-works" className="bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            From PDF to LLM-Ready Data
          </h2>
        </motion.div>

        {/* Pipeline Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <Image
            src="/figures/pipeline-diagram.webp"
            alt="PDF processing pipeline diagram"
            width={1200}
            height={1181}
            className="mx-auto max-w-2xl rounded-xl"
          />
        </motion.div>

        {/* Output Format Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="annotated">Annotated PDF</TabsTrigger>
            </TabsList>

            <TabsContent value="json" className="mt-4">
              <DynamicCodeBlock lang="json" code={jsonExample} />
            </TabsContent>

            <TabsContent value="markdown" className="mt-4">
              <DynamicCodeBlock lang="markdown" code={markdownExample} />
            </TabsContent>

            <TabsContent value="annotated" className="mt-4">
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/figures/example_annotated_pdf.webp"
                  alt="Visual debugging: see detected structures overlaid on the original"
                  width={800}
                  height={600}
                  className="w-full"
                />
                <p className="bg-gray-50 p-3 text-center text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  Visual debugging: see detected structures overlaid on the
                  original
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA to Demo */}
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/demo/samples/01030000000000?view1=annot&view2=json">
                Explore Real Samples →
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
