import type React from "react";

import { SampleDoc } from "@/lib/samples";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SampleListProps = {
  samples: SampleDoc[];
  onSelect: (id: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>, id: string) => void;
};

export function SampleList({
  samples,
  onSelect,
  onKeyDown,
}: Readonly<SampleListProps>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Preview</TableHead>
          <TableHead>Filename</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => (
          <TableRow
            key={sample.id}
            tabIndex={0}
            onClick={() => onSelect(sample.id)}
            onKeyDown={(event) => onKeyDown(event, sample.id)}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <TableCell>
              <img
                src={sample.thumb}
                alt={sample.name}
                className="h-12 w-10 rounded-md object-cover ring-1 ring-border"
                loading="lazy"
              />
            </TableCell>
            <TableCell>
              <div className="truncate text-sm font-medium" title={sample.name}>
                {sample.name}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
