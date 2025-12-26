"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import {
  ArrowRight,
  Braces,
  Code2,
  FileCode,
  FileImage,
  Workflow,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { LazyVideo } from "@/components/ui/lazy-video";
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

const tabs = [
  { value: "json", label: "JSON", icon: Braces },
  { value: "markdown", label: "Markdown", icon: FileCode },
  { value: "html", label: "HTML", icon: Code2 },
  { value: "annotated", label: "Annotated", icon: FileImage },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("json");

  return (
    <section
      id="how-it-works"
      className="relative bg-slate-50 py-20 dark:bg-slate-900"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Workflow className="h-3.5 w-3.5" />
            How It Works
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            From PDF to LLM-Ready Data
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
            One line of code to extract structured content with full positional
            data.
          </p>
        </AnimateOnScroll>

        {/* Pipeline Diagram with enhanced frame */}
        <AnimateOnScroll className="mt-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-gradient-to-b from-white to-slate-50 p-1 shadow-xl ring-1 ring-slate-900/5 dark:from-slate-800 dark:to-slate-900 dark:ring-white/5">
              <LazyVideo
                src="/figures/pipeline.mp4"
                poster="/figures/pipeline-poster.webp"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Output Format Tabs - Enhanced design */}
        <AnimateOnScroll className="mx-auto mt-16 max-w-3xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Custom styled tab list */}
            <div className="flex justify-center">
              <TabsList className="inline-flex h-auto gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <TabsContent value="json" className="m-0">
                <DynamicCodeBlock lang="json" code={jsonExample} />
              </TabsContent>

              <TabsContent value="markdown" className="m-0">
                <DynamicCodeBlock lang="markdown" code={markdownExample} />
              </TabsContent>

              <TabsContent value="html" className="m-0">
                <DynamicCodeBlock lang="html" code={htmlExample} />
              </TabsContent>

              <TabsContent value="annotated" className="m-0">
                <div className="p-4">
                  <Image
                    src="/figures/example_annotated_pdf.webp"
                    alt="Visual debugging: see detected structures overlaid on the original"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="mx-auto rounded-lg"
                  />
                  <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    Visual debugging: see detected structures overlaid on the
                    original
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* CTA to Demo - Enhanced */}
          <div className="mt-8 text-center">
            <Link
              href="/demo/samples/01030000000000?view1=annot&view2=json"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Try the Interactive Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
