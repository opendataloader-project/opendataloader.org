"use client";

import Link from "next/link";

import { track } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeContact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="border border-neutral-200/60 bg-white/50 py-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
        <CardContent className="flex flex-row items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>Questions, feedback, or ideas — we’d love to hear from you.</div>
          <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-300 sm:items-end">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => track("contact_page", { from: "home-footer" })}
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
