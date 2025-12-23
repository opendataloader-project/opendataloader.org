"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";

import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const { status, isReady, acceptAll, rejectAll } = useCookieConsent();

  if (!isReady || status !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-white/70 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Icon + Text */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-200/50 bg-amber-50/80 backdrop-blur-sm dark:border-amber-700/30 dark:bg-amber-900/30">
              <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Cookie Settings
              </h2>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                We use cookies to enhance your browsing experience and analyze
                our traffic. By clicking &apos;Accept All&apos;, you consent to
                our use of cookies. For more details, please review our{" "}
                <Link
                  href="https://accounts.hancom.com/policy/privacy/current/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex shrink-0 gap-3 sm:ml-6">
            <Button
              variant="outline"
              size="lg"
              onClick={rejectAll}
              className="flex-1 border-gray-300/50 bg-white/50 text-gray-700 backdrop-blur-sm hover:bg-white/80 hover:text-gray-900 sm:flex-none dark:border-white/20 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20 dark:hover:text-white"
            >
              Reject All
            </Button>
            <Button
              size="lg"
              onClick={acceptAll}
              className="flex-1 bg-gray-900 font-semibold text-white hover:bg-black sm:flex-none dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
