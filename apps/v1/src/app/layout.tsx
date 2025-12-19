import { RootProvider } from "fumadocs-ui/provider/next";
import { Provider as JotaiProvider } from "jotai";

import { ConditionalGoogleAnalytics } from "@/components/features/cookie-consent/conditional-google-analytics";
import { ConditionalVercelAnalytics } from "@/components/features/cookie-consent/conditional-vercel-analytics";
import { CookieConsentBanner } from "@/components/features/cookie-consent/cookie-consent-banner";

import "katex/dist/katex.css";
import "./globals.css";

export default function Layout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <JotaiProvider>
          <RootProvider>{children}</RootProvider>
          <CookieConsentBanner />
          <ConditionalVercelAnalytics />
          <ConditionalGoogleAnalytics gaId={gaId} />
        </JotaiProvider>
      </body>
    </html>
  );
}
