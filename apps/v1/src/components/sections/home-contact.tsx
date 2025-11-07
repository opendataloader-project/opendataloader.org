"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";
import Link from "next/link";

export default function HomeContact() {
  const CONTACT_EMAIL = "open.dataloader@hancom.com";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="border border-neutral-200/60 bg-white/50 py-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/40">
        <CardContent className="flex flex-row items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            Need help or want to partner with us? We love hearing from data
            teams.
          </div>
          <Button
            asChild
            variant="link"
            className="px-0 text-neutral-600 dark:text-neutral-300"
            onClick={() => track("contact", { from: "home-footer" })}
          >
            <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
