"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function ConditionalVercelAnalytics() {
  const { status, isReady } = useCookieConsent();

  if (!isReady || status !== "accepted") {
    return null;
  }

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
