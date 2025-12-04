import { RootProvider } from "fumadocs-ui/provider/next";

import { ConditionalGoogleAnalytics } from "@/components/cookie-consent/conditional-google-analytics";
import { ConditionalVercelAnalytics } from "@/components/cookie-consent/conditional-vercel-analytics";
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-context";

import "katex/dist/katex.css";
import "./globals.css";

export default function Layout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <CookieConsentProvider>
          <RootProvider>{children}</RootProvider>
          <CookieConsentBanner />
          <ConditionalVercelAnalytics />
          <ConditionalGoogleAnalytics gaId={gaId} />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
