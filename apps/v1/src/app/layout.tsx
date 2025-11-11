import { RootProvider } from "fumadocs-ui/provider/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export default function Layout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>

        <SpeedInsights />
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
