"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import { HeroSection } from "./components/hero-section";

function onFilesSelected(files: FileList | null) {
  if (!files || files.length === 0) return;
  console.log(
    "Selected files:",
    Array.from(files).map((f) => ({ name: f.name, size: f.size }))
  );
  alert(`${files.length} file(s) selected. (Functionality coming soon!)`);
}

export default function DemoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function onTryClick() {
    fileInputRef.current?.click();
  }

  function onSampleSelect(_id: string) {
    router.push("/demo/samples");
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-background to-muted/30">
      <HeroSection
        onTryClick={onTryClick}
        onSampleSelect={onSampleSelect}
        fileInputRef={fileInputRef}
        onFilesSelected={onFilesSelected}
      />

      <section className="border-t bg-background/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              What you can explore
            </h2>
            <p className="text-muted-foreground">
              Jump into the samples, see how we rebuild layout structure, or
              learn how to bring your own PDFs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card/60 p-5 shadow-sm">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                Samples
              </div>
              <div className="mt-2 text-lg font-medium">
                Browse annotated PDFs
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Compare thumbnails, pick a file, and inspect extracted JSON,
                Markdown, and HTML for each document.
              </p>
              <button
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline cursor-pointer"
                onClick={() => router.push("/demo/samples")}
              >
                Open samples →
              </button>
            </div>

            <div className="rounded-2xl border bg-card/60 p-5 shadow-sm">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                Try it yourself
              </div>
              <div className="mt-2 text-lg font-medium">Upload your PDFs</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Upload is coming soon. You can still peek at the flow and see
                how the UI is built for file-level inspection.
              </p>
              <button
                className="mt-4 inline-flex items-center text-sm font-semibold text-muted-foreground underline-offset-4 cursor-pointer"
                onClick={onTryClick}
                disabled
              >
                Trigger upload →
              </button>
            </div>

            <div className="rounded-2xl border bg-card/60 p-5 shadow-sm">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                Learn
              </div>
              <div className="mt-2 text-lg font-medium">
                Understand the pipeline
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                See how annotations become structured outputs and how to
                integrate OpenDataLoader into your own workflows.
              </p>
              <button
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline cursor-pointer"
                onClick={() => router.push("/docs")}
              >
                View docs →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
