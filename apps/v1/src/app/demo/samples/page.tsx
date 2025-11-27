"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getSamples } from "@/lib/samples";

import { SampleGrid } from "../components/sample-grid";
import { SampleList } from "../components/sample-list";
import { SamplesToolbar } from "../components/samples-toolbar";

export default function SamplesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const samples = useMemo(() => getSamples(), []);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return samples;
    return samples.filter((sample) => sample.name.toLowerCase().includes(term));
  }, [query, samples]);

  function onSampleSelect(id: string) {
    router.push(`/demo/samples/${id}`);
  }

  function onSampleKeyDown(
    event: React.KeyboardEvent<HTMLElement>,
    id: string
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSampleSelect(id);
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-background to-muted/30">
      <SamplesToolbar
        query={query}
        onQueryChange={setQuery}
        viewMode={viewMode}
        onViewModeChange={(mode) => setViewMode(mode)}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex items-baseline justify-between py-4">
            <h2 className="text-lg sm:text-xl font-semibold">Sample PDFs</h2>
            <div className="text-sm text-muted-foreground">
              Showing {filtered.length} file(s)
            </div>
          </div>

          {viewMode === "grid" ? (
            <SampleGrid samples={filtered} onSelect={onSampleSelect} />
          ) : (
            <SampleList
              samples={filtered}
              onSelect={onSampleSelect}
              onKeyDown={onSampleKeyDown}
            />
          )}
        </div>
      </section>
    </div>
  );
}
