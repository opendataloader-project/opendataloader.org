import { Suspense } from "react";

import HeroContent from "./hero-content";
import HeroHeadline from "./hero-headline";
import TrustIndicators from "./trust-indicators";

// Fallback for TrustIndicators while loading
function TrustIndicatorsSkeleton() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
      <span className="h-5 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <span className="h-5 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <span className="h-5 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <span className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="noise-overlay absolute inset-0" />

      {/* Decorative geometric elements */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-teal-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-400/8 to-orange-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
        {/* Server-rendered headline for fast LCP */}
        <HeroHeadline />
        {/* Client-side interactive content */}
        <HeroContent />
        <Suspense fallback={<TrustIndicatorsSkeleton />}>
          <TrustIndicators />
        </Suspense>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
    </section>
  );
}
