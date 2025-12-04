"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { useCookieConsent } from "./cookie-consent-context";

type ConditionalGoogleAnalyticsProps = {
  gaId?: string;
};

export function ConditionalGoogleAnalytics({
  gaId,
}: Readonly<ConditionalGoogleAnalyticsProps>) {
  const { status, isReady } = useCookieConsent();

  if (!gaId || !isReady || status !== "accepted") {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
