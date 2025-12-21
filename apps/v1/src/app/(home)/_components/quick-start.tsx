"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Link2 } from "lucide-react";

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
    format="json,html,pdf,markdown",
    reading_order="xycut",  # For accurate multi-column reading order
)`,
    guideLink: "/docs/quick-start-python",
    guideText: "View Python Guide",
  },
  nodejs: {
    install: "npm install @opendataloader/pdf",
    code: `import { convert } from "@opendataloader/pdf";

await convert(["document.pdf"], {
  outputDir: "output/",
  format: "json,html,pdf,markdown",
  readingOrder: "xycut",  // For accurate multi-column reading order
});`,
    guideLink: "/docs/quick-start-nodejs",
    guideText: "View Node.js Guide",
  },
  docker: {
    install: "",
    code: String.raw`docker run --rm -v "$PWD":/work \
  ghcr.io/opendataloader-project/opendataloader-pdf-cli:latest \
  /work/document.pdf -f json,html,pdf,markdown \
  --reading-order xycut  # For accurate multi-column reading order`,
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
config.setReadingOrder(Config.READING_ORDER_XYCUT);  // For accurate multi-column reading order

OpenDataLoaderPDF.processFile("document.pdf", config);`,
    guideLink: "/docs/quick-start-java",
    guideText: "View Java Guide",
  },
};

export default function QuickStart() {
  const [activeTab, setActiveTab] = useState("python");

  return (
    <section id="quick-start" className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Get Started in 60 Seconds
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="nodejs">Node.js</TabsTrigger>
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, example]) => (
              <TabsContent
                key={key}
                value={key}
                className="mt-4 min-w-0 space-y-4"
              >
                {example.install && (
                  <div className="overflow-x-auto">
                    <DynamicCodeBlock
                      lang={key === "java" ? "xml" : "bash"}
                      code={example.install}
                    />
                  </div>
                )}
                {example.code && (
                  <div className="overflow-x-auto">
                    <DynamicCodeBlock
                      lang={getCodeLang(key)}
                      code={example.code}
                    />
                  </div>
                )}
                <Link
                  href={example.guideLink}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {example.guideText}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* LangChain Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-8 max-w-2xl rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
        >
          <div className="flex items-start gap-3">
            <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                Building a RAG pipeline? Use our official LangChain integration:
              </p>
              <div className="mt-2 overflow-x-auto">
                <DynamicCodeBlock
                  lang="bash"
                  code="pip install langchain-opendataloader-pdf"
                />
              </div>
              <Link
                href="/docs/rag-integration"
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View RAG Integration Guide
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
