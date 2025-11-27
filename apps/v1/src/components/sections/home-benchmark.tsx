"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/github";
import { Section } from "@/components/section";

export default function HomeBenchmark() {
  return (
    <Section
      id="benchmark"
      title="Benchmark"
      subtitle="OpenDataLoader PDF is continuously being researched and developed to provide more accurate extraction and recognition through objective evaluation metrics. Please compare the three components that make up the metrics. You'll find OpenDataLoader PDF, the document inference feature that's just right for you."
    >
      <div className="mx-auto w-full max-w-6xl py-10">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Benchmark Snapshots
            </CardTitle>
            <CardDescription>
              Comparative overall quality and energy scores across document
              extraction engines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 grid gap-4 md:grid-cols-2">
              <div className="relative w-full overflow-hidden rounded-lg border bg-muted/30">
                <Image
                  src="/figures/benchmark_overall.png"
                  alt="Overall benchmark comparison across engines"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="relative w-full overflow-hidden rounded-lg border bg-muted/30">
                <Image
                  src="/figures/benchmark_energy-consumption.png"
                  alt="Energy consumption benchmark comparison across engines"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-2xl">
            <Link href="/docs/benchmark">Learn More</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl">
            <Link
              href="https://github.com/opendataloader-project/opendataloader-bench"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-4 w-4" /> Benchmark (GitHub)
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
