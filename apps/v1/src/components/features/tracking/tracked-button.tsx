"use client";

import type { ComponentProps } from "react";

import { track } from "@/lib/tracking";
import { Button } from "@/components/ui/button";

type TrackedButtonProps = ComponentProps<typeof Button> & {
  trackingEvent: string;
  trackingParams?: Record<string, unknown>;
};

export function TrackedButton({
  trackingEvent,
  trackingParams,
  onClick,
  ...props
}: TrackedButtonProps) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        track(trackingEvent, trackingParams);
        onClick?.(e);
      }}
    />
  );
}
