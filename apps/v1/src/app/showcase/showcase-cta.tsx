"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";

export function ShowcaseCtaButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        asChild
        size="lg"
        className="rounded-2xl"
        onClick={() => track("nav-try-demo", { from: "showcase" })}
      >
        <Link href="/studio-lite">
          <PlayCircle className="h-4 w-4" />
          Try Demo
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="rounded-2xl"
        onClick={() => track("nav-contact-hancom", { from: "showcase" })}
      >
        <Link href="https://www.hancom.com/en/support/csCenter/contactUs">
          Contact HANCOM
        </Link>
      </Button>
    </div>
  );
}
