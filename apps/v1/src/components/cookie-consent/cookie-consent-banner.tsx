"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useCookieConsent } from "./cookie-consent-context";

export function CookieConsentBanner() {
  const { status, isReady, acceptAll, rejectAll } = useCookieConsent();

  if (!isReady || status !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-5xl rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking &apos;Accept All&apos;, you consent to our use
            of cookies. For more details, please review our{" "}
            <Link
              href="https://accounts.hancom.com/policy/privacy/current/en"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={rejectAll}
            >
              Reject All
            </Button>
            <Button className="cursor-pointer" onClick={acceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
