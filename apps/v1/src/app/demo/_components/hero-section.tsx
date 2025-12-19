import React from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HeroSection as HeroSectionLayout } from "@/components/features/layout/hero-section";

type HeroSectionProps = {
  onTryClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | null) => void;
};

export function HeroSection({
  onTryClick,
  fileInputRef,
  onFilesSelected,
}: Readonly<HeroSectionProps>) {
  const router = useRouter();

  return (
    <HeroSectionLayout
      media={
        <button
          className="w-64 rounded-2xl border p-2 aspect-4/5 overflow-hidden cursor-pointer bg-white"
          onClick={() => router.push("/demo/samples/01030000000000")}
        >
          <img
            src={"/figures/example_annotated_pdf.webp"}
            alt="thumbnail"
            className="object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
          <Badge variant="secondary" className="uppercase tracking-wide">
            Playground
          </Badge>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            OpenDataLoader Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Inspect how OpenDataLoader rebuilds layouts from annotated PDFs.
            Compare the Extracted JSON, AI-ready Markdown, and HTML side by side
            to validate every layer.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                size="lg"
                className="rounded-2xl gap-2 cursor-pointer"
                onClick={onTryClick}
                disabled
              >
                <UploadCloud className="h-4 w-4" /> Try Demo
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>Upcoming</TooltipContent>
        </Tooltip>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => onFilesSelected(e.currentTarget.files)}
        />
        <Button
          size="lg"
          variant="outline"
          className="rounded-2xl gap-2 cursor-pointer"
          onClick={() => router.push("/demo/samples")}
        >
          Sample PDFs
        </Button>
      </div>
    </HeroSectionLayout>
  );
}
