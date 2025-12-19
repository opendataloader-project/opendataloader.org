import { LayoutGrid, List, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type SamplesToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

export function SamplesToolbar({
  query,
  onQueryChange,
  viewMode,
  onViewModeChange,
}: Readonly<SamplesToolbarProps>) {
  return (
    <section className="border-t bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search"
                className="pl-8"
              />
            </div>
          </div>

          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) =>
              value && onViewModeChange(value as "grid" | "list")
            }
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem
              value="grid"
              className="gap-1 rounded-lg cursor-pointer"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              className="gap-1 rounded-lg cursor-pointer"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </section>
  );
}
