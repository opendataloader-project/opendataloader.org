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
import { GitHubIcon } from "@/components/ui/icons/github";
import { Section } from "@/components/features/layout/section";

export default function Benchmark() {
  return (
    <Section
      id="benchmark"
      title="Benchmark"
      subtitle="OpenDataLoader PDF is continuously researched to deliver high-quality extraction with low energy use. Compare the components behind our metrics to see how we stay accurate and power-efficient."
    >
      <div className="mx-auto w-full max-w-6xl py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Overall Data Quality
              </CardTitle>
              <CardDescription>
                High-fidelity extraction across layouts—structured output that
                stays true to the original document.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-hidden bg-muted/30">
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
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Energy Consumption
              </CardTitle>
              <CardDescription>
                Low power per document—efficient throughput without sacrificing
                accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-hidden bg-muted/30">
                <Image
                  src="/figures/benchmark_energy-consumption.png"
                  alt="Energy consumption benchmark comparison across engines"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </CardContent>
          </Card>
        </div>
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
