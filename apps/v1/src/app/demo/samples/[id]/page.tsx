"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import {
  buildDataUrl,
  getSampleById,
  getSamples,
  SampleDoc,
} from "@/lib/samples";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { LoadingOverlay } from "../../components/loading-overlay";
import { SampleSidebar } from "../components/sample-sidebar";
import { ViewerCard } from "../components/viewer-panels";
import {
  createInitialDataState,
  DataState,
  DataTab,
  dataTabForViewer,
  normalizeView,
  ViewerTab,
  viewerTabDisplay,
} from "../constants";

/**
 * Syncs view state to URL without triggering Next.js navigation.
 * URL is for bookmarking/sharing only - local state is the source of truth.
 */
function syncViewsToUrl(view1: ViewerTab, view2: ViewerTab) {
  const url = new URL(globalThis.location.href);
  url.searchParams.set("view1", view1);
  url.searchParams.set("view2", view2);
  globalThis.history.replaceState(null, "", url.toString());
}

export default function SampleDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state is the source of truth, initialized from URL once
  const [curView1, setCurView1] = useState<ViewerTab>(() =>
    normalizeView(searchParams.get("view1"), true)
  );
  const [curView2, setCurView2] = useState<ViewerTab>(() =>
    normalizeView(searchParams.get("view2"), false)
  );

  // Sync to URL on mount and when views change
  useEffect(() => {
    syncViewsToUrl(curView1, curView2);
  }, [curView1, curView2]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const samples = useMemo(() => getSamples(), []);
  const [query, setQuery] = useState("");
  const filteredSamples = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return samples;
    return samples.filter((sample) => sample.id.toLowerCase().includes(term));
  }, [query, samples]);

  const routeId = useMemo(() => {
    if (!params?.id) return undefined;
    if (Array.isArray(params.id)) return params.id[0];
    return params.id;
  }, [params]);

  const currentSample = getSampleById(routeId);
  const sampleId = currentSample?.id;

  const views = useMemo(() => [curView1, curView2], [curView1, curView2]);
  const [dataStates, setDataStates] = useState<Record<DataTab, DataState>>(
    createInitialDataState
  );
  const dataStatesRef = useRef(dataStates);

  useEffect(() => {
    dataStatesRef.current = dataStates;
  }, [dataStates]);

  const viewKey = useMemo(() => views.join("|"), [views]);
  const requestedDataTabs = useMemo(() => {
    const tabs = new Set<DataTab>();
    for (const tab of views) {
      const dataTab = dataTabForViewer[tab];
      if (dataTab) {
        tabs.add(dataTab);
      }
    }
    return tabs;
  }, [views]);

  useEffect(() => {
    setDataStates(createInitialDataState());
  }, [sampleId]);

  useEffect(() => {
    if (!sampleId) return;
    const controllers: AbortController[] = [];

    for (const tab of requestedDataTabs) {
      const activeState = dataStatesRef.current[tab];
      if (
        activeState &&
        (activeState.status === "loading" || activeState.status === "ready")
      ) {
        continue;
      }

      const controller = new AbortController();
      controllers.push(controller);
      setDataStates((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], status: "loading", error: undefined },
      }));

      const load = async () => {
        try {
          const url = buildDataUrl(tab, sampleId);
          console.log("Fetching data from", url);
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) {
            throw new Error(
              `Failed to load ${viewerTabDisplay[tab].label} data`
            );
          }

          let text = await response.text();
          if (tab === "json") {
            try {
              text = JSON.stringify(JSON.parse(text), null, 2);
            } catch {
              // Keep original text if parsing fails
            }
          }

          setDataStates((prev) => ({
            ...prev,
            [tab]: { status: "ready", content: text },
          }));
        } catch (error) {
          if (controller.signal.aborted) return;
          setDataStates((prev) => ({
            ...prev,
            [tab]: {
              status: "error",
              content: "",
              error:
                error instanceof Error ? error.message : "Failed to load data",
            },
          }));
        }
      };

      void load();
    }

    return () => {
      for (const controller of controllers) {
        controller.abort();
      }
    };
  }, [requestedDataTabs, sampleId, viewKey]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSampleClick = (sample: SampleDoc) => {
    // Preserve current view state when navigating to another sample
    const url = `/demo/samples/${sample.id}?view1=${curView1}&view2=${curView2}`;
    startTransition(() => {
      router.push(url);
    });
  };

  const handleSidebarToggle = () => {
    setDesktopSidebarOpen((prev) => !prev);
  };

  const handleTabChange = (tab: ViewerTab, isPrimary: boolean) => {
    const newView = normalizeView(tab, isPrimary);
    // Update local state - URL sync handled by useEffect
    if (isPrimary) {
      setCurView1(newView);
    } else {
      setCurView2(newView);
    }
  };

  const renderDesktopSidebar = isDesktop;
  const isSidebarVisible = isDesktop ? desktopSidebarOpen : false;

  return (
    <div className="w-full bg-linear-to-b from-background via-background to-muted/30">
      <LoadingOverlay isLoading={isPending} />
      <div className="flex flex-col md:flex-row">
        {renderDesktopSidebar && (
          <aside
            className={cn(
              "hidden border-b bg-background/95 transition-all duration-300 md:flex md:flex-col md:border-b-0",
              desktopSidebarOpen
                ? "md:w-50 lg:w-50 md:border-r"
                : "md:w-0 md:border-r-0 md:opacity-0 md:pointer-events-none md:overflow-hidden"
            )}
            aria-hidden={!desktopSidebarOpen || !isDesktop}
          >
            <SampleSidebar
              currentSample={currentSample}
              filteredSamples={filteredSamples}
              query={query}
              onQueryChange={setQuery}
              onSampleClick={handleSampleClick}
              searchInputRef={searchInputRef}
              isDesktop
            />
          </aside>
        )}

        <main className="flex-1">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-4 px-4 h-18">
              {isDesktop ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer"
                  onClick={handleSidebarToggle}
                  aria-label="Toggle sidebar"
                >
                  {isSidebarVisible ? (
                    <PanelLeftClose className="h-4 w-4" />
                  ) : (
                    <PanelLeftOpen className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full cursor-pointer"
                      aria-label="Toggle sidebar"
                    >
                      <PanelLeftOpen className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] h-[calc(100vh-50px)]">
                    <DialogTitle>Sample PDFs</DialogTitle>
                    <DialogDescription>
                      {samples.length} files
                    </DialogDescription>
                    <SampleSidebar
                      currentSample={currentSample}
                      filteredSamples={filteredSamples}
                      query={query}
                      onQueryChange={setQuery}
                      onSampleClick={handleSampleClick}
                      searchInputRef={searchInputRef}
                      isDesktop={false}
                    />
                  </DialogContent>
                </Dialog>
              )}

              <h3 className="font-semibold tracking-tight">
                {currentSample ? currentSample.name : "Sample not found"}
              </h3>
            </div>
            <Separator />
            {currentSample ? (
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-300">
                <ViewerCard
                  sample={currentSample}
                  dataStates={dataStates}
                  selectedTab={curView1}
                  onTabChange={(tab) => handleTabChange(tab, true)}
                />
                {isDesktop && (
                  <ViewerCard
                    sample={currentSample}
                    dataStates={dataStates}
                    selectedTab={curView2}
                    onTabChange={(tab) => handleTabChange(tab, false)}
                  />
                )}
              </div>
            ) : (
              <Card>
                <CardContent>
                  The requested sample does not exist. Choose a document from
                  the list on the left to continue.
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
