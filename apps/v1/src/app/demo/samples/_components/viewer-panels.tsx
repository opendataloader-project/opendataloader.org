import dynamic from "next/dynamic";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Download, Loader2 } from "lucide-react";

import { SampleDoc } from "@/lib/samples";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DataState,
  DataTab,
  dataTabForViewer,
  parseViewerTab,
  ViewerTab,
  viewerTabDisplay,
  viewerTabOrder,
} from "../constants";

// Dynamic import to avoid SSR issues with react-pdf (uses DOMMatrix)
const PDFViewer = dynamic(
  () =>
    import("@/components/features/viewers/pdf-viewer").then(
      (mod) => mod.PDFViewer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

type ViewerCardProps = {
  sample?: SampleDoc;
  dataStates: Record<DataTab, DataState>;
  selectedTab: ViewerTab;
  onTabChange: (tab: ViewerTab) => void;
};

export function ViewerCard({
  sample,
  dataStates,
  selectedTab,
  onTabChange,
}: Readonly<ViewerCardProps>) {
  const selectedDataTab = dataTabForViewer[selectedTab];
  const selectedDataState = selectedDataTab
    ? dataStates[selectedDataTab]
    : undefined;
  const showDownloadButton = ["html", "md", "json", "pdf", "annot"].includes(
    selectedTab
  );
  const isDownloadDisabled =
    selectedTab === "pdf"
      ? !sample?.originalPdf
      : selectedTab === "annot"
        ? !sample?.annotatedPdf
        : selectedDataState?.status !== "ready";

  const handleDownload = async () => {
    if (!showDownloadButton || !sample) return;

    const link = document.createElement("a");
    link.rel = "noopener";

    if (selectedTab === "pdf" && sample.originalPdf) {
      const response = await fetch(sample.originalPdf);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      link.download = sample.name;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (selectedTab === "annot" && sample.annotatedPdf) {
      const response = await fetch(sample.annotatedPdf);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      link.download = `${sample.id}_annotated.pdf`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (selectedDataState?.status !== "ready") return;

    let mineType = "";
    if (selectedTab === "json") {
      mineType = "application/json";
    } else if (selectedTab === "html") {
      mineType = "text/html";
    } else if (selectedTab === "md") {
      mineType = "text/markdown";
    }

    const blob = new Blob([selectedDataState.content], {
      type: mineType,
    });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${sample.id}.${selectedTab}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => {
        const parsed = parseViewerTab(value);
        if (parsed) onTabChange(parsed);
      }}
    >
      <div className="mt-2 flex items-center justify-between gap-2 px-2">
        <TabsList className="mx-0">
          {viewerTabOrder.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {viewerTabDisplay[tab].label}
            </TabsTrigger>
          ))}
        </TabsList>
        {showDownloadButton && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Download content"
            onClick={handleDownload}
            disabled={isDownloadDisabled}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
      {viewerTabOrder.map((tab) => (
        <TabsContent key={tab} value={tab}>
          <ViewerContent tab={tab} sample={sample} dataStates={dataStates} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

type ViewerContentProps = {
  tab: ViewerTab;
  sample?: SampleDoc;
  dataStates: Record<DataTab, DataState>;
};

function ViewerContent({
  tab,
  sample,
  dataStates,
}: Readonly<ViewerContentProps>) {
  if (tab === "annot" || tab === "pdf") {
    const pdfSrc = tab === "annot" ? sample?.annotatedPdf : sample?.originalPdf;
    if (!pdfSrc) {
      return (
        <div className="flex h-[calc(100vh-190px)] items-center justify-center text-muted-foreground">
          PDF preview unavailable
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-190px)] w-full flex flex-col">
        <PDFViewer url={pdfSrc} />
      </div>
    );
  }

  const targetTab = dataTabForViewer[tab];
  const state = targetTab ? dataStates[targetTab] : undefined;
  if (!state) {
    return null;
  }

  if (state.status === "loading") {
    return (
      <div className="flex h-[calc(100vh-190px)] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading {viewerTabDisplay[tab].label}…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex h-[calc(100vh-190px)] items-center justify-center text-muted-foreground">
        Failed to load {viewerTabDisplay[tab].label}: {state.error}
      </div>
    );
  }

  if (tab === "preview" && state.status === "idle") {
    return (
      <div className="flex h-[calc(100vh-190px)] items-center justify-center text-muted-foreground">
        Preparing preview…
      </div>
    );
  }

  if (tab === "preview") {
    return (
      <div className="h-[calc(100vh-190px)] overflow-y-auto p-4 text-sm">
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: state.content }}
        />
      </div>
    );
  }

  if (state.status === "idle") {
    return (
      <div className="flex h-[calc(100vh-190px)] items-center justify-center text-muted-foreground">
        Select a tab to load content.
      </div>
    );
  }

  if (
    state.status === "ready" &&
    (tab === "md" || tab === "json" || tab === "html")
  ) {
    const langMap = { md: "markdown", json: "json", html: "html" } as const;
    return (
      <div className="h-[calc(100vh-190px)] overflow-auto">
        <DynamicCodeBlock
          lang={langMap[tab]}
          code={state.content || "No data"}
        />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-190px)] bg-black/90 p-4 text-sm text-white">
      <pre className="whitespace-pre-wrap font-mono text-xs">
        {state.content || "No data"}
      </pre>
    </ScrollArea>
  );
}
