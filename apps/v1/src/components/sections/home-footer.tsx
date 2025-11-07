"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";

type FooterNavLink = {
  label: string;
  href: string;
  trackingId: string;
  external?: boolean;
};

const FOOTER_LINKS: FooterNavLink[] = [
  {
    label: "Documentation",
    href: "/docs",
    trackingId: "docs",
    external: true,
  },
  {
    label: "Javadocs",
    href: "https://javadoc.io/doc/org.opendataloader/opendataloader-pdf-core/latest",
    trackingId: "javadocs",
    external: true,
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    trackingId: "privacy-policy",
    external: true,
  },
];

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/60 py-10 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <span>© {currentYear} OpenDataLoader</span>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center gap-4"
            >
              {FOOTER_LINKS.map(({ label, href, trackingId, external }) => (
                <Button
                  key={href}
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-neutral-600 dark:text-neutral-300"
                  onClick={() => track(trackingId, { from: "home-footer" })}
                >
                  <Link
                    href={href}
                    prefetch={false}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
