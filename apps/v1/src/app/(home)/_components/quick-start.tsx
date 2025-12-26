"use client";

import { useState } from "react";
import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Code, Link2 } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getCodeLang(key: string): string {
  if (key === "python") return "python";
  if (key === "nodejs") return "typescript";
  return "bash";
}

const codeExamples = {
  python: {
    install: "pip install -U opendataloader-pdf",
    code: `import opendataloader_pdf

opendataloader_pdf.convert(
    input_path=["document.pdf"],
    output_dir="output/",
    format="json,html,pdf,markdown"
)`,
    guideLink: "/docs/quick-start-python",
    guideText: "View Python Guide",
  },
  nodejs: {
    install: "npm install @opendataloader/pdf",
    code: `import { convert } from "@opendataloader/pdf";

await convert(["document.pdf"], {
  outputDir: "output/",
  format: "json,html,pdf,markdown"
});`,
    guideLink: "/docs/quick-start-nodejs",
    guideText: "View Node.js Guide",
  },
  docker: {
    install: "",
    code: String.raw`docker run --rm -v "$PWD":/work \
  ghcr.io/opendataloader-project/opendataloader-pdf-cli:latest \
  /work/document.pdf -f json,html,pdf,markdown`,
    guideLink: "/docs/quick-start-docker",
    guideText: "View Docker Guide",
  },
  java: {
    install: `<dependency>
  <groupId>org.opendataloader</groupId>
  <artifactId>opendataloader-pdf-core</artifactId>
  <version>1.4.1</version>
</dependency>`,
    code: `Config config = new Config();
config.setOutputFolder("output/");

OpenDataLoaderPDF.processFile("document.pdf", config);`,
    guideLink: "/docs/quick-start-java",
    guideText: "View Java Guide",
  },
};

export default function QuickStart() {
  const [activeTab, setActiveTab] = useState("python");

  return (
    <section
      id="quick-start"
      className="relative bg-white py-20 dark:bg-slate-950"
    >
      {/* Section divider */}
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/50 dark:text-amber-300">
            <Code className="h-3.5 w-3.5" />
            Quick Start
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Get Started in 60 Seconds
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll className="mx-auto mt-14 max-w-2xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Enhanced tab list */}
            <div className="flex justify-center">
              <TabsList className="inline-flex h-auto gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <TabsTrigger
                  value="python"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  Python
                </TabsTrigger>
                <TabsTrigger
                  value="nodejs"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  Node.js
                </TabsTrigger>
                <TabsTrigger
                  value="docker"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  Docker
                </TabsTrigger>
                <TabsTrigger
                  value="java"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  Java
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(codeExamples).map(([key, example]) => (
              <TabsContent
                key={key}
                value={key}
                className="mt-6 min-w-0 space-y-4"
              >
                <div className="overflow-hidden">
                  {example.install && (
                    <div className="overflow-x-auto">
                      <DynamicCodeBlock
                        lang={key === "java" ? "xml" : "bash"}
                        code={example.install}
                      />
                    </div>
                  )}
                  {example.code && (
                    <div className="overflow-x-auto mt-2">
                      <DynamicCodeBlock
                        lang={getCodeLang(key)}
                        code={example.code}
                      />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <Link
                    href={example.guideLink}
                    className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    {example.guideText}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimateOnScroll>

        {/* LangChain Highlight - Enhanced */}
        <AnimateOnScroll className="mx-auto mt-10 max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 dark:border-emerald-800/30 dark:from-emerald-950/30 dark:to-teal-950/20">
            <div className="absolute -left-3 top-6 h-12 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Link2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                  Building a RAG pipeline?
                </p>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                  Use our official LangChain integration:
                </p>
                <div className="mt-3 overflow-x-auto">
                  <DynamicCodeBlock
                    lang="bash"
                    code="pip install -U langchain-opendataloader-pdf"
                  />
                </div>
                <Link
                  href="/docs/rag-integration"
                  className="mt-3 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  View RAG Integration Guide
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
