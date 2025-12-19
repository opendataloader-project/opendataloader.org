import Link from "next/link";
import type { FilterItem } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/features/layout/section";

const attackVectors = [
  "Hidden or transparent text planted inside the page.",
  "Off-page or overlapping elements that only models can see.",
  "Tiny fonts, OCG layers, or steganographic images carrying prompts.",
];

const filters: FilterItem[] = [
  {
    name: "hidden-text",
    status: "On",
    note: "Blocks invisible or low-contrast text.",
  },
  {
    name: "off-page",
    status: "On",
    note: "Drops content outside the visible CropBox.",
  },
  {
    name: "tiny",
    status: "On",
    note: "Filters sub-pixel fonts and microscopic text.",
  },
  {
    name: "hidden-ocg",
    status: "On",
    note: "Removes prompts hidden in OCG layers.",
  },
];

export default function AiSafety() {
  return (
    <Section
      id="ai-safety"
      title="AI Safety"
      subtitle="Defends against indirect prompt injection hiding inside PDFs before content reaches your agents."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-neutral-200/60 bg-white/50 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
          <CardHeader>
            <CardTitle>What we defend against</CardTitle>
            <CardDescription>
              opendataloader-pdf strips or flags content humans cannot see but
              models would read.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
            <ul className="list-disc space-y-2 pl-4">
              {attackVectors.map((vector) => (
                <li key={vector}>{vector}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-neutral-200/60 bg-white/50 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
          <CardHeader>
            <CardTitle>Filters (on by default)</CardTitle>
            <CardDescription>
              Safety heuristics run before any text touches your downstream
              stack.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
            {filters.map((filter) => (
              <div
                key={filter.name}
                className="flex items-start justify-between gap-3 rounded-lg border border-dashed border-neutral-200/80 px-4 py-2.5 dark:border-white/10"
              >
                <div>
                  <div className="font-medium">{filter.name}</div>
                  <p className="text-neutral-700 dark:text-neutral-200">
                    {filter.note}
                  </p>
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
                  {filter.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="rounded-2xl">
          <Link href="/docs/ai-safety">See AI Safety details</Link>
        </Button>
      </div>
    </Section>
  );
}
