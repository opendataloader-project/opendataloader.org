import { Suspense } from "react";

import HeroContent from "./hero-content";
import HeroHeadline from "./hero-headline";
import TrustIndicators from "./trust-indicators";

// Fallback for TrustIndicators while loading
function TrustIndicatorsSkeleton() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
      <span className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <span className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <span className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <span className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Server-rendered headline for fast LCP */}
        <HeroHeadline />
        {/* Client-side interactive content */}
        <HeroContent />
        <Suspense fallback={<TrustIndicatorsSkeleton />}>
          <TrustIndicators />
        </Suspense>
      </div>
    </section>
  );
}
