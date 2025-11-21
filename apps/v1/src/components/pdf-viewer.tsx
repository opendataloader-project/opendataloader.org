import { useEffect, useState } from "react";
import { createPluginRegistration, PluginRegistry } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/react";
import { usePdfiumEngine } from "@embedpdf/engines/react";
import {
  AnnotationLayer,
  AnnotationPluginPackage,
} from "@embedpdf/plugin-annotation/react";
import { HistoryPluginPackage } from "@embedpdf/plugin-history/react";
import {
  InteractionManagerPluginPackage,
  PagePointerProvider,
} from "@embedpdf/plugin-interaction-manager/react";
import {
  LoaderCapability,
  LoaderPluginPackage,
} from "@embedpdf/plugin-loader/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";
import {
  Rotate,
  RotatePluginPackage,
  useRotate,
} from "@embedpdf/plugin-rotate/react";
import { Scroller, ScrollPluginPackage } from "@embedpdf/plugin-scroll/react";
import {
  SelectionLayer,
  SelectionPluginPackage,
  SelectionRangeX,
  useSelectionCapability,
} from "@embedpdf/plugin-selection/react";
import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import {
  useZoom,
  ZoomMode,
  ZoomPluginPackage,
} from "@embedpdf/plugin-zoom/react";
import {
  Copy,
  MoveHorizontal,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type PDFViewerProps = {
  id: string;
  url: string;
};

const plugins = [
  createPluginRegistration(LoaderPluginPackage),
  createPluginRegistration(ViewportPluginPackage),
  createPluginRegistration(ScrollPluginPackage),
  createPluginRegistration(RenderPluginPackage),
  createPluginRegistration(InteractionManagerPluginPackage),
  createPluginRegistration(SelectionPluginPackage),
  createPluginRegistration(HistoryPluginPackage),
  createPluginRegistration(AnnotationPluginPackage, {
    annotationAuthor: "opendataloader.org",
  }),
  createPluginRegistration(ZoomPluginPackage, {
    defaultZoomLevel: ZoomMode.FitPage,
  }),
  createPluginRegistration(RotatePluginPackage),
];

export const PDFViewer = ({ id, url }: PDFViewerProps) => {
  const { engine, isLoading } = usePdfiumEngine();
  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }

  const onInitialized = async (registry: PluginRegistry) => {
    console.log("PDF Viewer initialized");

    const loaderProvider = registry.getCapabilityProvider(
      "loader"
    ) as Readonly<LoaderCapability> | null;
    loaderProvider?.loadDocument({
      type: "url",
      pdfFile: {
        id,
        url,
      },
    });
  };

  return (
    <EmbedPDF engine={engine} plugins={plugins} onInitialized={onInitialized}>
      <div className="flex h-full flex-col bg-foreground/10">
        <div className="p-2 flex justify-end">
          <Toolbar />
        </div>
        <Viewport>
          <Scroller
            renderPage={({ width, height, pageIndex, scale, rotation }) => (
              <Rotate pageSize={{ width, height }}>
                <PagePointerProvider
                  pageIndex={pageIndex}
                  pageWidth={width}
                  pageHeight={height}
                  rotation={rotation}
                  scale={scale}
                >
                  <RenderLayer
                    pageIndex={pageIndex}
                    scale={scale}
                    className="pointer-events-none select-none"
                  />
                  <SelectionLayer pageIndex={pageIndex} scale={scale} />
                  <AnnotationLayer
                    pageIndex={pageIndex}
                    scale={scale}
                    pageWidth={width}
                    pageHeight={height}
                    rotation={rotation}
                  />
                </PagePointerProvider>
              </Rotate>
            )}
          />
        </Viewport>
      </div>
    </EmbedPDF>
  );
};

const Toolbar = () => {
  const { provides: zoom } = useZoom();
  const { provides: rotate } = useRotate();
  const { provides: selection } = useSelectionCapability();

  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (!selection) return;
    return selection.onSelectionChange((sel: SelectionRangeX | null) => {
      setHasSelection(!!sel);
    });
  }, [selection]);

  if (!zoom || !rotate || !selection) {
    return null;
  }

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={zoom.zoomOut}>
          <ZoomOut />
        </Button>
        <Button variant="outline" size="sm" onClick={zoom.zoomIn}>
          <ZoomIn />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => zoom.requestZoom(ZoomMode.FitPage)}
        >
          <MoveHorizontal />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={rotate.rotateBackward}>
          <RotateCcw />
        </Button>
        <Button variant="outline" size="sm" onClick={rotate.rotateForward}>
          <RotateCw />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasSelection}
          onClick={selection?.copyToClipboard}
        >
          <Copy />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
};
