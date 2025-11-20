import { DATA_TYPE_META } from "@/lib/samples";

export type DataTab = keyof typeof DATA_TYPE_META;
export type ViewerTab = "pdf" | "annot" | "preview" | "html" | "md" | "json";
export type DataStatus = "idle" | "loading" | "ready" | "error";

export type DataState = {
  status: DataStatus;
  content: string;
  error?: string;
};

export const viewerTabOrder: ViewerTab[] = [
  "pdf",
  "annot",
  "preview",
  "html",
  "md",
  "json",
];

export const viewerTabDisplay: Record<ViewerTab, { label: string }> = {
  pdf: { label: "PDF" },
  annot: { label: "Annot" },
  preview: { label: "Preview" },
  html: { label: "HTML" },
  md: { label: "MD" },
  json: { label: "JSON" },
};

export const dataTabForViewer: Partial<Record<ViewerTab, DataTab>> = {
  md: "md",
  json: "json",
  html: "html",
  preview: "html",
};

export const DEFAULT_PRIMARY_TAB: ViewerTab = "annot";
export const DEFAULT_SECONDARY_TAB: ViewerTab = "preview";

export const parseViewerTab = (value: string | null): ViewerTab | null =>
  viewerTabOrder.includes(value as ViewerTab) ? (value as ViewerTab) : null;

export const createInitialDataState = (): Record<DataTab, DataState> => ({
  md: { status: "idle", content: "" },
  html: { status: "idle", content: "" },
  json: { status: "idle", content: "" },
});

export function normalizeView(
  raw: string | null,
  isPrimary: boolean,
): ViewerTab {
  if (!raw || !viewerTabOrder.includes(raw as ViewerTab))
    return isPrimary ? DEFAULT_PRIMARY_TAB : DEFAULT_SECONDARY_TAB;
  return raw as ViewerTab;
}
