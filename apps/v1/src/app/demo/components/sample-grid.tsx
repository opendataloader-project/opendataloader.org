import { SampleDoc } from "@/lib/samples";

type SampleGridProps = {
  samples: SampleDoc[];
  onSelect: (id: string) => void;
};

export function SampleGrid({ samples, onSelect }: Readonly<SampleGridProps>) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {samples.map((sample) => (
        <button
          key={sample.id}
          type="button"
          onClick={() => onSelect(sample.id)}
          className="rounded-2xl bg-muted/30 p-2 text-left transition hover:bg-muted cursor-pointer"
        >
          <div className="aspect-3/4 overflow-hidden rounded-xl bg-muted border">
            <img
              src={sample.thumb}
              alt={sample.name}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-2 truncate text-center text-xs font-medium">
            {sample.id}.pdf
          </div>
        </button>
      ))}
    </div>
  );
}
