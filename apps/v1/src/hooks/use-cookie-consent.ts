"use client";

import { useCallback, useEffect } from "react";
import {
  canUseCookiesAtom,
  cookieConsentAtom,
  isConsentReadyAtom,
} from "@/store";
import type { ConsentStatus } from "@/types";
import { useAtom } from "jotai";

export function useCookieConsent() {
  const [status, setStatus] = useAtom(cookieConsentAtom);
  const [isReady, setIsReady] = useAtom(isConsentReadyAtom);
  const [canUseCookies] = useAtom(canUseCookiesAtom);

  // 초기화 시 ready 상태 설정
  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setIsReady(true);
    }, 0);
    return () => globalThis.clearTimeout(timeoutId);
  }, [setIsReady]);

  // 다른 탭에서의 변경 감지
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "cookie-consent") return;

      if (event.newValue === "accepted" || event.newValue === "rejected") {
        setStatus(event.newValue as ConsentStatus);
      }
    };

    globalThis.addEventListener("storage", handleStorage);
    return () => globalThis.removeEventListener("storage", handleStorage);
  }, [setStatus]);

  const acceptAll = useCallback(() => {
    setStatus("accepted");
  }, [setStatus]);

  const rejectAll = useCallback(() => {
    setStatus("rejected");
  }, [setStatus]);

  return {
    status,
    isReady,
    canUseCookies,
    acceptAll,
    rejectAll,
  };
}
