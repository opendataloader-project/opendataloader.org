import { useEffect, useMemo, useRef, useState } from "react";

import { buildDataUrl } from "@/lib/samples";

import {
  createInitialDataState,
  DataState,
  DataTab,
  dataTabForViewer,
  ViewerTab,
  viewerTabDisplay,
} from "../constants";

export function useSampleDataStates(
  sampleId: string | undefined,
  views: ViewerTab[]
) {
  const [dataStates, setDataStates] = useState<Record<DataTab, DataState>>(
    createInitialDataState
  );
  const dataStatesRef = useRef(dataStates);

  useEffect(() => {
    dataStatesRef.current = dataStates;
  }, [dataStates]);

  const viewKey = useMemo(() => views.join("|"), [views]);

  useEffect(() => {
    setDataStates(createInitialDataState());
  }, [sampleId]);

  useEffect(() => {
    if (!sampleId) return;
    const controllers: AbortController[] = [];
    const requestedTabs = new Set<DataTab>();

    for (const tab of views) {
      const dataTab = dataTabForViewer[tab];
      if (dataTab) {
        requestedTabs.add(dataTab);
      }
    }

    for (const tab of requestedTabs) {
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
  }, [viewKey, sampleId]);

  return dataStates;
}
