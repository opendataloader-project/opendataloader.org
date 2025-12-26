import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics is cookie-free and privacy-friendly.
 * No user consent required - it only collects anonymous, aggregated data.
 */
export function ConditionalVercelAnalytics() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
