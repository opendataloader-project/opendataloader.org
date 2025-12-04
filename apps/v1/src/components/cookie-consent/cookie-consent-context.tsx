"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ConsentStatus = "accepted" | "rejected" | "unknown";

type CookieConsentContextValue = {
  status: ConsentStatus;
  isReady: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
};

const STORAGE_KEY = "cookie-consent";

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function CookieConsentProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [status, setStatus] = useState<ConsentStatus>("unknown");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedValue = globalThis.localStorage.getItem(STORAGE_KEY);

    const timeoutId = globalThis.setTimeout(() => {
      if (storedValue === "accepted" || storedValue === "rejected") {
        setStatus(storedValue);
      }
      setIsReady(true);
    }, 0);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      if (event.newValue === "accepted" || event.newValue === "rejected") {
        setStatus(event.newValue);
      }
    };

    globalThis.addEventListener("storage", handleStorage);
    return () => globalThis.removeEventListener("storage", handleStorage);
  }, []);

  const persistConsent = (value: Exclude<ConsentStatus, "unknown">) => {
    globalThis.localStorage.setItem(STORAGE_KEY, value);
    setStatus(value);
  };

  const value = useMemo(
    () => ({
      status,
      isReady,
      acceptAll: () => persistConsent("accepted"),
      rejectAll: () => persistConsent("rejected"),
    }),
    [status, isReady]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
