import { createPluginRegistration } from "@embedpdf/core";
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
import { LoaderPluginPackage } from "@embedpdf/plugin-loader/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";
import { Scroller, ScrollPluginPackage } from "@embedpdf/plugin-scroll/react";
import { SelectionPluginPackage } from "@embedpdf/plugin-selection/react";
import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import {
  useZoom,
  ZoomMode,
  ZoomPluginPackage,
} from "@embedpdf/plugin-zoom/react";
import { MoveHorizontal, ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type PDFViewerProps = {
  id: string;
  url: string;
};

export const PDFViewer = ({ id, url }: PDFViewerProps) => {
  const { engine, isLoading } = usePdfiumEngine();

  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }

  const plugins = [
    createPluginRegistration(LoaderPluginPackage, {
      loadingOptions: {
        type: "url",
        pdfFile: { id, url },
      },
    }),
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
  ];

  return (
    <EmbedPDF engine={engine} plugins={plugins}>
      <div className="flex h-full flex-col bg-foreground/10">
        <div className="p-2 flex justify-end">
          <Toolbar />
        </div>
        <Viewport>
          <Scroller
            renderPage={({ width, height, pageIndex, scale, rotation }) => (
              <PagePointerProvider
                pageIndex={pageIndex}
                pageWidth={width}
                pageHeight={height}
                rotation={rotation}
                scale={scale}
              >
                <RenderLayer pageIndex={pageIndex} scale={scale} />
                <AnnotationLayer
                  pageIndex={pageIndex}
                  scale={scale}
                  pageWidth={width}
                  pageHeight={height}
                  rotation={rotation}
                />
              </PagePointerProvider>
            )}
          />
        </Viewport>
      </div>
    </EmbedPDF>
  );
};

const Toolbar = () => {
  const { provides: zoom } = useZoom();
  if (!zoom) {
    return null;
  }

  return (
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
  );
};
