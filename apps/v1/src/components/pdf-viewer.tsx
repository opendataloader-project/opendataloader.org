"use client";

import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ScrollArea } from "@/components/ui/scroll-area";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewerProps = {
  url: string;
};

export const PDFViewer = ({ url }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const rotateForward = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const rotateBackward = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const copySelection = useCallback(() => {
    const selection = globalThis.getSelection();
    if (selection?.toString()) {
      navigator.clipboard.writeText(selection.toString());
    }
  }, []);

  return (
    <div className="flex h-full flex-col bg-foreground/10">
      <div className="p-2 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {numPages > 0 && `${pageNumber} / ${numPages}`}
        </div>
        <Toolbar
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onRotateForward={rotateForward}
          onRotateBackward={rotateBackward}
          onCopy={copySelection}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          canPrev={pageNumber > 1}
          canNext={pageNumber < numPages}
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex justify-center items-start p-4">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            }
            error={
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                Failed to load PDF
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              loading={
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              }
            />
          </Document>
        </div>
      </ScrollArea>
    </div>
  );
};

type ToolbarProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateForward: () => void;
  onRotateBackward: () => void;
  onCopy: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  canPrev: boolean;
  canNext: boolean;
};

const Toolbar = ({
  onZoomIn,
  onZoomOut,
  onRotateForward,
  onRotateBackward,
  onCopy,
  onPrevPage,
  onNextPage,
  canPrev,
  canNext,
}: ToolbarProps) => {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={!canPrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!canNext}
        >
          <ChevronRight />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={onZoomOut}>
          <ZoomOut />
        </Button>
        <Button variant="outline" size="sm" onClick={onZoomIn}>
          <ZoomIn />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={onRotateBackward}>
          <RotateCcw />
        </Button>
        <Button variant="outline" size="sm" onClick={onRotateForward}>
          <RotateCw />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
};
