"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight } from "lucide-react";

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

const htmlExample = `<article>
  <h1>Introduction</h1>
  <p>This paper presents a novel approach to document parsing...</p>

  <h2>Methods</h2>
  <table>
    <tr><th>Parameter</th><th>Value</th></tr>
    <tr><td>Accuracy</td><td>91%</td></tr>
  </table>
</article>`;

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("json");

  return (
    <section id="how-it-works" className="bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            From PDF to LLM-Ready Data
          </h2>
        </motion.div>

        {/* Pipeline Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mt-12"
        >
          <video
            src="/figures/pipeline.mp4"
            poster="/figures/pipeline-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto w-full max-w-2xl rounded-xl"
          />
        </motion.div>

        {/* Output Format Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="annotated">Annotated PDF</TabsTrigger>
            </TabsList>

            <TabsContent value="json" className="mt-4">
              <DynamicCodeBlock lang="json" code={jsonExample} />
            </TabsContent>

            <TabsContent value="markdown" className="mt-4">
              <DynamicCodeBlock lang="markdown" code={markdownExample} />
            </TabsContent>

            <TabsContent value="html" className="mt-4">
              <DynamicCodeBlock lang="html" code={htmlExample} />
            </TabsContent>

            <TabsContent value="annotated" className="mt-4">
              <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
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
            <Link
              href="/demo/samples/01030000000000?view1=annot&view2=json"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              See It in Action
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
