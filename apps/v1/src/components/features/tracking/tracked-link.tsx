"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

import { track } from "@/lib/tracking";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  trackingEvent: string;
  trackingParams?: Record<string, unknown>;
  children: ReactNode;
};

export function TrackedLink({
  trackingEvent,
  trackingParams,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(trackingEvent, trackingParams);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
