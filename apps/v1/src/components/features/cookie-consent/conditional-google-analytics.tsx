"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { useCookieConsent } from "@/hooks/use-cookie-consent";

type ConditionalGoogleAnalyticsProps = Readonly<{
  gaId?: string;
}>;

export function ConditionalGoogleAnalytics({
  gaId,
}: ConditionalGoogleAnalyticsProps) {
  const { status, isReady } = useCookieConsent();

  if (!gaId || !isReady || status !== "accepted") {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
