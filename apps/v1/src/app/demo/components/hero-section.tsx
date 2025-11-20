import React from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HeroSectionProps = {
  onTryClick: () => void;
  onSampleSelect: (id: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | null) => void;
};

export function HeroSection({
  onTryClick,
  onSampleSelect,
  fileInputRef,
  onFilesSelected,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative isolate border-b bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
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
                  Inspect how OpenDataLoader rebuilds layouts from annotated
                  PDFs. Compare the Extracted JSON, AI-ready Markdown, and HTML
                  side by side to validate every layer.
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
                onClick={() => onSampleSelect("01030000000000")}
              >
                Sample PDFs
              </Button>
            </div>
          </motion.div>

          <Card className="mx-auto w-80 gap-0 border bg-card/80 p-0 shadow-none backdrop-blur">
            <CardContent className="p-0">
              <button
                className="aspect-4/5 overflow-hidden bg-muted/40 cursor-pointer"
                onClick={() => onSampleSelect("01030000000000")}
              >
                <img
                  src={"/figures/example_annotated_pdf.png"}
                  alt="thumbnail"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
