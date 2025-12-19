"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type HeroSectionProps = Readonly<{
  /** Left side content (badge, title, description, actions) */
  children: ReactNode;
  /** Right side media (image, video, etc.) */
  media?: ReactNode;
  /** Additional className for the section */
  className?: string;
  /** Additional className for the content container */
  contentClassName?: string;
  /** Additional className for the media container */
  mediaClassName?: string;
}>;

export function HeroSection({
  children,
  media,
  className,
  contentClassName,
  mediaClassName,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate border-b bg-muted/40",
        "min-h-120 flex items-center",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div
          className={cn(
            "grid gap-12 md:items-center w-full",
            media ? "md:grid-cols-2" : "md:grid-cols-1"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("space-y-6", contentClassName)}
          >
            {children}
          </motion.div>

          {media && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn("flex items-center justify-center", mediaClassName)}
            >
              {media}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
