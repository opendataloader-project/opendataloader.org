const SAMPLE_START = BigInt("01030000000000");
const SAMPLE_TOTAL = 201;
const VERCEL_BLOB_BASE =
  "https://ysmaetzypmnjyfbz.public.blob.vercel-storage.com";
const THUMB_BASE =
  "https://github.com/opendataloader-project/opendataloader-sample/raw/refs/heads/main/pdfs_thumbnail";
const ORIGINAL_PDF_BASE = `${VERCEL_BLOB_BASE}/samples/pdfs`;
const ANNOTATED_PDF_BASE = `${VERCEL_BLOB_BASE}/samples/prediction/opendataloader/pdf`;

export const DATA_TYPE_META = {
  md: { folder: "markdown", ext: "md" },
  html: { folder: "html", ext: "html" },
  json: { folder: "json", ext: "json" },
} as const;

export type SampleDoc = {
  id: string;
  name: string;
  thumb: string;
  originalPdf: string;
  annotatedPdf: string;
};

const samples: SampleDoc[] = Array.from(
  { length: SAMPLE_TOTAL },
  (_, index) => {
    const id = String(SAMPLE_START + BigInt(index)).padStart(14, "0");
    return {
      id,
      name: `${id}.pdf`,
      thumb: `${THUMB_BASE}/${id}.webp`,
      originalPdf: `${ORIGINAL_PDF_BASE}/${id}.pdf`,
      annotatedPdf: `${ANNOTATED_PDF_BASE}/${id}_annotated.pdf`,
    };
  },
);

export function getSamples() {
  return samples;
}

export function getSampleById(id: string | undefined | null) {
  if (!id) return undefined;
  return samples.find((sample) => sample.id === id);
}

export function buildDataUrl(
  type: keyof typeof DATA_TYPE_META,
  id: string,
): string {
  const meta = DATA_TYPE_META[type];
  return `${VERCEL_BLOB_BASE}/samples/prediction/opendataloader/${meta.folder}/${id}.${meta.ext}`;
}
