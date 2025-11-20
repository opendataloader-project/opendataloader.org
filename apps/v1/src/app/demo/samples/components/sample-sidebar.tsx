import { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SampleDoc } from "@/lib/samples";

type SampleSidebarProps = {
  currentSample?: SampleDoc;
  filteredSamples: SampleDoc[];
  query: string;
  onQueryChange: (value: string) => void;
  onSampleClick: (sample: SampleDoc) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  isDesktop: boolean;
};

export function SampleSidebar({
  currentSample,
  filteredSamples,
  query,
  onQueryChange,
  onSampleClick,
  searchInputRef,
  isDesktop,
}: Readonly<SampleSidebarProps>) {
  const activeSampleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const activeEl = activeSampleRef.current;
    if (!activeEl) return;

    requestAnimationFrame(() => {
      activeEl.focus();
      activeEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }, [currentSample?.id]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {isDesktop && (
        <div>
          <div className="p-4 h-18">
            <Input
              ref={searchInputRef}
              placeholder="Search ID"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="rounded-xl"
            />
          </div>
          <Separator />
        </div>
      )}
      <ScrollArea
        className={cn(
          "px-4 py-4",
          isDesktop ? "h-[calc(100vh-130px)]" : "flex-1 min-h-0",
        )}
      >
        <div className="grid grid-cols-1 gap-3">
          {filteredSamples.map((sample) => {
            const isActive = sample.id === currentSample?.id;
            return (
              <button
                key={sample.id}
                ref={isActive ? activeSampleRef : undefined}
                type="button"
                onClick={() => onSampleClick(sample)}
                className={cn(
                  "rounded-2xl border bg-muted/30 p-2 text-left transition hover:bg-muted cursor-pointer",
                  isActive ? "border-primary" : "border-transparent",
                )}
              >
                <div className="aspect-3/4 overflow-hidden rounded-xl bg-muted border">
                  <img
                    src={sample.thumb}
                    alt={sample.name}
                    className="h-full w-full max-w-[300px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 truncate text-center text-xs font-medium">
                  {sample.id}.pdf
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
